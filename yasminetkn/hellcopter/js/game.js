
var floor,bonecoSprite,obstacles, ledges, ledge;

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

    music = game.add.audio('assets/helicopter-hovering-01.mp3');
    music.override = true;

    music.addMarker('sobe', 3, 6, 1, true);


}

function create () {

	game.add.sprite(0, 0, 'chao');
	game.add.sprite(0, 0, 'top');

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


    music.play('sobe');
	
	// Criando o Helicoptero
	bonecoSprite = game.add.sprite(128, 80, 'helicoptero');
	bonecoSprite.animations.add('walk',[1,4],4,true);

	game.physics.enable(bonecoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico

    bonecoSprite.body.velocity.y=-350;
    bonecoSprite.body.gravity.y=1000;

    bonecoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
//    bonecoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento
    game.add.tween(this.player).to({angle: -15}, 300);

    ledges = game.add.group();
    ledges.enableBody = true;
   /* obstacles = game.add.group();
    obstacles.enableBody = true;
    obstacles.createMultiple(20,'bloco');*/
    game.time.events.loop(900, createBlocos, this);
    //this.timer = this.
    //game.time.events.loop(1500, addLinhaDeObstaculos(), this);


}

function update () {
    if ( game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) { // tecla do pulo
        bonecoSprite.body.velocity.y = -350;
        //player.body.gravity.y = 650;
        //game.time.events.loop(1500, createBlocos, this);
        start = 1;
        count = 0; 
    }
    game.physics.arcade.collide(bonecoSprite, this.ground);
    game.physics.arcade.collide(bonecoSprite, this.top);
    game.physics.arcade.collide(bonecoSprite, ledges);
    game.physics.arcade.overlap(bonecoSprite, ledges, gameEnd, null, this); 

}


function createBlocos() {
	ledge = ledges.create(game.world.width, game.rnd.integerInRange(35, game.world.height) - 100, 'bloco');
	
	
	
	ledge.body.velocity.x = -950;
	ledge.body.immovable = true;
	ledge.outOfBoundsKill = true;
} 

function gameEnd(player, ledge) {
	bonecoSprite.kill();
	//explosion.play();
	game.time.events.events = [];
	ledge.kill();
	//text2.setText("Game over. Your points: " + count + "\nPress SPACE to restart.");
	//text2.anchor.setTo(0.5, 0.5);
	bonecoSprite.x = 150;
	bonecoSprite.y = game.world.centerY - 55;
	bonecoSprite.body.velocity.y = 0;
	bonecoSprite.body.velocity.x = 0;
	bonecoSprite.body.gravity.y = 0;
	start = 0;
	/*if (highscore < count) {
	highscore = count;
	text4.setText("Your highscore: " + highscore);
	}*/
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