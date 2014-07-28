var Phase3 = {}

Phase3.World = {
    mymap : null,
    background : null,
    foreground : null,
    init : function() {
        this.game.load.image('bg1fase3', 'assets/phase3/map/bg1fase3_8000-1080.jpg');
        this.game.load.image('bg2fase3', 'assets/phase3/map/bg2fase3_8000-1080.png');
        this.game.load.tilemap('map3', 'assets/phase3/map.json', null, Phaser.Tilemap.TILED_JSON);
    },
    createWorld : function() {
        this.game.world.setBounds(0, 0, 8000, 1080);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;

        this.mymap = this.game.add.tilemap('map3');
        mapLayer = this.mymap.createLayer('map');
    },
    createBackground : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase3');
        //this.game.stage.backgroundColor = '#007236';
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase3');
    },
    createObjects : function() {
    },
    collision : function() {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    }
}