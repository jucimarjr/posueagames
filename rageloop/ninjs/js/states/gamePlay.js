(function (app_container) {

    function Gameplay() {
    	this.bg = null;
        this.map = null;
        this.layer = null;
        this.player = null;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Game.ARCADE);
            this.game.physics.arcade.gravity.y = 800;

            //var bg = this.game.add.tileSprite(0, 0, 1920, 600, 'fundo');
            //bg.fixedToCamera = true;

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('map', 'tileset');

            this.layer = this.map.createLayer('game_layer');
            this.layer.resizeWorld();
            this.map.setCollisionBetween(1, 10, true, 'game_layer');

            this.player = this.game.add.sprite(40, 2600, 'ninja');

            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.scale.set(2, 2);
            this.player.anchor.setTo(0.5, 0.5);
            this.player.body.gravity.y = 500;
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('idle', [0, 1, 2], 4, true);
            this.player.animations.add('walk', [0, 1, 2], 8, true);//FIXME: Create a walk animation
            this.player.animations.play('idle');

            this.game.camera.follow(this.player);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.handleKeyDown();
        },

        turnLeft: function() {
            if (this.player.scale.x > 0) {
                this.player.scale.x *= -1;
            }
        },

        turnRight: function() {
            if (this.player.scale.x < 0) {
                this.player.scale.x *= -1;
            }
        },

        handleKeyDown: function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('walk');
                this.turnRight();
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('walk');
                this.turnLeft();
            } else {
                this.player.body.velocity.x = 0;
                this.player.animations.play('idle');
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                if (this.player.body.onFloor()) {
                    this.player.animations.stop();
                    this.player.frame = 0;
                    this.player.body.velocity.y = -700;
                }
            }
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));