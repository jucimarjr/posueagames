/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		var cursors;
		var playerX,playerY, fishX, frame,runY;
		var fishes, lastY;
	},
	create: function () {
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		playerY = 480;
		playerX = 100;
		fishX = 120;
		frame = 0;
		runY = 40;
		lastY = -1;


		this.game.add.sprite(0, 0, 'bg');

		this.player = this.game.add.sprite(playerX, playerY ,'player');
		this.game.physics.enable(this.player);
		this.player.animations.add('ticar',[0,1,0],30,false);
		this.player.body.setSize(this.player.width, 10, 0, 0);
		this.player.anchor.setTo(.5, .5);

		fishes = game.add.group();
		fishes.createMultiple(10, 'fish2');
		//this.addFishes();
		/*this.fish2 = this.game.add.sprite(fishX, -60,'fish2');
		this.game.physics.enable(this.fish2);
		this.fish2.body.setSize(this.fish2.width, this.fish2.height-10, 0, 0);
		this.fish2.anchor.setTo(.5, .5);*/

		cursors = this.game.input.keyboard.createCursorKeys();
		this.ticou = false;
	},
	update: function () {		

		this.addOneFish();
		/*this.game.physics.arcade.overlap(this.player, this.fish2, this.ticar, null,this);*/

		if (cursors.left.isUp ) {
			this.leftUp = true;
		}
		if (cursors.right.isUp ) {
			this.rightUp = true;
		}		

		if (cursors.left.isDown && this.leftUp) {
			//this.fish2.y+=runY;
			this.run();
			this.leftUp = false;
			this.player.scale.x = -1;
			this.player.scale.x = 1;
			this.player.position.setTo(playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
		}
		else if(cursors.right.isDown && this.rightUp){
			//this.fish2.y+=runY;
			this.run();
			this.rightUp = false;
			this.player.scale.x = 1; 
			this.player.scale.x = -1;
			this.player.position.setTo(Config.global.screen.width-playerX,playerY);			
			this.player.animations.play('ticar');			
			//this.game.physics.arcade.overlap(this.player, this.fish2, this.ticar, null,this);
			ticou = true;
		}

		/*if(this.fish2.y >= Config.global.screen.height){
			this.fish2.y = 0-this.fish2.height/2;
			frame = 0;
			this.fish2.frame = 0;
		}*/
	},

	run: function(){
		fishes.forEachAlive(function (f){ 
			f.y+=runY;
		}, this);
	},

	addFishes: function(){
		
		/*for(var i=0;i<5;i++){			
			var fish = this.game.add.sprite(fishX, -this.fish2.height/2,'fish2');
			this.game.physics.enable(fish);
			this.fish2.body.setSize(this.fish2.width, this.fish2.height-10, 0, 0);
			this.fish2.anchor.setTo(.5, .5);			
			fish.kill();
		}*/
		fishes.createMultiple(10, 'fish2'); 
	},

	addOneFish: function(){
		var fish = fishes.getFirstDead();		
		//fish.revive();
		this.game.physics.enable(fish);
		fish.body.setSize(fish.width, fish.height-10, 0, 0);
		fish.anchor.setTo(.5, .5);

		if(lastY<=0)
			lastY = playerY-(this.player.height+fish.height)/2;
		else
			lastY -= fish2.height/2;
		fish.reset(fishX, lastY);
		//fish.checkWorldBounds = true;
		fish.outOfBoundsKill = true;
		 /*var fish = fishes.getFirstDead();
		 if (fish === null || fish === undefined) return;
		 fish.revive();
		 fish.checkWorldBounds = true;
		 fish.outOfBoundsKill = true;
		 fish.reset(fishX, -fish.height/2);*/
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

    	game.debug.body(this.player);
    	//game.debug.body(this.fish2);
    	
    	/*fishes.forEach(function (f){ 
			game.debug.body(f);
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