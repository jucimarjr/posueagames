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
var finalSound;
var remosSound;
var timerBarra;

function preload() {
    //Imagens
    game.load.image('river', 'assets/bg/river_512-1200.jpeg');
    game.load.image('jungleLeft', 'assets/bg/jungleLeft_196-1200.jpg');
    game.load.image('jungleRight', 'assets/bg/jungleRight_196-1200.jpg');
    game.load.image('mainScore', 'assets/botoes/score_900-110.png');
    game.load.image('record', 'assets/botoes/score_250-100.png');
    game.load.image('logo', 'asets/bg/logo.png');
    game.load.image('logoBarra', 'assets/bg/logo_barra-160-64.png');

    //Sprites
    game.load.spritesheet('canoeman', 'assets/sprite/canoeman/canoeman_50-100-20.png', 50, 100, 20);
    game.load.spritesheet('alligator', 'assets/sprite/enemies/alligator_64-43-10.png', 64, 43, 10);
    game.load.spritesheet('boto', 'assets/sprite/enemies/boto_80-67-10.png', 80, 67, 10);
    game.load.spritesheet('sand', 'assets/sprite/enemies/sand_76-25-4.png', 76, 25, 4);
    game.load.spritesheet('trunk', 'assets/sprite/enemies/trunk_64-42-4.png', 64, 42, 4);
    game.load.spritesheet('timer', 'assets/botoes/timer-1500-369.png', 150,369,10);

    // Sons
    game.load.audio('remosound', 'songs/remada.mp3');
    game.load.audio('explodesound', 'songs/explode.mp3');
    game.load.audio('botosound', 'songs/boto.mp3');
    game.load.audio('alligatorsound', 'songs/alligator.wav');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createRivers();
    createJungles();
    initEnemies();

    boat = game.add.sprite(game.world.centerX, 600 - 50, 'canoeman');
    boat.animations.add('run', [0,1,2,3,4,5,6,7,8,9], 7, true);
    boat.animations.add('dead', [10,11,12,13,14,15,16,17,18,19], 7, false);
    boat.animations.play('run');
    game.physics.enable(boat, Phaser.Physics.ARCADE);
    boat.body.collideWorldBounds = true;
    boat.body.drag.x = 30;
    boat.anchor.setTo(0.5, 0.5);
    boat.body.allowGravity = 0;
    boat.body.immovable = true

    timerBarra = game.add.sprite(0, 150, 'timer');
    timerBarra.animations.add('fase1', [0], 1, true);
    timerBarra.animations.add('fase2', [1], 1, true);
    timerBarra.animations.add('fase3', [2], 1, true);
    timerBarra.animations.add('fase4', [3], 1, false);
    timerBarra.animations.add('fase5', [4], 1, false);
    timerBarra.animations.add('fase6', [5], 7, false);
    timerBarra.animations.add('fase7', [6], 7, false);
    timerBarra.animations.add('fase8', [7], 7, false);
    timerBarra.animations.add('fase9', [8], 7, false);
    timerBarra.animations.add('fase10', [9], 7, false);
    timerBarra.animations.play('fase1');

    var style = { font: "20px Arial Bold", fill: "#ffffff" };
    var styleBig = { font: "40px Arial Bold", fill: "#ffffff" };

    // Record Score
    var recordScore = game.add.sprite(700, 500, 'record');
    var text = game.add.text(830, 550, 'RECORD', style);
    text.anchor.setTo(0.5, 0.5);
    var text = game.add.text(830, 580, localStorage.getItem("highscore"), styleBig);
    text.anchor.setTo(0.5, 0.5);

    //Main Score
    var imgScore = game.add.sprite(0, 0, 'mainScore');
    var style = { font: "40px Arial Bold", fill: "#ffffff" };
    this.labelScore = game.add.text(this.game.world.centerX, 50, score + "m", style);
    this.labelScore.anchor.set(0.5, 0);
    game.time.events.loop(150, addEnemies, this);
    game.time.events.loop(3000, addScore, this);

    //Logo na Barra Lateral
    var loguinho = game.add.sprite(90, 570, 'logoBarra');
    loguinho.anchor.setTo(0.5, 0.5);

    finalSound = false;
    remosSound = game.add.audio("remosound",1,true);
    //remosSound.volume = 2;
    remosSound.play('',0,1,true);
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

function addEnemie(_sprite, y, speed, loop, name){
    var max = game.world.width - jungleWidth - 80;
    var min = jungleWidth;
    var positionX = Math.round(Math.random() * (max - min)) + min;
    var enemie = game.add.sprite(positionX, y, _sprite);
    enemie.name = name;
    enemie.animations.add('run');
    enemie.animations.play('run',speed, loop);
    enemies.add(enemie);  
}

function initEnemies() {
    enemies = game.add.group();
    addEnemie('trunk',     180, 2, true, "trunk");
    addEnemie('alligator', 100, 4, true, "alligatorsound"); 
    addEnemie('sand',       20, 2, true, "sand");    
    addEnemie('trunk',     -60, 2, true, "trunk");    
    addEnemie('boto',     -140, 6, true, "botosound");
    //enemies.createMultiple(5, 'buraco', 0, false);
    //game.physics.arcade.enable(enemies);	
    game.physics.enable(enemies, Phaser.Physics.ARCADE);
}

function addScore() {
    score++;
    if (score >= 100) {
        remosSound.stop();
        game.state.start('gameWin');
    } else {
        this.labelScore.setText(score);

        if (score >= 90) {
            timerBarra.play('fase10')
        }
        else if (score >= 80) {
            timerBarra.play('fase9');
        }
        else if (score >= 70) {
            timerBarra.play('fase8');
        }
        else if (score >= 60) {
            timerBarra.play('fase7');
        }
        else if (score >= 50) {
            timerBarra.play('fase6');
        }
        else if (score >= 40) {
            timerBarra.play('fase5');
        }
        else if (score >= 30) {
            timerBarra.play('fase4');
        }
        else if (score >= 20) {
            timerBarra.play('fase3');
        }
        else if (score >= 10) {
            timerBarra.play('fase2');
        }
    }
}

function addEnemies() {
    var enemie = enemies.getFirstDead();
    
    if (enemie) {
        var b = game.add.audio(enemie.name);
        b.play();
        var max = game.world.width - jungleWidth - enemie.body.width;
        var min = jungleWidth;
        var positionX = Math.round(Math.random() * (max - min)) + min;
        var positionY = -80;

        enemie.reset(positionX, -80);
    }

}

function update() {

    game.physics.arcade.overlap(boat, enemies, overlapWithEnemies, null, this);
    game.physics.arcade.overlap(boat, jungles, overlapWithEnemies, null, this);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // vai para esquerda
        changeAngle(angleVelocity);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // vai para direita
        changeAngle(-1 * angleVelocity);
        
    }else {
        boat.body.velocity.x = 2*boat.angle;//velocity;
    }
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

function overlapWithEnemies(_boat, _enemies) { 
    if(_boat.x <= jungleWidth){
        _boat.x = jungleWidth;
    }else if(_boat.x >= game.world.width - jungleWidth){
        _boat.x = game.world.width - jungleWidth;
    }
    remosSound.stop();
    boat.play('dead');
    boat.body.velocity.x = 0;
    if(finalSound == false){
        var explode = game.add.audio("explodesound");
        explode.volume = 0.3;
        explode.play();
        finalSound = true;
    }
    if(_enemies.name){
        _enemies.kill();
    }
    setTimeout(gameOv, 1300);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function gameOv() {
    
    boat.kill();
    game.state.start('gameOver');
}