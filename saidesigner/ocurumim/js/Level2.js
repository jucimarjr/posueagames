Curumim.Level2 = function(game, endOfLevelEvent) 
{
	this.game = game;
	this.endOfLevelEvent = endOfLevelEvent;
	this.oldCameraX = 0;
	this.forest;
	this.clouds;
	this.waterfall;	
	this.platform;
	this.map;
	this.layer;
	this.lifes;
	this.energy;
	this.bullets;
	this.points;
	this.ants;
	this.ounces;
	this.araraBlue;
	this.insaninhos;
	this.arrows;
};

Curumim.Level2.prototype = 
{
	create: function() 
	{
		this.forest = this.game.add.sprite(-1520, -400, 'forest2');
		this.forest.fixedToCamera = true;

		this.clouds = this.game.add.tileSprite(0, 0, 4000, 238, 'clouds');
		this.clouds.autoScroll(-20, 0);
				
		this.waterfall = this.game.add.tileSprite(0, 300, 4000, 700, 'waterfall');	
		this.waterfall.autoScroll(0, 200);

		this.platform = this.game.add.tileSprite(0, 0, 4000, 1000, 'platform3');

 		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layer = this.map.createLayer('TileScene3');
		this.layer.resizeWorld();		

		this.map.setCollisionBetween(1, 1, true, 'TileScene3', false);

		this.lifes = this.game.add.group();
		this.lifes.enableBody = true;
		this.map.createFromObjects('ObjScene3', Config.fruit.life.gid, 'fruits', Config.fruit.life.frame, true, false, this.lifes);
		this.lifes.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.energy = this.game.add.group();
		this.energy.enableBody = true;
		this.map.createFromObjects('ObjScene3', Config.fruit.energy.gid, 'fruits', Config.fruit.energy.frame, true, false, this.energy);
		this.energy.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);			

		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.map.createFromObjects('ObjScene3', Config.fruit.bullet.gid, 'fruits', Config.fruit.bullet.frame, true, false, this.bullets);
		this.bullets.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);	

		this.points = this.game.add.group();
		this.points.enableBody = true;
		this.map.createFromObjects('ObjScene3', Config.fruit.point.gid, 'fruits', Config.fruit.point.frame, true, false, this.points);
		this.points.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.arrows = this.game.add.group();
		this.arrows.enableBody = true;
		this.map.createFromObjects('ObjScene3', Config.arrow.gid, 'arrow', 0, true, false, this.arrows);
		this.arrows.forEach(function (arrow){ arrow.body.allowGravity = false; arrow.anchor.setTo(.5, 0);}, this.game);

		this.ounces = new Curumim.Ounce(this.game, 'ounce', this.map, 'ObjScene3', Config.ounce.gid, [0, 1, 2, 3, 4], 100);
		this.ants = new Curumim.Enemy(this.game, 'ant', this.map, 'ObjScene3', Config.ant.gid, [0, 1, 2, 3, 4, 5], [6], 100);
		this.araraBlue = new Curumim.Platform(this.game, 'arara_azul', this.map, 'ObjScene3', Config.arara.blue.gid, [0, 1, 2, 3, 4]);
		this.insaninhos = new Curumim.Enemy(this.game, 'insaninho', this.map, 'ObjScene3', Config.insaninho.gid, [0, 1, 2], [3], 100);
	},

	update: function()
	{
		this.game.physics.arcade.collide(this.layer, player.getCollider());
		this.game.physics.arcade.overlap(this.lifes, player.getCollider(), this.lifeCollision, null, this);
		this.game.physics.arcade.overlap(this.energy, player.getCollider(), this.energyCollision, null, this);
		this.game.physics.arcade.overlap(this.bullets, player.getCollider(), this.bulletCollision, null, this);
		this.game.physics.arcade.overlap(this.points, player.getCollider(), this.pointCollision, null, this);
		this.game.physics.arcade.overlap(this.arrows, player.getCollider(), this.arrowCollision, null, this);

		this.ants.update();
		this.ounces.update();
		this.araraBlue.update();
		this.insaninhos.update();

		this.waterfall.cameraOffset.y = -this.game.camera.y;
		
		if (this.oldCameraX != this.game.camera.x) 
		{
			var velocity = player.getVelocity() * -1;

			this.forest.cameraOffset.x +=  velocity * 0.0025;
			this.waterfall.cameraOffset.x +=  velocity * 0.01;
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
	},

	arrowCollision: function(collider, arrow)
	{
		player.endOfLevel();
		this.destroy();
	},

	fadeScene: function(fadeList)
	{
		for (i = 0; i < fadeList.length; i++) { 
			var tween = this.game.add.tween(fadeList[i]);
			tween.to({ alpha: 0 }, Config.game.nextLevel, null, true);		    
		}
	},

	destroy: function()
	{
		this.lifes.destroy();
		this.energy.destroy();
		this.bullets.destroy();
		this.points.destroy();
		this.arrows.destroy();
		this.ounces.destroy();
		this.ants.destroy();
		this.araraBlue.destroy();
		this.insaninhos.destroy();

		this.fadeScene([this.platform, this.forest, this.clouds, this.waterfall]);

		var self = this;

		setTimeout(function() { 
			self.platform.destroy();
			self.forest.destroy();
			self.clouds.destroy();
			self.waterfall.destroy();
			self.map.destroy();
			self.layer.destroy();

			self.endOfLevelEvent(2);
			
		}, Config.game.nextLevel);
	}
};