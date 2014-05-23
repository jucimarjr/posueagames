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
    meteors.createMultiple(10, 'meteor');
    game.physics.enable(meteors, Phaser.Physics.ARCADE);
    timer = game.time.events.loop(2000, addMeteor, this);
}

function update () {
    game.physics.arcade.overlap(tardisSprite, meteors, kill, null, this);

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	    tardisSprite.body.velocity.y = -200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        tardisSprite.body.velocity.y = 200;
    }
}

function addMeteor() {
    meteorX = game.world.width;
    meteorY = Math.floor(Math.random() * (game.world.height - 135));

    var meteor = meteors.getFirstExists(false);
    if (meteor != null) {
        meteor.reset(meteorX, meteorY);
        meteor.body.velocity.x = -200 + Math.floor(Math.random() * 200);
        meteor.checkWorldBounds = true;
        meteor.outOfBoundsKill = true;
    } else {
    	console.web('Error: fail to add new meteors');
    }
}

function kill (tardis,meteoro)	{
    tardis.kill();
    meteoro.kill();
}