BasicGame.GameManager = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //  the tween manager
    this.state; //	the state manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator

    this.obstaclesGroup;
    this.obstaclesManager;

    this.ground;
    this.city;
    this.trees;
    this.player;
};

BasicGame.GameManager.pixelsToUnit = 60;

BasicGame.GameManager.prototype = {

    create: function () {

        var cameraWidth = this.camera.width;
        var cameraHeight = this.camera.height;
        
        var cityHeight = this.cache.getImage('city').height;
        var treesHeight = this.cache.getImage('trees').height;
        var groundHeight = this.cache.getImage('ground').height;

        var cityY = cameraHeight - cityHeight - groundHeight;
        var treesY = cameraHeight - groundHeight - treesHeight;
        var groundY = cameraHeight - groundHeight;

        this.city = this.add.tileSprite(0, cityY, cameraWidth, cityHeight, 'city');
        this.trees = this.add.tileSprite(0, treesY, cameraWidth, treesHeight, 'trees');

        this.obstaclesGroup = this.game.add.group();
        this.obstaclesGroup.enableBody = true;

        this.obstaclesManager = new BasicGame.ObstaclesManager(this, this.obstaclesGroup);

        this.obstaclesManager.create();

        this.ground = this.add.tileSprite(0, groundY, cameraWidth, groundHeight, 'ground');
        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;

        this.player = new BasicGame.Player(this);
        this.player.create();
    },

    update: function () {

        this.ground.tilePosition.x += BasicGame.Obstacle.velocity;
        this.trees.tilePosition.x += BasicGame.Obstacle.velocity / 4.0;
        this.city.tilePosition.x += BasicGame.Obstacle.velocity / 8.0;

        this.obstaclesManager.update();

        this.player.update();

        this.handleCollision();
    },

    handleCollision: function () {
        if (this.physics.arcade.collide(this.player.sprite, this.ground) ||
            this.physics.arcade.overlap(this.player.sprite, this.obstaclesGroup)) {

            this.player.onPlayerCollided();
            BasicGame.Obstacle.velocity = 0.0;
        }
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start ('MainMenu');
    }
};