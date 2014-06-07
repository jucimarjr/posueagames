var WeaponBase = {
    path:'assets/images/weapon/'
}

var Weapon1 = {
    weaponImg:WeaponBase.path + '_weapon1.png'
}

var Weapon2 = {
    weaponName:'weapon2',
    bulletName:'bullet2',
    weaponImg:WeaponBase.path + 'weapon2.png',
    bulletImg:WeaponBase.path + 'bullet1.png',
    shotDelay:500,
    bulletSpeed:500,
    numberOfBullets:8,
    height:14
}

var Weapon3 = {
    weaponName:'weapon3',
    bulletName:'bullet3',
    weaponImg:WeaponBase.path + 'weapon3.png',
    bulletImg:WeaponBase.path + 'bullet2.png',
    shotDelay:100,
    bulletSpeed:600,
    numberOfBullets:30,
    height:14
}

function WeaponA(weapon) {
    this.weapon = weapon,
    this.shot,
    this.bulletGroup;
}

WeaponA.prototype.preload = function() {
    game.load.image(this.weapon.bulletName, this.weapon.bulletImg);
    game.load.audio('shot_audio', 'assets/sounds/shoot.ogg');
}

WeaponA.prototype.create = function() {
    var bullet, i, path;
    this.bulletGroup = game.add.group();
    for (i = 0; i < this.weapon.numberOfBullets; i++) {
        bullet = game.add.sprite(0, 0, this.weapon.bulletName);
        this.bulletGroup.add(bullet);
        bullet.anchor.setTo(.5, .5);
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.kill();
    }
    this.shot = game.add.audio('shot_audio');
}

WeaponA.prototype.update = function(hero) {
    var bullet;
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
        if (game.time.now - this.lastBulletShotAt < this.weapon.shotDelay) return;
        this.lastBulletShotAt = game.time.now;

        bullet = this.bulletGroup.getFirstDead();

        if(bullet === null || bullet === undefined) return;

        bullet.revive();

        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;

        bullet.reset(hero.x + (HeroProperties.width * (hero.scale.x < 0 ? -1 : 1)) / 2, hero.y - this.weapon.height);

        bullet.body.velocity.x = hero.scale.x < 0 ? -this.weapon.bulletSpeed : this.weapon.bulletSpeed;
        bullet.body.velocity.y = 0;
        bullet.body.allowGravity = false;
        this.shot.play();
    }
}

function Pistol() {
    WeaponA.call(this, Weapon2);
}

Pistol.prototype = new WeaponA();
Pistol.prototype.constructor = Pistol;

function MachineGun() {
    WeaponA.call(this, Weapon3);
}

MachineGun.prototype = new WeaponA();
MachineGun.prototype.constructor = MachineGun;

function Weapon(weapon) {
    this.weapon = weapon,
    this.pistol = new Pistol(),
    this.machineGun = new MachineGun();
}

Weapon.prototype = {
    preload : function() {
        this.pistol.preload();
        this.machineGun.preload();
    },

    create : function() {
        this.pistol.create();
        this.machineGun.create();
        game.time.advancedTiming = true;
    },

    update : function(hero) {
        if (this.weapon == Weapon2)
            this.pistol.update(hero);
        else if (this.weapon == Weapon3)
            this.machineGun.update(hero);
    },

    change : function(weapon) {
        if(weapon.key == 'weapon1')
            this.weapon = Weapon1;
        else if(weapon.key == 'weapon2')
            this.weapon = Weapon2;
        else if(weapon.key == 'weapon3')
            this.weapon = Weapon3;
    }
}