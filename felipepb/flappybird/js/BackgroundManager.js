BasicGame.BackgroundManager = function (gameManager) {
	this.gameManager = gameManager;

	this.phrases;
	this.stars;
	// this.city;
    // this.trees;
    // this.ground;
};

BasicGame.BackgroundManager.prototype = {
	create: function () {
		// var cameraWidth = this.camera.width;
  //       var cameraHeight = this.camera.height;
        
  //       var cityHeight = this.cache.getImage('city').height;
  //       var treesHeight = this.cache.getImage('trees').height;
  //       var groundHeight = this.cache.getImage('ground').height;

  //       var cityY = cameraHeight - cityHeight - groundHeight;
  //       var treesY = cameraHeight - groundHeight - treesHeight;
  //       var groundY = cameraHeight - groundHeight;

        // this.city = this.add.tileSprite(0, cityY, cameraWidth, cityHeight, 'city');
        // this.trees = this.add.tileSprite(0, treesY, cameraWidth, treesHeight, 'trees');

        // this.ground = this.add.tileSprite(0, groundY, cameraWidth, groundHeight, 'ground');
        // this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        // this.ground.body.immovable = true;
	},

	update: function () {
		// this.ground.tilePosition.x += BasicGame.Obstacle.velocity;
        // this.trees.tilePosition.x += BasicGame.Obstacle.velocity / 4.0;
        // this.city.tilePosition.x += BasicGame.Obstacle.velocity / 8.0;	
	}
};