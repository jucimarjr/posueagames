State.Play = function() {
    this.level = new Level(game),
    this.weapon = new Weapon(game),
    this.hero = new Hero(game);
};

State.Play.prototype = {
    preload:function() {
        this.level.preload();
        this.weapon.preload();
        this.hero.preload();
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        // level
        this.level.create();

        // heroi
        this.hero.create();

        // arma
        this.weapon.create();
    },

    update:function(){
        game.physics.arcade.collide(this.level.layer, this.hero.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero.x, this.hero.hero.y);
    },

}