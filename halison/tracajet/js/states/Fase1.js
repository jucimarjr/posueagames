
// Foi realizada mudanï¿½a para utilizar o conceito de estados do phaser
// Todos os estados sï¿½o declarados no Main.js
// Utilize sempre 'this.' para declarar as variï¿½veis globais do estado
// Utilize sempre 'this.' para executar os metodos do estado



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

	this.speed = 70;

};

var folha;
var folhas;

State.Fase1.prototype = {

	preload: function () {
		game.load.tilemap('mapa','assets/1aFase/mapaFase1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height); // 200x160 eh o tamanho do frame da sprite
		game.load.spritesheet('folhas', "assets/1aFase/folhas_120-40.png",40,40);
		game.load.spritesheet('jacare', "assets/1aFase/jacare_spritesheet_240-80.png",40,40);
		//game.load.image('star',  Config.game.star.dir);
		//game.load.image('block', Config.game.tileset.dir);
		game.load.image('bg',"assets/1aFase/bg2_600-1920.png");
		game.load.image('tilesetPlataforma','assets/1aFase/assets_1.png');
		
	},

	create: function () {
		
	  /* var tracajetCG = game.physics.p2.createCollisionGroup();
	   var jacare1CG = game.physics.p2.createCollisionGroup();
	   var jacare2CG = game.physics.p2.createCollisionGroup();	
	   */
		
		var bg = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('bg').height, 'bg');

		
		game.physics.startSystem(Phaser.Game.ARCADE);
		
		this.map = game.add.tilemap('mapa'); //adicionando o map
		this.map.addTilesetImage('assets_1','tilesetPlataforma' );// primeiro vem nome do arquivo, depois o apelido

		
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld(); //seta o mundo com as alteraÃ§Ãµes feitas
		this.map.setCollisionBetween(1,12, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset

        //funcao que cria os objetos
//        group = game.add.group();
//        group.enableBody = true;
//        map.createFromObjects('Camada de Objetos 1',4, 'tilesetPlataforma', 0,true,false, group);
//        group.forEach(function (coxa){ coxa.body.allowGravity = false}, this); // faz com que as coxas nao caiam


		this.tracajet = game.add.sprite(100, 100, 'tracajet');
		this.tracajet.animations.add('walk',[0,1,2,1],6,false);
		this.tracajet.animations.add('swim',[5,6,7],6,false);
		this.tracajet.animations.add('startSwim',[3,4],4,true);
		game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		
		this.tracajet.body.acceleration.y = 20;
		this.tracajet.body.collideWorldBounds = true;
	    //tracajet.body.drag.x = 700;
		this.tracajet.anchor.setTo(.5,.5);
	    //tracajet.body.gravity.y = 150;
	    game.camera.follow(this.tracajet);

	    
		//    star = game.add.group();
		//    star.create( 500, 50, 'osso');
		//    game.physics.enable(star, Phaser.Physics.ARCADE);
		//
		//    plataform = game.add.group();
		//    plataform.enableBody = true;
		
		//    //cria um bloco para o dino ficar em cima
		//    var block = plataform.create(350, 250, 'bloco');
		//    block.body.immovable = true;
	    
	    this.cursors = game.input.keyboard.createCursorKeys();
	    
	    //cria os jacarés
	    this.jacare1 = game.add.sprite(300, 450, 'jacare');
		this.jacare1.animations.add('left',[0,1,2,3,4,5],10,true);
		this.jacare1.animations.add('right',[6,7,8,9,10,11],10,true);
		game.physics.enable(this.jacare1, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.jacare1.body.collideWorldBounds = true;
		//game.add.tween(this.jacare1).to({ x: -200 }, 5500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
	    
	    //this.jacare1.body.collides(this.tracajet);
		
		//cria os jacarés
	    this.jacare2 = game.add.sprite(600, 960, 'jacare');
		this.jacare2.animations.add('left',[0,1,2,3,4,5],10,true);
		this.jacare2.animations.add('right',[6,7,8,9,10,11],10,true);
		game.physics.enable(this.jacare2, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.jacare2.body.collideWorldBounds = true;
		
	},


	update: function () {
	    game.physics.arcade.collide(this.tracajet, this.layer);
	    game.physics.arcade.collide(this.jacare2, this.layer);
	    game.physics.arcade.collide(this.jacare1, this.layer);
	    game.physics.arcade.overlap(this.tracajet, this.star, this.tracajetEatStar,null,this);
	    game.physics.arcade.overlap(this.tracajet, [this.jacare1, this.jacare2], this.gameOver,null,this);
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
	//		tracajet.animations.play('jump');
	        }
	    else if (this.cursors.down.isDown ) { // vai para cima
	    	this.tracajet.body.velocity.y = this.speed;
	//		tracajet.animations.play('jump');
	    }
	    else{
	    	this.tracajet.animations.stop();
	    	this.tracajet.frame = 0;
	    	this.jacare1.animations.stop();
	    	this.jacare1.frame = 5;
	    	
	    	/*this.jacare2.animations.stop();
	    	this.jacare2.frame = 0;*/
	    }
	    
	    if(this.tracajet.body.y>=300){
	    	this.followTracajet();
	    }
	    
	},
	
	tracajetEatStar: function (dino, star)	{
		this.star.kill();
	},
	
	gameOver: function(){
		this.tracajet.kill();
		this.jacare1.animations.stop();
    	this.jacare1.frame = 0;
    	this.jacare2.animations.stop();
    	this.jacare2.frame = 0;
		   var dieText = this.game.add.text(game.camera.width / 2, game.camera.height / 2, "", {
		        font: "48px Arial",
		        fill: "#ff0044",
		        align: "left"
		    });
		    dieText.fixedToCamera = false;
		    dieText.setText("GAME OVER");
	},
	
	followTracajet: function(jacare){
		  if (this.tracajet.body.x < this.jacare1.body.x)
		  {
			//this.jacare1.animations.stop();    
			this.jacare1.animations.play('left');  
		    this.jacare1.body.velocity.x = 50 * -1;
		    
		    this.jacare2.animations.play('left');  
		    this.jacare2.body.velocity.x = 50 * -1;
		  }
		  else
		  {
			 // this.jacare1.animations.stop();    
			  this.jacare1.animations.play('right');  
			  this.jacare1.body.velocity.x = 50;
			  
			  this.jacare2.animations.play('right');  
			  this.jacare2.body.velocity.x = 50;
		  }
		    if (this.tracajet.body.y < this.jacare1.body.y)
		  {
		    	this.jacare1.body.velocity.y = 45 * -1;
		    	this.jacare2.body.velocity.y = 45 * -1;
		  }
		  else
		  {
			  this.jacare1.body.velocity.y = 50;
			  this.jacare2.body.velocity.y = 50;
		  }
	}

};


