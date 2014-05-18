(function (app_container) {
    
    function Gameplay() {
        this.player = null;
        this.bg = null;
        this.fg = null;
        this.enemies = null;
        this.timer = null;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.bg = this.game.add.tileSprite(0, 0, this.game.stage.bounds.width, 600, 'bg');
            this.fg = this.game.add.tileSprite(0, this.game.height -224, this.game.stage.bounds.width, 224, 'fg');

            this.player = this.game.add.sprite(100, this.game.height/2, 'player');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.body.gravity.y = 1000;
            this.player.body.collideWorldBounds = true;

            this.enemies = this.game.add.group();
            this.enemies.createMultiple(20, 'enemy');

            this.timer = this.game.time.events.loop(1500, this.addEnemy, this);
        },

        update: function() {
            if (!this.player.exists) {
                return;
            }

            this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

            if (this.player.y == 0 || this.player.y == (this.game.height - this.player.height)) {
                this.restart();
            }

            this.handleKeyDown();

            this.bg.tilePosition.x -= 1;
            this.fg.tilePosition.x -= 20;
        },

        addEnemy: function () {
            var enemy = this.enemies.getFirstDead();

            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

            enemy.scale.set(0.5, 0.5);
            enemy.reset(this.game.width, Math.round(Math.random() * (this.game.height - 100)));
            enemy.body.velocity.x = -700;
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
        },

        restart: function () {
            this.game.time.events.remove(this.timer);  

            this.player.kill();

            var self = this;

            setTimeout(function () {
                self.game.state.start('Gameplay');
            }, 3000);
        },

        handleKeyDown: function() {
            if (this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)) {
                this.player.body.velocity.y = -400;
            } 
        },
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));