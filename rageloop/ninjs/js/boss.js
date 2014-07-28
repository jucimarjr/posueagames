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
        this.currentPlace = -1;
        this.possiblePlaces = {
            0: {x:40*2, y:40*2},
            1: {x:40*10, y:40*5},
            2: {x:40*22, y:40*2},
            3: {x:40*7, y:40*8},
            4: {x:40*17, y:40*8},
            5: {x:40*2, y:40*12},
            6: {x:40*22, y:40*12},
            7: {x:40*10, y:40*12},
        };
        this.effects = null;
        this.shuriken_anim = null;
        this.emerging_anim = null;
        this.disappearing_anim = null;
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

            this.sprite.exists = false;

            this.sprite.animations.add('idle', [112, 113, 114, 115], 4, true);
            this.sprite.animations.add('death', [178, 179, 180, 181, 182, 183], 8, false);

            this.shuriken_anim = this.sprite.animations.add('shuriken', [161, 162, 163], 16, false);

            this.shuriken_anim.onComplete.add(function() {
                this.sprite.animations.play('idle');
            }, this);

            this.sprite.animations.play('idle');

            this.shurikens = this.game.add.group();
            this.shurikens.createMultiple(10, 'shuriken_boss');
            this.shurikens.setAll('anchor.x', 0.5);
            this.shurikens.setAll('anchor.y', 0.5);

            this.shurikenAudio = this.game.add.audio('shuriken_sound');
            this.shurikenAudio.volume = 0.6;
            this.shurikenAudio.addMarker('throw', 0, 0.5);
            this.shurikenAudio.addMarker('hit', 0.5, 0.5);

            // special effects
            this.effects = this.game.add.sprite(x, y, 'boss_effects');
            this.effects.anchor.setTo(0.5, 0.5);

            this.emerging_anim = this.effects.animations.add('emerging', [0, 1, 2, 3], 10, false, true);
            this.disappearing_anim = this.effects.animations.add('disappearing', [9, 10, 11, 12, 13, 14], 10, false, true);

            this.disappearing_anim.onStart.add(function() {

                this.effects.visible = true;
                this.effects.x = this.sprite.x;
                this.effects.y = this.sprite.y;

            }, this);

            this.disappearing_anim.onComplete.add(function() {
                this.effects.animations.play("emerging");
            }, this);

            this.emerging_anim.onStart.add(function() {

                var newPlace = this.getNewPlace();

                this.effects.x = newPlace.x;
                this.effects.y = newPlace.y;

            }, this);

            this.emerging_anim.onComplete.add(function() {

                this.teleport({x: this.effects.x, y: this.effects.y});
                this.effects.visible = false;

            }, this);

            this.effects.animations.play("emerging");

        },

        update: function() {

            if (!this.sprite.visible || this.lifes <= 0) {
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

        getNewPlace: function() {

            var min = 0, max = 7;
            var index;

            // first time
            if (this.currentPlace == -1) {
                this.currentPlace = 6;
                return this.possiblePlaces[this.currentPlace];
            }

            do {
                index = this.getRandomBetween(min, max);
            } while(index === this.currentPlace) ;
        
            this.currentPlace = index;

            var newPlace = this.possiblePlaces[index];

            return newPlace;
        },

        teleport: function(place) {

            this.sprite.exists = true;

            this.sprite.x = place.x;
            this.sprite.y = place.y;
        },

        die: function() {

            this.lifes--;
            this.shurikenAudio.play('hit');

            if (this.lifes > 0) {

                this.sprite.exists = false;

                this.effects.animations.play("disappearing");
                //this.teleport();

                this.shurikenMaxDelay -= 150;
                this.shurikenMinDelay -= 150;

            } else {

                this.sprite.alive = false;
                this.sprite.animations.play('death');
                //this.sprite.kill();
            }
        },

        fire: function() {
            var shuriken = this.shurikens.getFirstDead();

            if (!shuriken) return false;

            this.game.physics.enable(shuriken, Phaser.Physics.ARCADE);

            shuriken.reset(this.sprite.x + this.sprite.width, this.sprite.y);
            shuriken.rotation = this.game.physics.arcade.moveToObject(shuriken, this.player.sprite, 700, 0);
            shuriken.body.angularVelocity = (this.sprite.scale.x > 0) ? 700 : -700;
            shuriken.scale.set(0.8, 0.8);
            shuriken.checkWorldBounds = true;
            shuriken.outOfBoundsKill = true;

            this.shurikenAudio.play('throw');

            this.sprite.animations.play('shuriken');

            return true;
        },

        destroy: function () {
            this.sprite.destroy();
            this.shurikens.destroy();
            this.effects.destroy();

            this.sprite = null;
            this.shurikens = null;
            this.effects = null;
        }
    };

    window.Boss = Boss;

}(window.app_container = window.app_container || {}));