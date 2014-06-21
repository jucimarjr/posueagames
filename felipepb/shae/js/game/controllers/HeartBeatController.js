Game.HeartBeatController = function (game, playerSprite) {
	this.game = game;
	this.playerSprite = playerSprite;
	this.hearts;
	this.frequence = 2000;
	this.time = 0;
	this.heartbeatSFX = game.add.audio('heartbeat_sfx');
};

Game.HeartBeatController.prototype = {
	setHearts: function (hearts) {
		this.hearts = hearts;
	},
	
	update: function () {
		this.time += this.game.time.elapsed;
		if (this.time >= this.frequence) {
			this.time = 0;
			var hearts = this.hearts;
			if (hearts) {
				var minDistanceToPlayer = Number.MAX_VALUE;
				var length = hearts.length;
				for (var i = 0; i < length; i++) {
					hearts[i].playBeat();
					var distance = this.game.math.distance(hearts[i].sprite.x, 
														   hearts[i].sprite.y,
														   this.playerSprite.x,
														   this.playerSprite.y);
					if (distance < minDistanceToPlayer)
						minDistanceToPlayer = distance;
				}

				var attenuation = 150.0;
				var maxVolumeDistance = HeartConsts.minimumBeatDistance;
				var volume;
				
				if (minDistanceToPlayer <= maxVolumeDistance)
					volume = 2.0;
				else
					volume = Utils.clamp(1.0 - (minDistanceToPlayer - maxVolumeDistance) / attenuation, 0.0, 1.0);
				
				this.heartbeatSFX.play('', 0, volume );
				// console.log('play heartbeat sound with volume = ' + volume);
			}
		}
	}
};
