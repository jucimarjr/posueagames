Game.GameState = function () {

    this.map;
    this.layer;

    this.player;
};

Game.GameState.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#2d2d2d';

        this.setupPhysicsSystem();
        this.createTileMap();
        this.createPlayer();
    },

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = PhysicsConsts.gravity;
    },

    createTileMap: function () {
        this.map = this.game.add.tilemap('map');
        
        this.map.addTilesetImage('ground_1x1');
        this.map.addTilesetImage('walls_1x2');
        this.map.addTilesetImage('tiles2');

        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();

        this.map.setCollisionBetween(0, 25);
    },

    createPlayer: function () {
        this.player = new Game.PlayerController(this);
        this.player.create();
    },

    update: function () {
        this.game.physics.arcade.collide(this.layer, this.player.sprite);
        this.player.update();
    },

    registerBody: function (sprite) {
        this.game.physics.arcade.enableBody(sprite, PhysicsConsts.debugDraw);
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

    clamp: function (x, min, max) {
        return x < min ? min : (x > max ? max : x);
    }
};