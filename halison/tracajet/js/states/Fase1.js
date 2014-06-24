
State.Fase1= function (game) {
	"use strict";
	this.game = game;
	this.tracajet; 
	this.star;
	this.plataform; 
	this.map;
	this.layer;
	this.jacareLeft;
	this.jacareRight;
	this.jacare1;
	this.jacare2;
	this.jacare3;
	this.jacare4;
	this.speed = 90;
	this.MIN_DISTANCE = 10;
	this.MAX_DISTANCE = 300;
	this.cursors;
	this.enemies;
	this.nameEnemy = 'Enemies';
	this.nameSheets = 'Sheet';
	this.nameKeys = 'Keys';
	this.sheets;
	this.keys;
	this.txtScore;
	this.txtPause;
	this.contKeys = 0;
	this.TOTAL_KEYS = 8;
	this.imgLife;
	this.txLife;
	this.twenLife;
	this.soundMusic;
	this.soundGetSheet;
	this.soundGameOver;
	this.soundGetKey;
	this.soundColision;
	this.soundWalk;
	this.isPlayWalk = false;
};

var folha;
var folhas;

State.Fase1.prototype = {

	preload: function () {
		//Agora carrega no GameSplash para não gerar delay
		/* game.load.tilemap('mapaFase1','assets/1aFase/mapaFase1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height);
		game.load.spritesheet('folhas', "assets/1aFase/folhas_120-40.png",40,40);
		game.load.spritesheet('jacare', "assets/1aFase/jacare_spritesheet_240-80.png",40,40);
		game.load.image('bgF1',Config.game.fase1.background);
		game.load.image('tilesetPlataformaF1','assets/1aFase/assets_1.png');
		game.load.image('key_8080','assets/1aFase/chave_80-80.png');
		game.load.image('imgLife','assets/tracajet1_20-40.png',20,40); */
		this.soundMusic =  game.add.audio('soundGame',1,true);
		this.soundGetSheet = game.add.audio('soundGetSheet',1,true);
		this.soundGameOver = game.add.audio('soundGameOver',1,true);
		this.soundGetKey = game.add.audio('soundGetKey',1,true)
		this.soundColision = game.add.audio('soundColision',1,true)
		this.soundWalk = game.add.audio('walk',1,true);
	},

	create: function () {
		game.world.setBounds(0, 0, 2880, 1200);
		var bgF1 = game.add.tileSprite(0, 0, game.cache.getImage('bgF1').width,game.cache.getImage('bgF1').height, 'bgF1');
		bgF1.fixedToCamera = true;
		
		game.physics.startSystem(Phaser.Game.ARCADE);
		this.map = game.add.tilemap('mapaFase1'); //adicionando o map
		this.map.addTilesetImage('assets_1','tilesetPlataformaF1' );// primeiro vem nome do arquivo, depois o apelido
		
		this.layer = this.map.createLayer('TileWorld');
		
		this.soundMusic.play('',0,0.4,true);
		
		//Colide com esses tilesets
		this.map.setCollision([8,9,10,11,12,13,14,17,18,19,20,21,22], true,'TileWorld'); // 0 espaco vazio 1 em diante os tiles do tileset
		//Se tocar em algun desses tilesets morre
		this.map.setTileIndexCallback([15,16,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,47,48,55,56],this.gameOver,this);
		this.layer.resizeWorld(); //seta o mundo com as alterações feitas
		//Sprite do tracajet
		this.tracajet = game.add.sprite(20, game.cache.getImage('bgF1').height - 120, 'tracajet');
		this.tracajet.animations.add('walk',[0,1,2,1],6,false);
		this.tracajet.animations.add('swim',[5,6,7],6,false);
		this.tracajet.animations.add('startSwim',[3,4],2,true);
		game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		
		this.tracajet.body.acceleration.y = 20;
		this.tracajet.body.collideWorldBounds = true;
	    this.tracajet.body.drag.x = 200;
		this.tracajet.anchor.setTo(.5,.5);
	    this.tracajet.body.gravity.y = 30;
		this.tracajet.body.setSize(35, 78,0,0);
		this.tracajet.isImmortal = false;
	    game.camera.follow(this.tracajet);

	    //Group jacares
	    this.enemies =  this.game.add.group();
		this.enemies.enableBody = true;
		this.map.createFromObjects(this.nameEnemy, 42, 'jacare', 0, true, false, this.enemies);
		//Configura jacares
		this.enemies.forEach(this.setupEnemies,this);  

		//Groups folhas
		this.sheets = this.game.add.group();
		this.sheets.enableBody  = true;
		this.map.createFromObjects(this.nameSheets,7,'folhas',0,true,false,this.sheets);

		//Grupo chaves
		this.keys = this.game.add.group();
		this.keys.enableBody = true;
		this.map.createFromObjects(this.nameKeys,1,'key_8080',0,true,false,this.keys);		
		

		//Cursor
		this.cursors = this.game.input.keyboard.createCursorKeys();


		//Score
		var moduloPositionX = Math.abs(this.game.world.position.x);
		var moduloPositionY = Math.abs(this.game.world.position.y); 
		this.txtScore = this.game.add.text(moduloPositionX  + this.game.width - 100,moduloPositionY + 20, "", {
			font: "20px Arial",
			fill: "#ff0044",
			align: "left"
		});
		this.txtScore.setText("Score : " + Config.game.score.score);
		
		//Life
		this.imgLife = game.add.image(moduloPositionX  + 100,moduloPositionY,'imgLife');
		this.txLife = this.game.add.text(moduloPositionX + 130,moduloPositionY + 20, "", {
			font: "20px Arial",
			fill: "#ff0044",
			align: "left"
		});
		this.txLife.setText("x " + Config.game.score.lifes);
		this.game.input.keyboard.addCallbacks(this,this.changeGameState);
	},

	update: function () {
		game.physics.arcade.collide(this.tracajet, this.layer);
		game.physics.arcade.collide(this.enemies,this.layer);
	    game.physics.arcade.overlap(this.enemies, this.tracajet,this.gameOver, null,this);
	    game.physics.arcade.overlap(this.sheets,this.tracajet,this.increaseScore,null,this);
	    game.physics.arcade.overlap(this.keys,this.tracajet,this.increaseContKeys,null,this);
	    this.updateTracajet();
	    this.updateEnemies();
	    this.updateScorePosition();
		
	}
	,
	increaseContKeys : function(tracajet,key){
		this.soundGetKey.play('',0,0.5,false);
		key.kill();
		this.contKeys ++;
		if(this.contKeys === this.TOTAL_KEYS){
			/* var moduloPositionX = Math.abs(game.world.position.x);
			var moduloPositionY = Math.abs(game.world.position.y); 
			this.game.paused = true;
			var dieText = this.game.add.text(moduloPositionX  + game.width/3,moduloPositionY +game.height/3, "", {
				font: "48px Arial",
				fill: "#ff0044",
				align: "left"
			});
			dieText.setText("YOU WIN");  */
			this.game.state.start('Fase2');
		}
	}
	,
	updateScorePosition : function(){
		var moduloPositionX = Math.abs(this.game.world.position.x) +  this.game.width -100;
		var moduloPositionY = Math.abs(this.game.world.position.y) + 20; 
		this.txtScore.x = moduloPositionX;
		this.txtScore.y = moduloPositionY;
		
		this.imgLife.x = moduloPositionX - this.game.width + 105;
		this.imgLife.y = moduloPositionY - 18;
		
		this.txLife.x =  moduloPositionX - this.game.width + 125;
		this.txLife.y = moduloPositionY;
	}
	,
	setupEnemies : function(jacare){
		jacare.animations.add('left',[0,1,2,3,4,5,6,7,8,9],10,true);
		jacare.animations.add('right',[10,11,12,13,14,15,16,17,18,19],10,true);
		game.physics.enable(jacare, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		jacare.body.collideWorldBounds = true;
		this.twinEsquerda(jacare);
		
	},
	twinDireita : function(jacare) {
		jacare.animations.stop();
		jacare.animations.play("right");
		var t = game.add.tween(jacare);
		t.to({x: jacare.body.x - 320, y: jacare.body.y}, 2000 + Math.random()*3000 /*duration of the tween (in ms)*/, 
				Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/, 50 + Math.random()*50 /*delay*/, false /*yoyo?*/);
		t.onComplete.addOnce(this.twinEsquerda, this);
		t.start();
		
	},
	twinEsquerda : function(jacare){
		jacare.animations.stop();
		jacare.animations.play("left");
		var t = game.add.tween(jacare);
		t.to({x: jacare.body.x+320, y: jacare.body.y}, 2000 + Math.random()*3000 /*duration of the tween (in ms)*/, 
				Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/,  50 + Math.random()*50 /*delay*/, false /*yoyo?*/);
		t.onComplete.addOnce(this.twinDireita, this);
		t.start();
	}
	,
	updateEnemies : function(){
		/*this.enemies.forEachExists(function(jacare){
			if(this.tracajet.body.y>=300){
				this.followTracajet(jacare);
			}
		},this);*/
	}
	,
	updateTracajet : function(){
		
		this.tracajet.body.velocity.x = 0;
		var orientation = 0;
		 if ( this.cursors.left.isDown) { // vai para esquerda
		 	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    	orientation = 1;
			this.tracajet.body.velocity.x = -this.speed;
	    	this.tracajet.animations.play('walk');
	    	this.tracajet.scale.x = -1;

	    	if(!this.tracajet.body.onFloor()){
	    		this.tracajet.body.setSize(35, 50,0,0);
	    		this.game.add.tween(this.tracajet).to({
                                angle : -70
                        }, 20).start();
	    	}

	    }
	    else if (this.cursors.right.isDown ) { // vai para direita
			if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    	this.tracajet.body.velocity.x = this.speed;
	    	this.tracajet.scale.x = +1;  // espelha se antes 1
	    	this.tracajet.animations.play('walk');

	    	if(!this.tracajet.body.onFloor()){
	    		this.tracajet.body.setSize(35, 50,0,0);
	    		
	    		this.game.add.tween(this.tracajet).to({
                                angle : 70
                        }, 20).start();
	    	}
	    }
	    else if (this.cursors.up.isDown ) { // vai para cima
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    	this.tracajet.body.velocity.y = -this.speed;
			this.tracajet.animations.play('walk');
			if(!this.tracajet.body.onFloor()){
				this.tracajet.body.setSize(35, 50,0,0);
				this.game.add.tween(this.tracajet).to({
                                angle : 0
                        }, 20).start();
			}
	    }
	    else if (this.cursors.down.isDown ) { // vai para cima
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    	this.tracajet.body.velocity.y = this.speed;
	    	this.tracajet.animations.play('walk');
			
			if(!this.tracajet.body.onFloor()){
				this.tracajet.body.setSize(35, 50,0,0);
				this.game.add.tween(this.tracajet).to({
                                angle : -180
                        }, 20).start();
			}else{
				this.game.add.tween(this.tracajet).to({
                                angle : 0
                        }, 20).start();
			}
	    }
	    else{
	    	this.isPlayWalk = false;
	    	this.soundWalk.stop();
	    	this.tracajet.body.setSize(35, 78,0,0);
	    	this.tracajet.animations.stop();
	    	this.tracajet.frame = 0;
			if(this.tracajet.body.onFloor()){
				this.game.add.tween(this.tracajet).to({
                                angle : 0
                        }, 20).start();
			}

	    }
	}
	,
	playWalk : function(){
		this.soundWalk.play('',0,0.5,true);
		this.isPlayWalk = true;
	}
	,
	tracajetEatStar: function (dino, star)	{
		this.star.kill();
	},
	
	gameOver: function(obj){
		if(obj != undefined && obj.key != 'jacare' && !this.tracajet.isImmortal){
			if(Config.game.score.lifes == 0){
				this.tracajet.kill();
				var moduloPositionX = Math.abs(game.world.position.x);
				var moduloPositionY = Math.abs(game.world.position.y); 
				var dieText = this.game.add.text(moduloPositionX  + game.width/3,moduloPositionY +game.height/3, "", {
					font: "48px Arial",
					fill: "#ff0044",
					align: "left"
				});
				dieText.setText("GAME OVER");
				this.soundGameOver.play('',0,0.5,false);
			}else{
				this.soundColision.play('',0,0.5,false);
				this.tracajet.isImmortal = true;
				Config.game.score.lifes--;
				this.txLife.setText("x " + Config.game.score.lifes);
				this.tracajet.alpha = 0;
				this.twenLife = this.game.add.tween(this.tracajet).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 50, true);
				this.twenLife.start()
				this.game.time.events.add(Phaser.Timer.SECOND * 5, this.updateIsImmortal, this);
			}
		}
	},
	updateIsImmortal : function(){
			this.twenLife.stop();
			this.tracajet.alpha = 1;
			this.tracajet.isImmortal = false;
	}
	,
	followTracajet: function(jacare){
		
		var distance = this.game.math.distance(jacare.x, jacare.y, this.tracajet.x, this.tracajet.y);

	    if (distance > this.MIN_DISTANCE && distance < this.MAX_DISTANCE) {
		
			  if (this.tracajet.body.x < jacare.body.x)
			  {
				jacare.animations.play('left');  
			    jacare.body.velocity.x = 45 * -1;
			    
			  }
			  else
			  {
				  jacare.animations.play('right');  
				  jacare.body.velocity.x = 45;
				  
			  }
			    if (this.tracajet.body.y < jacare.body.y)
			  {
			    	jacare.body.velocity.y = 45 * -1;
			  }
			  else
			  {
				  jacare.body.velocity.y = 45;
			  }
	    }else{
	    	jacare.animations.stop();
	    }
	},
	increaseScore : function(tracajet,sheet){
		this.soundGetSheet.play('',0,1,false);
		sheet.kill();
		Config.game.score.score += 1;
		this.txtScore.setText("Score : " + Config.game.score.score);
	},
	changeGameState : function(event){
		if(event.keyCode === Phaser.Keyboard.ENTER){
			if(this.game.paused){
				this.resumeGame();
			}else{
				this.pauseGame();
			}
		}else if(event.keyCode === Phaser.Keyboard.P){
			if(this.game.paused){
				this.resumeGame();
			}else{
				this.pauseGame();
			}
		}
	
	}
	,
	pauseGame : function (){
		
		this.game.paused = true;
		var moduloPositionX = Math.abs(this.game.world.position.x);
		var moduloPositionY = Math.abs(this.game.world.position.y); 
		this.txtPause = this.game.add.text(moduloPositionX  + game.width/3 + 50,moduloPositionY + game.height/3 + 50, "", {
			font: "50px Arial",
			fill: "#ff0044",
			align: "right"
		});
		this.txtPause.setText("Paused");
	},
	resumeGame : function (event){
		if(this.game.paused){
			this.txtPause.destroy();
			this.game.paused = false;
		}
	}

};


