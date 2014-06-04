var WeaponBase = {
    path:'assets/images/weapon/'
}

var Weapon1 = {
    weaponImg:WeaponBase.path + 'weapon1.png'
}

var Weapon2 = {
    weaponImg:WeaponBase.path + 'weapon2.png',
    bulletImg:WeaponBase.path + 'bullet1.png',
    shotDelay:500,
    bulletSpeed:500,
    numberOfBullets:8,
    height:14
}

var Weapon3 = {
    weaponImg:WeaponBase.path + 'weapon3.png',
    bulletImg:WeaponBase.path + 'bullet2.png',
    shotDelay:100,
    bulletSpeed:600,
    numberOfBullets:30,
    height:14
}

function Weapon(game, weapon) {
    this.game = game,
    this.weapon = weapon,
    this.bulletGroup;
}

Weapon.prototype = {
    preload : function() {
        this.game.load.image('bullet', this.weapon.bulletImg);
    },

    create : function() {
        var bullet, i;
        this.bulletGroup = this.game.add.group();
        for(i = 0; i < this.weapon.numberOfBullets; i++) {
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
            if(this.game.time.now - this.lastBulletShotAt < this.weapon.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            bullet = this.bulletGroup.getFirstDead();

            if(bullet === null || bullet === undefined) return;

            bullet.revive();

            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            bullet.reset(hero.x + (HeroProperties.width * (hero.scale.x < 0 ? -1 : 1)) / 2, hero.y - this.weapon.height);

            bullet.body.velocity.x = hero.scale.x < 0 ? -this.weapon.bulletSpeed : this.weapon.bulletSpeed;
            bullet.body.velocity.y = 0;
            bullet.body.allowGravity = false;
        }
    }
}
