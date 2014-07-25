var Phase2 = {};

Phase2.World = {
    background : null,
    foreground : null,
    floor : null,
    init : function() {
        this.game.load.image('bg1fase2', 'assets/phase2/map/bg1fase2_15000-1080.jpg');
        this.game.load.image('bg2fase2', 'assets/phase2/map/bg2fase2_15000-1080.png');
        this.game.load.image('floorfase2', 'assets/phase2/map/floorfase2_1500-172.jpg');
    },
    createBackground : function() {
        this.game.world.setBounds(0, 0, 15000, 1080);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;

        this.background = this.game.add.sprite(0, 0, 'bg1fase2');
        this.floor = this.game.add.sprite(0, 998, 'floorfase2');
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase2');
    },
    collision : function(player) {
        /*var spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial', player.body);
        var worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');

        this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);*/

        this.game.physics.p2.enable(this.floor);
        this.floor.body.static = true;
        this.floor.body.fixedRotation = true;
        /*this.floor.body.setMaterial(spriteMaterial);

        var contactMaterial = this.game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

        contactMaterial.friction = 0.0;
        contactMaterial.restitution = 0.0;
        contactMaterial.stiffness = 1e7;
        contactMaterial.relaxation = 0;
        contactMaterial.frictionStiffness = 1e7;
        contactMaterial.frictionRelaxation = 3;
        contactMaterial.surfaceVelocity = 0.0;*/
    }
}