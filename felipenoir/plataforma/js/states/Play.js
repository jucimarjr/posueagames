State.Play = function() {
};

State.Play.prototype = {
    preload:function() {
        game.load.image('bg','assets/images/bg1.jpg');
        game.load.image('hero', Hero.path);
    },

    create:function(){
        game.physics.startSystem(Phaser.Game.ARCADE);
        game.physics.arcade.gravity.y=800;

        game.add.sprite(0,0,'bg');

        var hero = game.add.sprite(0,0,'hero');
        game.physics.enable(hero, Phaser.Physics.ARCADE);

        hero.body.collideWorldBounds = true;
    }

}