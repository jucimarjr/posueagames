var Phase2 = {};

Phase2.World = {
    background : null,
    floor : null,
    init : function () {
        this.game.load.image('bg1fase2', 'assets/phase2/map/bg1fase2_15000-1080.jpg');
        this.game.load.image('floorfase2', 'assets/phase2/map/floorfase2_1500-172.jpg');
    },
    create : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase2');
        this.floor = this.game.add.sprite(0, 908, 'floorfase2');
    }
}