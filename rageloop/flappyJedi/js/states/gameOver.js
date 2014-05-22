(function (app_container) {
    
    function Gameover() {

        this.score = 0;

    };

    Gameover.prototype = {

        create: function () {
            //this.stage.backgroundColor = '#ccc';
            this.bg = this.game.add.tileSprite(0, 0, this.game.stage.bounds.width, 600, 'bg');
            this.fg = this.game.add.tileSprite(0, this.game.height -224, this.game.stage.bounds.width, 224, 'fg');
            
            // animate player dying
            this.player = this.game.add.sprite(app_container.player_posX, app_container.player_posY, 'player');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.gravity.y = 1000;
            this.player.body.collideWorldBounds = true;

            this.replaybutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY+100, 'replaybtn', this.onPlayClick, this);
            this.replaybutton.anchor.set(0.5, 0.5);
            
            // game over logo
            this.gameoverlogo = this.game.add.button(this.game.world.centerX, this.game.world.centerY-50, 'gameover');
            this.gameoverlogo.anchor.set(0.5, 0.5);

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