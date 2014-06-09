
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
		
	  /* var tracajetCG = game.physics.p2.createCollisionGroup();
	   var jacare1CG = game.physics.p2.createCollisionGroup();
	   var jacare2CG = game.physics.p2.createCollisionGroup();	
	   */
//		game.world.setBounds(0, 0, 2880, 1200);
		
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
		
		//cria os jacarés
	    this.jacare3 = game.add.sprite(500, 1200, 'jacare');
		this.jacare3.animations.add('left',[0,1,2,3,4,5],10,true);
		this.jacare3.animations.add('right',[6,7,8,9,10,11],10,true);
		game.physics.enable(this.jacare3, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.jacare3.body.collideWorldBounds = true;
		
		//cria os jacarés
	    this.jacare4 = game.add.sprite(750, 1800, 'jacare');
		this.jacare4.animations.add('left',[0,1,2,3,4,5],10,true);
		this.jacare4.animations.add('right',[6,7,8,9,10,11],10,true);
		game.physics.enable(this.jacare4, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.jacare4.body.collideWorldBounds = true;
		
		
		
	},


	update: function () {
	    game.physics.arcade.collide(this.tracajet, this.layer);
	    game.physics.arcade.collide(this.jacare2, this.layer);
	    game.physics.arcade.collide(this.jacare1, this.layer);
	    game.physics.arcade.collide(this.jacare3, this.layer);
	    game.physics.arcade.collide(this.jacare4, this.layer);
	    game.physics.arcade.overlap(this.tracajet, this.star, this.tracajetEatStar,null,this);
	    game.physics.arcade.overlap(this.tracajet, this.jacare1, this.gameOver,null,this);
	    game.physics.arcade.overlap(this.tracajet, this.jacare2, this.gameOver,null,this);
	    game.physics.arcade.overlap(this.tracajet, this.jacare3, this.gameOver,null,this);
	    game.physics.arcade.overlap(this.tracajet, this.jacare4, this.gameOver,null,this);
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
	//		tracajet.animations.play('jump');
	        }
	    else if (this.cursors.down.isDown ) { // vai para cima
	    	this.tracajet.body.velocity.y = this.speed;
	    	this.tracajet.animations.play('walk');
	//		tracajet.animations.play('jump');
	    }
	    else{
	    	this.tracajet.animations.stop();
	    	this.tracajet.frame = 0;
	    	this.jacare1.animations.stop();
	    	this.jacare1.frame = 5;
	    }
	    
	   // if(this.tracajet.body.y>=300){
	    	this.followTracajet(this.jacare1);
	    	this.followTracajet(this.jacare2);
	    	this.followTracajet(this.jacare3);
	    	this.followTracajet(this.jacare4);
	  //  }
	    
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
		var moduloPositionX = Math.abs(game.world.position.x);
		var moduloPositionY = Math.abs(game.world.position.y); 
	    var dieText = this.game.add.text(moduloPositionX  + game.width/3,moduloPositionY +game.height/3, "", {
			font: "48px Arial",
			fill: "#ff0044",
			align: "left"
		});
		//dieText.fixedToCamera = false;
		dieText.setText("GAME OVER");
	},
	
	followTracajet: function(jacare){
		
		var distance = this.game.math.distance(jacare.x, jacare.y, this.tracajet.x, this.tracajet.y);

	    // If the distance > MIN_DISTANCE then move
	    if (distance > this.MIN_DISTANCE && distance < this.MAX_DISTANCE) {
		
		
			  if (this.tracajet.body.x < jacare.body.x)
			  {
				//this.jacare1.animations.stop();    
				jacare.animations.play('left');  
			    jacare.body.velocity.x = 50 * -1;
			    
			  }
			  else
			  {
				 // this.jacare1.animations.stop();    
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
	}	    

};


