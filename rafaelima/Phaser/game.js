window.onload = function() {

	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var billySprite;
	var life;
	var obstacle1 ;
	var obstacle2 ;
	var plataformas ;

	function preload () {
		game.load.image('background', 'assets/background_960_600.png');
		game.load.image('ground', 'assets/ground_960_28.png');
		game.load.image('obstacle1', 'assets/obstacle1_167_42_03.png');
		game.load.image('obstacle2', 'assets/obstacle2_154_42_03.png');
		game.load.spritesheet('life', 'assets/heart_35_28_2.png', 35,28);
		game.load.spritesheet('billy', 'assets/smoker_76_90_3.png', 76,90);
		// game.load.image('logo', 'assets/logo_547_421_03.png');
	}

	function create () {
		var background = game.add.sprite(0,0, 'background');
		obstacle1 = game.add.sprite(250,350, 'obstacle1');
		obstacle2 = game.add.sprite(720,418.5, 'obstacle2');
		
		plataformas = game.add.group();
		plataformas.enableBody = true;
		
	    var ground = plataformas.create(0, 572, 'ground');
	    ground.body.immovable = true;
	    obstacle1 = plataformas.create(250,350, 'obstacle1');
	    obstacle1.body.immovable = true;
	    obstacle2 = plataformas.create(720,418.5, 'obstacle2');
	    obstacle2.body.immovable = true;
	    		
		// life = game.add.sprite(500,200, 'life');
		// game.physics.enable(life, Phaser.Physics.ARCADE);
	    
	    life = game.add.sprite(800, 400, 'life');
	    life.animations.add('pulse',[0,1],4,true);
		game.physics.enable(life, Phaser.Physics.ARCADE); 
		
		billySprite = game.add.sprite(0, 481.5, 'billy');
		billySprite.animations.add('walk',[0,1,2],9,true);
		billySprite.animations.add('jump',[0,1,2],6,true);
		game.physics.enable(billySprite, Phaser.Physics.ARCADE); 

		billySprite.body.acceleration.y = 100;

		billySprite.body.collideWorldBounds = true; // para no limite inferio da tela
		billySprite.body.drag.x = 50; //desloca 50 e para, s� desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
		billySprite.anchor.setTo(.5,.5); // diminui o espa�o do deslocamento do espelhamento 
		billySprite.body.bounce.y = 0.1; //ilusao que tem elasticidade
		billySprite.body.gravity.y = 10;

		// var ground = plataforms.create (0, game.world.height - 20.5, 'ground')  

	}

	function update () {

		game.physics.arcade.collide(billySprite, plataformas);
		
		// COLISAO COM CORACAO:
		game.physics.arcade.overlap(billySprite, life, billyEatLife,null,this);
		life.animations.play('pulse');

		// PEGA A ENTRADA (tecla pressionada):	
		if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

			billySprite.body.velocity.x = -100;
			billySprite.animations.play('walk');
			billySprite.scale.x = -1; // espelha se antes -1
		}

		else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

			billySprite.body.velocity.x = 100;
			billySprite.scale.x = +1;  // espelha se antes 1
			billySprite.animations.play('walk');
		}

		else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

			billySprite.body.velocity.y = -100;
			billySprite.animations.play('jump');
		}

		else{
//			billySprite.body.velocity.y = 110;
			billySprite.animations.stop();
			billySprite.frame = 0;
		}	
	}

	function billyEatLife (billy,life)	{
		

		life.body.position.x = Math.floor(Math.random() *900);
		life.body.position.y = Math.floor(Math.random() *400);
		game.physics.arcade.overlap(billySprite, life, billyEatLife,null,this);

		
	}
};