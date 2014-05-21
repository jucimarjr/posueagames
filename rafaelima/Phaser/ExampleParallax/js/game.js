var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });
 
var platforms;
var cursors;
var player;
var score;
var scoreText;
var stars;
var background1;
var background2;
var background3;
var background4;

function preload() {
	game.load.image('background1', 'assets/background1.png');
	game.load.image('background2', 'assets/background2.png');
	game.load.image('background3', 'assets/background3.png');
	game.load.image('background4', 'assets/background4.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}
 
function create() {

	game.world.setBounds(0, 0, 2100, 600);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	background1 = game.add.sprite(0, 0, 'background1');
	
	background2 = game.add.sprite(0, 0, 'background2');
	game.physics.arcade.enable(background2);

	background3 = game.add.sprite(0, 0, 'background3');
	game.physics.arcade.enable(background3);
    
	platforms = game.add.group();
	platforms.enableBody = true;
	
	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(6, 2);
	ground.body.immovable = true;
	
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	 
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;
	 
    player = game.add.sprite(32, game.world.height - 150, 'dude');
	 
    game.physics.arcade.enable(player);
	 
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	 
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    game.camera.follow(player);

    stars = game.add.group();
    stars.enableBody = true;
    
    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
    background4 = game.add.sprite(0, 0, 'background4');
	game.physics.arcade.enable(background4);
	
//    score = 0;
//    scoreText = game.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
    
    cursors = game.input.keyboard.createCursorKeys();
}
 
function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	
    player.body.velocity.x = 0;
    background2.body.velocity.x = 0;
    background3.body.velocity.x = 0;
    background4.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
        if(game.camera.x>0 && game.camera.x<1140){ //P criatura não esquecer : 1140 é o valor do background inteiro menos o tamanho da tela -> 2100 - 960
	        background2.body.velocity.x = +10;
	        background3.body.velocity.x = +25;
	        background4.body.velocity.x = +70;
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
        if(game.camera.x>0 && game.camera.x<1140){
        	background2.body.velocity.x = -10;
        	background3.body.velocity.x = -25;
        	background4.body.velocity.x = -70;
        }
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}

function collectStar (player, star) {
    star.kill();
    
//   score += 10;
//   scoreText.text = 'Score: ' + score;
}

function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 200);
}
