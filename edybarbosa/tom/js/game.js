var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var cat;
var fence;
var cursors;
var obstacles;
var metrosPercorridos = 0;
var score;
var gameOver;
var obstacleTime = 0;
var scoreTime = 0;
var music;

function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.image('nuvens', 'assets/nuvens_879-227.png');
	game.load.image('fundo', 'assets/cenario_960-600.png');
	game.load.image('caixa', 'assets/caixas_142-174.png');
	game.load.image('lata', 'assets/lixeira_89-174.png');
	game.load.image('cerca', 'assets/cerca_690-182.png');
	game.load.spritesheet('gato', 'assets/sequencias_150-80-18.png', 150, 80, 18);
	
	game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
}

function create() {
	game.add.sprite(0, 0, 'fundo');
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Nuvens
	cloud = game.add.tileSprite(0, 10, 600, 227,'nuvens');
	game.physics.enable(cloud, Phaser.Physics.ARCADE);
	cloud.body.velocity.x = -2;
	// Fence
	fence = game.add.tileSprite(0, 410, 960, 182,'cerca');
	game.physics.enable(fence, Phaser.Physics.ARCADE);
	fence.body.immovable = true;

	// Group de obstaculos
	obstacles = game.add.group();
	
	createPlayer();
	createScore();
	
    cursors = game.input.keyboard.createCursorKeys();
    music = game.add.audio('boden');
    music.play();
}


function createPlayer() {
	// Gato
	cat        = game.add.sprite(180,270,'gato');
	game.physics.enable(cat, Phaser.Physics.ARCADE);
	cat.body.bounce.y = 0;
    cat.body.gravity.y = 600;
	cat.animations.add('run', [0, 3], 7, true);
	cat.animations.add('jump', [2,3], 2, true);
	cat.animations.add('roll', [4,9], 6, true);
	cat.animations.add('noise', [10,17], 6, true);
	cat.animations.play('run');
	
}

function createScore() {
	var style1 = { font: "14px Arial", fill: "#ffffff", align: "center" };
	game.add.text(750, 34, "Distance:", style1);
	game.add.text(750, 114, "Best:", style1);
	
	var style2 = { font: "26px Arial", fill: "#ffffff", align: "center" };
    // Conta metros 
    //timer = game.time.create(false);
    //timer.loop(300, updateScore, this);
    //timer.start();
    score = game.add.text(750, 50, metrosPercorridos + "m", style2);
    
    var bestScore = getScore();
    if (bestScore != "") {
        game.add.text(750, 130, getScore() + "m", style2);    	
    }
    
}

function createObstacle() {
	 if (game.time.now > obstacleTime) {
		var posicaoXObstaculo = 1000+(Math.random()*500);
		//var posicaoXObstaculo  = game.world.randomX + 960;
		var posicaoYObstaculo = 356;
		var velocidade = -400;
		if(Math.random() < 0.6) {
			var trash = game.add.sprite(posicaoXObstaculo, posicaoYObstaculo,'lata');
			game.physics.enable(trash, Phaser.Physics.ARCADE);
			trash.body.immovable = true;
			trash.body.velocity.x = velocidade;
			trash.body.checkCollision.up = false;
			obstacles.add(trash);
		} else {
			var box = game.add.sprite(posicaoXObstaculo,posicaoYObstaculo,'caixa');
			game.physics.enable(box, Phaser.Physics.ARCADE);
			box.body.immovable = true;
			box.body.velocity.x = velocidade;
			box.body.checkCollision.up = false;
			obstacles.add(box);
		}
		obstacleTime = game.time.now + 1600;
	 }
}

function update() {
	
		createObstacle();
		game.physics.arcade.collide(cat, obstacles, collisionHandler, null, this);
		game.physics.arcade.collide(cat, fence);
	
		if(!gameOver) {
		 	// Pulo do gato
			 if (cursors.up.isDown && cat.body.touching.down) {
		        cat.body.velocity.y = -300;
		        cat.animations.play('jump');
		        //var rotation = game.add.tween(cat).to({angle: cat.angle - 15}, 700, Phaser.Easing.Linear.None);
		        //rotation.start();	        
		    } else if (cursors.left.isDown && cat.body.touching.down) {
		    	cat.body.velocity.y = -420;
		    	//cat.animations.play('roll');
		    	cat.animations.play('roll');
		    } else if(cat.body.touching.down) {
			       cat.animations.play('run');
			       cat.angle = 0;	
		    }
		    // movimento cerca
		    fence.tilePosition.x -= 6;
		    updateScore();
		    score.setText(metrosPercorridos + "m");
		}
}

function updateScore() {
	if (game.time.now > scoreTime) {
		metrosPercorridos++;	
		scoreTime = game.time.now + 300;
	}
}

function collisionHandler (obj1, obj2) {
	gameOver = true;
    fence.tilePosition.x = 0;
    cat.animations.play('noise');    
    salvaScore();
}

function salvaScore() {
	var score = getCookie("score");
	if (score == "" || score < metrosPercorridos) {
		setCookie("score", metrosPercorridos, 100);
	}
}

function getScore() {
	return getCookie("score");
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++)	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}