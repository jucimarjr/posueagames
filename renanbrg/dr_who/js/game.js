<<<<<<< HEAD
var game_state = { create: create, update: update};


=======
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload,
        create: create, update: update});

var snd_inicio, snd_musica;

function preload () {
    game.load.image('background', 'assets/background_960-600.png');
    game.load.image('stars', 'assets/estrelas_960-600.png');
    game.load.image('meteor1', 'assets/meteoro1_135-120.png');
    game.load.image('meteor2', 'assets/meteoro2_135-120.png');
    game.load.image('meteor3', 'assets/meteoro3_135-120.png');
    game.load.image('meteor4', 'assets/meteoro4_135-120.png');
    game.load.image('meteor5', 'assets/meteoro5_135-120.png');
    game.load.image('meteor6', 'assets/meteoro6_135-120.png');
    game.load.image('meteor7', 'assets/meteoro7_135-120.png');
    game.load.image('meteor8', 'assets/meteoro8_135-120.png');
    game.load.spritesheet('tardis', 'assets/tardis_455-110.png', 91, 110);
    snd_inicial = document.getElementById("inicial");
    snd_musica = document.getElementById("musica");
}
>>>>>>> 036bbdebe9b1189a3f9319e52b95518292c529f8

function create () {
	
	//Add sounds
	soundMus = game.add.audio("musica");
	
	// Add the background image
<<<<<<< HEAD
	background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
=======
    background = game.add.image(0, 0, 'background');
    starsBackground = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'stars');
>>>>>>> 036bbdebe9b1189a3f9319e52b95518292c529f8

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

<<<<<<< HEAD
    
    meteorCounter = 0;
    
    
    //Playing sounds
    soundMus.play();
    soundMus.loop = true; 
    
=======
    playerIsAlive = true;
    meteorCounter = 0;
    meteorType = 0;
>>>>>>> 036bbdebe9b1189a3f9319e52b95518292c529f8

    // Add the score
    score = 0;
    var style = { font: "36px Doctor-Who", fill: "#ffffff" };
    labelScore = game.add.text(game.world.width / 2, 20, "0", style);
}

function update () {
<<<<<<< HEAD
	
    background.tilePosition.x--;
    game.physics.arcade.overlap(tardisSprite, meteors, kill, null, this); 
    
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	        tardisSprite.body.velocity.y = -250;
	    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	        tardisSprite.body.velocity.y = 250;
	    }	
	  
=======
	starsBackground.tilePosition.x -= 0.1;
    game.physics.arcade.collide(tardisSprite, meteors, hitMeteor, null, this);

    tardisSprite.animations.play('spin');

    snd_musica.loop = true;
	snd_musica.play();

    if (playerIsAlive == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            tardisSprite.body.velocity.y = -250;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            tardisSprite.body.velocity.y = 250;
        }
    }
>>>>>>> 036bbdebe9b1189a3f9319e52b95518292c529f8
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

<<<<<<< HEAD
function kill (tardis, meteoro)	{
    tardis.kill();
    meteoro.kill(); 
    soundMus.stop(); 
}




=======
function hitMeteor(tardis, meteor) {
    tardis.body.collideWorldBounds = false;
    tardis.body.velocity.y = 0;
    tardis.body.velocity.x = meteor.body.velocity.x;
    playerIsAlive = false;

    game.time.events.remove(timer);
    snd_musica.pause();
}
>>>>>>> 036bbdebe9b1189a3f9319e52b95518292c529f8
