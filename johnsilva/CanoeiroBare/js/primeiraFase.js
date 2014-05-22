var primeiraFase = { preload: preload, create: create, update: update };

var boat;
var enemies;
var score = 0;
var highscore = 0;
var jungles;
var rivers;
var jungles;
var tileSpeedRiver = 1.5;
var tileSpeedJungles = 0.3;
var jungleWidth = 196;
var angleVelocity = 2;

function preload() {
    //	game.load.spritesheet('backGround', 'assets/bg/river_512-600.jpg', 500, 600, 2);
    game.load.image('river', 'assets/bg/river_512-1200.jpeg');
    game.load.image('jungleLeft', 'assets/bg/jungleLeft_196-1200.jpg');
    game.load.image('jungleRight', 'assets/bg/jungleRight_196-1200.jpg');
    game.load.image('buraco', 'assets/buraco_100-67.jpg');
    game.load.spritesheet('canoeman', 'assets/sprite/canoeman/canoeman_50-100-20.png', 50, 100, 20);
    game.load.spritesheet('alligator', 'assets/sprite/enemies/alligator_80-80-10.png', 80, 80, 10);
    game.load.spritesheet('boto', 'assets/sprite/enemies/boto_80-80-10.png', 80, 80, 10);
    game.load.spritesheet('sand', 'assets/sprite/enemies/sand_80-80-4.png', 80, 80, 4);
    game.load.spritesheet('trunk', 'assets/sprite/enemies/trunk_80-80-4.png', 80, 80, 4);
}

function create() {

    //game.physics.arcade.gravity.y = 50;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createRivers();
    createJungles();
    initEnemies();

    boat = game.add.sprite(game.world.centerX, 600 - 50, 'canoeman');
    boat.animations.add('run', [0,1,2,3,4,5,6,7,8,9], 7, true);
    boat.animations.add('dead', [10,11,12,13,14,15,16,17,18,19], 7, false);
    boat.animations.play('run');
    game.physics.enable(boat, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    boat.body.collideWorldBounds = true; // para no limite inferio da tela
    boat.body.drag.x = 30; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    boat.anchor.setTo(0.5, 0.5);
    boat.body.allowGravity = 0;
    boat.body.immovable = true


    var style = { font: "30px Arial", fill: "#ffffff" };
    this.labelScore = game.add.text(this.game.world.centerX, 10, score + "m", style);
    this.labelScore.anchor.set(0.5, 0);
    game.time.events.loop(150, addEnemies, this);
    game.time.events.loop(3000, addScore, this);
}

function createJungles() {
    jungles = game.add.group();
    jungles.create(0, -600, 'jungleLeft');
    jungles.create(0, -1800, 'jungleLeft');
    jungles.create(jungleWidth + 512, -600, 'jungleRight');
    jungles.create(jungleWidth + 512, -1800, 'jungleRight');
    game.physics.enable(jungles, Phaser.Physics.ARCADE);
}

function createRivers() {
    rivers = game.add.group();
    rivers.create(jungleWidth, -600, 'river');
    rivers.create(jungleWidth, -1800, 'river');
}

function initEnemies() {
    var alligator = game.add.sprite(game.world.centerX, 200, 'alligator');
    alligator.animations.add('run');
    alligator.animations.play('run',4,true);

    var boto = game.add.sprite(game.world.centerX, 150, 'boto');
    boto.animations.add('run');
    boto.animations.play('run',6,true);

    var sand = game.add.sprite(game.world.centerX, 100, 'sand');
    sand.animations.add('run');
    sand.animations.play('run',2,true);

    var trunk = game.add.sprite(game.world.centerX, 50, 'trunk');
    trunk.animations.add('run');
    trunk.animations.play('run',2,true);

    var trunk2 = game.add.sprite(game.world.centerX, 50, 'trunk');
    trunk2.animations.add('run');
    trunk2.animations.play('run',2,true);

    enemies = game.add.group();
    //enemies.create(game.world.centerX, -100, 'alligator');
    enemies.add(alligator);    
    enemies.add(sand);
    enemies.add(boto);
    enemies.add(trunk);
    enemies.add(trunk2);
    //enemies.createMultiple(5, 'buraco', 0, false);
    //game.physics.arcade.enable(enemies);	
    game.physics.enable(enemies, Phaser.Physics.ARCADE);
}

function addScore() {
    score++;
    if (score >= 10) {
        game.state.start('gameWin');
    } else {
        this.labelScore.setText(score + "m");
    }
}

function addEnemies() {

    //var enemie = enemies.getFirstExists(false);
    var enemie = enemies.getFirstDead();

    if (enemie) {
        //enemie.frame = game.rnd.integerInRange(0, 6);
        //enemie.exists = true;
        //var positionX = game.world.randomX;
        var max = game.world.width - jungleWidth - enemie.body.width;
        var min = jungleWidth;
        var positionX = Math.round(Math.random() * (max - min)) + min;
        var positionY = -80;

        /*if (positionX > (game.world.width - enemie.body.width - jungleWidth)) {
            positionX = game.world.width - enemie.body.width - jungleWidth;
        } else if (positionX < jungleWidth) {
            positionX = jungleWidth;
        }*/
        enemie.reset(positionX, -70);

        //enemie.body.bounce.y = 0.8;
    }

}

function update() {

    // cria uma barreira que o sprite pode pisar
    /*game.physics.arcade.collide(boat, barrasPqnas);
	game.physics.arcade.collide(boat, barrasMedias);
	game.physics.arcade.collide(boat, barraInicial);
	game.physics.arcade.collide(boat, enemies);*/
    // COLISAO COM OSSO:
    /*boat.body.velocity.x = 0;
    boat.body.velocity.y = 0;*/
    //boat.body.angularVelocity = 0;
    game.physics.arcade.overlap(boat, enemies, pegarObjetos, null, this);
    game.physics.arcade.overlap(boat, jungles, pegarObjetos, null, this);
    /*game.physics.arcade.overlap(boat, plataforma, gameOver,null,this);*/

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // vai para esquerda
        changeAngle(angleVelocity);
        //goRight();
        //boat.scale.x = -1; // espelha se antes -1
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // vai para direita
        changeAngle(-1*angleVelocity);
        //goLeft();
    }else {
        boat.body.velocity.x = 2*boat.angle;//velocity;
    }
    /*else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		boat.body.velocity.y = -100;
		boat.animations.play('jump');
	}*/
    /*else{
	    	boat.animations.stop();
			boat.frame = 0;
		}	*/
    checkBounds();    
}
function changeAngle(angle){
    var toChange = boat.angle + angle;
    if ( toChange > -90 && toChange < 90) {
        boat.angle += angle;
    }    
}

function checkBounds(){
    enemies.forEachAlive(checkEnemiesBounds, this);
    rivers.forEachAlive(checkRiversBounds, this);
    jungles.forEachAlive(checkJunglesBounds, this);
}

function checkRiversBounds(obj) {
    obj.y += tileSpeedRiver;

    if (obj.y >= 600) {
        obj.y = -1800;
    }

}

function checkJunglesBounds(obj) {
    obj.y += tileSpeedJungles;

    if (obj.y >= 600) {
        obj.y = -1800;
    }

}

function checkEnemiesBounds(obj) {
    obj.y += tileSpeedRiver;

    if (obj.y > 600) {
        obj.kill();
    }

}

function goRight() {
    //boat.body.velocity.x = velocity;
    boat.angle += angleVelocity;
    //boat.animations.play('walk');
}


function goLeft() {
    //boat.body.velocity.x = -velocity;
    boat.angle -= angleVelocity;
    //boat.animations.play('walk');
}

function pegarObjetos(_boat, _enemies) {
    boat.play('dead');
    boat.kill();
    game.state.start('gameOver');
}

function gameOver(){
    
}