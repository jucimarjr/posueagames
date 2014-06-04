function Panel(game) {
    this.game = game;
}

Panel.prototype = {
    preload : function() {
        this.game.load.image('weapon1', 'assets/images/weapon/arma1.jpg');
        this.game.load.image('weapon2', 'assets/images/weapon/arma2.jpg');
        this.game.load.image('weapon3', 'assets/images/weapon/arma3.png');
    },

    create : function() {
        arma1 = game.add.sprite(10, 10, 'weapon1');
        arma2 = game.add.sprite(70, 10, 'weapon2');
        arma3 = game.add.sprite(130, 10, 'weapon3');

        arma1.fixedToCamera = true;
        arma2.fixedToCamera = true;
        arma3.fixedToCamera = true;
    },

    update : function() {
    }
}