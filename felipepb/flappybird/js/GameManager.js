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
    this.hud;

    this.playerCollisionGroup;
    this.obstaclesCollisionGroup;

    this.distanceTravelled = 0;
};

BasicGame.GameManager.debugDraw = false;
BasicGame.GameManager.pixelsToUnit = 80;
BasicGame.GameManager.thrusterForce = -20 * BasicGame.GameManager.pixelsToUnit;
BasicGame.GameManager.gravity = 9.8 * BasicGame.GameManager.pixelsToUnit;

BasicGame.GameManager.lastRunStats = {  } // mission, distanceTravelled

BasicGame.GameManager.prototype = {

    create: function () {
        this.missions = new BasicGame.Missions();

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = BasicGame.GameManager.gravity;

        this.backgroundManager = new BasicGame.BackgroundManager(this);
        this.backgroundManager.create();

        // this.obstaclesGroup = this.game.add.group();

        this.obstaclesCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.obstaclesManager = new BasicGame.ObstaclesManager(this, this.obstaclesGroup);
        this.obstaclesManager.create();

        this.hud = new BasicGame.HUD(this);
        this.hud.create();
        this.hud.setStatus(this.missions.currentPeriod().name);

        this.player = new BasicGame.Player(this);
        this.player.create();

        this.game.physics.p2.setPostBroadphaseCallback(this.handleCollision, this);
    },

    update: function () {
        this.backgroundManager.update();
        this.obstaclesManager.update();
        this.player.update();

        if (!this.player.isDead) {
            var velocity = -BasicGame.Obstacle.velocity;
            var factor = BasicGame.GameManager.pixelsToUnit;
            this.distanceTravelled += velocity / factor;
        } else if (this.player.deathAnimComplete) {
            this.state.start('EndGame', false);
        }

        this.hud.setScore(this.distanceTravelled);
    },

    handleCollision: function (body1, body2) {

        // console.log('handle collision');

        if ((body1.sprite.name === 'player' && body2.sprite.name === 'obstacle') ||
            (body1.sprite.name === 'obstacle' && body2.sprite.name === 'player')) {

            BasicGame.Obstacle.velocity = 0;
            this.player.onPlayerCollided();
            BasicGame.GameManager.lastRunStats.mission = this.missions;
            BasicGame.GameManager.lastRunStats.distanceTravelled = this.distanceTravelled;

        } else if ((body1.sprite.name === 'player' && this.stringContains(body2.sprite.name, 'trigger'))) {
            this.onPlayerCollidedWithTrigger(body2.sprite);
        } else if ((this.stringContains(body1.sprite.name, 'trigger') && body2.sprite.name === 'player')) {
            this.onPlayerCollidedWithTrigger(body1.sprite)
        } else {
            return false;
        }

        return true;
    },

    onPlayerCollidedWithTrigger: function (sprite) {
        this.hideSprite(sprite);

        if (this.stringContains(sprite.name, 'unique_event'))
            this.hud.setStatus(this.missions.currentPeriod().name);

        if (!sprite.body.trigered)
            this.missions.computeEvent(sprite.body.missionEvent);

        sprite.body.trigered = true;
    },

    hideSprite: function (sprite) {
        sprite.scale.x = 0.0;
        sprite.scale.y = 0.0;
    },

    showSprite: function (sprite) {
        sprite.scale.x = 1.0;
        sprite.scale.y = 1.0;
    },

    stringContains: function (str, content) {
        return str.indexOf(content) > -1;
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start ('MainMenu');
    }
};