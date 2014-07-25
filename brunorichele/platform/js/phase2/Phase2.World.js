var Phase2 = {};

Phase2.World = {
    mymap : null,
    background : null,
    foreground : null,
    init : function() {
        this.game.load.image('bg1fase2', 'assets/phase2/map/bg1fase2_15000-1080.jpg');
        this.game.load.image('bg2fase2', 'assets/phase2/map/bg2fase2_15000-1080.png');
        this.game.load.tilemap('map2', 'assets/phase2/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('post', 'assets/phase3/map/poste_2985-496-5.png', 597, 496);
    },
    createWorld : function() {
        this.game.world.setBounds(0, 0, 15000, 1080);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;

        this.mymap = this.game.add.tilemap('map2');
        mapLayer = this.mymap.createLayer('map');
    },
    createBackground : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase2');
        //this.game.stage.backgroundColor = '#007236';
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase2');
    },
    createObjects : function() {
        posts = this.game.add.group();
        posts.enableBody = true;
        this.mymap.createFromObjects('objects', 3, 'post', 0, true, false, posts)

        posts.callAll('animations.add', 'animations', 'move', [0, 1, 2, 3, 4], 6, true);
        posts.callAll('animations.play', 'animations', 'move');
    },
    collision : function(player) {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    }
}