State.Play = function() {
    this.level = new Level(game, Level1),
    this.panel = new Panel(game),
    this.hero = new Hero(game),
    this.weapon = new Weapon(game);
    this.pause  = new Pause(game);
}

var cursors;

State.Play.prototype = {
    preload:function() {
        this.level.preload();
        this.panel.preload();
        this.hero.preload();
        this.weapon.preload();
        this.pause.preload();
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

        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update:function(){
        game.physics.arcade.collide(this.level.layer, this.hero.hero);
        this.level.update(this.hero);
        this.hero.update();
        this.weapon.update(this.hero.hero);
        this.pause.update();
    },

}