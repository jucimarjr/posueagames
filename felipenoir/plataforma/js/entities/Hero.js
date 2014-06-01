var HeroPropeties = {
    path:'assets/images/hero/h.png',
    json:'assets/images/hero/h.json',
    width:50,
    height:50,
    dragX:200,
    gravityY:100,
    velocityX:100,
    jump:-350,
    up:-150,
    animations:{
        run:{
            name:'run',
            frames:[1,2,3]
        }
    }
}

function Hero(game) {
    this.game = game,
    this.hero,
    this.cursors;
}

Hero.prototype = {
    preload : function() {
        this.game.load.atlasJSONHash('hero', HeroPropeties.path, HeroPropeties.json);
    },

    create : function() {
        this.hero = game.add.sprite(10,game.world.height - 200,'hero');
        this.hero.animations.add(HeroPropeties.animations.run.name, HeroPropeties.animations.run.frames, 6, true);
        this.hero.anchor.setTo(.5,.5);
        this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);

        this.hero.body.collideWorldBounds = true;
        this.hero.body.drag.x = HeroPropeties.dragX;
        this.hero.body.gravity.y = HeroPropeties.gravityY;
        this.game.camera.follow(this.hero);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update : function() {
        if (this.cursors.right.isDown) {
            this.hero.body.velocity.x = HeroPropeties.velocityX;
            this.hero.scale.x = +1;
            this.hero.animations.play(HeroPropeties.animations.run.name);
        } else if (this.cursors.left.isDown) {
            this.hero.body.velocity.x = -HeroPropeties.velocityX;
            this.hero.scale.x = -1;
            this.hero.animations.play(HeroPropeties.animations.run.name);
        } else {
            this.hero.animations.stop();
            this.hero.frame = 0;
        }

        if(this.cursors.up.isDown) {
            if(this.hero.body.onFloor()) {
               this.hero.body.velocity.y = HeroPropeties.jump;
            }
        }
    }
}