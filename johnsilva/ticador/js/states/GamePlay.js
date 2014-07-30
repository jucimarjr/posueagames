/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		var cursors;
		var playerX,playerY, fishXLeft,fishXRight, frame,runY;
		var fishes, lastY,lastFish;
	},
	create: function () {
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		playerY = 400;
		playerX = 100;
		fishXLeft = 120;
		fishXRight = 300;
		frame = 0;
		runY = 40;
		lastY = null;
		lastFish = null;
		lastHeight = 0;

		this.game.add.sprite(0, 0, 'bg');

		this.player = this.game.add.sprite(playerX, playerY ,'player');
		this.game.physics.enable(this.player);
		this.player.animations.add('ticar',[0,1,0],30,false);
		this.player.body.setSize(this.player.width, 10, 0, 5);
		this.player.anchor.setTo(.5, .5);

		fishes = game.add.group();
		this.addFishes();
		cursors = this.game.input.keyboard.createCursorKeys();
		this.ticou = false;
	},

	update: function () {

		this.game.physics.arcade.overlap(this.player, fishes, this.ticar, null,this);

		if (cursors.left.isUp ) {
			this.leftUp = true;
		}
		if (cursors.right.isUp ) {
			this.rightUp = true;
		}		

		if (cursors.left.isDown && this.leftUp) {		
			this.run();
			this.leftUp = false;
			this.changeSprite(-1);
			this.player.position.setTo(playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
		}
		else if(cursors.right.isDown && this.rightUp){
			this.run();
			this.rightUp = false;
			this.changeSprite(1);
			this.player.position.setTo(Config.global.screen.width-playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
		}
	},

	changeSprite: function(scale){
		this.player.scale.x = scale;
		this.player.scale.x = (-1)*scale;
	},

	run: function(){
		lastY = 1000;
		fishes.forEach(function (f){ 
			f.y += runY;			
			if(f.y < lastY){
				lastY = f.y;
				lastFish = f;
			}
		}, this);
		fishes.forEach(function (f){
			if( (f.y - (f.height/2)) >= Config.global.screen.height){
				var posY = lastFish.y-(lastFish.height+f.height)/2;
				this.resetPosition(f, posY);
				//frame = 0;
				//f.frame = 0;
			}
		}, this);
	},

	resetPosition: function(fish, y){
		var rnd = this.game.rnd.integerInRange(-10, 9);
		if(rnd < 0)
			fish.reset(fishXLeft, y);
		else
			fish.reset(fishXRight, y);
	},

	addFishes: function(){
		for(var i=0;i<25;i++){
			var rnd = this.game.rnd.integerInRange(1, 10);
			if(rnd <= 2)
				this.fishRnd = 'fish2';
			else if(rnd <= 5)
				this.fishRnd = 'fish3';
			else if(rnd <= 10)
				this.fishRnd = 'fish4';

			var fish = this.game.add.sprite(-200, 200, this.fishRnd);

			this.game.physics.enable(fish);
			fish.body.setSize(fish.width, fish.height-10, 0, 0);
			fish.anchor.setTo(.5, .5);
			/*if(lastY==null)
				lastY = playerY-10-5-fish.height/2;
			else
				lastY -= (lastFish.height+fish.height)/2;*/
			if(lastFish==null)
				this.newY = playerY-10-5-fish.height/2;
			else
				this.newY = lastFish.y - (lastFish.height+fish.height)/2;
			
			this.resetPosition(fish, this.newY);
			lastFish = fish;
			fishes.add(fish);
		}
	},

	ticar: function(player, fish){
		if(ticou){
			if(++frame > 3)
				fish.frame = 3;
			else
				fish.frame = frame;
			ticou = false;
		}
	},

	end: function(){
		/*this.game.state.start('End');
		return;*/
	},

    render: function (){
    	game.debug.text(lastY,32,32);
    	game.debug.body(this.player);
    	
    	/*fishes.forEach(function (f){ 
			game.debug.body(f);
		}, this);*/
    },
};