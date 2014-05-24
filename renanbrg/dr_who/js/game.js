var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload,
        create: create, update: update});

var snd_inicio, snd_musica;

function preload () {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('meteoro', 'assets/meteoro_120-135.png');
    game.load.image('meteoro2', 'assets/meteoro2_120-135.png');
    game.load.image('meteoro3', 'assets/meteoro3_120-135.png');
    game.load.image('meteoro4', 'assets/meteoro4_120-135.png');
    game.load.image('meteoro5', 'assets/meteoro5_120-135.png');
    game.load.image('meteoro6', 'assets/meteoro6_120-135.png');
    game.load.image('meteoro7', 'assets/meteoro7_120-135.png');
    game.load.image('meteoro8', 'assets/meteoro8_120-135.png');
    game.load.image('tardis', 'assets/tardis_77-110.png');
    snd_inicial = document.getElementById("inicial");
    snd_musica = document.getElementById("musica");
}

function create () {
	// Add the background image
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

    // Add TARDIS (the player)
    tardisSprite = game.add.sprite(100, (game.world.height - 110) / 2, 'tardis');
    game.physics.enable(tardisSprite, Phaser.Physics.ARCADE);
    tardisSprite.body.collideWorldBounds = true;

    // Add a group of meteoros
    meteors = game.add.group();
    meteors.createMultiple(10, 'meteoro');
    game.physics.enable(meteors, Phaser.Physics.ARCADE);
    timer = game.time.events.loop(2000, addMeteor, this);

    playerIsAlive = true;
    meteorCounter = 0;

    // Add the score
    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff" };
    labelScore = game.add.text(game.world.width / 2, 20, "0", style);
}

function update () {
    background.tilePosition.x--;
    game.physics.arcade.collide(tardisSprite, meteors, hitMeteor, null, this);

    snd_musica.loop = true;
	snd_musica.play();

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

function hitMeteor(tardis, meteoro) {
    tardis.body.collideWorldBounds = false;
    tardis.body.velocity.y = 0;
    tardis.body.velocity.x = meteoro.body.velocity.x;
    playerIsAlive = false;

    game.time.events.remove(timer);
    snd_musica.pause();
}
