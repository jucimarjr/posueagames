// Foi realizada mudan�a para utilizar o conceito de estados do phaser
// Todos os estados s�o declarados no Main.js
// Utilize sempre 'this.' para declarar as vari�veis globais do estado
// Utilize sempre 'this.' para executar os metodos do estado

State.Fase2= function (game) {
    "use strict";
    this.game = game;
    this.tracajet;
    this.star;
    this.plataform;
    this.map;
    this.layer;
    this.enemies;
    this.nameEnemy = 'Enemies';
	this.nameFruits = 'frutas';
	this.nameKeys = 'Keys';
	this.fruits;
	this.cursors;
	this.speed = 90;
	this.imgLife;
	this.txLife;
	this.contJump = 0;
	this.contKeys = 0;
	this.TOTAL_KEYS = 1;
	this.contBananas = 0;
	this.contKeys = 0;
	this.TOTAL_KEYS = 1;
	this.isSuperImmortal = false;
	this.bananaGroup;
	this.isPlayWalk = false;

};

State.Fase2.prototype = {

    preload: function () {
        
		//Nao vao precisar ser carregadas denovo
		/*game.load.image('imgLife','assets/tracajet1_20-40.png',20,40);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height); // 200x160 eh o tamanho do frame da sprite
		game.load.image('key_8080','assets/1aFase/chave_80-80.png');
		game.load.audio('soundGame','assets/sounds/game_sound.wav');
		game.load.audio('soundGetSheet','assets/sounds/get_sheet.mp3');
		game.load.audio('soundGameOver','assets/sounds/game-over.mp3');
		game.load.audio('soundGetKey','assets/sounds/get_key.mp3');
		game.load.audio('soundColision','assets/sounds/colision.wav');
		game.load.audio('walk','assets/sounds/walk.wav');
		game.load.audio('jump','assets/sounds/jump2.wav');
		game.load.audio('killSound','assets/sounds/killEnemy.wav');*/

		this.soundMusic =  game.add.audio('soundGame',1,true);
		this.soundGetSheet = game.add.audio('soundGetSheet',1,true);
		this.soundGameOver = game.add.audio('soundGameOver',1,true);
		this.soundGetKey = game.add.audio('soundGetKey',1,true)
		this.soundColision = game.add.audio('soundColision',1,true)
		this.soundWalk = game.add.audio('walk',1,true);
		this.jump2 = game.add.audio('jump',1,true);
		this.killSound = game.add.audio('killSound',1,true);

    },

    create: function () {

        var bgF2 = game.add.tileSprite(0, 0, game.cache.getImage('bgF2').width,game.cache.getImage('bgF2').height, 'bgF2');
        bgF2.fixedToCamera = false;

        game.physics.startSystem(Phaser.Game.ARCADE);

        this.map = game.add.tilemap('mapaFase2'); //adicionando o map
        this.map.addTilesetImage('p1_480-40','tilesetPlataformaFase2' );// primeiro vem nome do arquivo, depois o apelido
		this.map.addTilesetImage('p2_480-40','tilesetPlataformaFase22' );
		this.map.addTilesetImage('p3_40-480','tilesetPlataformaFase23' );
		this.map.addTilesetImage('p4_40-480','tilesetPlataformaFase24' );
		
		this.map.addTilesetImage('monkeys','monkey' );
		this.map.addTilesetImage('frutas','assets2Fase2' );
        this.layer = this.map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld(); //seta o mundo com as alterações feitas
        this.map.setCollisionBetween(1,48, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset


        this.tracajet = game.add.sprite(100, game.world.height-100, 'tracajet');
        this.tracajet.animations.add('walk',[0,1,2,1],6,false);
        this.tracajet.animations.add('launchFruit',[2,3,2],6,false);
        game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.tracajet.body.setSize(35, 78,0,0);
        this.tracajet.body.acceleration.y = 100;
        this.tracajet.body.collideWorldBounds = true;
        this.tracajet.body.drag.x = 150;
        this.tracajet.anchor.setTo(.5,.5);
        game.camera.follow(this.tracajet);
        
        //Group monkeys
	    this.enemies =  this.game.add.group();
		this.enemies.enableBody = true;
		this.map.createFromObjects(this.nameEnemy,49, 'monkey', 0, true, false, this.enemies);
		this.enemies.forEach(this.setupEnemies,this);
        
		//Groups frutas
		this.fruits = this.game.add.group();
		this.fruits.enableBody  = true;
		this.map.createFromObjects(this.nameFruits,62,'assets2Fase2',1,true,false,this.fruits);
		
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

		
		//Grupo chaves
		this.keys = this.game.add.group();
		this.keys.enableBody = true;
		this.map.createFromObjects(this.nameKeys,61,'key_8080',0,true,false,this.keys);
		this.keys.forEach(function(k){
			k.anchor.setTo(.5,.5);
			game.add.tween(k).to({
                                angle : 180
                        }, 100).start();

		},this);

		this.bananaGroup = game.add.group();
		this.soundMusic.play('',0,0.4,true);
    },


    update: function () {
    	game.physics.arcade.collide(this.tracajet, this.layer);
    	game.physics.arcade.overlap(this.fruits,this.tracajet,this.increaseScore,null,this);
    	game.physics.arcade.overlap(this.enemies, this.tracajet,this.gameOver, null,this);
    	game.physics.arcade.overlap(this.keys,this.tracajet,this.increaseContKeys,null,this);
	    game.physics.arcade.overlap(this.bananaGroup,this.enemies,this.killEnemy,null,this);
	    this.updateTracajet();
	    this.updateScorePosition();
	    this.updateBananaBullet();
	    
    },
    killEnemy : function(banana,enemie){
    	try{
    		this.killSound.play('',0,0.6,false);
    		enemie.kill();
    		banana.kill();
    	}catch(e){}
    }
    ,
    updateBananaBullet : function(){
    	this.bananaGroup.forEachAlive(function(projectile) {
    		projectile.rotation += 5;
    		projectile.animations.play('rotating');
            var moduloPosition = Math.abs(this.game.world.position.x);
			if (projectile.body.x  < moduloPosition || projectile.body.x >  moduloPosition + this.game.width){
			  try{
			  	projectile.kill();	
			  }catch(e){}
			  
            }
        }, this);
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
    
    setupEnemies : function(monkey){
		monkey.animations.add('left',[0,1,2,3,4,5],10,true);
		monkey.animations.add('right',[6,7,8,9,10,11],5,true);
		game.physics.enable(monkey, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		monkey.body.collideWorldBounds = true;
		this.twinEsquerda(monkey);
	},
	twinDireita : function(monkey) {
		monkey.animations.stop();
		monkey.animations.play("left");
		var t = game.add.tween(monkey);
		t.to({x: monkey.body.x - 220, y: monkey.body.y}, 2000 + Math.random()*3000 /*duration of the tween (in ms)*/, 
				Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/, 50 + Math.random()*50 /*delay*/, false /*yoyo?*/);
		t.onComplete.addOnce(this.twinEsquerda, this);
		t.start();
		
	},
	twinEsquerda : function(monkey){
		monkey.animations.stop();
		monkey.animations.play("right");
		var t = game.add.tween(monkey);
		t.to({x: monkey.body.x+220, y: monkey.body.y}, 2000 + Math.random()*3000 /*duration of the tween (in ms)*/, 
				Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/,  50 + Math.random()*50 /*delay*/, false /*yoyo?*/);
		t.onComplete.addOnce(this.twinDireita, this);
		t.start();
	},
	updateTracajet : function(){
		 
		 if ( this.cursors.left.isDown && this.tracajet.body.onFloor()) { // vai para esquerda
			this.tracajet.body.velocity.x = -this.speed;
	    	this.tracajet.scale.x = -1;
	    	this.tracajet.animations.play('walk');
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    }else if(this.cursors.left.isDown && !this.tracajet.body.onFloor() && this.contJump < 5){	    	
	    	this.tracajet.body.velocity.x = -120;
	    	this.tracajet.scale.x = -1;
	    	this.tracajet.animations.play('walk');
	    	this.contJump++;
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    }

	    if (this.cursors.right.isDown && this.tracajet.body.onFloor()) { // vai para direita
	    	this.tracajet.body.velocity.x = this.speed;
	    	this.tracajet.scale.x = 1;  // espelha se antes 1
	    	this.tracajet.animations.play('walk');
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    }else if(this.cursors.right.isDown && !this.tracajet.body.onFloor() && this.contJump < 5){	    	
	    	this.tracajet.body.velocity.x = 120;
	    	this.tracajet.scale.x = 1;
	    	this.tracajet.animations.play('walk');
	    	this.contJump++;
	    	if(!this.isPlayWalk){
		 		this.playWalk();
		 	}
	    }

	    if(!this.cursors.right.isDown && !this.cursors.left.isDown){
	    	this.isPlayWalk = false;
	    	this.soundWalk.stop();
	    }
	    
	    if (this.cursors.up.isDown && this.tracajet.body.onFloor()) { // vai para cima
	    	this.tracajet.body.velocity.y = -190;
			this.tracajet.animations.play('walk');
			this.contJump = 0;
			this.isPlayWalk = false;
			this.soundWalk.stop();
			this.jump2.play('',0,0.6,false);
	    }
	    
	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    	{	
    		this.tracajet.animations.play('launchFruit');
	    	if(this.contBananas > 0){
	    		if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
		        if (this.game.time.now - this.lastBulletShotAt < 200) return;
		        	this.lastBulletShotAt = game.time.now;

		        var bullet = this.bananaGroup.getFirstDead();
		        if(bullet === null || bullet === undefined) return;
		        bullet.revive();
		        bullet.reset(this.tracajet.x + (this.tracajet.scale.x < 0 ? -40 : 40) , this.tracajet.y);
		        bullet.body.velocity.x = this.tracajet.scale.x < 0 ? -300 : 300;
		        bullet.body.velocity.y = 0;
		        bullet.body.allowGravity = false;
		        this.contBananas--;
		        if(this.contBananas >=0)
		        	Config.game.score.score--;
	    	}
    	}
	},
	increaseScore : function(tracajet,sheet){
		sheet.kill();
		this.soundGetSheet.play('',0,1,false);
		Config.game.score.score += 1;
		this.contBananas++;
		this.createBulletBanana();
		this.txtScore.setText("Score : " + Config.game.score.score);
	},
	gameOver: function(obj){
		if(!this.isSuperImmortal){
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
		}
	},
	updateIsImmortal : function(){
			this.twenLife.stop();
			this.tracajet.alpha = 1;
			this.tracajet.isImmortal = false;
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
		}else if(event.keyCode === Phaser.Keyboard.R){
			if(this.contKeys === this.TOTAL_KEYS){
				this.game.state.start('LudusSplash');
			}
		}
	
	},
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
	,
	increaseContKeys : function(tracajet,key){
		key.kill();
		this.contKeys ++;
		this.soundGetKey.play('',0,0.5,false);
		if(this.contKeys === this.TOTAL_KEYS){
			this.isSuperImmortal = true;
			var moduloPositionX = Math.abs(game.world.position.x);
			var moduloPositionY = Math.abs(game.world.position.y); 
			var dieText = this.game.add.text(moduloPositionX  + game.width/3,moduloPositionY +game.height/3, "", {
				font: "48px Arial",
				fill: "#ff0044",
				align: "left"
			});
			var pressText = this.game.add.text(moduloPositionX  + game.width/3 -70,moduloPositionY +game.height/3 + 50, "", {
				font: "48px Arial",
				fill: "#ff0044",
				align: "left"
			});
			dieText.setText("YOU WIN");
			pressText.setText("Press R to Restart");
			this.game.add.tween(pressText).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 50, true).start();
			this.game.time.events.add(Phaser.Timer.SECOND * 10, this.stopGame, this);
		}
	},
	stopGame : function(){
		this.game.paused = true;
	},
	createBulletBanana : function(){
		var bullet = game.add.sprite(0, 0, 'assets2Fase2');
    	this.bananaGroup.add(bullet);
    	bullet.anchor.setTo(.5, .5);
    	bullet.animations.add('rotating',[1],10,true);
    	game.physics.enable(bullet, Phaser.Physics.ARCADE);
    	bullet.kill();
	},
	playWalk : function(){
		this.soundWalk.play('',0,0.4,true);
		this.isPlayWalk = true;
	}

};