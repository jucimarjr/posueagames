var play_state = { create: create, update: update };

var speed = 1;
//Sem function preload() pq já existe no load.js
function create() {

    background1 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background1').height, 'background1');
    game.physics.arcade.enable(background1);

    background2 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background2').height, 'background2');
    game.physics.arcade.enable(background2);

    background3 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background3').height, 'background3');
    game.physics.arcade.enable(background3);

    loadExtras();

    playerSprite = game.add.sprite(172, 281.5, 'player');
    playerSprite.animations.add('walk', [0, 1, 2, 3], 8, true);
    game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
    playerSprite.body.gravity.y = 1000;
    playerSprite.body.collideWorldBounds = false; // para no limite inferior da tela
    game.camera.follow(playerSprite.sprite);

    deathSprite = game.add.sprite(playerSprite.body.position.x, playerSprite.body.position.y, 'death');
    deathSprite.exists = false;
    deathSprite.animations.add('fall', [0, 1], 5, true);
    game.physics.enable(deathSprite, Phaser.Physics.ARCADE);
    deathSprite.body.gravity.y = 1500;
    deathSprite.body.collideWorldBounds = true; // parar no limite inferior da tela
    
    background4 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background4').height, 'background4');
    game.physics.arcade.enable(background4);

    background5 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background5').height, 'background5');
    game.physics.arcade.enable(background5); 
    // Call the 'jump' function when the spacebar key is hit
    space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(jump, this);
    space_key.onUp.add(notJump, this);

    jump_sound = this.game.add.audio('flap_song');

    this.timer = this.game.time.events.loop(2000, add_obstacle, this);

    cursors = game.input.keyboard.createCursorKeys();

    //score  metros
    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff" };
    this.label_score = this.game.add.text(20, 20, "0", style);

    //bloqueia novos obstaculos por 3 ataques do boss e depois o jogo volta ao normal IMPORTANTE P/ MINI BOSS!!!!!!!!!!!!!!!!!!!!11111
    /*SEQUENCIA IMPORTANTE P/ MINI BOSS!!!!!!!!!!!!!!!!!!!!11111
    game.time.events.remove(this.timer);
    countHeadButts = 0;
    bossFight();
    bossBackground = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bossbg').height, 'bossbg');
    game.physics.arcade.enable(bossBackground); */
}

// Start the actual game
function update() {

    score += 0.05;
    this.label_score.text = score.toFixed(0);  //sem casa decimal

    playerSprite.animations.play('walk');

    if ((bossSprite != null) && (bossSprite.exists === true)) {
        game.physics.arcade.overlap(bossSprite, playerSprite, playerDies, null, this);
        if (bossDirection >= 0.5) {
            if (bossSprite.body.position.y < 230) { //começa p/ cima
                bossSprite.body.velocity.y = 100;
                bossSprite.frame = 0;
            } else if (bossSprite.body.position.y >= 600 && countHeadButts < 3) {
                bossFight();
            }

        } else {
            if (bossSprite.body.position.y > 370) {
                bossSprite.body.velocity.y = -100;
                bossSprite.frame = 0;
            } else if (bossSprite.body.position.y <= 0 && countHeadButts < 3) {
                bossFight();
            }
        }
    }

    if (playersGroup != null) {
        playersGroup.callAll('animations.play', 'animations', 'walk');
        playersGroup.forEach(function (item) { game.physics.arcade.overlap(item, plataformas, function () { item.kill(); }, null, this); });
    }

    if (powerUps != null) {
        powerUps.animations.play('glow');
        powerUps.body.velocity.x = -2;
        game.physics.arcade.overlap(powerUps, playerSprite, powerUp_multiply, null, this);
    }

    game.physics.arcade.overlap(playerSprite, plataformas, playerDies, null, this)

    //bate no chao
    if ((Math.round(playerSprite.y) + playerSprite.height) >= game.world.height)
        restart_game();

    if (cursors.left.isDown) {
        speedPlayerSlow();
    } else if (cursors.right.isDown) {
        speedPlayerFast();
    } else if (cursors.up.isDown) {
        speedPlayerNormal();
    } else if (cursors.down.isDown) {
        smallSizePlayer();
    }
    
    playerSprite.body.velocity.x = 0; 
    background1.tilePosition.x -= 0.5 * speed;
    background2.tilePosition.x -= 2 * speed;
    background3.tilePosition.x -= 3 * speed;
    background4.tilePosition.x -= 4 * speed;
    background5.tilePosition.x -= 0 * speed;
    
}

function jump() {
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

function speedPlayerFast() {
    playerSprite.body.gravity.y = 3000;
    speed = 4;
}

function speedPlayerSlow() {
    playerSprite.body.gravity.y = 500;
    speed = 0.3;
}

function speedPlayerNormal() {
    playerSprite.body.gravity.y = 1500;
    speed = 1;
    normalSizePlayer();
}

function smallSizePlayer() {
    playerSprite.width = 104;
    playerSprite.height = 44.5;
    //    	playerSprite.body.setSize(40,50);
}

function normalSizePlayer() {
    playerSprite.width = 208;
    playerSprite.height = 89;
}

function restart_game() {
    game.time.events.remove(this.timer);
    game.state.start('play');
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
            addOutBoundEvent(obstacle1);
            break;
        case 1:
            obstacle2 = plataformas.create(950, game.world.randomY, 'obstacle2');
            game.physics.enable(obstacle2, Phaser.Physics.ARCADE);
            obstacle2.body.velocity.x = -600;
            addOutBoundEvent(obstacle2);
            break;
        case 2:
            obstacle3 = plataformas.create(950, 195, 'obstacle3');
            game.physics.enable(obstacle3, Phaser.Physics.ARCADE);
            obstacle3.body.velocity.x = -100;
            addOutBoundEvent(obstacle3);
            break;
        case 3:
            obstacle4 = plataformas.create(950, 381, 'obstacle4');
            game.physics.enable(obstacle4, Phaser.Physics.ARCADE);
            obstacle4.body.velocity.x = -100;
            addOutBoundEvent(obstacle4);
            break;
        default:
            break;
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
    powerUps.destroy();
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
    setTimeout(powerUp_multiply_Off, 5000);
}

function powerUp_multiply_Off() {
    playersGroup.forEach(function (item) { item.destroy(); }, null, this);
    playersGroup.destroy();
}

function loadExtras() {
    plataformas = game.add.group();
    plataformas.enableBody = true;

    powerUps = game.add.sprite(390, 281.5, 'powerup2');
    powerUps.animations.add('glow', [0, 1, 2, 3], 8, true);
    game.physics.arcade.enable(powerUps);
}

function bossFight() {
    bossDirection = Math.random();
    //bigboss
    if (bossSprite != null)
        bossSprite.destroy();
    var X = game.world.randomX;
    if (X < 258)
        X = playerSprite.body.position.x + 258;
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
