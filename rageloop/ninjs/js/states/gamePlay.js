(function (app_container) {

    function Gameplay() {
    	this.bg = null;
        this.map = null;
        this.layer = null;
        this.player = null;
        this.shurikens = null;
        this.shurikenTimer = null;
        this.shurikenDelay = 400;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Game.ARCADE);

            //var bg = this.game.add.tileSprite(0, 0, 1920, 600, 'fundo');
            //bg.fixedToCamera = true;

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('map', 'tileset');

            this.layer = this.map.createLayer('game_layer');
            this.layer.resizeWorld();
            this.map.setCollisionBetween(1, 10, true, 'game_layer');

            this.shurikens = this.game.add.group();
            this.shurikens.createMultiple(10, 'shuriken');
            this.shurikens.setAll('anchor.x', 0.5);
            this.shurikens.setAll('anchor.y', 0.5);

            this.player = this.game.add.sprite(40, 2600, 'ninja');

            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.scale.set(2, 2);
            this.player.anchor.setTo(0.5, 0.5);
            this.player.body.gravity.y = 1200;
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('idle', [0, 1, 2], 4, true);
            this.player.animations.add('walk', [0, 1, 2], 8, true);//FIXME: Create a walk animation
            this.player.animations.play('idle');

            this.game.camera.follow(this.player);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.overlap(this.shurikens, this.layer, this.shurikenCollision, null, this);
            this.handleKeyDown();
        },

        fire: function () {
            var shuriken = this.shurikens.getFirstDead();

            if (!shuriken || this.shurikenTimer) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.scale.set(1.5, 1.5);
            shuriken.reset(this.player.x + this.player.width, this.player.y);
            shuriken.body.velocity.x = (this.player.scale.x > 0) ? 1000 : -1000;
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            this.startShurikenTimer();

            return true;
        },

        startShurikenTimer: function () {
            var self = this;
            this.shurikenTimer = setTimeout(function () {
                clearTimeout(self.shurikenTimer);
                self.shurikenTimer = null;
            }, this.shurikenDelay);
        },

        shurikenCollision: function (shuriken, layer) {
            shuriken.kill();
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
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('walk');
                this.turnLeft();
            }

            if (!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.player.body.velocity.x = 0;
                this.player.animations.play('idle');
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.fire();
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