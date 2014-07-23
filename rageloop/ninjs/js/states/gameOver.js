(function (app_container) {
    
    function Gameover() {};

    Gameover.prototype = {

        create: function () {

            this.game.add.sprite(0, 0, 'gameover_bg');

            this.restartbutton = this.game.add.button(360,  460, 'start_btn', this.onPlayClick, this, 0, 1, 0);
            this.restartbutton.anchor.set(0.5, 0.5);

            this.menubutton = this.game.add.button(610, 460, 'menu_btn', this.onMenuClick, this, 1, 0, 1);
            this.menubutton.anchor.set(0.5, 0.5);

            this.clickAudio = this.game.add.audio('click');

            this.bgSound = this.game.add.audio('gameoversound');
            this.bgSound.volume = 0.8;
            this.bgSound.play();
        },

        update: function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.onPlayClick();
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)) {
                this.onMenuClick();
            }

        },

        onPlayClick: function() {
            this.bgSound.stop();
            this.clickAudio.play();
            this.game.state.start(window.app_container.currentLevel);
        },

        onMenuClick: function() {
            this.bgSound.stop();
            this.clickAudio.play();
            this.game.state.start('Menu');
        }
    };

    app_container.Gameover = Gameover;

}(window.app_container = window.app_container || {}));