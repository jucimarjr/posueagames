(function (app_container) {
    
    function Gameover() {

        this.bg = null;
        this.score = 0;
        this.player = null;
        this.replaybutton = null;
        this.smokeEmitter = null;

        this.playerDestroyTimer = null;

    };

    Gameover.prototype = {

        create: function () {

            //this.stage.backgroundColor = '#ccc';
            this.bg = this.game.add.image(0, 0, 'gameoverbg');

            // animate player dying
            this.player = this.game.add.sprite(app_container.player_posX, app_container.player_posY, 'player');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.gravity.y = 1000;
            this.player.body.velocity.x = 500;
            this.player.body.bounce.set(0, 0.3);
            this.player.body.collideWorldBounds = true;

            // add smoke particles
            this.smokeEmitter = this.game.add.emitter(0, 0, 100);
            this.smokeEmitter.gravity = 0;
            this.smokeEmitter.setXSpeed(-15, 15);
            this.smokeEmitter.setYSpeed(-80, -50);

            this.smokeEmitter.setAlpha(1, 0, 3000, Phaser.Easing.Linear.InOut);
            this.smokeEmitter.makeParticles('smoke');
            this.smokeEmitter.start(false, 3000, 50);

            this.player_explosion = this.game.add.sprite(0, 0, 'enemy_explosion');
            this.player_explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
            this.player_explosion.visible = false;

            this.replaybutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY+100, 'replaybtn', this.onPlayClick, this,  1, 0, 1);
            this.replaybutton.anchor.set(0.5, 0.5);
            
            // game over logo
            /*this.gameoverlogo = this.game.add.button(this.game.world.centerX, this.game.world.centerY-50, 'gameover');
            this.gameoverlogo.anchor.set(0.5, 0.5);*/

            this.score = app_container.last_score;
            UserData.highscore.set(this.score);

            var style = { font: "36px Starjedi", fill: "#f3b40b", align: "center" };
            this.highscore = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "Your score: " + this.score, style);
            this.highscore.anchor.set(0.5);

            var self = this;
            this.playerDestroyTimer = setTimeout(function() {
                self.playerDestroy();
            }, 2000);

        },

        update: function() {
            var self = this;

            this.smokeEmitter.x = this.player.x;
            this.smokeEmitter.y = this.player.y + 56;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.onPlayClick();
            }
        },

        playerDestroy: function() {

            console.log("playerDestroy");

            this.player.kill();

            this.smokeEmitter.on = false;;

            this.player_explosion.x = this.player.x;
            this.player_explosion.y = this.player.y;

            this.player_explosion.visible = true;
            this.player_explosion.animations.play('explosion', 20, false, true);

        },

        onPlayClick: function() {
            clearTimeout(this.playerDestroyTimer);
            this.game.state.start('Gameplay');
        }
    };

    app_container.Gameover = Gameover;

}(window.app_container = window.app_container || {}));