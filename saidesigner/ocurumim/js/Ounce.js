Curumim.Ounce = function(game, spriteKey, map, mapObject, gid, walkAnimation)
{
	this.game = game;	
	
	this.group = game.add.group();
	this.group.enableBody = true;
	map.createFromObjects(mapObject, gid, spriteKey, 0, true, false, this.group);
	this.group.forEach(function (enemy) 
	{ 
		enemy.alive = true;
		enemy.body.allowGravity = false;
		enemy.body.immovable = true;
		enemy.anchor.setTo(.5, 0);

		enemy.animations.add('walk', walkAnimation, 10, true);
		enemy.animations.play('walk');

		enemy.tail = this.add.sprite(enemy.body.x, enemy.body.y, 'ounce_tail');
		enemy.dizzy = this.add.sprite(enemy.body.x, enemy.body.y, 'ounce_dizzy');
		enemy.dizzy.animations.add('dizzy', [0, 1, 2, 3], 3, true);
		enemy.dizzy.anchor.setTo(.5, 0);
		enemy.dizzy.alpha = 0;

		var timeSeed = new Date();
		var random = new Phaser.RandomDataGenerator([timeSeed.getTime()]);
		var posTarget = enemy.x - 300;
		var rand = random.integerInRange(1, 10);

		if (rand % 2 == 0)
		{			
			enemy.scale.x *= -1;
			enemy.x -= 300;
			posTarget = enemy.x + 300;
		}		

		enemy.tween = this.add.tween(enemy);
		enemy.tween.onLoop.add(function() {				
			enemy.scale.x *= -1;
 		}, this);

		enemy.tween.to({ x: posTarget }, 3000, null, true, 0, Number.MAX_VALUE, true);

	}, this.game);
};

Curumim.Ounce.prototype = 
{
	update: function()
	{
		this.group.forEach(function (enemy) 
		{ 
			if (enemy.scale.x > 0) 
			{
				enemy.tail.x = enemy.body.x + enemy.body.width - 50; 
				enemy.tail.y = enemy.body.y - 25;
			}
			else
			{
				enemy.tail.x = enemy.body.x + 50; 
				enemy.tail.y = enemy.body.y - 25;	
			}

			enemy.tail.scale.x = enemy.scale.x;

			enemy.dizzy.x = enemy.body.x + enemy.body.width / 2;
			enemy.dizzy.y = enemy.body.y - 35;

		}, this.game);

		this.game.physics.arcade.overlap(this.group, player.getCollider(), this.playerCollision, null, this);
		this.game.physics.arcade.collide(player.getBullets(), this.group, this.bulletCollision, null, this);
	},

	playerCollision: function(collider, enemy)
	{	
		if (enemy.alive) 
		{
			player.loseOneLife();
		}		
	},

	bulletCollision: function(collider, enemy) 
	{
		if (enemy.alive) 
		{
			enemy.alive = false;
			enemy.alpha = 0;
			enemy.tail.alpha = 0;
			enemy.dizzy.alpha = 1;
			enemy.dizzy.animations.play('dizzy');
			enemy.tween.pause();

			setTimeout(function() {
				enemy.alpha = 1;
				enemy.tail.alpha = 1;
				enemy.dizzy.alpha = 0; 
				enemy.alive = true;
				enemy.animations.play('walk');
				enemy.tween.resume();
			}, 10000);
		}
	}
};