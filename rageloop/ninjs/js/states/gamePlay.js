(function (app_container) {

    function Gameplay() {
    	this.bg = null;
        this.map = null;
        this.layer = null;
        this.itemLayer = null;
        this.spineLayer = null;
        this.player = null;

        //enemies
        this.enemies = null;

        //items collected
        this.itemCount = 0;
    };

    Gameplay.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Game.ARCADE);
            this.game.time.deltaCap = 1/70;

            var bg = this.game.add.tileSprite(0, 0, 960, 600, 'background');
            bg.fixedToCamera = true;

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('background', 'tileset');

            this.layer = this.map.createLayer('layer');
            this.itemLayer = this.map.createLayer('items');
            this.spineLayer = this.map.createLayer('spines');

            this.layer.resizeWorld();
            this.itemLayer.resizeWorld();
            this.spineLayer.resizeWorld();

            this.map.setCollisionBetween(0, 15, true, 'layer');
            this.map.setCollisionBetween(0, 15, true, 'items');
            this.map.setCollisionBetween(0, 15, true, 'spines');

            this.player = new Player(this.game);
            this.player.create(40, 40*41);

            this.enemies = new EnemyFactory(this.game, this.player);
            this.enemies.create();
            this.createEnemies();

            /*audios*/

            this.bgSound = this.game.add.audio('bgsound');
            this.bgSound.volume = 0.8;
            this.bgSound.loop = true;
            this.bgSound.play();

            this.hud = new HUD(this.game);
            this.hud.init();

            this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player.sprite, this.layer);
            this.game.physics.arcade.collide(this.enemies.sprites, this.layer);

            this.game.physics.arcade.overlap(this.player.sprite, this.itemLayer, this.collectItem, null, this);
            this.game.physics.arcade.overlap(this.player.shurikens, this.layer, this.shurikenCollision, null, this);
            this.game.physics.arcade.overlap(this.player.shurikens, this.enemies.sprites, this.killEnemy, null, this);
            this.game.physics.arcade.overlap(this.enemies.shurikens, this.layer, this.shurikenCollision, null, this);

            if (!this.player.dead) {
                this.game.physics.arcade.overlap(this.player.sprite, this.enemies.shurikens, this.die, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.enemies.sprites, this.die, null, this);
                this.game.physics.arcade.overlap(this.player.sprite, this.spineLayer, this.die, null, this);
            }

            this.enemies.update();

            this.player.update();

            this.handleKeyDown();
        },

        createEnemies: function () {
            this.enemies.createNinjaIdle(40*26, 40*38);
            this.enemies.createNinjaIdle(40*51, 40*38);
            this.enemies.createNinjaIdle(40*22, 40*26);
            this.enemies.createNinjaIdle(40*10, 40*23);
            this.enemies.createNinjaIdle(40*31, 40*18);
            this.enemies.createNinjaIdle(40*8, 40*12);
            this.enemies.createNinjaIdle(40*17, 40*10);
            this.enemies.createNinjaIdle(40*27, 40*5);
            this.enemies.createNinjaIdle(40*47, 40*9);
            this.enemies.createNinjaIdle(40*51, 40*7);

            this.enemies.createNinjaWalker(40*37, 40*41);
            this.enemies.createNinjaWalker(40*46, 40*21);
            this.enemies.createNinjaWalker(40*28, 40*24);

            this.enemies.createNinjaDash(40*12, 40*6);
            this.enemies.createNinjaDash(40*60, 40*7);
            this.enemies.createNinjaDash(40*31, 40*10);
        },

        collectItem: function (player, tile) {
            this.hud.updateItemsCollected(1)
            this.itemCount++;
            this.map.removeTile(tile.x, tile.y, this.itemLayer);
        },

        die: function (player, obj) {

            var self = this;

            if (obj.kill) {
                obj.kill();
            }

            this.player.die();

            this.hud.updateLifes(-1);

            if (this.hud.lifes === 0) {
            
                setTimeout(function(){
                    self.bgSound.stop();
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
        },

        shurikenCollision: function (shuriken, layer) {
            shuriken.kill();
        },

        handleKeyDown: function () {
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));