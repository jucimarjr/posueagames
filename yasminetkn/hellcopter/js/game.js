
var floor,bonecoSprite,obstacle;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.load.spritesheet('boneco', 'assets/bonecoSpriteSheet2_240-60-4.png', 60,60);
	game.load.image('chao', 'assets/chao2_325-28.png');
    game.load.image('ground', 'assets/backchop.png');
    game.load.image('bloco', 'assets/bloco_80-30.png');
    game.load.spritesheet('helicoptero', 'assets/helicopteroSpritesheet_180-60-3.png', 60, 60);


}

function create () {

	game.add.sprite(0, 0, 'chao');


    //faz a chao rolar em loop
    this.ground2 = this.game.add.tileSprite(0, 0, 960, 600, 'ground');//(x,y,tamanho em x,?)
    this.ground2.autoScroll(-20, 0);

    this.ground = this.game.add.tileSprite(0, 575, 960, 112, 'chao');//(x,y,tamanho em x,?)
    this.ground.autoScroll(-200, 0);


	
	// Criando o Helicoptero
	bonecoSprite = game.add.sprite(128, 80, 'helicoptero');
	bonecoSprite.animations.add('walk',[1,3],6,true);

	game.physics.enable(bonecoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico

    bonecoSprite.body.velocity.y=-350;
    bonecoSprite.body.gravity.y=1000;

    bonecoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
//    bonecoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento
    game.add.tween(this.player).to({angle: -15}, 300);




    obstacle = game.add.group();
    obstacle.createMultiple(20,'bloco');

    //this.timer = this.
        game.time.events.loop(1500, addLinhaDeObstaculos(), this);


}

function update () {
    if ( game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) { // tecla do pulo
        bonecoSprite.body.velocity.y = -350;
    }


    }

function addUmObstacle(x,y){

    var obstaculo = obstacle.getFirstDead();

    obstaculo.reset(x,y);//setando a nova posicao do obstaculo
    obstaculo.body.velocity.x= -200;//velocidade para se mover a direita
    obstaculo.outOfBoundsKill = true;
}

function addLinhaDeObstaculos(){

    var regra = Math.floor(Math.random()*5)+1;
    for (var i = 0; i < 8; i++)
        if (i != regra && i != regra +1)
            addUmObstacle(400, i*60+10);
}