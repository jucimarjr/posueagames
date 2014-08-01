Curumim.Ounce = function(game, spriteKey, map, mapObject, gid, walkAnimation, xOffset)
{
	this.game = game;	
	
	this.group = game.add.group();
	this.group.enableBody = true;
	map.createFromObjects(mapObject, gid, spriteKey, 0, true, false, this.group);
	this.group.forEach(function (ounce) 
	{ 
		ounce.alive = true;
		ounce.body.allowGravity = false;
		ounce.body.immovable = true;
		ounce.anchor.setTo(.5, 0);		

		ounce.animations.add('walk', walkAnimation, 10, true);
		ounce.animations.play('walk');

		ounce.tail = this.add.sprite(ounce.body.x, ounce.body.y, 'ounce_tail');
		ounce.dizzy = this.add.sprite(ounce.body.x, ounce.body.y, 'ounce_dizzy');
		ounce.dizzy.animations.add('dizzy', [0, 1, 2, 3], 3, true);
		ounce.dizzy.anchor.setTo(.5, 0);
		ounce.dizzy.alpha = 0;		

		var timeSeed = new Date();
		var random = new Phaser.RandomDataGenerator([timeSeed.getTime()]);
		var posTarget = ounce.x - xOffset;
		var rand = random.integerInRange(1, 100);

		if (rand % 2 == 0)
		{			
			ounce.scale.x *= -1;
			ounce.x -= xOffset;
			posTarget = ounce.x + xOffset;
		}		

		ounce.tween = this.add.tween(ounce);
		ounce.tween.onLoop.add(function() {				
			ounce.scale.x *= -1;
 		}, this);

		ounce.tween.to({ x: posTarget }, 3000, null, true, 0, Number.MAX_VALUE, true);	

	}, this.game);
};

Curumim.Ounce.prototype = 
{
	update: function()
	{
		this.group.forEach(function (ounce) 
		{ 
			if (ounce.scale.x > 0) 
			{
				ounce.tail.x = ounce.body.x + ounce.body.width - 60; 
				ounce.tail.y = ounce.body.y - 25;
			}
			else
			{
				ounce.tail.x = ounce.body.x + 60; 
				ounce.tail.y = ounce.body.y - 25;	
			}

			ounce.tail.scale.x = ounce.scale.x;

			ounce.dizzy.x = ounce.body.x + ounce.body.width / 2;
			ounce.dizzy.y = ounce.body.y - 35;

		}, this.game);

		this.game.physics.arcade.overlap(this.group, player.getCollider(), this.playerCollision, null, this);
		this.game.physics.arcade.collide(player.getBullets(), this.group, this.bulletCollision, null, this);
	},

	playerCollision: function(collider, ounce)
	{	
		if (ounce.alive) 
		{
			player.loseOneLife();
		}		
	},

	bulletCollision: function(collider, ounce) 
	{
		if (ounce.alive) 
		{
			ounce.alive = false;
			ounce.alpha = 0;
			ounce.tail.alpha = 0;
			ounce.dizzy.alpha = 1;
			ounce.dizzy.animations.play('dizzy');
			ounce.tween.pause();

			setTimeout(function() {
				ounce.alpha = 1;
				ounce.tail.alpha = 1;
				ounce.dizzy.alpha = 0; 
				ounce.alive = true;
				ounce.animations.play('walk');
				ounce.tween.resume();
			}, 10000);
		}
	},

	destroy: function()
	{
		this.group.forEach(function (ounce) {
			ounce.tail.destroy();
			ounce.dizzy.destroy();
		});

		this.group.destroy();
	}
};