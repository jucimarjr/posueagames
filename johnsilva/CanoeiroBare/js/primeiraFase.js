var primeiraFase = { preload: preload, create: create, update: update };

var boat;
var objects;
var velocity = 150;
var score = 0;
var highscore = 0;
var jungles;
var rivers;
var jungles;
var tileSpeedRiver = 1.5;
var tileSpeedJungles = 0.3;
var jungleWidth = 196;

function preload() {
    //	game.load.spritesheet('backGround', 'assets/bg/river_512-600.jpg', 500, 600, 2);
    game.load.image('river', 'assets/bg/river_512-1200.jpeg');
    game.load.image('jungleLeft', 'assets/bg/jungleLeft_196-1200.jpg');
    game.load.image('jungleRight', 'assets/bg/jungleRight_196-1200.jpg');
    game.load.image('buraco', 'assets/buraco_100-67.jpg');
    game.load.spritesheet('boat', 'assets/sprite/canoeiro/canoeiroLeft_50-100-6.png', 50, 100, 6);//200,160
}

function create() {

    //game.physics.arcade.gravity.y = 50;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //river = game.add.tileSprite(196, 0, 512, 600, 'river');
    //this.fg = this.game.add.tileSprite(0, this.game.height -224, this.game.stage.bounds.width, 224, 'fg');
    /*game.add.sprite(0,0, 'jungleLeft');
	game.add.sprite(196+512,0, 'jungleRight');*/
    //this.backGround = game.add.sprite(197,0, 'river');
    /*this.backGround.animations.add('go');
	this.backGround.play('go',4,true);*/

    createRivers();
    createJungles();
    initObjects();

    boat = game.add.sprite(game.world.centerX, 600 - 50, 'boat');
    boat.animations.add('run', [1, 2, 3, 4, 5], 5, true);
    boat.animations.play('run');
    game.physics.enable(boat, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    boat.body.collideWorldBounds = true; // para no limite inferio da tela
    boat.body.drag.x = 200; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    boat.anchor.setTo(0.5, 0.5);
    boat.body.allowGravity = 0;
    boat.body.immovable = true;

    //game.time.events.loop(150, addBuraco, this);
    /*boat.body.maxAngular = 90;*/
    //  Apply a drag otherwise the sprite will just spin and never slow down
    //boat.body.angularDrag = 30;



    var style = { font: "30px Arial", fill: "#ffffff" };
    this.labelScore = game.add.text(this.game.world.centerX, 10, score + "m", style);
    this.labelScore.anchor.set(0.5, 0);
    game.time.events.loop(150, addBuraco, this);
    game.time.events.loop(3000, addScore, this);
}

function createJungles() {
    jungles = game.add.group();
    jungles.create(0, -600, 'jungleLeft');
    jungles.create(0, -1800, 'jungleLeft');
    jungles.create(jungleWidth + 512, -600, 'jungleRight');
    jungles.create(jungleWidth + 512, -1800, 'jungleRight');
}

function createRivers() {
    rivers = game.add.group();
    rivers.create(jungleWidth, -600, 'river');
    rivers.create(jungleWidth, -1800, 'river');
}

function initObjects() {

    /*b = game.add.sprite(10,10, 'buraco');
	/*game.physics.arcade.enable(b);*/
    /*b.body.collideWorldBounds = true;
	b.body.moves = true;*/
    objects = game.add.group();
    objects.create(game.world.centerX, -100, 'buraco');
    //objects.createMultiple(5, 'buraco', 0, false);
    //game.physics.arcade.enable(objects);	
    game.physics.enable(objects, Phaser.Physics.ARCADE);
}

function addScore() {
    score++;
    if (this.labelScore) {
        this.labelScore.setText(score + "m");
    }
}

function addBuraco() {

    var obj = objects.getFirstExists(false);

    if (obj) {
        obj.frame = game.rnd.integerInRange(0, 6);
        obj.exists = true;
        var position = game.world.randomX;

        if (position > (game.world.width - obj.body.width - jungleWidth)) {
            position = game.world.width - obj.body.width - jungleWidth;
        } else if (position < jungleWidth) {
            position = jungleWidth;
        }
        obj.reset(position, -70);

        //obj.body.bounce.y = 0.8;
    }

}

function update() {

    // cria uma barreira que o sprite pode pisar
    /*game.physics.arcade.collide(boat, barrasPqnas);
	game.physics.arcade.collide(boat, barrasMedias);
	game.physics.arcade.collide(boat, barraInicial);
	game.physics.arcade.collide(boat, objects);*/
    // COLISAO COM OSSO:
    game.physics.arcade.overlap(boat, objects, pegarObjetos, null, this);
    /*game.physics.arcade.overlap(boat, plataforma, gameOver,null,this);*/

    //boat.body.angularAcceleration = 0;
    // PEGA A ENTRADA (tecla pressionada):	
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // vai para esquerda
        goRight();
        //boat.scale.x = -1; // espelha se antes -1
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // vai para direita
        goLeft();
    }
    /*else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		boat.body.velocity.y = -100;
		boat.animations.play('jump');
	}*/
    /*else{
	    	boat.animations.stop();
			boat.frame = 0;
		}	*/

    objects.forEachAlive(checkBounds, this);
    rivers.forEachAlive(checkBoundsRivers, this);
    jungles.forEachAlive(checkBoundsJungles, this);
}

function checkBoundsRivers(obj) {
    obj.y += tileSpeedRiver;

    if (obj.y >= 600) {
        obj.y = -1800;
    }

}

function checkBoundsJungles(obj) {
    obj.y += tileSpeedJungles;

    if (obj.y >= 600) {
        obj.y = -1800;
    }

}

function checkBounds(obj) {
    obj.y += tileSpeedRiver;

    if (obj.y > 600) {
        obj.kill();
    }

}

function goRight() {
    boat.body.velocity.x = velocity;
    //boat.body.angularAcceleration += 30;
    boat.animations.play('walk');
}


function goLeft() {
    boat.body.velocity.x = -velocity;
    //boat.body.angularAcceleration -= 30;
    boat.animations.play('walk');
}

function pegarObjetos(_boat, _objects) {
    _boat.kill();
    game.state.start('gameOver');
}