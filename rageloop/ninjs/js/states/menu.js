(function (app_container) {
    
    function Menu() {};

    Menu.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';

            this.game.add.sprite(0, 0, 'menu_bg');

            this.startbutton = this.game.add.button(this.game.world.centerX - 120, this.game.world.centerY + 150, 'start_btn', this.onPlayClick, this, 0, 1, 0);
            this.startbutton.anchor.set(0.5, 0.5);

            this.resetbutton = this.game.add.button(this.game.world.centerX + 120, this.game.world.centerY + 150, 'reset_btn', this.onResetClick, this, 1, 0, 1);
            this.resetbutton.anchor.set(0.5, 0.5);

        },

        update: function() {},

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        },

        onResetClick: function() {
            //this.game.state.start('Gameplay');
        },
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));