(function (app_container) {
    
    function Gameplay() {
        this.isStarted = false;
        this.score = 0;
        this.player = null;
        this.bg = null;
        this.fg = null;
        this.enemies = null;
        this.timer = null;
        this.player_tween = null;

        //weapons
        this.weapon = null;
        this.weaponFactory = null;

        this.startSound = null;
        this.bgSound = null;
        this.hitSound = null;

        //powerUpProgress
        this.powerUpTimer = null;
        this.powerUpProgress = 0;
        this.powerUpFill = null;
        this.powerUpImage = null;
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

            this.player_fire = this.game.add.sprite(0, 0, 'player_fire');
            this.player_fire.animations.add('fire', [0, 1, 2], 10, true);
            this.player_fire.visible = false;

            this.enemies = this.game.add.group();
            this.enemies.createMultiple(20, 'enemy');

            this.enemy_explosions = this.game.add.group();
            this.enemy_explosions.createMultiple(5, 'enemy_explosion');
            this.enemy_explosions.callAll('animations.add', 'animations', 'explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 5, true);

            this.powerUps = new PowerUps(this.game);
            this.powerUps.init();

            this.weaponFactory = new WeaponFactory(this.game, this.player);
            this.weaponFactory.create();

            this.weapon = this.weaponFactory.nextWeapon();

            this.timer = this.game.time.events.loop(700, this.addElement, this);

            var style = { font: "36px Starjedi", fill: "#ffffff", align: "center" };
            this.score_text = this.game.add.text(this.game.world.centerX, 0, "Score: " + this.score, style);
            this.score_text.anchor.set(0.5, 0);

            // sounds
            this.startSound = this.game.add.audio("startsound");
            this.bgSound = this.game.add.audio("bgsound");
            this.hitSound = this.game.add.audio("crash");
            //this.bgSound.volume = 0.3;
            this.startSound.play();
            this.startSound.loop = true; 

            this.progressBg = this.game.add.graphics(0, 0);
            this.progressBg.lineStyle(2, 0x000000, 1);
            this.progressBg.beginFill(0xF7931E, 1);
            this.progressBg.drawRect(10, 10, 230, 30);

            this.powerUpFill = this.game.add.graphics(0, 0);

            this.powerUpImage = this.game.add.sprite(250, 10, 'powerups');
            this.powerUpImage.scale.setTo(0.5, 0.5);
            
            this.setPowerUpBarVisibility(false);


        },

        update: function() {

            if (!this.player.exists) {
                return;
            }


            this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
            this.game.physics.arcade.overlap(this.player, this.powerUps.group, this.getPowerUp, null, this);
            this.game.physics.arcade.overlap(this.weapon.group, this.enemies, this.killEnemy, null, this);

            if (this.player.y == 0 || this.player.y == (this.game.height - this.player.height)) {
                this.restart();
            }

            this.handleKeyDown();

            this.update_player_fire();

            this.bg.tilePosition.x -= 10;
            this.fg.tilePosition.x -= 15;
        },

        update_player_fire: function() {

            this.player_fire.x = this.player.x + 200;
            this.player_fire.y = this.player.y + 56;
        },

        update_score: function() {

            if (this.score_text) {
                this.score_text.setText("Score: " + this.score);
            }
        },

        start: function() {

            this.player_tween.stop();

            this.isStarted = true;
            this.player.body.gravity.y = 1000;
            
			this.bgSound.currentTime = 0;
            this.startSound.currentTime = 0;
            
            this.bgSound.play(); 
            this.bgSound.loop = true;
            this.startSound.stop();
        },

        setPowerUpBarVisibility: function(value) {

            this.progressBg.visible = value;
            this.powerUpFill.visible = value;
            this.powerUpImage.visible = value;

        },

        addElement: function() {

            var x, y, value;

            if (!this.isStarted) {
                return;
            }

            x = this.game.width; 

            value = Utils.randomIntFromInterval(0, 10);

            if (value < 9) {
                y = Math.round(Math.random() * (this.game.height - 94));
                this.addEnemy(x, y);
            } else {
                y = Math.round(Math.random() * (this.game.height - 60));
                this.powerUps.spawnNew(x, y);
            }

        },

        addEnemy: function (x, y) {

            var enemy = this.enemies.getFirstDead();

            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

            enemy.reset(x, y);
            enemy.body.velocity.x = -1000;
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
        },

        addEnemyExplosion: function(x, y) {

            var explosion = this.enemy_explosions.getFirstDead();

            explosion.reset(x, y);
            explosion.checkWorldBounds = true;
            explosion.outOfBoundsKill = true;

            explosion.animations.play('explosion', 20, false, true);

        },

        killEnemy: function (bullet, enemy) {

            this.score += 1;
            this.update_score();

            bullet.kill();
            enemy.kill();

            this.addEnemyExplosion(enemy.x, enemy.y);
        },

        getPowerUp: function(player, powerUp) {

            var powerUpType = powerUp.type;

            if (powerUpType !== 'shield') {
                this.setPowerUpBarVisibility(true);
                this.weapon = this.weaponFactory.getWeapon(powerUpType);
                this.startPowerUpTimer(powerUp);
            }
            
            powerUp.kill();
        },

        startPowerUpTimer: function (powerUp) {
            this.powerUpProgress = 100;

            if (this.powerUpTimer) {
                this.game.time.events.remove(this.powerUpTimer);
            }

            this.powerUpTimer = this.game.time.events.loop(200, this.updatePowerUpTimer, this);

            this.powerUpImage.frame = powerUp.frame;
            this.powerUpImage.visible = true;
        },

        updatePowerUpTimer: function () {
            if (this.powerUpProgress == 0) {
                this.game.time.events.remove(this.powerUpTimer);
                this.weapon = this.weaponFactory.getWeapon('simpleBlaster');
                this.setPowerUpBarVisibility(false);
                return;
            }

            this.powerUpFill.beginFill(0xF7931E, 1);
            this.powerUpFill.drawRect(13, 13, 226, 24);

            this.powerUpFill.beginFill(0x000000, 1);
            this.powerUpFill.drawRect(13, 13, (--this.powerUpProgress*226)/100, 24);
        },

        restart: function () {

            this.isStarted = false;

            this.game.time.events.remove(this.timer);

            this.player.kill();
            this.player_tween.stop();

            var self = this;

            // store the last score to access it in game over view.
            app_container.last_score = this.score;     
            
            // player current position
            app_container.player_posX = this.player.x; 
            app_container.player_posY = this.player.y;

            //reset score.
            this.score = 0;
            
            this.hitSound.play();
            this.startSound.stop();
            this.bgSound.stop();

            this.player_tween = null;

            // call game over view
            this.game.state.start('Gameover');
        },

        handleKeyDown: function() {
            if (this.player_tween == null) {
                return;
            }

            if (this.game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)) {
                
                if (!this.isStarted) {
                    this.start();
                } else {
                    this.player.body.velocity.y = -400;
                }
            }

            if (this.game.input.keyboard.isDown (Phaser.Keyboard.ENTER)) {
                if(this.isStarted) {

                    var isFiring = this.weapon.fire();

                    if (isFiring) {
                        this.player_fire.revive();
                        this.player_fire.animations.play('fire', 20, false, true);
                    }
                }
            } 
        },
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));
