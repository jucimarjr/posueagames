var HeroProperties = {
    path:'assets/images/hero/hero_50-50-10.png',
    width:50,
    height:50,
    dragX:200,
    gravityY:100,
    velocityX:100,
    jump:-350,
    climb:150,
    animations:{
        idle:[0, 1],
        run:[2, 3, 4, 5, 6],
        attack:[7, 8, 9]
    }
}

function Hero(game) {
    this.game = game,
    this.hero,
    this.attack,
    this.attacking = false;
}

Hero.prototype = {
    preload : function() {
        this.game.load.spritesheet('hero', HeroProperties.path, 50, 50, 10);
    },

    create : function() {
        this.hero = game.add.sprite(10,game.world.height - 200,'hero', 0);
        this.hero.animations.add('idle', HeroProperties.animations.idle, 2);
        this.hero.animations.add('run', HeroProperties.animations.run, 6);
        this.hero.animations.add('attack', HeroProperties.animations.attack, 3);

        this.hero.anchor.setTo(.5,.5);
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
            this.hero.animations.play('run');
        } else if (cursors.left.isDown) {
            this.hero.body.velocity.x = -HeroProperties.velocityX;
            this.hero.scale.x = -1;
            this.hero.animations.play('run');
        } else {
            this.hero.animations.play('idle');
        }

        if(cursors.up.isDown && this.hero.body.onFloor()) {
            this.hero.body.velocity.y = HeroProperties.jump;
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            this.hero.animations.play('attack');
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

}