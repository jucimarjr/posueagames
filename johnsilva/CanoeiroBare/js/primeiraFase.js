var primeiraFase = { preload: preload, create: create, update: update, render: render };

var canoeman;
var enemies;
var score;
var highscore;
var jungles;
var tileSpeedRiver;
var tileSpeedJungles = 0.3;
var jungleWidth = 196;
var riverWidth = 512;
var angleVelocity = 2;
var finalSound;
var remosSound;
var timerBarra;
var Stage;
var showStage = true;
var tileRiver;
var tileLeftJungle;
var tileRightJungle;
var gameOver;
var dead;
var timer;
var pressLeft;
var pressRight;

function preload() {
    score = 0;
    highscore = 0;
    tileSpeedRiver = 1.5;
    gameOver = false;
    pressRight = false;
    pressLeft = false;
}

function create() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.world.setBounds(0, -500, 1600, 1200 );

    tileRiver = game.add.tileSprite(jungleWidth, 0, 512, 1200, 'river');
    tileLeftJungle = game.add.tileSprite(0, 0, 196, 1200, 'jungleLeft');    
    tileRightJungle = game.add.tileSprite(jungleWidth+riverWidth, 0, 196, 1200, 'jungleRight');    

    createJungles();
    canoeman = game.add.sprite(450, 600 - 50, 'canoeman');
    canoeman.animations.add('run', [0,1,2,3,4,5,6,7,8,9], 7, true);
    dead = canoeman.animations.add('dead', [10,11,12,13,14,15,16,17,18,19], 7, false);
    dead.onComplete.add(gameOv, this);
    canoeman.animations.play('run');
    game.physics.p2.enable(canoeman, false);
    canoeman.body.clearShapes();
    canoeman.body.loadPolygon('physicsData', 'canoeman_50-100-20');
    initEnemies();    

    timerBarra = game.add.sprite(0, 150, 'timer');
    timerBarra.animations.add('fase1', [0], 1, true);
    timerBarra.animations.add('fase2', [1], 1, true);
    timerBarra.animations.add('fase3', [2], 1, true);
    timerBarra.animations.add('fase4', [3], 1, true);
    timerBarra.animations.add('fase5', [4], 1, true);
    timerBarra.animations.add('fase6', [5], 7, true);
    timerBarra.animations.add('fase7', [6], 7, true);
    timerBarra.animations.add('fase8', [7], 7, true);
    timerBarra.animations.add('fase9', [8], 7, true);
    timerBarra.animations.add('fase10', [9], 7, true);
    timerBarra.animations.play('fase1');

    var style = { font: "20px Arial Bold", fill: "#ffffff" };
    var styleBig = { font: "40px Arial Bold", fill: "#ffffff" };

    // Record Score
    var recordScore = game.add.sprite(700, 500, 'record');
    var text = game.add.text(830, 550, 'RECORD', style);
    text.anchor.setTo(0.5, 0.5);
    var text = game.add.text(830, 580, localStorage.getItem("highscore"), styleBig);
    text.anchor.setTo(0.5, 0.5);

    //Main
    var imgScore = game.add.sprite(0, 0, 'mainScore');
    var style = { font: "40px Arial Bold", fill: "#ffffff" };
    this.labelScore = game.add.text(450, 50, score + "m", style);
    this.labelScore.anchor.set(0.5, 0);
    /*game.time.events.loop(150, addEnemies, this);*/
    game.time.events.loop(3000, addScore, this);
    //Logo na Barra Lateral
    var loguinho = game.add.sprite(90, 570, 'logoBarra');
    loguinho.anchor.setTo(0.5, 0.5);

    //Mute button
    var bt_sound = game.add.button(850, 0, 'sound', pause, this, 1, 0, 1);
    var bt_full = game.add.button(800, 0, 'full', gofull, this, 1, 0, 1);
    //bt_full.input.onDown.add(gofull, this);

    finalSound = false;
    remosSound = game.add.audio("remosound",1,true);
    remosSound.play('',0,1,true);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.onDown.add(touch, this);
    game.input.onUp.add(noTouch, this);
}

function gofull() {
    game.scale.startFullScreen();
}

function pause() {
    if (toggle) {
        music.resume();
        toggle = false;
        bt_sound = game.add.button(850, 0, 'sound', pause, this, 1, 0, 1);
    }
    else {
        music.pause();
        toggle = true;
        bt_sound = game.add.button(850, 0, 'mute', pause, this, 1, 0, 1);
    }
}

function createJungles() {
    jungles = game.add.group();
    jungles.add(tileLeftJungle);
    jungles.add(tileRightJungle);
    //game.physics.enable(jungles, Phaser.Physics.ARCADE);
}

function addEnemie(_sprite, y, speed, loop, name, rectW,rectH,rectX,rectY){
    var positionX = getRandomX();
    var enemie = game.add.sprite(positionX, y, _sprite);
    enemie.name = name;
    enemie.animations.add('run');
    enemie.animations.play('run',speed, loop);      
    game.physics.p2.enable(enemie, false);
    enemie.body.setRectangle(rectW,rectH,rectX,rectY);        
    canoeman.body.createBodyCallback(enemie, hitEnemie, this);
    enemies.add(enemie);  
}

function initEnemies() {
    enemies = game.add.group();
    enemies.physicsBodyType = Phaser.Physics.P2JS;
    addEnemie('trunk',     180, 2, true, "trunk",50, 20, 0, 0);
    addEnemie('alligator', 100, 4, true, "alligatorsound",50, 30, 8, 0); 
    addEnemie('sand',       20, 2, true, "sand",76, 25, 0, 0);    
    addEnemie('trunk',     -60, 2, true, "trunk",50, 20, 0, 0);  
    addEnemie('boto',     -140, 6, true, "botosound",60, 40, 0, 10);
}

function hitEnemie(body1, body2) {
    body2.sprite.alpha = 0;
    gameOver = true;
    canoeman.body.setZeroVelocity();
}

function addScore() {
    score++;
    var styleBig = { font: "40px Arial Bold", fill: "#ffffff" };
    if (score >= 100) {
        remosSound.stop();
        game.state.start('gameWin');
    } else {
        this.labelScore.setText(score);

        if (score == 90) {
            Stage = game.add.text(450, 300, 'BANZEIRO FINAL', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            tileSpeedRiver = 5.5;
            timerBarra.play('fase10')
        }
        else if (score == 80) {
            Stage = game.add.text(450, 300, 'Banzeiro 8', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);            
            tileSpeedRiver = 5;
            timerBarra.play('fase9');
        }
        else if (score == 70) {
            Stage = game.add.text(450, 300, 'Banzeiro 7', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            tileSpeedRiver = 4.5;
            timerBarra.play('fase8');
        }
        else if (score == 60) {
            Stage = game.add.text(450, 300, 'Banzeiro 6', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            tileSpeedRiver = 4;
            timerBarra.play('fase7');
        }
        else if (score == 50) {
            Stage = game.add.text(450, 300, 'Banzeiro 5', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);            
            tileSpeedRiver = 3.5;
            timerBarra.play('fase6');
        }
        else if (score == 40) {
            Stage = game.add.text(450, 300, 'Banzeiro 4', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);            
            tileSpeedRiver = 3;
            timerBarra.play('fase5');
        }
        else if (score == 30) {
            Stage = game.add.text(450, 300, 'Banzeiro 3', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            tileSpeedRiver = 2.5;
            timerBarra.play('fase4');
        }
        else if (score == 20) {
            Stage = game.add.text(450, 300, 'Banzeiro 2', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            tileSpeedRiver = 2;
            timerBarra.play('fase3');
            
        }
        else if (score == 10) {
            Stage = game.add.text(450, 300, 'Banzeiro 1', styleBig);
            Stage.anchor.setTo(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * 2, resetStage, this);
            timerBarra.play('fase2');
        }
    }
    tileSpeedJungles = tileSpeedRiver/5;
}

function resetStage() {
    //game.world.remove(Stage);
    game.add.tween(Stage).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
}

function update() {

    if(!gameOver){
        if (cursors.left.isDown || pressLeft)
        { 
            changeAngle(angleVelocity);
        }
        else if (cursors.right.isDown || pressRight)
        { 
            changeAngle(-1 * angleVelocity);    
        }else{
            canoeman.body.velocity.x = 2*canoeman.angle;
        }

        enemies.forEachAlive(checkEnemiesBounds, this);

        tileRiver.tilePosition.y+=tileSpeedRiver;
        tileLeftJungle.tilePosition.y+=tileSpeedJungles;
        tileRightJungle.tilePosition.y+=tileSpeedJungles;

        if(canoeman.body.x <= jungleWidth || canoeman.body.x >= 900 - jungleWidth){
            gameOver = true;
        }

    }else{
        canoemanEnd();
    }
}

function touch(pointer) {

    if (pointer.x < 450)
    {
        //changeAngle(2*angleVelocity);
        pressLeft = true;
    }
    else
    {
        pressRight = true;
        //changeAngle(-1 * 2*angleVelocity);
    }
}

function noTouch(pointer) {
    pressLeft = false;
    pressRight = false;
}

function changeAngle(angle){
    var toChange = canoeman.body.angle + angle;
    if ( toChange > -90 && toChange < 90) {
        canoeman.body.angle += angle;
    }
     
}

function checkEnemiesBounds(obj) {
    obj.body.y += tileSpeedRiver;

    if (obj.body.y > 600) {
        obj.body.y = -200;
        obj.body.x = getRandomX();
        var audio = game.add.audio(obj.name);
        audio.play();
    }

}

function getRandomX(){
    var max = 900 - jungleWidth - 30;
    var min = jungleWidth+20;
    return Math.round(Math.random() * (max - min)) + min;
}

function canoemanEnd() { 
    if(canoeman.body.x <= jungleWidth){
        canoeman.body.x = jungleWidth;
    }else if(canoeman.body.x >= 900 - jungleWidth){
        canoeman.body.x = 900 - jungleWidth;
    }

    remosSound.stop();
    canoeman.play('dead');

    if(finalSound == false){
        var explode = game.add.audio("explodesound");
        explode.volume = 0.3;
        explode.play();
        finalSound = true;
    }
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
    canoeman.kill();
    tileSpeedRiver = 1.5;
    game.state.start('gameOver');
}

function render() {
    //game.debug.text(tileSpeedRiver,32,32);
}