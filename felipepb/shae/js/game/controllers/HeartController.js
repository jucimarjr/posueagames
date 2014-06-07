Game.HeartController = function (game, waypoints) {
	this.game = game;
	this.waypoints = waypoints;
	this.sprite;

	this.currentAnimation;
	this.backwards = false;
	this.currentWaypointIndex;
}

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

	update: function () {
		
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

		var flyTween = this.game.add.tween(this.sprite);
        flyTween.to({ x: this.waypoints.x + targetWaypoint[0] }, animTime, Phaser.Easing.Linear.None, true, delay);
        
        flyTween = this.game.add.tween(this.sprite);
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
}
