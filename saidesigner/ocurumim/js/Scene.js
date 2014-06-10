Curumim.Scene = function(game) 
{
	this.game = game;
	this.forest;
	this.clouds;
	this.trees;
	this.platform;
	this.map;
	this.layer;
	this.oldCameraX = 0;
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
		this.game.physics.enable(this.trees, Phaser.Physics.ARCADE);
		this.trees.body.allowGravity = false;		
		this.trees.fixedToCamera = true;

		this.platform = this.game.add.tileSprite(0, 0, 4000, 1000, 'platform');
    	
 		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layer = this.map.createLayer('TileScene1');
		this.layer.resizeWorld();		

		this.map.setCollisionBetween(1, 1, true, 'TileScene1', false);
	},

	update: function()
	{
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

	collide: function(player) 
	{
		if (player instanceof Curumim.Player) 
		{
			this.game.physics.arcade.collide(this.layer, player.getCollider());
		}
	}
}