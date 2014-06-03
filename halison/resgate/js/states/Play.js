
State.Play = function (game) {
	this.cursors;
	this.nave;
	this.space;
};


State.Play.prototype = {

	preload: function () {
		game.load.image('nave', Config.game.nave.dir);
		game.load.image('space', Config.game.background.dir);
		game.load.image('spaceForeground', Config.game.foreground.dir);
		game.load.image('planet', Config.game.planet.dir);
		game.load.image('asteroid', Config.game.asteroid.dir);
		game.load.image('gameover', Config.game.gameover.dir);
		
		game.load.image('score', Config.game.score.dir);
		game.load.image('coin_green_1', Config.game.coins.green.dir1);
		game.load.image('coin_green_2', Config.game.coins.green.dir2);
		game.load.image('coin_green_3', Config.game.coins.green.dir3);
		game.load.image('coin_green_4', Config.game.coins.green.dir4);
		game.load.image('coin_green_5', Config.game.coins.green.dir5);
		game.load.image('coin_green_6', Config.game.coins.green.dir6);
		game.load.image('coin_green_7', Config.game.coins.green.dir7);
		game.load.image('coin_green_8', Config.game.coins.green.dir8);
		game.load.image('coin_red_1', Config.game.coins.red.dir1);
		game.load.image('coin_red_2', Config.game.coins.red.dir2);
		game.load.image('coin_red_3', Config.game.coins.red.dir3);
		game.load.image('coin_red_4', Config.game.coins.red.dir4);
		game.load.image('coin_yellow_1', Config.game.coins.yellow.dir1);
		game.load.image('coin_yellow_2', Config.game.coins.yellow.dir2);
	},
	
	create: function () {

		game.world.setBounds(0, 0, 960, 600);
		
		game.physics.startSystem(Phaser.Physics.P2JS); // inicializa física com a lib P2JS
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 100;
	    game.physics.p2.defaultRestitution = 0.8;


		this.space = game.add.tileSprite(0, 0, 960, 600, 'space');
		this.starfield = game.add.tileSprite(0, 0, 960, 600, 'spaceForeground');
		this.planet = game.add.tileSprite(Config.game.planet.x, Config.game.planet.y, 960, 600, 'spaceForeground');

		this.nave = this.game.add.sprite(Config.game.nave.x, Config.game.nave.y, 'nave');
		game.physics.p2.enable(this.nave,false);

		this.nave.body.setRectangle(90); // ajusta caixa de colisão da nave
	    this.nave.body.fixedRotation = true;
		
		this.lifeNumber = 3;
		this.life = []; // store life imgs
		this.isGameOver = false;
		
		this.score = 0;
		
		// Create collision group for nave
		this.naveCollisionGroup = game.physics.p2.createCollisionGroup();
		this.nave.body.setCollisionGroup(this.naveCollisionGroup);
		this.nave.body.data.gravityScale = 10;
		
		// Create collision group for asteroids
		this.asteroidCollisionGroup = game.physics.p2.createCollisionGroup();
		
		this.asteroidGroup = game.add.group();
		this.asteroidGroup.enableBody = true;
		this.asteroidGroup.physicsBodyType = Phaser.Physics.P2JS;
		

		for (var i = 0; i < Config.game.asteroid.number; i++)
	    {
			var sprite;
	    	sprite = this.asteroidGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'asteroid');
	    	sprite.body.setCircle(40);	
	    	sprite.body.setCollisionGroup(this.asteroidCollisionGroup); //add   
	    	sprite.body.collides([this.asteroidCollisionGroup, this.naveCollisionGroup]);
	    	game.physics.p2.enable(sprite, true);
//	    	time = game.rnd.integerInRange(1400,2000);
//	    	scale = time/1200; aqui mesmo oh
	    	sprite.body.allowGravity = false;
	    	sprite.velocity = game.rnd.integerInRange(Config.game.asteroid.velocityRangeIni,Config.game.asteroid.velocityRangeEnd);
//			sprite.enableBody = true;
//			sprite.physicsBodyType = Phaser.Physics.P2JS;
	    }

		// Set collision between nave and asteroids
		this.nave.body.collides(this.asteroidCollisionGroup, this.hitAsteroid, this);
//		this.nave.body.onBeginContact.add(blockHit,this);
		
//		Create collision group for coins
		this.coinsCollisionGroup = game.physics.p2.createCollisionGroup();
		this.coinsGroup = game.add.group();
		this.coinsGroup.enableBody = true;
		this.coinsGroup.physicsBodyType = Phaser.Physics.P2JS;
	
		for (var i = 0; i < Config.game.coins.number; i++)
		    {
				var color = 0;
				var number = Math.random();
				if (number <= 0.2){
					color = 0;
				} else if (number > 0.3 && number <= 0.7){
					color = 1;
				} else {
					color = 2;
				}
				
				var sprite = null;
				number = Math.random();
				
				if (color == 0){
					if (number <= 0.25 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_1');
					} else if (number > 0.25 && number <= 0.5 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_2');
					} else if (number > 0.5  && number <= 0.75){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_3');
					} else if (number > 0.75){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_4');
					}
					sprite.body.isRed = true;
				} else if (color == 1){
					if (number > 0.5 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_yellow_1');
					} else {
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_yellow_2');
					}
					sprite.body.isYellow = true;
				} else if (color == 2){
					if (number <= 0.1 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_1');
					} else if (number > 0.1 && number <= 0.2 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_2');
					} else if (number > 0.2 && number <= 0.3 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_3');
					} else if (number > 0.3 && number <= 0.4 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_4');
					} else if (number > 0.4 && number <= 0.5 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_5');
					} else if (number > 0.5 && number <= 0.7 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_6');
					} else if (number > 0.7 && number <= 0.8 ){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_7');
					} else if (number > 0.8){
						sprite = this.coinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_8');
					}
					sprite.body.isGreen = true;
				}
		    	sprite.body.setCircle(31);	
		    	sprite.body.setCollisionGroup(this.coinsCollisionGroup); //add   
		    	sprite.body.collides([this.coinsCollisionGroup, this.naveCollisionGroup]);
		    	sprite.body.allowGravity = false;
		    }
		
		this.nave.body.collides(this.coinsCollisionGroup, this.hitCoin, this);

		this.drawLives();
		
		game.add.image(Config.game.score.x,Config.game.score.y,'score');
		this.textScore = game.add.text(Config.game.score.textX,Config.game.score.textY, "000000", {
	        font: "32px Arial",
	        fill: "#ffffff",
	        align: "right"
	    });
		this.textScore.anchor.setTo(0.5, 0.5);
		
		this.gameover = game.add.image(980,0,'gameover');
				
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function(){
		
	  if (!this.isGameOver){
		
		// Refresh background and foreground position 
		this.space.tilePosition.x = this.space.tilePosition.x  -5;
		if (this.space.tilePosition.x == -Config.global.width ){
			this.space.tilePosition.x = 0;
		}
		this.starfield.tilePosition.x = this.starfield.tilePosition.x  -7;
		if (this.starfield.tilePosition.x == -Config.global.width ){
			this.starfield.tilePosition.x = 0;
		}
		
		// Refresh nave position according the keys UP and DOWN
		this.nave.body.setZeroVelocity();
	    if (this.cursors.up.isDown)
	    {
	    	this.nave.body.moveDown(400);
	    	
	    } else  if (this.cursors.down.isDown)
	    {
	    	this.nave.body.moveUp(400);
	    }
	    
	    if (this.nave.body.y < 0 || this.nave.body.y > Config.global.screen.height ||
		     this.nave.body.x < 0 || this.nave.body.x > Config.global.screen.width){
			this.gameover.x = Config.game.gameover.x;
			this.gameover.y = Config.game.gameover.y;
			setTimeout(function () {
			  game.state.start('Menu');
			 }, Config.game.gameover.time);
			this.isGameOver = true;
	    }
	    
	    // Refresh asteroid position
	    for (var i = 0; i < Config.game.asteroid.number ; i++)
		{
			var sprite = this.asteroidGroup.getAt(i);
			sprite.body.setZeroVelocity();
			sprite.body.moveLeft( sprite.velocity );
			if (sprite.body.x <= -sprite.width)
			{
				sprite.velocity = game.rnd.integerInRange(Config.game.asteroid.velocityRangeIni,Config.game.asteroid.velocityRangeEnd);
				sprite.body.x = game.world.width+sprite.width;
				sprite.body.y = game.rnd.integerInRange(-100, 620);
		    }
		}
	    
	    
	    for (var i = 0; i < Config.game.coins.number; i++)
		{
			var sprite = null;
			sprite = this.coinsGroup.getAt(i);
			if (sprite.alive){
				sprite.body.setZeroVelocity();
				sprite.body.moveLeft(Config.game.coins.velocity); //game.rnd.integerInRange(100,200) );
				if (sprite.body.x < -sprite.width)
				{
					sprite.reset(game.world.width+sprite.width,game.rnd.integerInRange(-100, 620));
			    }
			} else {
				sprite.reset(game.world.width+sprite.width,game.rnd.integerInRange(-100, 620));
		    }
		}
	  }
	    
	},
	
	drawLives: function ()
	{
		for ( var i = 0; i < this.lifeNumber; i++)
		{
			this.life[i] = game.add.sprite(Config.game.score.lifeX+(i*50), Config.game.score.lifeY, 'nave');
			this.life[i].scale.x = 0.4;
			this.life[i].scale.y = 0.7;
		}
	},

	hitAsteroid: function (body1, body2)
	{
				
		if (this.lifeNumber > 0)
		{
			this.lifeNumber--;
			this.life[this.lifeNumber].kill();
		}
		
		if (this.lifeNumber == 0){
			this.gameover.x = Config.game.gameover.x;
			this.gameover.y = Config.game.gameover.y;
			setTimeout(function () {
			  game.state.start('Menu');
			 }, Config.game.gameover.time);
			this.isGameOver = true;
		}	  
		
	},
	
	hitCoin: function (body1, body2) 
	{
		if (this.isGameOver) return;
		if (body2.isYellow){
			this.score+=3;
			if (this.score > 100000) 
				this.score = 999999;

		} else if (body2.isRed){
			this.score--;
			if (this.score < 0) 
				this.score = 0;

		} else if (body2.isGreen){
			this.score+=6;
			if (this.score > 100000) 
				this.score = 999999;
		}
		
		// Update score points
		var zeros = "0000000";
		if (this.score < 10 )
			zeros = "00000";
		else if (this.score < 100)
			zeros = "0000";
		else if (this.score < 1000)
			zeros = "000";
		else if (this.score < 10000)
			zeros = "00";
		else if (this.score < 10000)
			zeros = "0";
		
		this.textScore.setText(""+zeros + this.score);
		
		body2.sprite.kill();
	},


};



