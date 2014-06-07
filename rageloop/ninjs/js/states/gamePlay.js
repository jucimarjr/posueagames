(function (app_container) {

    function Gameplay() {
    	this.bg = null;
        this.map = null;
        this.layer = null;
        this.player = null;

        this.shurikens = null;
        this.shurikenTimer = null;
        this.shurikenDelay = 400;

        //enemies
        this.enemies = null;
        this.enemyShurikens = null;
        this.enemyFireTimer = 0;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Game.ARCADE);

            //var bg = this.game.add.tileSprite(0, 0, 1920, 600, 'fundo');
            //bg.fixedToCamera = true;

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('background', 'tileset');

            this.layer = this.map.createLayer('layer');
            this.layer.resizeWorld();
            this.map.setCollisionBetween(0, 10, true, 'layer');

            this.shurikens = this.game.add.group();
            this.shurikens.createMultiple(10, 'shuriken');
            this.shurikens.setAll('anchor.x', 0.5);
            this.shurikens.setAll('anchor.y', 0.5);

            this.enemies = this.game.add.group();
            this.createEnemyIdle(40*26, 40*38);
            this.createEnemyIdle(40*51, 40*38);
            this.createEnemyWalker(40*37, 40*41);

            this.enemyShurikens = this.game.add.group();
            this.enemyShurikens.createMultiple(10, 'shuriken_enemy');
            this.enemyShurikens.setAll('anchor.x', 0.5);
            this.enemyShurikens.setAll('anchor.y', 0.5);

            this.player = this.game.add.sprite(40, 40*41, 'ninjas');

            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.anchor.setTo(0.5, 0.5);
            this.player.body.gravity.y = 1200;
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('idle', [64, 65, 66, 67], 4, true);
            this.player.animations.add('walk', [0, 1, 2, 3], 8, true);
            this.player.animations.add('jump', [99, 98], 8, false);
            this.player.animations.add('death', [130, 131, 132, 133, 135], 8, false);

            this.player.animations.play('idle');

            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.enemies, this.layer);

            this.game.physics.arcade.overlap(this.shurikens, this.layer, this.shurikenCollision, null, this);
            this.game.physics.arcade.overlap(this.shurikens, this.enemies, this.killEnemy, null, this);
            this.game.physics.arcade.overlap(this.enemyShurikens, this.layer, this.shurikenCollision, null, this);

            if (!this.player.dead) {
                this.game.physics.arcade.overlap(this.player, this.enemyShurikens, this.die, null, this);
                this.game.physics.arcade.overlap(this.player, this.enemies, this.die, null, this);
            }

            this.enemies.forEachAlive(this.updateEnemies, this);

            this.handleKeyDown();
        },

        fire: function () {
            var shuriken = this.shurikens.getFirstDead();

            if (!shuriken || this.shurikenTimer) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.reset(this.player.x + this.player.width, this.player.y);
            shuriken.body.velocity.x = (this.player.scale.x > 0) ? 1000 : -1000;
            shuriken.scale.set(0.8, 0.8);
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            this.startShurikenTimer();

            return true;
        },

        die: function (player, shuriken) {

            var self = this;

            shuriken.kill();

            player.body.velocity.x = 0;
            player.dead = true;
            player.animations.play('death');

            setTimeout(function(){
                self.game.state.start('Gameover');
            }, 800);

        },

        createEnemy: function (x, y) {
            var enemy = this.enemies.create(x, y, 'ninjas');

            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.gravity.y = 1200;
            enemy.body.collideWorldBounds = true;
            enemy.scale.x *= -1;

            enemy.animations.add('idle', [72, 73, 74, 75], 4, true);
            enemy.animations.add('walk', [8, 9, 10, 11], 4, true);

            return enemy;
        },

        createEnemyIdle: function (x, y) {
            var enemy = this.createEnemy(x, y);
            enemy.type = 'idle';
            enemy.animations.play('idle');
        },

        createEnemyWalker: function (x, y) {
            var enemy = this.createEnemy(x, y);
            enemy.type = 'walker';
            enemy.animations.play('walk');
            enemy.body.velocity.x = -150;
        },

        updateEnemies: function (enemy) {
            if (enemy.type == 'idle') {
                if ((this.player.x < enemy.x && enemy.scale.x > 0) || (this.player.x > enemy.x && enemy.scale.x < 0)) {
                    enemy.scale.x *= -1; //move enemy to always front the player
                }

                //fire if player is near
                if (Math.abs(this.player.x - enemy.x) < 400) {
                    if (this.game.time.now > this.enemyFireTimer + 1500) {
                        this.enemyFire(enemy);
                        this.enemyFireTimer = this.game.time.now;
                    }
                }
            }
            if (enemy.type == 'walker') {
                if (enemy.body.blocked.left || enemy.body.blocked.right) {
                    enemy.scale.x *= -1;
                    enemy.body.velocity.x = (enemy.scale.x > 0) ? 150 : -150;
                }
            }
        },

        enemyFire: function (enemy) {
            var shuriken = this.enemyShurikens.getFirstDead();

            if (!shuriken) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.reset(enemy.x + enemy.width, enemy.y);
            shuriken.body.velocity.x = (enemy.scale.x > 0) ? 700 : -700;
            shuriken.scale.set(0.8, 0.8);
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            return true;
        },

        killEnemy: function (shuriken, enemy) {
            shuriken.kill();
            enemy.kill();
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
            if (this.player.dead) return;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
                this.player.body.velocity.x = 250;
                this.turnRight();

                if (this.player.body.onFloor()) {
                    this.player.animations.play('walk');
                } else if (this.player.animations.currentAnim.name != 'jump') {
                    this.player.animations.play('jump');
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.body.velocity.x = -250;
                this.turnLeft();

                if (this.player.body.onFloor()) {
                    this.player.animations.play('walk');
                } else if (this.player.animations.currentAnim.name != 'jump') {
                    this.player.animations.play('jump');
                }
            }

            if (!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.player.body.onFloor()) {
                    this.player.body.velocity.x = 0;
                    this.player.animations.play('idle');
                } else if (this.player.animations.currentAnim.name != 'jump') {
                    this.player.animations.play('jump');
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.fire();
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                if (this.player.body.onFloor()) {
                    this.player.animations.play('jump');
                    this.player.body.velocity.y = -650;
                }
            }
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));