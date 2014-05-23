var naveSprites, asteroid, fundo;

var game = new Phaser.Game(960, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function preload () {

	game.stage.backgroundColor = "#000000";
	game.load.spritesheet('nave', 'assets/nave.png', 200,160); // 200x160 eh o tamanho do frame da sprite
	game.load.image('vol1', 'assets/vol1.png');
	game.load.image('fundo', 'assets/fundo_960-600');
    game.load.image('asteroid', 'assets/asteroid_80-80.png');
}

function create () {
	//fundo
	
	var bg = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('fundo').height, 'fundo');
    bg.autoScroll(-200, 0);
	
	// CREATE A nave
	naveSprite = game.add.sprite(200, 0, 'nave');
	naveSprite.animations.add('walk',[1,2],6,true);
	naveSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
   
    naveSprite.body.acceleration.y = 100;
 
    naveSprite.body.collideWorldBounds = true; // para no limite inferio da tela
    naveSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    naveSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
    naveSprite.body.gravity.y = 150;
    
   
    // CREATE A Voluntario:
    vol1 = game.add.group();
    vol1.create( 500, 50, 'vol1');
    game.physics.enable(vol1, Phaser.Physics.ARCADE);
    
    // cria o grupo para plataformas
    fundo = game.add.group();
    fundo.enableBody = true;
    
    //cria um bloco para o dino ficar em cima
    var asteroid = asteroid.create(350, 250, 'asteroid');
    bloco.body.immovable = true; // deixa o bloco imovivel
    
    // cria  c
    //var tablado = plataformas.create(0, 450, 'bloco');
    //tablado.body.immovable = true;
    //tablado.scale.setTo(2, 2); // amplia o bloco pra ficar o chao todo


}


