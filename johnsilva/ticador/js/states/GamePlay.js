/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
    
	preload: function () {
		var cursors;
		var playerX,playerY, fishXLeft,fishXRight, runY;
		var fishes, lastY,lastFish;
		var score, style,labelScore;
        var barraDeTempo, timerValue,timer,timerSizeBar,bar;//barra de tempo
		var overlap, initTap, showEnd;
        var labelLevel,LevelText;//variaveis do level
        
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
        
        timerValue = 1000;
        levelText = "Level  0";
        

         
    
        
        
    	bg = this.game.add.sprite(0, 0, 'bg');

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
        
        timer = this.game.time.create(false);
        timer.loop(200,this.decrementTimer, this);
        
        barraDeTempo = this.game.add.text(this.game.world.centerX, 50, timerValue, style);
        barraDeTempo.anchor.set(0.5,0);
        
        labelLevel = this.game.add.text(this.game.world.centerX,450, levelText,style);
        labelLevel.anchor.set(0.5,0);
        
        
        /*bar = game.add.graphics();//adicionando o grafico
    	bar.lineStyle(20, 0x33FF00);
    	bar.moveTo(100,30);
    	bar.lineTo(this.game.world.width-100, 30);
    	bar.endFill();*/

		decrementValue=10;//variavel responsavel pelo aumento do decremento do tempo, valor inicial
    	countLevelText=0;//contador do level, é concatenado com o texto



    	bar = game.add.graphics(100, 50);
  		bar.lineStyle(10, 0x33FF00,1);
  		bar.moveTo(0, 0);
  		bar.lineTo(this.game.width-100, 0);
    
  		bar.scale.x = 1;
    },

	update: function () {
		bar.scale.x -= 0.01;
		if(bar.scale.x <=0){
			bar.scale.x = 0;
			//this.end();
		}
		overlap = false;
		this.game.physics.arcade.overlap(this.player, fishes, this.ticar, null,this);

		labelScore.setText(score);
        barraDeTempo.setText(timerValue);
        
        
		if (cursors.left.isUp ) {
			this.leftUp = true;
		}
		if (cursors.right.isUp ) {
			this.rightUp = true;
		}		

		if(!overlap && !initTap || timerValue<=0 || bar.scale.x ==0){
			//labelScore.setText("Game Over");
			if(!showEnd){
                timer.stop();
				this.game.input.keyboard.stop();
				this.end();
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

    decrementTimer: function(){//metodo que decrementa o tempo, decrement value é recebido por nivel
    	timerValue=timerValue-decrementValue;
    	if(timerValue < 0)
    		timerValue = 0;
    },
    
    upLevelTest:function(){
    	if(score%10==0){//testa o up de level seguindo o score do jogador
    		decrementValue = decrementValue+10;//valor aumentado de 10 em 10 pontos, temos que testar
    		this.upLevelText();
    	}
    },
    
    upLevelText:function(){//muda o texto do level -- poderiamos futuramente colocar uma animação
    	countLevelText++;
    	labelLevel.setText("Level " +countLevelText);
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
            timerValue = timerValue+decrementValue;//incrementa no timerValue
			f.frame++;
            timer.start();
			ticou = false;
            this.upLevelTest();
		}
		overlap = true;
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
    	game.debug.body(this.player);
    	
    	/*fishes.forEach(function (f){ 
			game.debug.body(f);
		}, this);*/
    },
};