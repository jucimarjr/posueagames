
var floor,bonecoSprite,obstacles, ledges, ledge, music;

var start = 0;
var count = 0;
var highscore = 0; 

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload () {

	game.load.spritesheet('boneco', 'assets/bonecoSpriteSheet2_240-60-4.png', 60,60);
	//game.load.image('chao', 'assets/chao2_325-28.png');
	game.load.image('chao', 'assets/top2_100-100.png');
	game.load.image('top', 'assets/top3_50-50.png');
    game.load.image('ground', 'assets/hellcopter_background2.png');
   // game.load.image('bloco', 'assets/bloco_80-30.png');
    game.load.image('bloco', 'assets/block4.png');
    game.load.spritesheet('helicoptero', 'assets/helicopteroSpritesheet_365-60-4.png', 91, 59);
    
    //Firefox nao suporta mp3
    //music = game.add.audio('assets/helicopter-hovering-01.mp3');
    //music.override = true;

   // music.addMarker('sobe', 3, 6, 1, true);
   // game.load.audio('musica', 'assets/bt_bike_race.ogg');
    game.load.audio('sfx', ['assets/bt_bike_race.ogg']);
    //game.load.crossOrigin = true;
   // game.load.audio('sfx', 'assets/bt_bike_race.ogg', true);
    music = game.add.audio('sfx');
}

function create () {

	game.add.sprite(0, 0, 'chao');
	game.add.sprite(0, 0, 'top');
	
	//music.addMarker('sobe', 3, 6, 1, true);
	music.play();
	
	
	
    //faz a chao rolar em loop
    this.ground2 = this.game.add.tileSprite(0, 0, 960, 600, 'ground');//(x,y,tamanho em x,?)
    this.ground2.autoScroll(-20, 0);

    this.ground = this.game.add.tileSprite(0, 500, 960, 100, 'chao');//(x,y,tamanho em x,?)
    this.ground.autoScroll(-400, 0);

    this.top = this.game.add.tileSprite(0,0,960,25,'top');
    this.top.autoScroll(-400, 0);
    
    game.physics.enable(this.top, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    game.physics.enable(this.ground, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    
    this.ground.body.immovable = true;
    this.ground.body.width = this.game.world.width;
    
    this.top.body.immovable = true;
    this.top.body.width = this.game.world.width;
    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
    cursors = game.input.keyboard.createCursorKeys();

    music.play('sobe');
	
	// Criando o Helicoptero
	bonecoSprite = game.add.sprite(128, 80, 'helicoptero');
	bonecoSprite.animations.add('jumpHeli',[0,3],4,true).play();

	game.physics.enable(bonecoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico

    bonecoSprite.body.velocity.y=-250;
    bonecoSprite.body.gravity.y=1000;

    bonecoSprite.body.collideWorldBounds = true; // para no limite inferio da tela

    game.add.tween(this.player).to({angle: -15}, 300);

    ledges = game.add.group();
    ledges.enableBody = true;

    game.time.events.loop(950, createBlocos, this);
    
    game.input.onDown.add(listener, this);
    
    text = game.add.text(game.world.width - 150, 15, "Pontuação: 0", {
    	font: "25px Arial",
    	fill: "#fff",
    	align: "center"
    }); 
    
    text2 = game.add.text(game.world.centerX, game.world.centerY, "", {
    	font: "25px Arial",
    	fill: "#fff",
    	align: "center"
    });
    text.anchor.setTo(0.5, 0.5);

    text4 = game.add.text(game.world.width - 150, 45, "Highscore: 0", {
    	font: "25px Arial",
    	fill: "#fff",
    	align: "center"
    });
    	text4.anchor.setTo(0.5, 0.5); 
}

function update () {
	
/*	if(start == 0){*/
		if ( game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) { // tecla do pulo
	        bonecoSprite.body.velocity.y = -250;
	    }
//	}
	
	//Verifica se chocou com o topo, o chão ou com blocos	
    game.physics.arcade.collide(bonecoSprite, [this.ground, this.top, ledges], gameEnd, null, this);
    game.physics.arcade.overlap(bonecoSprite, ledges, gameEnd, null, this); 

}


function createBlocos() {
	ledge = ledges.create(game.world.width, game.rnd.integerInRange(35, game.world.height) - 100, 'bloco');
	ledge.body.velocity.x = -950;
	ledge.body.immovable = true;
	ledge.outOfBoundsKill = true;
	
	count = count + 25;
	text.setText("Pontuação: " + count);
} 

function gameEnd(player, ledge) {
	bonecoSprite.kill();
	//explosion.play();
	game.time.events.events = [];
	
	if(ledge==null){
		//ledge.kill();
	}

	text2.setText("Game over. Pontuação: " + count + "\nPressione SPACE para reiniciar.");
	text2.anchor.setTo(0.5, 0.5);
	
	/*bonecoSprite.x = 150;
	bonecoSprite.y = game.world.centerY - 55;
	bonecoSprite.body.velocity.y = 0;
	bonecoSprite.body.velocity.x = 0;
	bonecoSprite.body.gravity.y = 0;
	start = 0;*/
	
	if (highscore < count) {
		highscore = count;
		text4.setText("Seu maior placar eh: " + highscore);
	}
} 

function listener() {
	
	if (start == 1) {
		player.body.velocity.y = -250;
	}
}


/*function addUmObstacle(x,y){

   var obstaculo = obstacles.create(x, game.world.height/2 -32,'bloco');
    obstaculo.reset(x,y);//setando a nova posicao do obstaculo
    obstaculo.body.velocity.x= -200;//velocidade para se mover a direita
    obstaculo.body.immovable = true;
    obstaculo.outOfBoundsKill = true;
}

function addLinhaDeObstaculos(){

    var regra = Math.floor(Math.random()*5)+1;
    for (var i = 0; i < 8; i++)
        if (i != regra && i != regra +1)
            addUmObstacle(400, i*60+10);
}*/