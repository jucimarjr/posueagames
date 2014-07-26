(function (app_container) {

    function EnemyFactory(game, player) {
        this.game = game;
        this.player = player;
        this.sprites = null;
        this.shurikens = null;
        this.shurikenTimer = 0;
        this.shurikenAudio = null;
    }

    EnemyFactory.prototype = {
        preload: function () {
            
        },

        create: function () {
            this.sprites = this.game.add.group();

            this.shurikens = this.game.add.group();
            this.shurikens.createMultiple(10, 'shuriken_enemy');
            this.shurikens.setAll('anchor.x', 0.5);
            this.shurikens.setAll('anchor.y', 0.5);

            this.shurikenAudio = this.game.add.audio('shuriken_sound');
            this.shurikenAudio.volume = 0.6;

            this.shurikenAudio.addMarker('throw', 0, 0.5);
            this.shurikenAudio.addMarker('hit', 0.5, 0.5);
        },

        update: function() {
            this.sprites.forEachAlive(this.updatesprites, this);
        },

        createNinja: function (x, y) {
            var enemy = this.sprites.create(x, y, 'ninjas');

            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.gravity.y = 1200;
            enemy.body.collideWorldBounds = true;
            enemy.scale.x *= -1;

            enemy.animations.add('idle', [72, 73, 74, 75], 4, true);
            enemy.animations.add('walk', [8, 9, 10, 11], 4, true);
            enemy.animations.add('dash', [39, 40], 4, true);

            return enemy;
        },

        createNinjaIdle: function (x, y) {
            var enemy = this.createNinja(x, y);
            enemy.type = 'idle';
            enemy.animations.play('idle');
        },

        createNinjaWalker: function (x, y) {
            var enemy = this.createNinja(x, y);
            enemy.type = 'walker';
            enemy.animations.play('walk');
            enemy.body.velocity.x = -150;
        },

        createNinjaDash: function (x, y) {
            var enemy = this.createNinja(x, y);
            enemy.type = 'dasher';
            enemy.animations.play('dash');
            enemy.body.velocity.x = -300;
        },

        updatesprites: function (enemy) {

            if (enemy.type == 'idle') {
                if ((this.player.sprite.x < enemy.x && enemy.scale.x > 0) || (this.player.sprite.x > enemy.x && enemy.scale.x < 0)) {
                    enemy.scale.x *= -1; //move enemy to always front the player
                }

                //fire if player is near
                if ((Math.abs(this.player.sprite.x - enemy.x) < 400) && (Math.abs(this.player.sprite.y - enemy.y) < 300)) {
                    if (this.game.time.now > this.shurikenTimer + 1500) {
                        this.enemyFire(enemy);
                        this.shurikenTimer = this.game.time.now;
                    }
                }
            }
            if (enemy.type == 'walker') {
                if (enemy.body.blocked.left || enemy.body.blocked.right) {
                    enemy.scale.x *= -1;
                    enemy.body.velocity.x = (enemy.scale.x > 0) ? 150 : -150;
                }
            }
            if (enemy.type == 'dasher') {
                if (enemy.body.blocked.left || enemy.body.blocked.right) {
                    enemy.scale.x *= -1;
                    enemy.body.velocity.x = (enemy.scale.x > 0) ? 300 : -300;
                }
            }
        },

        enemyFire: function (enemy) {
            var shuriken = this.shurikens.getFirstDead();

            if (!shuriken) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.reset(enemy.x + enemy.width, enemy.y);
            shuriken.body.velocity.x = (enemy.scale.x > 0) ? 700 : -700;
            shuriken.body.angularVelocity = (enemy.scale.x > 0) ? 700 : -700;
            shuriken.scale.set(0.8, 0.8);
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            this.shurikenAudio.play('throw');

            return true;
        }
    };

    window.EnemyFactory = EnemyFactory;

}(window.app_container = window.app_container || {}));