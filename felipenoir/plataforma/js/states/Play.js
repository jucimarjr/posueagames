State.Play = function() {
    this.level = new Level(game, Level1),
    this.panel = new Panel(Weapon1),
    this.hero = new Hero(game),
    this.weapon = new Weapon(game, Weapon1);
    this.pause  = new Pause(game);
    this.enemy = new Enemy(game);
}

var cursors;

State.Play.prototype = {
    preload:function() {
        this.level.preload();
        this.panel.preload();
        this.hero.preload();
        this.weapon.preload();
        this.pause.preload();
        this.enemy.preload();
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        this.level.create();
        this.panel.create();
        this.hero.create();
        this.weapon.create();
        this.pause.create()
        this.enemy.create(this.level.map);
		
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(this.level.layer, this.hero.hero);
		game.physics.arcade.collide(this.level.layer,this.enemy.enemies);
		game.physics.arcade.overlap(this.weapon.pistol.bulletGroup,this.enemy.enemies, this.killEnemy, null, this);
		game.physics.arcade.overlap(this.weapon.machineGun.bulletGroup,this.enemy.enemies, this.killEnemy, null, this);
		game.physics.arcade.overlap(this.level.weapons, this.hero.hero, this.grabsGun, null, this);
		
        this.level.update(this.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero);
        this.pause.update();
        this.enemy.update();
		this.level.updateEnemyAttack(this.enemy,this.hero);
    },

    grabsGun : function(hero, weapon) {
        this.weapon.change(weapon);
        this.hero.change(weapon);
        this.panel.change(weapon);
        weapon.kill();
    },

    killEnemy : function(enemy, bullet) {
        this.enemy.kill(enemy);
//        enemy.kill();
        bullet.kill();
    }
}