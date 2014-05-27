var game_state = { create: create, update: update};

function create () {

	//Add sounds
	soundMus = game.add.audio("musica");

	// Add the background image
    background = game.add.image(0, 0, 'background');
    starsBackground = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'stars');

    // Add TARDIS (the player)
    tardisSprite = game.add.sprite(100, (game.world.height - 110) / 2, 'tardis');
    game.physics.enable(tardisSprite, Phaser.Physics.ARCADE);
    tardisSprite.body.collideWorldBounds = true;
    tardisSprite.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);

    // Add a group of meteors
    meteors = game.add.group();
    meteor = meteors.create(game.world.width, 0, 'meteor1');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor2');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor3');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor4');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor5');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor6');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor7');
    meteor.exists = false;
    meteor = meteors.create(game.world.width, 0, 'meteor8');
    meteor.exists = false;

    game.physics.enable(meteors, Phaser.Physics.ARCADE);
    timeNewMeteor = 2500;
    timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
    timerLevel = game.time.events.loop(10000, changeLevel, this);

    life = game.add.sprite(game.world.width, game.world.height, 'powerup');
    game.physics.enable(life, Phaser.Physics.ARCADE);
    var timeAppearLife = (Math.random() * 5000) + 10000;
    powerUpTimer = game.time.events.loop(timeAppearLife, addLifeInGame, this);
    lifeCounter = 1;

    //Playing sounds
    soundIn.stop();
    tardisSound.stop();
    soundMus.play();
    soundMus.loop = true;
    playerIsAlive = true;
    playerWin = false;
    meteorCounter = 0;
    meteorType = 0;

    angleThreshold = 0;

    // Add the score
    score = 0;
    var style = { font: "36px Doctor-Who", fill: "#ffffff" };
    labelScore = game.add.text(game.world.width / 2, 20, "0", style);
    lifeLabel = game.add.text(game.world.width - 150, 20, "Life: 1", style);
}

function update () {
	starsBackground.tilePosition.x -= 0.1;
    game.physics.arcade.collide(tardisSprite, meteors, hitMeteor, null, this);
    game.physics.arcade.overlap(tardisSprite, life, oneUp, null, this);

    tardisSprite.animations.play('spin');

    if (playerIsAlive == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            tardisSprite.body.velocity.y = -250;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            tardisSprite.body.velocity.y = 250;
        }

        if (score >= 150 && playerWin == false) {
            game.time.events.remove(timer);
            victoryTimer = game.time.events.loop(4000, playerBeatGame, this);
        }
    }

    if (tardisSprite.body.x + 91 < 0) {
        if (lifeCounter == 1) {
            game.state.start('GameOver');
        } else {
            lifeCounter--;
            lifeLabel.setText("Life: " + lifeCounter);
            newChance();
        }
    }

    if (playerWin == true) {
        tardisSprite.body.velocity.y = 0;
        tardisSprite.body.velocity.x = 250;
        if (tardisSprite.body.x >= game.world.width) {
            game.state.start('Victory');
        }
    }

}

function changeLevel() {
    if (score >= 5 && score < 10) {
        game.time.events.remove(timer);
        timeNewMeteor -= 500;
        angleThreshold = 0.2;
        timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
    } else if (score >= 10 && score < 15) {
        game.time.events.remove(timer);
        timeNewMeteor -= 500;
        angleThreshold = 0.4;
        timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
    } else if (score >= 15 && score < 20) {
        game.time.events.remove(timer);
        timeNewMeteor -= 500;
        angleThreshold = 0.5;
        timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
    } else if (score >= 20 && score < 25) {
        game.time.events.remove(timer);
        timeNewMeteor -= 500;
        angleThreshold = 0.7;
        timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
    }
}

function addLifeInGame() {
    var lifeX = game.world.width;
    var lifeY = Math.floor(Math.random() * (game.world.height - 50));

    life.reset(lifeX, lifeY);
    life.body.velocity.x = -500;
    life.checkWorldBounds = true;
    life.outOfBoundsKill = true;
}

function oneUp() {
    lifeCounter++;
    life.kill();
    lifeLabel.setText("Life: " + lifeCounter);
}

function newChance() {
    meteors.forEach(killAllMeteors, this);
    tardisSprite.reset(100, (game.world.height - 110) / 2);
    tardisSprite.body.collideWorldBounds = true;
    playerIsAlive = true;
    timer = game.time.events.loop(timeNewMeteor, addMeteor, this);
}

function killAllMeteors(meteor) {
    meteor.reset(game.world.width, 0);
}

function addMeteor() {
    score += 1;
    labelScore.setText(score);

    if (meteorCounter != 10) {
        var meteorX = game.world.width;
        var meteorY = Math.floor(Math.random() * (game.world.height - 135));

        addMeteorInPosition(meteorX, meteorY);
        meteorCounter++;
    } else {
        var space = Math.floor(Math.random() * 4);

        for (var i = 0; i < 4; i++) {
            if (i != space) {
                addMeteorInPosition(game.world.width, i * (135 + 25));
            }
        }
        meteorCounter = 0;
    }
}

function addMeteorInPosition(x, y) {
	var meteor = meteors.getAt(meteorType);
	meteorType = (meteorType + 1) % 8;

    if (meteor != null) {
        meteor.reset(x, y);
        meteor.body.velocity.x = -300 - Math.floor(Math.random() * 200);
        // Randomly add a meteor with a different angle
        if (Math.random() < angleThreshold) {
            var direction = (Math.random() < 0.5) ? 1 : -1;
            meteor.body.velocity.y = direction * ((Math.random() * 50) + 50);
        }
        meteor.checkWorldBounds = true;
        meteor.outOfBoundsKill = true;
    } else {
        console.log('Error: fail to add new meteors');
    }
}

function hitMeteor(tardis, meteor) {
    tardis.body.collideWorldBounds = false;
    tardis.body.velocity.y = 0;
    tardis.body.velocity.x = meteor.body.velocity.x;
    playerIsAlive = false;

    game.time.events.remove(timer);
}

function playerBeatGame() {
	tardisSprite.body.collideWorldBounds = false;
	if (tardisSprite.body.y < (game.world.height - 110) / 2) {
		tardisSprite.body.velocity.y = 250;
	} else if (tardisSprite.body.y > (game.world.height - 110) / 2) {
		tardisSprite.body.velocity.y = -250;
    } else {
        tardisSprite.body.velocity.y = 0;
    }
	playerWin = true;
    game.time.events.remove(victoryTimer);
    game.time.events.remove(powerUpTimer);
    game.time.events.remove(timerLevel);
}