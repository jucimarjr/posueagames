(function (app_container) {

    function Gameplay() {
    	this.bg = null;
        this.map = null;
        this.layer = null;
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

            this.player = this.game.add.sprite(40, 2600, 'saci');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.gravity.y = 500;
            this.player.scale.set(0.5,0.5);
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('walk', [0,1], 6, true);
            this.game.camera.follow(this.player);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.handleKeyDown();
        },

        handleKeyDown: function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
                this.player.x += 10;
                this.player.animations.play('walk');
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.x -= 10;
                this.player.animations.play('walk');
            } else {
                this.player.animations.stop();
                this.player.frame = 0;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                if (this.player.body.onFloor()) {
                    this.player.animations.stop();
                    this.player.frame = 0;
                    this.player.body.velocity.y = -600;
                }
            }
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));