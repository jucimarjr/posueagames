Game.HeartController = function (gameState, player, waypoints) {
	this.gameState = gameState;
	this.game = this.gameState.game;
	this.player = player;
	this.waypoints = waypoints;
	this.sprite;

	this.currentAnimation;
	this.tweens = new Array();
	this.pursuitPositions = new Array();
	this.backwards = false;
	this.currentWaypointIndex;
	
	this.beatSprite;
	this.beatSpriteTween;
	
	this._enabled = true;
}; 

Game.HeartController.prototype = {
	create: function () {
		this.sprite = this.game.add.sprite(0, 0, 'main_sprite_atlas');
		this.sprite.frameName = 'heart_idle_1_100-100.png';
		this.sprite.anchor.setTo(0.5, 0.5);

		// Create animations
		var idleAnimFrames = new Array();
        for (var i = 1; i <= 4; i++) {
            idleAnimFrames.push('heart_idle_' + i + '_100-100.png');
        };

        var flyAnimFrames = new Array();
        for (var i = 1; i <= 10; i++) {
            flyAnimFrames.push('heart_flying_' + i + '_100-100.png');
        };

        this.sprite.animations.add('idle', idleAnimFrames, 10, true);
        this.sprite.animations.add('fly', flyAnimFrames, 10, true);

        this.playIdleAnimation();

        this.currentWaypointIndex = Utils.random(0, this.waypoints.polyline.length - 1);
        // console.log('currentWaypointIndex: ' + this.currentWaypointIndex);

        this.sprite.x = this.waypoints.x + this.waypoints.polyline[this.currentWaypointIndex][0];
        this.sprite.y = this.waypoints.y + this.waypoints.polyline[this.currentWaypointIndex][1];

        this.flyToNextWaypoint(HeartConsts.delayToNextWaypoint);
	},
	
	setEnabled: function (value) {
		this._enabled = value;
		
		if (value) {
			this.resumeTweens();
		} else {
			this.pauseTweens();
		}
	},
	
	playBeat: function () {
		if (!this._enabled ||
		    this.pursuitPositions.length != 0 ||
			Phaser.Point.distance(this.player.sprite, this.sprite) > HeartConsts.minimumBeatDistance) {
			return;
		}
		
		var mySprite = this.sprite;
        var beatSprite = this.beatSprite;

		if (!beatSprite) {
			beatSprite = this.game.add.sprite(mySprite.x, mySprite.y, 'main_sprite_atlas');
			beatSprite.anchor.setTo(0.5, 0.5);
			this.beatSprite = beatSprite;
		} else {
			beatSprite.revive();
		}

		beatSprite.frameName = mySprite.frameName;
		beatSprite.x = mySprite.x;
		beatSprite.y = mySprite.y;
		beatSprite.alpha = 0.5;
		
		var beatAnimation = this.game.add.tween(beatSprite);
		this.beatSpriteTween = beatAnimation;
        beatAnimation.to({ alpha: 1.0 }, 250, Phaser.Easing.Quadratic.Out, true, 0);
		
		var self = this;

		beatAnimation.onComplete.add(function () {
			beatSprite.alpha = 0.5;
			beatAnimation = self.game.add.tween(beatSprite);
			self.beatSpriteTween = beatAnimation;
			beatAnimation.to({ alpha: 1.0 }, 250, Phaser.Easing.Quadratic.Out, true, 0);

	        beatAnimation.onComplete.add(function () {
	            beatSprite.alpha = 1.0;
	            beatAnimation = self.game.add.tween(beatSprite);
				self.beatSpriteTween = beatAnimation;
	            beatAnimation.to({ alpha: 0.0 }, 500, Phaser.Easing.Quadratic.Out, true, 0);

				beatAnimation.onComplete.add(function () {
					beatSprite.kill();
					self.beatSpriteTween = null;
				});
	        });
		});
	},

	update: function () {
		if (!this._enabled) {
			return;
		}

		var mySprite = this.sprite;
		var beatSprite = this.beatSprite;
		var player = this.player;
		var playerSprite = player.sprite;
		var playerDistance = Phaser.Point.distance(playerSprite, mySprite);
		var pursuitPositions = this.pursuitPositions;

		if (beatSprite) {
			beatSprite.x = mySprite.x;
            beatSprite.y = mySprite.y;
			beatSprite.frameName = mySprite.frameName;
		}

        if (player.currentAnim != 'dying' &&
            player.currentAnim != Game.PlayerController.AnimState.FlyingSoul) {
				
			if (playerDistance <= HeartConsts.attackDistance) {
	            this.pauseTweens();

	            if (pursuitPositions.length == 0) {
	                pursuitPositions.push({
	                    x: mySprite.x,
	                    y: mySprite.y
	                });
	            }

	            Utils.advanceSpriteToPosition(mySprite, playerSprite, HeartConsts.pursuitVelocity);
	        } else {
	            if (pursuitPositions.length > 0) {
	                var position = pursuitPositions[pursuitPositions.length - 1];
	                Utils.advanceSpriteToPosition(mySprite, position, HeartConsts.pursuitVelocity);
	
	                if (mySprite.x == position.x && mySprite.y == position.y) {
	                    pursuitPositions.splice(pursuitPositions.length - 1, 1);
	                }

	//              pursuitPositions.splice(pursuitPositions.length - 1, 1);
	//              mySprite.x = position.x;
	//              mySprite.y = position.y;
	            } else {
	                this.resumeTweens();
	            }
	        }
			
			if (playerSprite.overlap(mySprite) && playerDistance <= HeartConsts.playerDeathDistance) {
	            // console.log('call onPlayerLostLife');
				pursuitPositions.splice(pursuitPositions.length - 1, 1);
	            player.playDeathAnimation();
	            player.destroyBody();
	            this.gameState.onPlayerLostLife();
	        }
		}
	},
	
	resumeTweens: function () {
		var tweens = this.tweens;
		var length = tweens.length;
		for (var i = 0; i < length; i++) {
			if (!tweens[i].isRunning) {
				tweens[i].resume();
			}
		}
		
		if (this.beatSpriteTween && !this.beatSpriteTween.isRunning) {
			this.beatSpriteTween.resume();
		}
	},
	
	pauseTweens: function () {
		var tweens = this.tweens;
        var length = tweens.length;
        for (var i = 0; i < length; i++) {
            if (tweens[i].isRunning) {
				tweens[i].pause();
				tweens[i].isRunning = false;
			}
        }

		if (this.beatSpriteTween && this.beatSpriteTween.isRunning) {
			this.beatSpriteTween.pause();
			this.beatSpriteTween.isRunning = false;
		}
	},

	getNextWaypoint: function (previousWaypoint) {
		if (typeof(previousWaypoint) !== 'number')
			return;

		var nextWaypoint;

		if (!this.backwards) {
			nextWaypoint = previousWaypoint + 1;

			if (nextWaypoint >= this.waypoints.polyline.length) {
				this.backwards = true;
				nextWaypoint = previousWaypoint - 1;
			}

		} else {
			nextWaypoint = previousWaypoint - 1;

			if (nextWaypoint < 0) {
				this.backwards = false;
				nextWaypoint = previousWaypoint + 1;
			}
		}

		// console.log('getNextWaypoint => prev: ' + previousWaypoint + ', next: ' + nextWaypoint);

		return nextWaypoint;
	},

	flyToNextWaypoint: function (delay) {
		var previousWaypoint = this.waypoints.polyline[this.currentWaypointIndex];
		var targetWaypointIndex = this.getNextWaypoint(this.currentWaypointIndex);
		var targetWaypoint = this.waypoints.polyline[targetWaypointIndex];

		var distance = Phaser.Point.distance(new Phaser.Point(targetWaypoint[0], targetWaypoint[1]),
											 new Phaser.Point(previousWaypoint[0], previousWaypoint[1]));
		var animTime = (HeartConsts.flightSpeed * distance) / 10;
		
		Utils.clearArray(this.tweens);

		var flyTween = this.game.add.tween(this.sprite);
		this.tweens.push(flyTween);
        flyTween.to({ x: this.waypoints.x + targetWaypoint[0] }, animTime, Phaser.Easing.Linear.None, true, delay);
        
        flyTween = this.game.add.tween(this.sprite);
		this.tweens.push(flyTween);
		flyTween.to({ y: this.waypoints.y + targetWaypoint[1] }, animTime, Phaser.Easing.Linear.None, true, delay);
		flyTween.onStart.add(this.playFlyAnimation, this);
	    flyTween.onComplete.add(this.onWaypointReached, this);

        this.currentWaypointIndex = targetWaypointIndex;
	},

	onWaypointReached: function () {
		// console.log('onWaypointReached');
		this.playIdleAnimation();
		this.flyToNextWaypoint(HeartConsts.delayToNextWaypoint);
	},

	playIdleAnimation: function () {
		this.sprite.animations.play('idle');
		this.currentAnimation = 'idle';
	},

	playFlyAnimation: function () {
		this.sprite.animations.play('fly');
		this.currentAnimation = 'fly';
	}
};
