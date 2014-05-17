(function (app_container) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            this.game.load.image('bg', 'assets/bg_960-600.png');
            this.game.load.image('platmaior', 'assets/platmaior_960-70.png');
            this.game.load.image('platmenor', 'assets/platmenor_510-61.png');
            this.game.load.image('escada', 'assets/escada_41-95.png');
            this.game.load.image('doll', 'assets/doll_75-116.png');
            this.game.load.image('trofeu', 'assets/trofeu_183-82.png');
            this.game.load.image('bomb', 'assets/bomb_46-54.png');
        },
        create: function () {},
        update: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Preload = Preload;

}(window.app_container = window.app_container || {}));