BasicGame.GameState = function () {

    this.map;
    this.layer;

    this.player;

};

BasicGame.GameState.debugDraw = true;
BasicGame.GameState.pixelsToUnit = 80;
BasicGame.GameState.gravity = 9.8 * BasicGame.GameState.pixelsToUnit;

BasicGame.GameState.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#2d2d2d';

        this.setupPhysicsSystem();
        this.createTileMap();
        this.createPlayer();
    },

    setupPhysicsSystem: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = BasicGame.GameState.gravity;
    },

    createTileMap: function () {
        this.map = this.game.add.tilemap('map');
        
        this.map.addTilesetImage('ground_1x1');
        this.map.addTilesetImage('walls_1x2');
        this.map.addTilesetImage('tiles2');

        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();

        this.map.setCollisionBetween(1, 25);

        var bodies = this.game.physics.p2.convertTilemap(this.map, this.layer);

        for (var i = 0; i < bodies.length; i++) {
            bodies[i].debug = BasicGame.GameState.debugDraw;
        };

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
    },

    createPlayer: function () {
        this.player = new BasicGame.PlayerController(this);
        this.player.create();
    },

    update: function () {

    },

    registerBody: function (sprite) {
        this.game.physics.p2.enableBody(sprite, BasicGame.GameState.debugDraw);
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