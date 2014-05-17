var celulaSprite, fundo, cena, tubo;
var style = {
	font : "40px Arial",
	fill : "#ff0044",
	align : "center"
};

var points;
var scored;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

function preload() {
	game.stage.backgroundColor = "#000000";
	// game.load.spritesheet('celula', 'assets/celula_50-50-2.png', 50, 50);
	game.load.spritesheet('celula', 'assets/bird_275-50-5.png', 55, 50);
	game.load.image('fundo', 'assets/fundo_960-600.png', 960, 600);
	game.load.image('piso', 'assets/piso_960-50.png', 960, 50);
	game.load.image('teto', 'assets/teto_960-50.png', 960, 50);
	game.load.image('tuboinferior', 'assets/tuboinferior_80-480.png', 80, 480);
	game.load.image('tubosuperior', 'assets/tubosuperior_80-480.png', 80, 480);

}

function create() {

	scored = false; 
	points = 0;
	
	// CREATE A fundo:
	// fundo = game.add.image(0, 0, 'fundo');
	// game.physics.enable(fundo, Phaser.Physics.ARCADE);

	// CREATE A tubo superior:
	tubo = game.add.group();
	tubo.create(600, -200, 'tubosuperior');
	tubo.create(600, 400, 'tuboinferior');
	
	game.physics.enable(tubo, Phaser.Physics.ARCADE);

	// CREATE A cena:
	cena = game.add.group();
	cena.create(0, 0, 'teto');
	cena.create(0, 550, 'piso');
	game.physics.enable(cena, Phaser.Physics.ARCADE);

	// CREATE A celula:
	celulaSprite = game.add.sprite(455, 275, 'celula');
	celulaSprite.animations.add('jump', [ 1, 2, 3, 4, 5 ], 15, true);
	game.physics.enable(celulaSprite, Phaser.Physics.ARCADE); // permite que a
	// sprite tenha
	// um corpo
	// fisico

	celulaSprite.body.acceleration.y = 100;

	celulaSprite.body.collideWorldBounds = true; // para no limite inferio da
	// tela
	celulaSprite.body.drag.x = 100; // desloca 100 e para, só desloca de novo
	// se clicada alguma tecla e quanto maior
	// for seu valor, menos desloca
	celulaSprite.anchor.setTo(.5, .5); // diminui o espaço do deslocamento do
	// espelhamento
	celulaSprite.body.gravity.y = 350;
	
	//exibe titulo
	title = game.add.text(game.world.centerX - 150, 10, "FLAPPY BIRD", style);
	
	//exibe score
	score = game.add.text(game.world.centerX + 220, 10, "SCORE: " + points, style);

}

function update() {

	if ((celulaSprite.body.x > tubo.getAt(0).body.x + tubo.getAt(0).body.width)
			&& (!scored)){
		scored = true;
		points++;
		score.setText("SCORE: " + points);
	}
	
	// COLISAO:
	game.physics.arcade.overlap(celulaSprite, cena, colisaoCena, null, this);
	game.physics.arcade.overlap(celulaSprite, tubo, colisaoTubo, null, this);

	tubo.setAll('body.velocity.x', -100);
	if (tubo.getAt(0).body.x < -tubo.getAt(0).body.width) {
		tubo.setAll('body.x', game.width);
		
		//gera a posicao y do tubo superior de forma aleatoria
		posYtuboSuperior = (Math.floor((Math.random() * 300) + 100) * (-1));
		tubo.getAt(0).body.y = posYtuboSuperior;
		//a posicao y do tubo inferior sempre sera 600 a mais do superior
		tubo.getAt(1).body.y = posYtuboSuperior + 600;
		scored = false;
	}

	celulaSprite.animations.play('jump');

	// PEGA A ENTRADA (tecla pressionada):
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		// vai para cima
		celulaSprite.body.velocity.y = -200;
	}
}

function colisaoCena(celula, cena) {
	celula.kill();
}

function colisaoTubo(celula, tubo) {
	celula.kill();
}
