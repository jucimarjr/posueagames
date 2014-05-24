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
    tardisSprite.animations.add('spin', [0, 1, 2, 3, 4], 10, true);

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
    timer = game.time.events.loop(2000, addMeteor, this);

    //Playing sounds
    soundMus.play();
    soundMus.loop = true;
    playerIsAlive = true;
    meteorCounter = 0;
    meteorType = 0;

    // Add the score
    score = 0;
    var style = { font: "36px Doctor-Who", fill: "#ffffff" };
    labelScore = game.add.text(game.world.width / 2, 20, "0", style);
}

function update () {
	starsBackground.tilePosition.x -= 0.1;
    game.physics.arcade.collide(tardisSprite, meteors, hitMeteor, null, this);

    tardisSprite.animations.play('spin');

    if (playerIsAlive == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            tardisSprite.body.velocity.y = -250;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            tardisSprite.body.velocity.y = 250;
        }
    }
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
    soundMus.stop();
}
