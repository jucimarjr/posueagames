(function (app_container) {
    
    function Gameover() {};

    Gameover.prototype = {

        create: function () {

            this.game.add.sprite(0, 0, 'menu_bg');

            this.restartbutton = this.game.add.button(360,  460, 'start_btn', this.onPlayClick, this, 0, 1, 0);
            this.restartbutton.anchor.set(0.5, 0.5);

            this.menubutton = this.game.add.button(610, 460, 'reset_btn', this.onResetClick, this, 1, 0, 1);
            this.menubutton.anchor.set(0.5, 0.5);

        },

        update: function() {},

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        },

        onResetClick: function() {
            this.game.state.start('Menu');
        }
    };

    app_container.Gameover = Gameover;

}(window.app_container = window.app_container || {}));