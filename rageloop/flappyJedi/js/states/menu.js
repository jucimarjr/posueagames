(function (app_container) {
    
    function Menu() {};

    Menu.prototype = {

        create: function () {
            //this.stage.backgroundColor = '#ccc';

            this.game.add.image(0, 0, 'menubg');

            this.playbutton = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY + 130, 'playbtn', this.onPlayClick, this, 1, 0, 1);
            this.playbutton.anchor.set(0.5, 0.5);

            var style = { font: "36px Starjedi", fill: "#f3b40b"};
            this.highscore = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 210, "Record: " + UserData.highscore.get(), style);
            this.highscore.anchor.set(0.5);

        },

        update: function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                this.onPlayClick();
            }

        },

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));
