/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
    
	preload: function () {
		var cursors, tapR, tapL;
		var playerX,playerY, fishXLeft,fishXRight, runY;
		var fishes, lastY,lastFish;
		var score, style,labelScore;
        var bar;//barra de tempo
		var overlap, initTap, showEnd;
        var labelLevel,levelText,countLevelText;//variaveis do level        
	},
    
    
	create: function () {
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		playerY = 400; playerX = 100;
		fishXLeft = 120; fishXRight = 300;
		runY = 40;
		lastFish = null;
		score = 0; style = { font: "30px Arial Bold", fill: "#ffffff", align: "center"};
		initTap = true;
		showEnd = false;        
        levelText = "Level  0";       
        
        /*Botão de Tap*/
    	this.game.add.sprite(0, 0, 'bg');
    	tapR = this.game.add.sprite(this.game.world.centerX + 100, this.game.world.height-100, 'btnTapR');
    	tapR.anchor.setTo(.5, .5);
    	tapL = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.height-100, 'btnTapL');
    	tapL.anchor.setTo(.5, .5);
    	this.animTap();
    	/*Botão de Tap*/

		this.player = this.game.add.sprite(playerX, playerY ,'player');
		this.game.physics.enable(this.player);
		this.player.animations.add('ticar',[0,1,0],30,false);
		this.player.body.setSize(this.player.width, 10, 0, 5);
		this.player.anchor.setTo(.5, .5);

		fishes = game.add.group();
		this.addFishes();

		
		cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.keyboard.start();
		this.ticou = false;
		labelScore = this.game.add.text(this.game.world.centerX, 200, score, style);
		labelScore.anchor.set(0.5, 0);        
        
        labelLevel = this.game.add.text(this.game.world.centerX,450, levelText,style);
        labelLevel.anchor.set(0.5,0);
        labelLevel.alpha=0;
        
        
        
        /*bar = game.add.graphics();//adicionando o grafico
    	bar.lineStyle(20, 0x33FF00);
    	bar.moveTo(100,30);
    	bar.lineTo(this.game.world.width-100, 30);
    	bar.endFill();*/

		decrementValue=0.001;//variavel responsavel pelo aumento ou decremento do tempo, valor inicial
    	countLevelText=0;//contador do level, é concatenado com o texto



    	bar = game.add.graphics(100,30);
  		bar.lineStyle(20, 0x33FF00);
  		bar.moveTo(0, 0);
  		bar.lineTo(this.game.world.width-200, 0);
    
  		bar.scale.x = 0.5;
    },

	update: function () {
		Config.global.screen.resize(this.game);
		overlap = false;
		this.game.physics.arcade.overlap(this.player, fishes, this.ticar, null,this);

		labelScore.setText(score);        

		if(!initTap){
			tapL.reset(-100,-100);
			tapR.reset(-100,-100);
		}

		if (cursors.left.isUp ) {
			this.leftUp = true;
		}
		if (cursors.right.isUp ) {
			this.rightUp = true;
		}		

		if(!overlap && !initTap || bar.scale.x ==0){
			if(!showEnd){
				this.game.input.keyboard.stop();
				this.end();
			}
		}else{
			if(initTap == false){
				bar.scale.x -= decrementValue;
				if(bar.scale.x <=0){
					bar.scale.x = 0;
				}
			}
		}

		if (cursors.left.isDown && this.leftUp) {		
			this.run();
			this.leftUp = false;
			this.changeSprite(-1);
			this.player.position.setTo(playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
			initTap = false;
		}        
        
        else if(cursors.right.isDown && this.rightUp){
			this.run();
			this.rightUp = false;
			this.changeSprite(1);
			this.player.position.setTo(Config.global.screen.width-playerX,playerY);			
			this.player.animations.play('ticar');			
			ticou = true;
			initTap = false;
		}		
	},

	changeSprite: function(scale){
		this.player.scale.x = scale;
		this.player.scale.x = (-1)*scale;
	},
    
    upLevelTest:function(){
    	if(score%10==0){//testa o up de level seguindo o score do jogador
    		decrementValue *= 1.07;//valor aumentado em *1.5
            labelLevel.setText("Level "+ ++countLevelText);
            labelLevel.alpha=1;
            this.game.add.tween(labelLevel).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);//faz o texto do level aparecer
            
    	}
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
				f.frame = 0;
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
			fish.frame = 0;

			this.game.physics.enable(fish);
			fish.body.setSize(fish.width, fish.height-10, 0, 0);
			fish.anchor.setTo(.5, .5);
			if(lastFish==null)
				this.newY = playerY-10-5-fish.height/2;
			else
				this.newY = lastFish.y - (lastFish.height+fish.height)/2;
			
			this.resetPosition(fish, this.newY);
			lastFish = fish;
			fishes.add(fish);
		}
	},
    

	ticar: function(player, f){
		if(ticou){
			score++;
			f.frame++;
			ticou = false;
			bar.scale.x += 10*decrementValue;
			if(bar.scale.x > 1)
				bar.scale.x = 1;
            this.upLevelTest();
		}
		overlap = true;
	},

	animTap: function(){
		this.game.add.tween(tapL).to( { x: tapL.x-35 }, 500, Phaser.Easing.Linear.None, true, 0, 500,true);
		this.game.add.tween(tapR).to( { x: tapR.x+35 }, 500, Phaser.Easing.Linear.None, true, 0, 500,true);
	},

	end: function(){
		//Show score
		var bgGO = this.game.add.sprite(-this.game.world.centerX, 50, 'bgGameOver');
		bgGO.anchor.set(0.5, 0);
		this.game.add.tween(bgGO).to( { x: this.game.world.centerX }, 2400, Phaser.Easing.Bounce.Out, true);
		var hScore = localStorage.getItem("highscore"); 
		if (score > hScore) {
        	localStorage.setItem("highscore", score);
        	var text = this.game.add.text(this.game.world.centerX, -200, 'Best ' + score, style);
        	text.anchor.setTo(0.5, 0.5);
        	var text2 = this.game.add.text(this.game.world.centerX, -250, 'Score: ' + score, style);
        	text2.anchor.setTo(0.5, 0.5);
    	}
    	else {
        	var text = this.game.add.text(this.game.world.centerX, -200, 'Best: ' + hScore, style);
        	text.anchor.setTo(0.5, 0.5);
        	var text2 = this.game.add.text(this.game.world.centerX, -250, 'Score: ' + score, style);
        	text2.anchor.setTo(0.5, 0.5);
    	}

    	this.game.add.tween(text).to( { y: 200 }, 2400, Phaser.Easing.Bounce.Out, true);
    	this.game.add.tween(text2).to( { y: 250 }, 2400, Phaser.Easing.Bounce.Out, true);

    	var btPlay = this.game.add.button(this.game.world.centerX, -(50 + bgGO.height), 'btnPlay', this.restart, this, 1, 0, 1);
    	btPlay.anchor.set(0.5, 0.5);
    	this.game.add.tween(btPlay).to( { y: (50 + bgGO.height) }, 2400, Phaser.Easing.Bounce.Out, true);
    	showEnd = true;
	},

	restart: function(){
		this.game.state.start('GamePlay');
	},

    render: function (){
    	//game.debug.body(this.player);
    	
    	/*fishes.forEach(function (f){ 
			game.debug.body(f);
		}, this);*/
    },
};