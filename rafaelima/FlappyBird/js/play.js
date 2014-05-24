var play_state = { create: create, update: update };

var speed = 1;
//Sem function preload() pq já existe no load.js
function create() {
	musicGame = game.add.audio('gameMusic',1,true);
    musicGame.play('',0,1,true);
    game.add.sprite(0, 0, 'background1');

    background2 = game.add.tileSprite(0, 0, game.cache.getImage('background2').width, game.cache.getImage('background2').height, 'background2');
    background2.tileScale.setTo(1.15, 1.15);
    game.physics.arcade.enable(background2);

    background3 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background3').height, 'background3');
    background3.tileScale.setTo(1.6,1.6);
    game.physics.arcade.enable(background3);

    loadExtras();

    //score  metros
    stop_score = false;
    score = 0; 
    var style = { font: "30px Arial", fill: "#000000" };
    this.label_score = this.game.add.text(20, 50, "0m", style);
    
    playerSprite = game.add.sprite(172, 281.5, 'player');
    playerSprite.animations.add('walk', [0, 1, 2, 3], 8, true);
    game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
    playerSprite.body.gravity.y = 1000;
    playerSprite.body.collideWorldBounds = true; // para no limite inferior da tela
    game.camera.follow(playerSprite.sprite);

    deathSprite = game.add.sprite(playerSprite.body.position.x, playerSprite.body.position.y, 'death');
    deathSprite.exists = false;
    deathSprite.animations.add('fall', [0, 1], 5, true);
    game.physics.enable(deathSprite, Phaser.Physics.ARCADE);
    deathSprite.body.gravity.y = 1500;
    deathSprite.body.collideWorldBounds = true; // parar no limite inferior da tela

    background4 = game.add.tileSprite(0, 0, game.cache.getImage('background4').width, game.cache.getImage('background4').height, 'background4');
    background4.tileScale.setTo(1.6,1.6);
    game.physics.arcade.enable(background4);

    game.add.sprite(0, 0, 'background5');
    // Call the 'jump' function when the spacebar key is hit
    space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(jump, this);
    space_key.onUp.add(notJump, this);

    jump_sound = this.game.add.audio('flap_song');

    this.timer = this.game.time.events.loop(3000, add_obstacle, this);
    timerPowerUp = this.game.time.events.loop(15000, add_power_up, this);
    
    //bloqueia novos obstaculos por 3 ataques do boss e depois o jogo volta ao normal IMPORTANTE P/ MINI BOSS!!!!!!!!!!!!!!!!!!!!11111
    /*SEQUENCIA IMPORTANTE P/ MINI BOSS!!!!!!!!!!!!!!!!!!!!11111 */
//    game.time.events.remove(this.timer);
//    countHeadButts = 0;
//    bossFight();
//    bossBackground = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bossbg').height, 'bossbg');
//    game.physics.arcade.enable(bossBackground); 
}

// Start the actual game
function update() {

	if(!stop_score){
    	score += 0.01;
        this.label_score.text = score.toFixed(0) +"m";  //sem casa decimal
	}
	
    playerSprite.animations.play('walk');

//    if ((bossSprite != null) && (bossSprite.exists === true)) {
//        game.physics.arcade.overlap(bossSprite, playerSprite, playerDies, null, this);
//        if (bossDirection >= 0.5) {
//            if (bossSprite.body.position.y < 230) { //começa p/ cima
//                bossSprite.body.velocity.y = 100;
//                bossSprite.frame = 0;
//            } else if (bossSprite.body.position.y >= 600 && countHeadButts < 3) {
//                bossFight();
//            }
//
//        } else {
//            if (bossSprite.body.position.y > 370) {
//                bossSprite.body.velocity.y = -100;
//                bossSprite.frame = 0;
//            } else if (bossSprite.body.position.y <= 0 && countHeadButts < 3) {
//                bossFight();
//            }
//        }
//    }

    if (playersGroup != null) {
        playersGroup.callAll('animations.play', 'animations', 'walk');
        playersGroup.forEach(function (item) { game.physics.arcade.overlap(item, plataformas, function () { item.kill(); }, null, this); });
    }
    
    updatePowerUps();
    
    game.physics.arcade.overlap(playerSprite, plataformas, playerDies, null, this)

    //bate no chao playerSprite
    if ((Math.round(playerSprite.y) + playerSprite.height) >= game.world.height){
    	restart_game();
    	//    	playerDies();
//    	floor_death();//restart_game();
	}
    
    playerSprite.body.velocity.x = 0;
    background2.tilePosition.x -= 2 * speed;
    background3.tilePosition.x -= 3 * speed;
    background4.tilePosition.x -= 4 * speed;
    
    //bate no chao o deathSprite
    if ((Math.round(deathSprite.y) + deathSprite.height) >= game.world.height)
    	floor_death();

}

function updatePowerUps(){
	if (powerUp1 != null) {
		powerUp1.animations.play('glow');
		powerUp1.body.velocity.x = -100;
		game.physics.arcade.overlap(powerUp1, playerSprite, smallSizePlayer, null, this);
	}else if (powerUp2 != null) {
		powerUp2.animations.play('glow');
		powerUp2.body.velocity.x = -100;
		game.physics.arcade.overlap(powerUp2, playerSprite, powerUp_multiply, null, this);
	}else if (powerUp3 != null) {
		powerUp3.animations.play('glow');
		powerUp3.body.velocity.x = -100;
		game.physics.arcade.overlap(powerUp3, playerSprite, speedPlayerFast, null, this);
	}else if (powerUp4 != null) {
		powerUp4.animations.play('glow');
		powerUp4.body.velocity.x = -100;
		game.physics.arcade.overlap(powerUp4, playerSprite, speedPlayerSlow, null, this);
	}
}

function jump() {
//	playerSprite.animations.play('walk');
    playerSprite.body.velocity.y = -450;
    if (playersGroup != null && playersGroup.exists === true) {
        playersGroup.forEach(function (item) { item.body.velocity.y = -450; }, null, this);
    }
    jump_sound.play();
}

function notJump() {
    playerSprite.animations.stop();
    playerSprite.frame = 0;
}

function playerDies() {
    playDeadAnimation();
    setTimeout(restart_game, 2000);
}

function speedPlayerFast(){
	powerUp3.kill();
	powerUp3 = null;
	playerSprite.body.gravity.y = 3000;
	speed = 4;
	setTimeout(speedPlayerNormal, timeoutNormalSize);
}

function speedPlayerSlow(){
	powerUp4.kill();
	powerUp4 = null;
	playerSprite.body.gravity.y = 500;
	speed = 0.3;
	setTimeout(speedPlayerNormal, timeoutNormalSize);
}

function speedPlayerNormal(){
	playerSprite.body.gravity.y = 1500;
	speed = 1;
	normalSizePlayer();
}

function smallSizePlayer(){
	powerUp1.kill();
	powerUp1 = null;
	playerSprite.width  = 104;
	playerSprite.height  = 44.5;
	setTimeout(normalSizePlayer, timeoutNormalSize);
}

function normalSizePlayer(){
	playerSprite.width  = 208;
	playerSprite.height  = 89;
}

function restart_game() {
    game.time.events.remove(this.timer);
    game.state.start('score');
}

function playDeadAnimation() {
    deathSprite.body.position.x = playerSprite.body.position.x;
    deathSprite.body.position.y = playerSprite.body.position.y;
    deathSprite.exists = true;
    playerSprite.exists = false;

    game.camera.follow(deathSprite.sprite);
    deathSprite.animations.play('fall');

}

function add_obstacle() {
    var type = Math.floor(Math.random() * 4);

    switch (type) {
        case 0:
            obstacle1 = plataformas.create(950, game.world.randomY, 'obstacle1');
            game.physics.enable(obstacle1, Phaser.Physics.ARCADE);
            obstacle1.body.velocity.x = -500;
            obstacle1.checkWorldBounds = true;
            obstacle1.outOfBoundsKill = true;
            break;
        case 1:
            obstacle2 = plataformas.create(950, game.world.randomY, 'obstacle2');
            game.physics.enable(obstacle2, Phaser.Physics.ARCADE);
            obstacle2.body.velocity.x = -600;
            obstacle2.checkWorldBounds = true;
            obstacle2.outOfBoundsKill = true;
            break;
        case 2:
            obstacle3 = plataformas.create(950, 250, 'obstacle3');
            game.physics.enable(obstacle3, Phaser.Physics.ARCADE);
            obstacle3.scale.setTo(1.2, 1.2);
            obstacle3.body.velocity.x = -100;
            obstacle3.checkWorldBounds = true;
            obstacle3.outOfBoundsKill = true;
            break;
        case 3:
            obstacle4 = plataformas.create(950, 405, 'obstacle4');
            game.physics.enable(obstacle4, Phaser.Physics.ARCADE);
            obstacle4.body.velocity.x = -100;
            obstacle4.scale.setTo(1, 1);
            obstacle4.checkWorldBounds = true;
            obstacle4.outOfBoundsKill = true;
            break;
        default:
            break;
    }
}

function add_power_up(){
	
	var type = Math.floor(Math.random() * 4);

	switch (type) {
	case 0:
		powerUp1 = game.add.sprite(960, 100, 'powerup1');
		powerUp1.animations.add('glow', [0, 1, 2, 3], 8, true);
		game.physics.arcade.enable(powerUp1);
		break;
	case 1:
		powerUp2 = game.add.sprite(960, 100, 'powerup2');
		powerUp2.animations.add('glow', [0, 1, 2, 3], 8, true);
		game.physics.arcade.enable(powerUp2);
		break;
	case 2:
		powerUp3 = game.add.sprite(960, 100, 'powerup3');
		powerUp3.animations.add('glow', [0, 1, 2, 3], 8, true);
		game.physics.arcade.enable(powerUp3);
		break;
	case 3:
		powerUp4 = game.add.sprite(960, 100, 'powerup4');
		powerUp4.animations.add('glow', [0, 1, 2, 3], 8, true);
		game.physics.arcade.enable(powerUp4);
		break;
	default:
		break;
	}
	
	setTimeout(killPowerUp, timeoutPowerUp);
}

function killPowerUp(){
	if (powerUp1 != null) {
		powerUp1.kill();
		powerUp1 = null;
	}else if (powerUp2 != null) {
		powerUp_multiply_Off();
		powerUp2 = null;
	}else if (powerUp3 != null) {
		powerUp3.kill();
		powerUp3 = null;
	}else if (powerUp4 != null) {
		powerUp4.kill();
		powerUp4 = null;
	}
}

function addOutBoundEvent(obstacle) {
    obstacle.exists = true;
    obstacle.events.onOutOfBounds.add(
			function () {
			    obstacle.destroy();
			}, this);
}

function powerUp_multiply() {
    powerUp2.destroy();
    playersGroup = game.add.group();
    playersGroup.enableBody = true;
    for (var i = 0; i < 7; i++) {
        player = playersGroup.create(game.world.randomX, game.world.randomY, 'player');
        player.animations.add('walk', [0, 1, 2, 3], 8, true);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = false; // para no limite inferior da tela
        player.animations.play('walk');
    }
    powerUp2 = null;
    setTimeout(powerUp_multiply_Off, 5000);
}

function powerUp_multiply_Off() {
    playersGroup.forEach(function (item) { item.destroy(); }, null, this);
    playersGroup.destroy();
}

function loadExtras() {
    plataformas = game.add.group();
    plataformas.enableBody = true;

//    powerUp2 = game.add.sprite(390, 281.5, 'powerup2');
//    powerUp2.animations.add('glow', [0, 1, 2, 3], 8, true);
//    game.physics.arcade.enable(powerUp2);
}

function bossFight() {
    bossDirection = Math.random();
    //bigboss
    if (bossSprite != null)
        bossSprite.destroy();
    var X = game.world.randomX;
    if (X < 258)
        X = playerSprite.body.position.x;
    else if (X > 702)
        X = 702;
    if (bossDirection >= 0.5) { //começa p/ cima
        bossSprite = game.add.sprite(X, 600, 'boss');
        game.physics.enable(bossSprite, Phaser.Physics.ARCADE);
        bossSprite.body.velocity.y = -100;
    } else {
        bossSprite = game.add.sprite(X, 0, 'boss');
        game.physics.enable(bossSprite, Phaser.Physics.ARCADE);
        bossSprite.anchor.setTo(.5, .5);
        bossSprite.scale.y *= -1;
        bossSprite.anchor.setTo(0, 0);
        bossSprite.body.velocity.y = 100;
    }

    bossSprite.animations.add('blink', [0, 1], 30, true);
    bossSprite.frame = 1;
    bossSprite.body.velocity.x = -50;
    bossSprite.body.collideWorldBounds = false; // para no limite inferior da tela
    bossSprite.checkWorldBounds = true;
    bossSprite.outOfBoundsKill = true;
    if (countHeadButts < 2) {
        countHeadButts++;
    } else {
        countHeadButts = 0;
        setTimeout(function () {
            bossSprite.destroy();
            bossBackground.destroy();
            this.timer = this.game.time.events.loop(2000, add_obstacle, this);
        }, 6000);
    }
}

function floor_death(){
	deathSprite.body.velocity.y = 0;
	deathSprite.body.gravity.y = 0;
	deathSprite.animations.stop();
}
