Curumim.Platform = function(game, spriteKey, map, mapObject, gid, animation, flip, animated, collisionArea)
{
	this.game = game;	
	
	this.group = game.add.group();
	this.group.enableBody = true;
	map.createFromObjects(mapObject, gid, spriteKey, 0, true, false, this.group);
	this.group.forEach(function (platform) 
	{ 		
		platform.body.allowGravity = false;
		platform.body.immovable = true;
		platform.anchor.setTo(.5, 0);
		
		if (typeof collisionArea != 'undefined')
		{
			platform.body.setSize(collisionArea.x, collisionArea.y, collisionArea.offsetX, collisionArea.offsetY);
		}

		if (typeof animation != 'undefined')
		{
			platform.animations.add('animation', animation, 10, true);
			platform.animations.play('animation');
		}

		if (animated)
		{
			var timeSeed = new Date();
			var random = new Phaser.RandomDataGenerator([timeSeed.getTime()]);		
			var rand = random.integerInRange(1, 100);

			platform.body.velocity.x = -50;
			if (rand % 2 == 0)
			{
				platform.scale.x *= -1;
				platform.body.velocity.x = 50;
			}
		
			platform.tween = this.add.tween(platform);
			platform.tween.onLoop.add(function() 
			{
				platform.body.velocity.x *= -1;
				if (flip)
				{
					platform.scale.x *= -1;				
					//TODO: Fix the bug when is flipping player
					//player.getCollider().scale.x *= -1;
				}
	 		}, this);
			
			platform.tween.to({ }, 3000, null, true, 0, Number.MAX_VALUE, true);
		}

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
	},

	destroy: function()
	{
		this.group.destroy();
	}
};