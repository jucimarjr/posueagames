//Play.js
var playState = {

    create: function() { 
		game.physics.startSystem(Phaser.Physics.ARCADE);

		level.create();
		player.create();
    },

    update: function() {
        player.update();  
    }
};