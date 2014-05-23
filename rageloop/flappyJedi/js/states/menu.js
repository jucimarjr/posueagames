(function (app_container) {
    
    function Menu() {
        this.bg = null;
    };

    Menu.prototype = {

        create: function () {
            //this.stage.backgroundColor = '#ccc';
            this.bg = this.game.add.tileSprite(0, 0, this.game.stage.bounds.width, 600, 'menubg');

            this.title = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 80, 'menuTitle');
            this.title.anchor.set(0.5, 0.5);

            this.playbutton = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY + 50, 'playbtn', this.onPlayClick, this, 1, 0, 1);
            this.playbutton.anchor.set(0.5, 0.5);

            var style = { font: "36px Starjedi", fill: "#f3b40b"};
            this.highscore = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 130, "Record: " + UserData.highscore.get(), style);
            this.highscore.anchor.set(0.5);

        },

        update: function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.onPlayClick();
            }

            this.bg.tilePosition.x -= 1;

        },

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));
