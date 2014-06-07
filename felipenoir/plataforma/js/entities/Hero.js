var HeroProperties = {
    path:'assets/images/hero/hero_50-50-28.png',
    width:50,
    height:50,
    dragX:200,
    gravityY:100,
    velocityX:100,
    jump:-350,
    climb:150,
    animations:{
        idle:{
            sword:{name:'idle', frames:[23, 24], framerate:2},
            pistol:{name:'idle-pistol', frames:[21, 22], framerate:2},
            machinegun:{name:'idle-machinegun', frames:[19, 20], framerate:2}
        },
        run:{
            sword:{name:'run', frames:[14, 7, 6, 5, 4], framerate:5},
            pistol:{name:'run-pistol',frames:[3, 2, 1, 0, 13], framerate:5},
            machinegun:{name:'run-machinegun',frames:[12, 11, 10, 9, 8], framerate:5}
        },
        attack:{
            sword:{name:'attack', frames:[27, 26, 25], framerate:3},
            pistol:{name:'attack-pistol', frames:[18, 17],framerate:2},
            machinegun:{name:'attack-machinegun', frames:[16, 15], framerate:2}
        }
    },
    animationsQtd:28
}

function Hero(game) {
    this.game = game,
    this.hero,
    this.animation,
    this.attacking = false;
}

Hero.prototype = {
    preload : function() {
        this.game.load.spritesheet('hero', HeroProperties.path, HeroProperties.width, HeroProperties.height, HeroProperties.animationsQtd);
    },

    create : function() {
        var heroAnim = HeroProperties.animations;
        this.hero = game.add.sprite(10, game.world.height - 200,'hero', 0);

        this.hero.animations.add(heroAnim.idle.sword.name, heroAnim.idle.sword.frames, heroAnim.idle.sword.framerate);
        this.hero.animations.add(heroAnim.idle.pistol.name, heroAnim.idle.pistol.frames, heroAnim.idle.pistol.framerate);
        this.hero.animations.add(heroAnim.idle.machinegun.name, heroAnim.idle.machinegun.frames, heroAnim.idle.machinegun.framerate);

        this.hero.animations.add(heroAnim.run.sword.name, heroAnim.run.sword.frames, heroAnim.run.sword.framerate);
        this.hero.animations.add(heroAnim.run.pistol.name, heroAnim.run.pistol.frames, heroAnim.run.pistol.framerate);
        this.hero.animations.add(heroAnim.run.machinegun.name, heroAnim.run.machinegun.frames, heroAnim.run.machinegun.framerate);

        this.hero.animations.add(heroAnim.attack.sword.name, heroAnim.attack.sword.frames, heroAnim.attack.sword.framerate);
        this.hero.animations.add(heroAnim.attack.pistol.name, heroAnim.attack.pistol.frames, heroAnim.attack.pistol.framerate);
        this.hero.animations.add(heroAnim.attack.machinegun.name, heroAnim.attack.machinegun.frames, heroAnim.attack.machinegun.framerate);

        this.animation = {
            idle : heroAnim.idle.sword.name,
            run : heroAnim.run.sword.name,
            attack : heroAnim.attack.sword.name
        };

        this.hero.anchor.setTo(.5, .5);
        this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);

        this.hero.body.collideWorldBounds = true;
        this.hero.body.drag.x = HeroProperties.dragX;
        this.hero.body.gravity.y = HeroProperties.gravityY;
        this.game.camera.follow(this.hero);
    },

    update : function() {
        if (cursors.right.isDown) {
            this.hero.body.velocity.x = HeroProperties.velocityX;
            this.hero.scale.x = +1;
            this.hero.animations.play(this.animation.run);
        } else if (cursors.left.isDown) {
            this.hero.body.velocity.x = -HeroProperties.velocityX;
            this.hero.scale.x = -1;
            this.hero.animations.play(this.animation.run);
        } else {
            this.hero.animations.play(this.animation.idle);
        }

        if(cursors.up.isDown && this.hero.body.onFloor()) {
            this.hero.body.velocity.y = HeroProperties.jump;
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            this.hero.animations.play(HeroProperties.animations.attack.sword.name);
        } else if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            if(this.animation.attack != 'attack')
                this.hero.animations.play(this.animation.attack);
        }
    },

    climb : function(bool) {
        if(bool){
            this.hero.body.allowGravity = false;
            if(cursors.up.isDown || cursors.down.isDown) {
                if(cursors.up.isDown) {
                    this.hero.body.velocity.y = -HeroProperties.climb;
                } else if (cursors.down.isDown){
                    this.hero.body.velocity.y = HeroProperties.climb;
                }
            } else if (cursors.up.isUp || cursors.down.isUp) {
                this.hero.body.velocity.y = 0;
            }
        } else {
            this.hero.body.allowGravity = true;
        }
    },

    change : function(weapon) {
        if (weapon.key == 'weapon1') {
            this.animation.idle = HeroProperties.animations.idle.sword.name;
            this.animation.run = HeroProperties.animations.run.sword.name;
            this.animation.attack = HeroProperties.animations.attack.sword.name;
        } else if(weapon.key == 'weapon2') {
            this.animation.idle = HeroProperties.animations.idle.pistol.name;
            this.animation.run = HeroProperties.animations.run.pistol.name;
            this.animation.attack = HeroProperties.animations.attack.pistol.name;
        } else if(weapon.key == 'weapon3') {
            this.animation.idle = HeroProperties.animations.idle.machinegun.name;
            this.animation.run = HeroProperties.animations.run.machinegun.name;
            this.animation.attack = HeroProperties.animations.attack.machinegun.name;
        }
    }

}