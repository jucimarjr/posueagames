/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		var cursors;
		var playerX,playerY, fishX, frame,runY;
	},
	create: function () {
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		playerY = 450;
		playerX = 100;
		fishX = 120;
		frame = 0;
		runY = 40;

		this.game.add.sprite(0, 0, 'bg');

		this.player = this.game.add.sprite(playerX, playerY ,'player');
		this.game.physics.enable(this.player);
		this.player.animations.add('ticar',[0,1,0],15,false);
		this.player.anchor.setTo(.5, .5);

		this.fish2 = this.game.add.sprite(fishX, 0,'fish2');
		this.game.physics.enable(this.fish2);
		this.player.anchor.setTo(.5, .5);


		cursors = this.game.input.keyboard.createCursorKeys();
		this.ticou = false;
	},
	update: function () {		

		this.game.physics.arcade.overlap(this.player, this.fish2, this.ticar, null,this);

		if (cursors.left.isUp ) {
			this.leftUp = true;
		}
		if (cursors.right.isUp ) {
			this.rightUp = true;
		}		

		if (cursors.left.isDown && this.leftUp) {
			this.fish2.y+=runY;
			this.leftUp = false;
			this.player.scale.x = -1;
			this.player.scale.x = 1;
			this.player.position.setTo(playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
		}
		else if(cursors.right.isDown && this.rightUp){
			this.fish2.y+=runY;
			this.rightUp = false;
			this.player.scale.x = 1; 
			this.player.scale.x = -1;
			this.player.position.setTo(Config.global.screen.width-playerX,playerY);			
			this.player.animations.play('ticar');			
			//this.game.physics.arcade.overlap(this.player, this.fish2, this.ticar, null,this);
			ticou = true;
		}

		if(this.fish2.y > Config.global.screen.height){
			this.fish2.y = 0;
			frame = 0;
			this.fish2.frame = 0;
		}
	},

	ticar: function(){
		if(ticou){
			if(++frame > 2)
				this.fish2.frame = 2;
			else
				this.fish2.frame = frame;
			ticou = false;
		}
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