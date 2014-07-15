(function (app_container) {

    function Boss(game, player) {
        this.game = game;
        this.player = player;
        this.lifes = 5;
        this.sprite = null;
        this.shurikens = null;
        this.shurikenTimer = 0;
        this.shurikenCurrentDelay = 1500; //ms
        this.shurikenMinDelay = 1200; //ms
        this.shurikenMaxDelay = 1500; //ms
        this.shurikenAudio = null;
        this.lastPlaceIndex = -1;
        this.possiblePlaces = {
            0: {x:40*2, y:40*0},
            1: {x:40*10, y:40*5},
            2: {x:40*22, y:40*0},
            3: {x:40*7, y:40*8},
            4: {x:40*17, y:40*8},
            5: {x:40*2, y:40*12},
            6: {x:40*22, y:40*12},
            7: {x:40*10, y:40*12},
        }
    }

    Boss.prototype = {
        preload: function () {},

        init: function (x, y) {

            this.sprite = this.game.add.sprite(x, y, 'ninjas');
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

            this.sprite.anchor.setTo(0.5, 0.5);
            this.sprite.body.gravity.y = 1200;
            this.sprite.body.collideWorldBounds = true;
            this.sprite.scale.x *= -1;

            this.sprite.animations.add('idle', [72, 73, 74, 75], 4, true);
            this.sprite.animations.play('idle');

            this.shurikens = this.game.add.group();
            this.shurikens.createMultiple(10, 'shuriken_enemy');
            this.shurikens.setAll('anchor.x', 0.5);
            this.shurikens.setAll('anchor.y', 0.5);

            this.shurikenAudio = this.game.add.audio('shuriken_sound');
            this.shurikenAudio.volume = 0.6;

        },

        update: function() {

            if (!this.sprite.visible) {
                return;
            }

            if ((this.player.sprite.x < this.sprite.x && this.sprite.scale.x > 0) || (this.player.sprite.x > this.sprite.x && this.sprite.scale.x < 0)) {
                this.sprite.scale.x *= -1; //move enemy to always front the player
            }


            if (this.game.time.now > (this.shurikenTimer + this.shurikenCurrentDelay)) {
                this.fire();
                this.shurikenTimer = this.game.time.now;
                this.shurikenCurrentDelay = this.getRandomBetween(this.shurikenMinDelay, this.shurikenMaxDelay);
            }
        },

        getRandomBetween: function(min, max) {

            return Math.floor(Math.random()*(max-min+1)+min);
        },

        teleport: function() {

            var min = 0, max = 7;
            var index;

            do {
                index = this.getRandomBetween(min, max);
            } while(index === this.lastPlaceIndex) ;
        
            this.lastPlaceIndex = index;

            var newPlace = this.possiblePlaces[index];

            this.sprite.x = newPlace.x;
            this.sprite.y = newPlace.y;
        },

        die: function() {

            if (this.lifes > 0) {

                this.teleport();
                this.lifes--;

                this.shurikenMaxDelay -= 150;
                this.shurikenMinDelay -= 150;

            } else {
                this.sprite.kill();
            }
        },

        fire: function() {
            var shuriken = this.shurikens.getFirstDead();

            if (!shuriken) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.reset(this.sprite.x + this.sprite.width, this.sprite.y);
            shuriken.anchor.setTo(0.5, 0.5);
            shuriken.body.allowRotation = false;
            shuriken.rotation = this.game.physics.arcade.moveToObject(shuriken, this.player.sprite, 700, 0);
            shuriken.scale.set(0.8, 0.8);
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            this.shurikenAudio.play();

            return true;
        }        
    };

    window.Boss = Boss;

}(window.app_container = window.app_container || {}));