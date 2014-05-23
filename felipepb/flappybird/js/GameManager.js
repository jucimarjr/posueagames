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

    this.player;
    this.missions;
    this.backgroundManager;
};

BasicGame.GameManager.debugDraw = true;
BasicGame.GameManager.pixelsToUnit = 80;
BasicGame.GameManager.jumpForce = -5 * BasicGame.GameManager.pixelsToUnit;
BasicGame.GameManager.gravity = 9.8 * BasicGame.GameManager.pixelsToUnit;

BasicGame.GameManager.prototype = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = BasicGame.GameManager.gravity;

        // this.backgroundManager = new BasicGame.BackgroundManager(this);
        // this.backgroundManager.create();

        // this.obstaclesGroup = this.game.add.group();
        // this.obstaclesGroup.enableBody = true;

        // this.obstaclesManager = new BasicGame.ObstaclesManager(this, this.obstaclesGroup);
        // this.obstaclesManager.create();

        this.player = new BasicGame.Player(this);
        this.player.create();

        this.missions = new BasicGame.Missions();

        for (var i = 0; i < 500; i++) {
            this.missions.nextEventIndex();
        };
    },

    update: function () {
        // this.backgroundManager.update();
        // this.obstaclesManager.update();

        this.player.update();

        // this.handleCollision();
    },

    handleCollision: function () {
        if (this.physics.arcade.collide(this.player.sprite, this.ground) ||
            this.physics.arcade.overlap(this.player.sprite, this.obstaclesGroup)) {

            this.player.onPlayerCollided();
            BasicGame.Obstacle.velocity = 0.0;
        }
    },

    render: function () {
        // if (this.player.sprite.body.renderDebug) {
        //     console.log('draw');
        //     this.player.sprite.body.renderDebug(this.game.context, this.player.sprite.body, "red", true);
        // }
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start ('MainMenu');
    }
};