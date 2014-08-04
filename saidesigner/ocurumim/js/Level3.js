Curumim.Level3 = function(game, endOfLevelEvent) 
{
	this.game = game;
	this.endOfLevelEvent = endOfLevelEvent;
	this.oldCameraX = 0;
	this.cave;	
	this.platform;
	this.map;
	this.layer;
	this.lifes;
	this.energy;
	this.bullets;
	this.points;
	this.ants;
	this.ounces;
	this.rock;
	this.insaninhos;
	this.arrows;
};

Curumim.Level3.prototype = 
{
	create: function() 
	{
		this.cave = this.game.add.sprite(0, 0, 'cave');			

		this.platform = this.game.add.tileSprite(0, 0, 4000, 1000, 'platform4');

 		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layer = this.map.createLayer('TileScene4');
		this.layer.resizeWorld();		

		this.map.setCollisionBetween(1, 1, true, 'TileScene4', false);

		this.lifes = this.game.add.group();
		this.lifes.enableBody = true;
		this.map.createFromObjects('ObjScene4', Config.fruit.life.gid, 'fruits', Config.fruit.life.frame, true, false, this.lifes);
		this.lifes.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.energy = this.game.add.group();
		this.energy.enableBody = true;
		this.map.createFromObjects('ObjScene4', Config.fruit.energy.gid, 'fruits', Config.fruit.energy.frame, true, false, this.energy);
		this.energy.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);			

		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.map.createFromObjects('ObjScene4', Config.fruit.bullet.gid, 'fruits', Config.fruit.bullet.frame, true, false, this.bullets);
		this.bullets.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);	

		this.points = this.game.add.group();
		this.points.enableBody = true;
		this.map.createFromObjects('ObjScene4', Config.fruit.point.gid, 'fruits', Config.fruit.point.frame, true, false, this.points);
		this.points.forEach(function (fruit){ fruit.body.allowGravity = false; fruit.anchor.setTo(.5, .5);}, this.game);

		this.arrows = this.game.add.group();
		this.arrows.enableBody = true;
		this.map.createFromObjects('ObjScene4', Config.arrow.gid, 'arrow', 0, true, false, this.arrows);
		this.arrows.forEach(function (arrow){ arrow.body.allowGravity = false; arrow.anchor.setTo(.5, 0);}, this.game);

		this.ounces = new Curumim.Ounce(this.game, 'ounce', this.map, 'ObjScene4', Config.ounce.gid, [0, 1, 2, 3, 4], 100);
		this.ants = new Curumim.Enemy(this.game, 'ant', this.map, 'ObjScene4', Config.ant.gid, [0, 1, 2, 3, 4, 5], [6], 100);
		this.rock = new Curumim.Platform(this.game, 'rock', this.map, 'ObjScene4', Config.rock.gid, null, false, true);
		this.insaninhos = new Curumim.Enemy(this.game, 'insaninho', this.map, 'ObjScene4', Config.insaninho.gid, [0, 1, 2], [3], 100);
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
		this.rock.update();
		this.insaninhos.update();

		this.cave.cameraOffset.y = -this.game.camera.y;
		
		if (this.oldCameraX != this.game.camera.x) 
		{
			var velocity = player.getVelocity() * -1;

			this.cave.cameraOffset.x +=  velocity * 0.01;
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
		this.rock.destroy();
		this.insaninhos.destroy();

		this.fadeScene([this.platform, this.cave]);

		var self = this;

		setTimeout(function() { 
			self.platform.destroy();
			self.cave.destroy();
			self.map.destroy();
			self.layer.destroy();

			self.endOfLevelEvent(3);
			
		}, Config.game.nextLevel);
	}
};