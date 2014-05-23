var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload,
        create: create, update: update});

function preload () {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('meteoro', 'assets/meteor_170-135.png');
    game.load.image('tardis', 'assets/tardis_77-110.png');
}

function create () {
	// Add the background image
    game.add.sprite(0, 0, 'background');

    // Add TARDIS (the player)
    tardisSprite = game.add.sprite(100, (game.world.height - 110) / 2, 'tardis');
    game.physics.enable(tardisSprite, Phaser.Physics.ARCADE);
    tardisSprite.body.collideWorldBounds = true;

    // Add a group of mateors
    meteors = game.add.group();
    meteors.createMultiple(10, 'meteoro');
    game.physics.enable(meteors, Phaser.Physics.ARCADE);
    timer = game.time.events.loop(2000, addMeteor, this);

    meteorCounter = 0;

    // Add the score
    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff" };
    labelScore = game.add.text(game.world.width / 2, 20, "0", style);
}

function update () {
    game.physics.arcade.overlap(tardisSprite, meteors, kill, null, this);

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        tardisSprite.body.velocity.y = -250;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        tardisSprite.body.velocity.y = 250;
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
    var meteor = meteors.getFirstExists(false);

    if (meteor != null) {
        meteor.reset(x, y);
        meteor.body.velocity.x = -300 - Math.floor(Math.random() * 200);
        meteor.checkWorldBounds = true;
        meteor.outOfBoundsKill = true;
    } else {
    	console.web('Error: fail to add new meteors');
    }
}

function kill (tardis, meteoro)	{
    tardis.kill();
    meteoro.kill();
}