var Phase1_test = {};

Phase1_test.World = {
    mymap : null,
    background : null,
    foreground : null,
    init : function() {
        this.game.load.image('bg1fase1_test', 'assets/phase1/images/bg1fase1_3000-2000.jpg');
        this.game.load.tilemap('map1_test', 'assets/phase1/map.json', null, Phaser.Tilemap.TILED_JSON);
    },
    createWorld : function() {
        this.game.world.setBounds(0, 0, 3000, 2000);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;

        this.mymap = this.game.add.tilemap('map1_test');
    },
    createBackground : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase1_test');
    },
    createForeground : function() {
    },
    createObjects : function() {
    },
    collision : function(player) {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    }
}