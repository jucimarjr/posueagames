Curumim.Platform = function(game, spriteKey, map, mapObject, gid, animation)
{
	this.game = game;	
	
	this.group = game.add.group();
	this.group.enableBody = true;
	map.createFromObjects(mapObject, gid, spriteKey, 0, true, false, this.group);
	this.group.forEach(function (platform) 
	{ 		
		platform.body.allowGravity = false;
		platform.body.immovable = true;
		platform.body.velocity.x = -50;
		platform.anchor.setTo(.5, 0);

		if (typeof animation != 'undefined')
		{
			platform.animations.add('animation', animation, 10, true);
			platform.animations.play('animation');
		}

		platform.tween = this.add.tween(platform);
		platform.tween.onLoop.add(function() {				
			platform.scale.x *= -1;
			platform.body.velocity.x *= -1;
 		}, this);
		
		platform.tween.to({ }, 3000, null, true, 0, Number.MAX_VALUE, true);
		platform.body.setSize(100, 10, 0, 50);

	}, this.game);
	
};

Curumim.Platform.prototype = 
{
	update: function()
	{
		player.platformVelocity = 0;
		this.game.physics.arcade.collide(player.getCollider(), this.group, this.collide);
	},

	collide: function(playerSprite, platform)
	{		
		player.platformVelocity = platform.body.velocity.x;
	}
};