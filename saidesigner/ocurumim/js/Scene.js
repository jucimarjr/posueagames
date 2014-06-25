Curumim.Scene = function(game) 
{
	this.game = game;
	this.oldCameraX = 0;
	this.forest;
	this.clouds;
	this.trees;
	this.platform;
	this.map;
	this.layer;
	this.lifes;
	this.energy;
	this.bullets;
	this.points;
	this.ants;
	this.ounces;
};

Curumim.Scene.prototype = 
{
	create: function() 
	{
		this.forest = this.game.add.sprite(-1520, -400, 'forest');
		this.forest.fixedToCamera = true;

		this.clouds = this.game.add.tileSprite(0, 0, 4000, 300, 'clouds');
		this.clouds.autoScroll(-50, 0);
				
		this.trees = this.game.add.sprite(-200, 0, 'trees');	
		this.trees.fixedToCamera = true;

		this.platform = this.game.add.tileSprite(0, 0, 4000, 1000, 'platform');
    	
 		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layer = this.map.createLayer('TileScene1');
		this.layer.resizeWorld();		

		this.map.setCollisionBetween(1, 1, true, 'TileScene1', false);

		this.lifes = this.game.add.group();
		this.lifes.enableBody = true;
		this.map.createFromObjects('ObjScene1', Config.fruit.life.gid, 'fruits', Config.fruit.life.frame, true, false, this.lifes);
		this.lifes.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.energy = this.game.add.group();
		this.energy.enableBody = true;
		this.map.createFromObjects('ObjScene1', Config.fruit.energy.gid, 'fruits', Config.fruit.energy.frame, true, false, this.energy);
		this.energy.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);			

		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.map.createFromObjects('ObjScene1', Config.fruit.bullet.gid, 'fruits', Config.fruit.bullet.frame, true, false, this.bullets);
		this.bullets.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);	

		this.points = this.game.add.group();
		this.points.enableBody = true;
		this.map.createFromObjects('ObjScene1', Config.fruit.point.gid, 'fruits', Config.fruit.point.frame, true, false, this.points);
		this.points.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.ounces = new Curumim.Enemy(this.game, 'ounce', this.map, 'ObjScene1', 6, [0, 1, 2, 3, 4]);
		this.ants = new Curumim.Enemy(this.game, 'ant', this.map, 'ObjScene1', 14, [0, 1, 2, 3, 4, 5], [6]);

	},

	update: function()
	{
		this.game.physics.arcade.collide(this.layer, player.getCollider());
		this.game.physics.arcade.overlap(this.lifes, player.getCollider(), this.lifeCollision, null, this);
		this.game.physics.arcade.overlap(this.energy, player.getCollider(), this.energyCollision, null, this);
		this.game.physics.arcade.overlap(this.bullets, player.getCollider(), this.bulletCollision, null, this);
		this.game.physics.arcade.overlap(this.points, player.getCollider(), this.pointCollision, null, this);

		this.ants.update();
		this.ounces.update();

		this.trees.cameraOffset.y = -this.game.camera.y;

		var velocity = Config.player.velocity.walk;
		var direction = 0;
				
		if (this.game.input.keyboard.isDown(Config.player.keys.run)) 
		{			
			velocity = Config.player.velocity.run;
		}

		if (this.game.input.keyboard.isDown(Config.player.keys.left)) 
		{
           	direction = 1;
		} 
		else if (this.game.input.keyboard.isDown(Config.player.keys.right)) 
		{
			direction = -1; 
		}
		
		if (this.oldCameraX != this.game.camera.x) 
		{
			this.forest.cameraOffset.x +=  velocity * 0.0025 * direction;
			this.trees.cameraOffset.x +=  velocity * 0.01 * direction;			
			this.oldCameraX = this.game.camera.x;			
		}
	},

	lifeCollision: function(collider, life)
	{
		life.kill();	
		player.score.updateLife(1);
	},

	energyCollision: function(collider, energy)
	{
		energy.kill();
		player.startPowerUp();
	},

	bulletCollision: function(collider, bullet)
	{
		bullet.kill();
		player.score.addBullets();
	},

	pointCollision: function(collider, point)
	{
		point.kill();
		player.score.addPoints();
	}
};