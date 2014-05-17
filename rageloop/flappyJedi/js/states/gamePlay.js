(function (app_container) {
    
    function Gameplay() {
        this.player = null;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            this.player = this.game.add.sprite(200, this.game.height/2, 'bike');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.anchor.set(0.5, 0.5);
            this.player.body.gravity.y = 1000;
            this.player.body.collideWorldBounds = true;
            //this.player.animations.add('walk', [0,1], 6, true);
        },

        update: function() {
            this.handleKeyDown();
        },

        handleKeyDown: function() {
            if (this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)) {
                
                //this.player.animations.stop();
                //this.player.frame = 0;
                
                this.player.body.velocity.y = -400;
            } 
        },
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));