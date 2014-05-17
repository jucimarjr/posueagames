var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create });
var barrasMedias;
var barrasPqnas;

function preload () {
	game.load.image('fundo', 'assets/fundo-960-600.png');
	game.load.image('plataforma', 'assets/larva-960-138.png');
	game.load.image('barra1', 'assets/barra1-86-28.png');
	game.load.image('barra2', 'assets/barra2-56-29.png');
	game.load.image('barra3', 'assets/barra3-33-28.png');
	game.load.image('bola', 'assets/elipse-51-51.png');
	game.load.image('estrela', 'assets/estrela-22-20.png');
}

function create () {
	//var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'fundo');
	game.add.sprite(0,0, 'fundo');
	game.add.sprite(0,game.world.height-138, 'plataforma');
	game.add.sprite(10,game.world.height-178, 'barra1');
	
	initBarrasMedia();
	initBarrasPqnas();
	bolas();
	estrelas();
}

function initBarrasMedia(){
	
	barrasMedias = game.add.group();
	barrasMedias.create(120,game.world.height-220, 'barra2');
	barrasMedias.create(315,game.world.height-220, 'barra2');
	barrasMedias.create(395,game.world.height-250, 'barra2');
	barrasMedias.create(550,game.world.height-220, 'barra2');
	barrasMedias.create(640,game.world.height-250, 'barra2');
	barrasMedias.create(730,game.world.height-280, 'barra2');
    game.physics.enable(barrasMedias, Phaser.Physics.ARCADE);
}

function initBarrasPqnas(){
	
	barrasPqnas = game.add.group();
	barrasPqnas.create(210,game.world.height-250, 'barra3');
	barrasPqnas.create(510,game.world.height-178, 'barra3');
	barrasPqnas.create(820,game.world.height-310, 'barra3');
	barrasPqnas.create(920,game.world.height-178, 'barra3');
    game.physics.enable(barrasPqnas, Phaser.Physics.ARCADE);
}

function bolas(){
	game.add.sprite(255,game.world.height-250, 'bola');
	game.add.sprite(455,game.world.height-178, 'bola');
	game.add.sprite(860,game.world.height-178, 'bola');
}

function estrelas(){
	/*game.add.sprite(255,game.world.height-250, 'bola');
	game.add.sprite(455,game.world.height-178, 'bola');
	game.add.sprite(860,game.world.height-178, 'bola');*/
}
