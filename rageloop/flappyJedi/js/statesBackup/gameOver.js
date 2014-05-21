(function (app_container) {
    
    function Gameover() {

        this.score = 0;

    };

    Gameover.prototype = {

        create: function () {
            this.stage.backgroundColor = '#ccc';

            this.playbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'playbtn', this.onPlayClick, this);
            this.playbutton.anchor.set(0.5, 0.5);

            this.score = app_container.last_score;
            UserData.highscore.set(this.score);

            var style = { font: "40px Arial", fill: "#000000", align: "center" };
            this.highscore = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "Your score: " + this.score, style);
            this.highscore.anchor.set(0.5);

        },

        update: function() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                this.onPlayClick();
            }
        },

        onPlayClick: function() {
            this.game.state.start('Gameplay');
        }
    };

    app_container.Gameover = Gameover;

}(window.app_container = window.app_container || {}));