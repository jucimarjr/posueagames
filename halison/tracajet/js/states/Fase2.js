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
	this.fruits;
    
};

State.Fase2.prototype = {

    preload: function () {
        game.load.tilemap('mapa','assets/2_Fase/2aFaseJson.json',null,Phaser.Tilemap.TILED_JSON);
    	//game.load.tilemap('mapa','assets/2_Fase/mapa_fase2b.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height); // 200x160 eh o tamanho do frame da sprite
        game.load.spritesheet('monkey', "assets/2_Fase/monkey_spritesheet_240-80.png",40,40);
		game.load.spritesheet('assets2', "assets/2_Fase/assets_2.png",40,40);
        //game.load.image('star',  Config.game.star.dir);
        //game.load.image('block', Config.game.tileset.dir);
        game.load.image('bg',Config.game.fase2.background);
        game.load.image('tilesetPlataforma','assets/2_Fase/p1_480-40.png');
		game.load.image('tilesetPlataforma2','assets/2_Fase/p2_480-40.png');
		game.load.image('tilesetPlataforma3','assets/2_Fase/p3_40-480.png');
		game.load.image('tilesetPlataforma4','assets/2_Fase/p4_40-480.png');
		

    },

    create: function () {

        var bg = game.add.tileSprite(0, 0, game.cache.getImage('bg').width,game.cache.getImage('bg').height, 'bg');


        game.physics.startSystem(Phaser.Game.ARCADE);

        this.map = game.add.tilemap('mapa'); //adicionando o map
        this.map.addTilesetImage('p1_480-40','tilesetPlataforma' );// primeiro vem nome do arquivo, depois o apelido
		this.map.addTilesetImage('p2_480-40','tilesetPlataforma2' );
		this.map.addTilesetImage('p3_40-480','tilesetPlataforma3' );
		this.map.addTilesetImage('p4_40-480','tilesetPlataforma4' );
		
		this.map.addTilesetImage('monkeys','monkey' );
		this.map.addTilesetImage('frutas','assets2' );
        this.layer = this.map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld(); //seta o mundo com as alterações feitas
        this.map.setCollisionBetween(1,48, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset

        //funcao que cria os objetos
        //group = game.add.group();
       /*  group.enableBody = true;
        this.map.createFromObjects('Enemies',1, 'monkey', 0,true,false, group);
        group.forEach(function (coxa){ coxa.body.allowGravity = false}, this); // faz com que as coxas nao caiam */


        this.tracajet = game.add.sprite(100, game.world.height-100, 'tracajet');
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
        
        //Group monkeys
		console.log('entro aki!');
	    this.enemies =  this.game.add.group();
		this.enemies.enableBody = true;
		this.map.createFromObjects(this.nameEnemy,49, 'monkey', 0, true, false, this.enemies);
		//Configura monkeys
		console.log(this.enemies);
		
		this.enemies.forEach(this.setupEnemies,this);
        
		//Groups folhas
		this.fruits = this.game.add.group();
		this.fruits.enableBody  = true;
		this.map.createFromObjects(this.nameFruits,62,'assets2',1,true,false,this.fruits);

    },


    update: function () {

        game.physics.arcade.collide(this.tracajet, this.layer);

        game.physics.arcade.overlap(this.tracajet, this.star, this.tracajetEatStar,null,this);

        if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
            this.tracajet.body.velocity.x = -100;
            this.tracajet.animations.play('walk');
            this.tracajet.scale.x = -1;
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
            this.tracajet.body.velocity.x = 100;
            this.tracajet.scale.x = +1;  // espelha se antes 1
            this.tracajet.animations.play('walk');
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
            this.tracajet.body.velocity.y = -100;
            //		tracajet.animations.play('jump');
        }
        else if ( game.input.keyboard.isDown (Phaser.Keyboard.DOWN) ) { // vai para cima
            this.tracajet.body.velocity.y = 100;
            //		tracajet.animations.play('jump');
        }
        else{
            this.tracajet.animations.stop();
            this.tracajet.frame = 0;
        }
    },

    tracajetEatStar: function (dino, star)	{
        this.star.kill();
    },
    
    setupEnemies : function(monkey){
		console.log('entro');
		monkey.animations.add('left',[0,1,2,3,4,5],10,true);
		monkey.animations.add('right',[6,7,8,9,10,11],5,true);
		game.physics.enable(monkey, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		monkey.body.collideWorldBounds = true;
		//game.add.tween(monkey).to({x: monkey.body.x, y: monkey.body.y}, 1500 + Math.random()*3000 /*duration of the tween (in ms)*/, 
			//	Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/, 50 + Math.random()*50 /*delay*/, false /*yoyo?*/)
			//	.to({x: monkey.body.x+320, y: monkey.body.y}, 1500 + Math.random()*3000 /*duration of the tween (in ms)*/, 
				//Phaser.Easing.Linear.None /*easing type*/, true /*autostart?*/,  50 + Math.random()*50 /*delay*/, false /*yoyo?*/)
				//.loop().start();
		monkey.animations.play("right");
		
	}

};