
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
	this.sheets;
	this.txtScore;
};

var folha;
var folhas;

State.Fase1.prototype = {

	preload: function () {
		game.load.tilemap('mapa','assets/1aFase/mapaFase1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height);
		game.load.spritesheet('folhas', "assets/1aFase/folhas_120-40.png",40,40);
		game.load.spritesheet('jacare', "assets/1aFase/jacare_spritesheet_240-80.png",40,40);
		game.load.image('bg',Config.game.fase1.background);
		game.load.image('tilesetPlataforma','assets/1aFase/assets_1.png');
	},

	create: function () {
		game.world.setBounds(0, 0, 2880, 1200);
		var bg = game.add.tileSprite(0, 0, game.cache.getImage('bg').width,game.cache.getImage('bg').height, 'bg');

		
		game.physics.startSystem(Phaser.Game.ARCADE);
		this.map = game.add.tilemap('mapa'); //adicionando o map
		this.map.addTilesetImage('assets_1','tilesetPlataforma' );// primeiro vem nome do arquivo, depois o apelido
		
		this.layer = this.map.createLayer('TileWorld');
		this.layer.resizeWorld(); //seta o mundo com as alterações feitas
		//Colide com esses tilesets
		this.map.setCollision([9,10,11,12,13,14,17,18,19,20,21,22], true,'TileWorld'); // 0 espaco vazio 1 em diante os tiles do tileset
		//Se tocar em algun desses tilesets morre
		this.map.setTileIndexCallback([15,16,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,47,48,55,56],this.gameOver,this);

		//Sprite do tracajet
		this.tracajet = game.add.sprite(20, 20, 'tracajet');
		this.tracajet.animations.add('walk',[0,1,2,1],6,false);
		this.tracajet.animations.add('swim',[5,6,7],6,false);
		this.tracajet.animations.add('startSwim',[3,4],4,true);
		game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		
		this.tracajet.body.acceleration.y = 20;
		this.tracajet.body.collideWorldBounds = true;
	    this.tracajet.body.drag.x = 700;
		this.tracajet.anchor.setTo(.5,.5);
	    this.tracajet.body.gravity.y = 150;
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
		this.map.createFromObjects(this.nameSheets,2,'folhas',0,true,false,this.sheets);

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
		
	},

	update: function () {
	    game.physics.arcade.collide(this.tracajet, this.layer)
	    game.physics.arcade.overlap(this.enemies, this.tracajet,this.gameOver, null,this);
	    game.physics.arcade.overlap(this.sheets,this.tracajet,this.increaseScore,null,this);
	    this.updateTracajet();
	    this.updateEnemies();
	    this.updateScorePosition();
	},
	updateScorePosition : function(){
		var moduloPositionX = Math.abs(this.game.world.position.x) +  this.game.width -100;
		var moduloPositionY = Math.abs(this.game.world.position.y) + 20; 
		this.txtScore.x = moduloPositionX;
		this.txtScore.y = moduloPositionY;
	}
	,
	setupEnemies : function(jacare){
		jacare = game.add.sprite(300, 450, 'jacare');
		jacare.animations.add('left',[0,1,2,3,4,5],10,true);
		jacare.animations.add('right',[6,7,8,9,10,11],10,true);
		game.physics.enable(jacare, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		jacare.body.collideWorldBounds = true;
	},
	updateEnemies : function(){
		this.enemies.forEachExists(function(jacare){
			if(this.tracajet.body.y>=300){
				this.followTracajet(jacare);
			}
		},this);
	}
	,
	updateTracajet : function(){
		this.tracajet.body.velocity.x = 0;

		 if ( this.cursors.left.isDown) { // vai para esquerda
	    	this.tracajet.body.velocity.x = -this.speed;
	    	this.tracajet.animations.play('walk');
	    	this.tracajet.scale.x = -1;
	    }
	    else if (this.cursors.right.isDown ) { // vai para direita
	    	this.tracajet.body.velocity.x = this.speed;
	    	this.tracajet.scale.x = +1;  // espelha se antes 1
	    	this.tracajet.animations.play('walk');
	    }
	    else if (this.cursors.up.isDown ) { // vai para cima
	    	this.tracajet.body.velocity.y = -this.speed;
	    	this.tracajet.animations.play('walk');
			this.tracajet.animations.play('jump');
	    }
	    else if (this.cursors.down.isDown ) { // vai para cima
	    	this.tracajet.body.velocity.y = this.speed;
	    	this.tracajet.animations.play('walk');
			this.tracajet.animations.play('jump');
	    }
	    else{
	    	this.tracajet.animations.stop();
	    	this.tracajet.frame = 0;
	    }
	}
	,
	
	tracajetEatStar: function (dino, star)	{
		this.star.kill();
	},
	
	gameOver: function(){
		this.tracajet.kill();
		var moduloPositionX = Math.abs(game.world.position.x);
		var moduloPositionY = Math.abs(game.world.position.y); 
	    var dieText = this.game.add.text(moduloPositionX  + game.width/3,moduloPositionY +game.height/3, "", {
			font: "48px Arial",
			fill: "#ff0044",
			align: "left"
		});
		dieText.setText("GAME OVER");
	},
	
	followTracajet: function(jacare){
		
		var distance = this.game.math.distance(jacare.x, jacare.y, this.tracajet.x, this.tracajet.y);

	    if (distance > this.MIN_DISTANCE && distance < this.MAX_DISTANCE) {
		
			  if (this.tracajet.body.x < jacare.body.x)
			  {
				jacare.animations.play('left');  
			    jacare.body.velocity.x = 50 * -1;
			    
			  }
			  else
			  {
				  jacare.animations.play('right');  
				  jacare.body.velocity.x = 50;
				  
			  }
			    if (this.tracajet.body.y < jacare.body.y)
			  {
			    	jacare.body.velocity.y = 50 * -1;
			  }
			  else
			  {
				  jacare.body.velocity.y = 50;
			  }
	    }else{
	    	jacare.animations.stop();
	    }
	},
	increaseScore : function(tracajet,sheet){
		sheet.kill();
		Config.game.score.score += 1;
		this.txtScore.setText("Score : " + Config.game.score.score);
	}    

};


