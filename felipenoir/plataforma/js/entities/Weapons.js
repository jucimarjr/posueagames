var Weapon1 = {
    weaponImg:'assets/images/weapon/weapon1.png'
}

var Weapon2 = {
    weaponImg:'assets/images/weapon/weapon2.png',
    bulletImg:'assets/images/weapon/bullet1.png'
}

var Weapon3 = {
    weaponImg:'assets/images/weapon/weapon3.png',
    bulletImg:'assets/images/weapon/bullet2.png'
}

function Weapon(game) {
    this.game = game,
    this.shotDelay = 500,
    this.bulletSpeed = 500,
    this.numberOfBullets = 20,
    this.bulletGroup;
}

Weapon.prototype = {
    preload : function() {
        this.game.load.image('bullet', Weapon2.bulletImg);
    },

    create : function() {
        var bullet, i;
        this.bulletGroup = this.game.add.group();
        for(i = 0; i < this.numberOfBullets; i++) {
            bullet = this.game.add.sprite(0,0,'bullet');
            this.bulletGroup.add(bullet);
            bullet.anchor.setTo(.5,.5);
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.kill();
        }
        this.game.time.advancedTiming = true;
    },

    update : function(hero) {
        var bullet;
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
            if(this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            bullet = this.bulletGroup.getFirstDead();

            if(bullet === null || bullet === undefined) return;

            bullet.revive();

            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            bullet.reset(hero.x + HeroProperties.width / 2, hero.y - 14);

            bullet.body.velocity.x = hero.scale.x < 0 ? -this.bulletSpeed : this.bulletSpeed;
            bullet.body.velocity.y = 0;
            bullet.body.allowGravity = false;
        }
    }
}
