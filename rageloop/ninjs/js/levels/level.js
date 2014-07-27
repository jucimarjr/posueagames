(function (app_container) {

    function Level() {
        //background image
    	this.bg = null;
        this.bgAsset = '';

        //level map
        this.map = null;
        this.mapAsset = '';

        //layers
        this.layer = null;
        this.itemLayer = null;
        this.spineLayer = null;
        this.escapeLayer = null;

        //player sprite
        this.player = null;
        this.playerX = 0;
        this.playerY = 0;

        //enemy group
        this.enemies = null;

        //boss sprite
        this.boss = null;

        //items collected
        this.itemCount = 0;
        this.totalItems = 0;

        //level sound
        this.audioAsset = '';
        this.audio = null;

        //shadow
        this.hasShadow = false;
        this.shadow = null;

        //HUD
        this.hud = null;

        this.nextLevel = '';
    };

    Level.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Game.ARCADE);
            this.game.time.deltaCap = 1/70;

            this.bg = this.game.add.tileSprite(0, 0, 960, 600, this.bgAsset);
            this.bg.fixedToCamera = true;

            this.map = this.game.add.tilemap(this.mapAsset);
            this.map.addTilesetImage('background', 'tileset');

            this.layer = this.map.createLayer('layer');
            this.itemLayer = this.map.createLayer('items');
            this.spineLayer = this.map.createLayer('spines');
            this.escapeLayer = this.map.createLayer('escape');

            this.layer.resizeWorld();
            this.itemLayer.resizeWorld();
            this.spineLayer.resizeWorld();
            this.escapeLayer.resizeWorld();

            this.map.setCollisionBetween(0, 15, true, 'layer');
            this.map.setCollisionBetween(0, 15, true, 'items');
            this.map.setCollisionBetween(0, 15, true, 'spines');
            this.map.setCollisionBetween(0, 15, true, 'escape');

            this.player = new Player(this.game);
            this.player.create(this.playerX, this.playerY);

            this.enemies = new EnemyFactory(this.game, this.player);
            this.enemies.create();
            this.createEnemies();

            if (this.hasShadow) {
                this.shadow = new ShadowEffect(this.game, this.player.sprite);
                this.shadow.init();
            }

            this.audio = this.game.add.audio(this.audioAsset);
            this.audio.addMarker('bg', 0, 67.3, 0.8, true);
            this.audio.play('bg');

            this.hud = new HUD(this.game);
            this.hud.init(this.totalItems, (this.boss) ? this.boss.lifes : -1);

            this.itemCount = 0;

            this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

            if (typeof this.playIntro === 'function' && this.runningIntro) {
                this.playIntro();
            }
        },

        update: function() {

            if (this.hasShadow) {
                this.shadow.update();
            }

            this.game.physics.arcade.collide(this.player.sprite, this.layer);
            this.game.physics.arcade.collide(this.enemies.sprites, this.layer);

            if (this.boss) {
                this.game.physics.arcade.collide(this.boss.sprite, this.layer);
            }

            this.game.physics.arcade.overlap(this.player.sprite, this.itemLayer, this.collectItem, null, this);
            this.game.physics.arcade.overlap(this.player.shurikens, this.layer, this.shurikenCollision, null, this);
            this.game.physics.arcade.overlap(this.player.shurikens, this.enemies.sprites, this.killEnemy, null, this);
            this.game.physics.arcade.overlap(this.enemies.shurikens, this.layer, this.shurikenCollision, null, this);

            if (this.boss) {
                this.game.physics.arcade.overlap(this.player.shurikens, this.boss.sprite, this.killBoss, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.boss.shurikens, this.die, null, this);
            }

            if (!this.player.dead) {
                this.game.physics.arcade.overlap(this.player.sprite, this.enemies.shurikens, this.die, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.enemies.sprites, this.die, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.spineLayer, this.die, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.escapeLayer, this.startNextLevel, null, this);
            }

            if (typeof this.runningIntro != 'undefined' && this.runningIntro) {

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                    this.exitIntro();
                }

                return;
            }

            this.enemies.update();
            this.player.update();

            if (this.boss) {

                if (this.boss.lifes <= 0) {
                    this.startNextLevel();
                }

                this.boss.update();
            }
        },

        shutdown: function () {
            this.bg.destroy();
            this.map.destroy();

            this.layer.destroy();
            this.itemLayer.destroy();
            this.spineLayer.destroy();
            this.escapeLayer.destroy();

            this.player.sprite.destroy();

            this.enemies.sprites.destroy();

            this.audio.stop();
        },

        collectItem: function (player, tile) {
            this.hud.updateItemsCollected(1)
            this.itemCount++;
            this.map.removeTile(tile.x, tile.y, this.itemLayer);

            if (this.itemCount == this.totalItems) {
                this.openEscape();
            }
        },

        openEscape: function () {
            //open escape layer
        },

        startNextLevel: function () {

            var self = this;
            var delay = 0; //ms

            if (this.nextLevel === 'EndScene') {
                delay = 3000;
            }

            if (this.nextLevel && this.itemCount == this.totalItems) {
                setTimeout(function(){
                    self.game.state.start(self.nextLevel);    
                }, delay);                
            } 
        },

        die: function (player, obj) {
            var self = this;

            if (obj.kill) {
                obj.kill();
            }

            this.player.die();
            this.player.shurikenAudio.play('hit');

            this.hud.updateLifes(-1);

            if (this.hud.lifes === 0) {
                setTimeout(function(){
                    self.audio.stop();
                    self.game.state.start('Gameover');
                }, 800);    
            
            } else {
                setTimeout(function(){
                    self.player.revive();
                }, 1200);
            }
        },

        killEnemy: function (shuriken, enemy) {
            shuriken.kill();
            enemy.kill();
            this.hud.updateScore(1);
            this.player.shurikenAudio.play('hit');
        },

        killBoss: function (boss, shuriken) {

            if (this.boss) {
                this.hud.updateBossLifes(-1);
            }

            shuriken.kill();
            this.boss.die();
        },

        shurikenCollision: function (shuriken, layer) {
            shuriken.kill();
            this.player.shurikenAudio.play('hit');
        }
    };

    app_container.Level = Level;

}(window.app_container = window.app_container || {}));