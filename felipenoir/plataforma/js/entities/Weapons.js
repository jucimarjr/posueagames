var Pistol = {
    bulletImg:'assets/images/hero/bullet.png'
}

function Weapon(game) {
    this.game = game,
    this.shotDelay = 1000,
    this.bulletSpeed = 500,
    this.numberOfBullets = 3,
    this.bulletGroup;
}

Weapon.prototype = {
    preload : function() {
        this.game.load.image('bullet', Pistol.bulletImg);
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
    },

    update : function(x, y) {
        var bullet;
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            console.log('shot!');
            if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
            if(this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;

            bullet = this.bulletGroup.getFirstDead();

            if(bullet === null || bullet === undefined) return;

            bullet.revive();

            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            bullet.reset(x, y);

            bullet.body.velocity.x = this.bulletSpeed;
            bullet.body.velocity.y = 0;
            bullet.body.allowGravity = false;
        }
    }
}
