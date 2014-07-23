(function (app_container) {
    
    function EndScene() {};

    EndScene.prototype = {

        create: function () {

            this.game.add.sprite(0, 0, 'end_scene');

            var style = { font: "22px pixelFont", fill: "#ffffff"};

            var skipText = this.game.add.text(this.game.width, this.game.height, 'pressione "S" para sair.', style); 
            skipText.anchor.setTo(1, 1);

        },

        update: function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.onResetClick();
            }

        },

        onResetClick: function() {
            this.game.state.start('Menu');
        }
    };

    app_container.EndScene = EndScene;

}(window.app_container = window.app_container || {}));