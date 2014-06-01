State.Play = function() {
    this.level = new Level(game, Level1),
    this.hero = new Hero(game),
    this.weapon = new Weapon(game);
}

var cursors;

State.Play.prototype = {
    preload:function() {
        this.level.preload();
        this.hero.preload();
        this.weapon.preload();
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

        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(this.level.layer, this.hero.hero);
        this.level.update(this.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero.x, this.hero.hero.y);
    },

}