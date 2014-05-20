(function (app_container) {
    
    function Gameplay() {
        this.isStarted = false;
        this.score = 0;
        this.player = null;
        this.bg = null;
        this.fg = null;
        this.enemies = null;
        this.timer = null;
        this.bullets = null;
        this.bulletTimer = null;
    };

    Gameplay.prototype = {

        create: function () {

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.bg = this.game.add.tileSprite(0, 0, this.game.stage.bounds.width, 600, 'bg');
            this.fg = this.game.add.tileSprite(0, this.game.height -224, this.game.stage.bounds.width, 224, 'fg');

            this.player = this.game.add.sprite(100, this.game.height/2, 'player');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.body.collideWorldBounds = true;

            this.player_tween = this.game.add.tween(this.player).to( { y: 200 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            this.enemies = this.game.add.group();
            this.enemies.createMultiple(20, 'enemy');

            this.bullets = this.game.add.group();
            this.bullets.createMultiple(10, 'bullet');
            this.bullets.setAll('anchor.x', 0.5);
            this.bullets.setAll('anchor.y', 0.5);
            this.bullets.setAll('outOfBoundsKill', true);

            this.timer = this.game.time.events.loop(700, this.addEnemy, this);

            var style = { font: "40px Arial", fill: "#000000", align: "center" };
            this.score_text = this.game.add.text(this.game.world.centerX, 0, "Score: " + this.score, style);
            this.score_text.anchor.set(0.5, 0);
        },

        update: function() {
            if (!this.player.exists) {
                return;
            }

            this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
            this.game.physics.arcade.overlap(this.bullets, this.enemies, this.killEnemy, null, this);

            if (this.player.y == 0 || this.player.y == (this.game.height - this.player.height)) {
                this.restart();
            }

            this.handleKeyDown();

            this.bg.tilePosition.x -= 1;
            this.fg.tilePosition.x -= 20;
        },

        update_score: function() {

            if (this.score_text) {
                this.score_text.setText("Score: " + this.score);
            }
        },

        start: function() {

            this.isStarted = true;
            this.player.body.gravity.y = 1000;

            this.player_tween.pause();
        },

        addEnemy: function () {

            if (!this.isStarted) {
                return;
            }

            var enemy = this.enemies.getFirstDead();

            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

            enemy.scale.set(0.5, 0.5);
            enemy.reset(this.game.width, Math.round(Math.random() * (this.game.height - 100)));
            enemy.body.velocity.x = -700;
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
        },

        fireBullet: function () {
            if (this.bulletTimer) {
                return;
            }

            var bullet = this.bullets.getFirstDead();

            if (!bullet) {
                return;
            }

            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

            bullet.scale.set(0.5, 0.5);
            bullet.reset(this.player.x + this.player.width, this.player.y + this.player.height -25);
            bullet.body.velocity.x = 1000;
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            var self = this;
            this.bulletTimer = setTimeout(function () {
                clearTimeout(self.bulletTimer);
                self.bulletTimer = null;
            }, 300);
        },

        killEnemy: function (bullet, enemy) {

            this.score += 1;
            this.update_score();

            bullet.kill();
            enemy.kill();
        },

        restart: function () {

            this.isStarted = false;

            this.game.time.events.remove(this.timer);

            this.player.kill();

            var self = this;

            // store the last score to access it in game over view.
            app_container.last_score = this.score;

            //reset score.
            this.score = 0;

            // call game over view
            this.game.state.start('Gameover');

            /*setTimeout(function () {
                self.game.state.start('Gameplay');
            }, 3000);*/
        },

        handleKeyDown: function() {
            if (this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)) {
                
                if (!this.isStarted) {
                    this.start();
                }

                this.player.body.velocity.y = -400;
            }

            if (this.game.input.keyboard.isDown (Phaser.Keyboard.ENTER)) {
                if(this.isStarted) {
                    this.fireBullet();
                }
            } 
        },
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));