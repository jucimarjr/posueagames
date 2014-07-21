/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		this.player = game.add.sprite(0, 500 ,'player');
		this.player.animations.add('ticar',[2],5,false);
		this.game.physics.enable(this.player);
		this.player.body.allowGravity = false;
		this.player.body.immovable = true;


	},
	create: function () {
		this.game.physics.startSystem(Phaser.Game.ARCADE);		
	},
	update: function () {
		this.game.physics.arcade.overlap(this.player, this.fish, this.ticar, null,this);

		if (cursors.left.isDown ) {
			this.player.scale.x = 1;
			this.player.scale.x = -1;
		}
		else if(cursors.right.isDown){
			this.player.scale.x = -1; 
			this.player.scale.x = 1;
		}
	},

	ticar: function(){

	},

	end: function(){
		/*this.game.state.start('End');
		return;*/
	},

    render: function (){
    	/*game.debug.text(this.game.world.bounds.width,32,32);
    	game.debug.text(this.game.world.bounds.height,32,64);*/
    	//game.debug.text(this.player.body.x,32,32);
    	//game.debug.text(this.player.body.y,32,64);
    	//game.debug.text(levelConfig.checkPoint.x,200,32);
    	//game.debug.text(levelConfig.player.posX,400,32);
    	//game.debug.text(levelConfig.checkPoint.y,200,64);

    	//game.debug.body(this.player);
    	//game.debug.body(this.thorns);
    	//game.debug.text(frameClimbing,32,32);
    	//game.debug.text(levelConfig.checkPoint.x,32,32);

		/*this.thorns.forEach(function (thorn){ 
			game.debug.body(thorn);
		}, this);*/

		/*this.waters.forEach(function (w){ 
			game.debug.body(w);
		}, this);*/

		/*this.bees.forEach(function (bees){ 
			game.debug.body(bees);
		}, this);*/

		/*this.cipo.forEach(function (c){ 
			game.debug.body(c);
		}, this);*/
    },
};