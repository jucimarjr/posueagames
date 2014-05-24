
var floor,bonecoSprite,obstacles, ledges, ledge, fuels, fuel, fuel_audio, music, blocos, energia;

var start = 1;
var count = 0;
var highscore; 

var _VELOCIDADE_PULO = -250;
var _TIMER_FUEL = 4500;

var timer;
var counter = 2000;

var dado = parseInt(localStorage.getItem("maiorPontuacao"));
highscore = (isNaN(dado))?0:dado;

var primeiraFaseHell = {
		preload: function(){
			game.load.spritesheet('boneco', 'assets/bonecoSpriteSheet2_240-60-4.png', 60,60);
			game.load.image('chao', 'assets/top2_100-100.png');
			game.load.image('top', 'assets/top3_50-50.png');
		    game.load.image('ground', 'assets/hellcopter_background2.png');
		    game.load.image('bloco', 'assets/block4.png');
		    game.load.image('fuel', 'assets/fuel_25-35.png');
		    game.load.spritesheet('helicoptero', 'assets/helicopterSpriteSheet_455-60-5.png', 91, 60);

		    game.load.audio('helice', 'assets/zap.wav');
		    game.load.audio('musicBackground', 'assets/bt_bike_race.ogg.ogg');
		    game.load.audio('pick_up_fuel', 'assets/pick_up_fuel.wav');
		    game.load.audio('explosion', 'assets/explosion.mp3');

		},
		
		create: function(){
			game.add.sprite(0, 0, 'chao');
			game.add.sprite(0, 0, 'top');
			
			fuel_audio = game.add.audio('pick_up_fuel');
			fuel_audio.addMarker('pick_fuel', 0,0,1,false);
		    
		    music = game.add.audio('helice');
		    music.addMarker('sobe', 1,1, 0.3, false);

		    music2 = game.add.audio('musicBackground');
		    music2.addMarker ('backMusic',0,0,1,true);
		    
		    explosion = game.add.audio('explosion');
		    explosion.addMarker('boom', 3, 6, 1, false);
		    
		    music2.play('backMusic');

		    //faz a chao rolar em loop
		    this.ground2 = this.game.add.tileSprite(0, 0, 960, 600, 'ground');//(x,y,tamanho em x,?)
		    this.ground2.autoScroll(-20, 0);

		    this.ground = this.game.add.tileSprite(0, 500, 960, 100, 'chao');//(x,y,tamanho em x,?)
		    this.ground.autoScroll(-400, 0);

		    this.top = this.game.add.tileSprite(0,0,960,25,'top');
		    this.top.autoScroll(-400, 0);
		    
		    game.physics.enable(this.top, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		    game.physics.enable(this.ground, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		    
		    this.ground.body.immovable = true;
		    this.ground.body.width = this.game.world.width;
		    
		    this.top.body.immovable = true;
		    this.top.body.width = this.game.world.width;
		    
		    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		    cursors = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

			// Criando o Helicoptero
			bonecoSprite = game.add.sprite(250, 150, 'helicoptero');
			bonecoSprite.animations.add('jump',[0,3],3,true);
			bonecoSprite.animations.add('explode',[4],1,true);
			
			bonecoSprite.animations.play('jump');
			
			game.physics.enable(bonecoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico

		    bonecoSprite.body.velocity.y= _VELOCIDADE_PULO;
		    bonecoSprite.body.gravity.y=1000;

		    bonecoSprite.body.collideWorldBounds = true; // para no limite inferio da tela

		    game.add.tween(this.player).to({angle: -15}, 300);
		    
		    blocos = game.time.events.loop(1000, createBlocos, this);
		    energia = game.time.events.loop(_TIMER_FUEL, createFuels, this);
		    
		    ledges = game.add.group();
		    ledges.enableBody = true;
		    
		    fuels = game.add.group();
		    game.physics.enable(fuels, Phaser.Physics.ARCADE);
		    fuels.enableBody = true;
		    
		    text = game.add.text(100, 15, "Score: 0", {
		    	font: "25px Arial",
		    	fill: "#fff",
		    	align: "center"
		    }); 
		    
		    text2 = game.add.text(game.world.centerX, game.world.centerY, "", {
		    	font: "25px Arial",
		    	fill: "#fff",
		    	align: "center"
		    });
		    text.anchor.setTo(0.5, 0.5);

		    text4 = game.add.text(game.world.width - 150, 15, "Highscore:"+highscore, {
		    	font: "25px Arial",
		    	fill: "#fff",
		    	align: "center"
		    });
		    	text4.anchor.setTo(0.5, 0.5); 
		    
		    var textStyle = { font: '25px Arial', 
		    				  align: 'center', 
		    				  fill:'#fff'};
		    
		    timer = game.add.text(game.world.centerX/2, 0, 'Fuel: '+counter, textStyle);

		},
		
		update: function(){
			game.time.events.add(Phaser.Timer.SECOND, updateCounter, this);
			
			if(start == 1){		
				if ( game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) { // tecla do pulo
			        bonecoSprite.body.velocity.y = _VELOCIDADE_PULO;
		            music.override=false;
		            music.play('sobe');
			    }
			}else{
				restart();
			}

			//Verifica se chocou com o topo, o chão ou com blocos	
		    game.physics.arcade.collide(bonecoSprite, this.ground, colidirBounds, null, this);
		    game.physics.arcade.collide(bonecoSprite, this.top, colidirBounds, null, this);
		    game.physics.arcade.collide(bonecoSprite, ledges, colidir, null, this);
		    game.physics.arcade.overlap(bonecoSprite, fuels, checkOverlap, null, this); 
		}
};


function restart(){
    if ( game.input.keyboard.isDown (Phaser.Keyboard.R) ) {
        game.state.restart('menu');
        //game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        document.location.reload(false);
    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    if(Phaser.Rectangle.intersects(boundsA, boundsB)){
    	fuel_audio.play('pick_fuel');
    	incrementCounter(spriteB);
    }

}


function createFuels(){
	fuel = fuels.create(game.world.width, game.rnd.integerInRange(30, game.world.height) - 100, 'fuel');
	if((fuel.y + fuel.height)>500 ){
		fuel.y += -200;
	}else if (fuel.y < 50){
		fuel.y+= 100; 
	}else if ((fuel.y + fuel.height)<=200){
		fuel.y+=100;
	}
	
	fuel.body.velocity.x = -500;
	fuel.body.immovable = true;
	fuel.outOfBoundsKill = true;
}

function colidirBounds(){
	bonecoSprite.animations.play('explode');
	explosion.play('boom');
	gameEnd();
}

function colidir(player, ledge){
			ledge.kill();
			explosion.play('boom');
			bonecoSprite.animations.play('explode');
			gameEnd(player, ledge);
}


function createBlocos() {
	ledge = ledges.create(game.world.width, game.rnd.integerInRange(35, game.world.height) - 100, 'bloco');
	
	if((ledge.y + ledge.height)>500 ){
		ledge.y += -200;
	}else if (ledge.y < 50){
		ledge.y+= 100; 
	}else if ((ledge.y + ledge.height)<=200){
		ledge.y+=100;
	}

	ledge.body.velocity.x = -700;
	ledge.body.immovable = true;
	ledge.outOfBoundsKill = true;

	count = count + 15;
	text.setText("Score: " + count);
} 

function gameEnd(player, ledge) {
	game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	//bonecoSprite.destroy();
	game.time.events.stop(true);
	music2.stop();

	game.time.events.remove(blocos);
	game.time.events.remove(energia);
	
	text2.setText("Game over. Score: " + count + "\nPress R to restart.");
	text2.anchor.setTo(0.5, 0.5);

	bonecoSprite.body.velocity.y = 0;
	bonecoSprite.body.velocity.x = 0;
	bonecoSprite.body.gravity.y = 0;
	start = 0;
	setarMaiorPontuacao();
	bonecoSprite.animations.stop('explode');
}

function updateCounter(){
	
	if(counter>0){
		counter--;
	    timer.setText('Fuel: '+counter);
	}else{
		gameEnd();
	}
}

function incrementCounter(fuel){
	counter+=250;
	fuel.kill();
}

function setarMaiorPontuacao(){
	  if(count>highscore){
	     highscore = count;
	     localStorage.setItem("maiorPontuacao", count);
	     text4.setText("Highscore: " + highscore);
	  }
}