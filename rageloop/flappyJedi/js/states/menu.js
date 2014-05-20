(function (app_container) {
    
    function Menu() {};

    Menu.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';

            this.playbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'playbtn', this.onPlayClick, this);
            this.playbutton.anchor.set(0.5, 0.5);
        },

        update: function() {},

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));