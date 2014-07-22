Curumim.Enemy = function(game, spriteKey, map, mapObject, gid, walkAnimation, deadAnimation)
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

		if(typeof deadAnimation != 'undefined') 
		{
			enemy.animations.add('dead', deadAnimation, 10, true);
		}

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

		enemy.animations.play('walk');

		enemy.tween = this.add.tween(enemy);
		enemy.tween.onLoop.add(function() {				
			enemy.scale.x *= -1;
 		}, this);

		enemy.tween.to({ x: posTarget }, 3000, null, true, 0, Number.MAX_VALUE, true);

	}, this.game);
};

Curumim.Enemy.prototype = 
{
	update: function(isCollision)
	{
		this.game.physics.arcade.overlap(this.group, player.getCollider(), this.playerCollision, null, this);
		this.game.physics.arcade.collide(player.getBullets(), this.group, this.bulletCollision, null, this);
	},

	playerCollision: function(collider, enemy)
	{	
		if (enemy.alive) 
		{
			if (collider.body.velocity.y > 0 && collider.body.y + collider.body.height >= enemy.body.y)  
			{	
				enemy.alive = false;
				enemy.animations.play('dead');
				enemy.tween.pause();	
				collider.body.velocity.y = -200;				

				setTimeout(function() { 
					enemy.alive = true;
					enemy.animations.play('walk');
					enemy.tween.resume();
				}, 10000);			
			} 
			else 
			{
				player.loseOneLife();
			}
		}
	},

	bulletCollision: function(collider, enemy) 
	{
		enemy.alive = false;
		enemy.animations.play('dead');
		enemy.tween.pause();			

		setTimeout(function() { 
			enemy.alive = true;
			enemy.animations.play('walk');
			enemy.tween.resume();
		}, 10000);		
	}
};