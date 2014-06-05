State.Play = function() {
    this.level = new Level(game, Level1),
    this.panel = new Panel(game),
    this.hero = new Hero(game),
    this.weapon = new Weapon(game, Weapon2);
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

        // level
        this.level.create();

        // panel
        this.panel.create();

        // heroi
        this.hero.create();

        // arma
        this.weapon.create();

        //pause menu
        this.pause.create()

        //inimigos
        this.enemy.create(this.level.map);
		
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(this.level.layer, this.hero.hero);
		game.physics.arcade.collide(this.level.layer,this.enemy.enemies);
		//game.physics.arcade.overlap(this.level.weapons, this.hero.hero, this.grabsGun, null, this);
		
        this.level.update(this.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero);
        this.pause.update();
        this.enemy.update();
		this.level.updateEnemyAttack(this.enemy,this.hero);
    },

    grabsGun : function(hero, weapon) {
        if(weapon.key == 'weapon1')
            this.weapon.change(Weapon1);
        else if(weapon.key == 'weapon2')
            this.weapon.change(Weapon2);
        else if(weapon.key == 'weapon3')
            this.weapon.change(Weapon3);
        weapon.kill();
    },
}