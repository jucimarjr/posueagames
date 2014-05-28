Game.Play = function (game) { };

Game.Play.prototype = {

	create: function () {
		game.add.sprite(0, 0, 'fundo');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Nuvens
		cloud = game.add.tileSprite(0, 10, 600, 227,'nuvens');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x = -4;
		// Fence
		fence = game.add.tileSprite(0, 418, 960, 182,'cerca');
		game.physics.enable(fence, Phaser.Physics.ARCADE);
		fence.body.immovable = true;

		// Group de obstaculos
		obstacles = game.add.group();
		
		this.createPlayer();
		this.createScore();
		
	    a = game.input.keyboard.addKey(Phaser.Keyboard.A);
	    s = game.input.keyboard.addKey(Phaser.Keyboard.S);	  

	    music = game.add.audio('boden');
	    music.play();
	},
	createPlayer: function() {
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
	},	
	createScore: function() {
		var style1 = { font: "14px Arial", fill: "#ffffff", align: "center" };
		game.add.text(750, 34, "Distance:", style1);
		game.add.text(750, 114, "Best:", style1);
		
		var style2 = { font: "26px Arial", fill: "#ffffff", align: "center" };
	    // Conta metros 
	    //timer = game.time.create(false);
	    //timer.loop(300, updateScore, this);
	    //timer.start();
	    score = game.add.text(750, 50, metrosPercorridos + "m", style2);
	    
	    var bestScore = this.getScore();
	    if (bestScore != "") {
	        game.add.text(750, 130, this.getScore() + "m", style2);    	
	    }
	    
	},
	createObstacle: function() {
		 if (game.time.now > obstacleTime) {
			var posicaoXObstaculo = 1000+(Math.random()*500);
			//var posicaoXObstaculo  = game.world.randomX + 960;
			var posicaoYObstaculo = 366;
			// quanto mais percorre mais dificil
			var velocidade = -400 - metrosPercorridos;
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
			obstacleTime = game.time.now + (2000-(metrosPercorridos*3));
		 }
	},
	update: function() {
		
			this.createObstacle();
			game.physics.arcade.collide(cat, obstacles, this.collisionHandler, null, this);
			game.physics.arcade.collide(cat, fence);
		
			if(!gameOver) {
			 	// Pulo do gato
				 if (a.isDown && cat.body.touching.down) {
			        cat.body.velocity.y = -300;
			        cat.animations.play('jump');
			        //var rotation = game.add.tween(cat).to({angle: cat.angle - 15}, 700, Phaser.Easing.Linear.None);
			        //rotation.start();	        
			    } else if (s.isDown && cat.body.touching.down) {
			    	cat.body.velocity.y = -300;
			    	//cat.animations.play('roll');
			    	cat.animations.play('roll');
			    } else if(cat.body.touching.down) {
				       cat.animations.play('run');
				       cat.angle = 0;	
			    }
			    // movimento cerca
			    fence.tilePosition.x -= 8;
			    this.updateScore();
			    score.setText(metrosPercorridos + "m");
			}
	},
	updateScore: function() {
		if (game.time.now > scoreTime) {
			metrosPercorridos++;	
			scoreTime = game.time.now + 300;
		}
	    
	},
	collisionHandler: function(obj1, obj2)  { 
		gameOver = true;
	    fence.tilePosition.x = 0;
	    cat.animations.play('noise');    
	    this.salvaScore();
	    music.stop();
	    //this.game.state.start('Gameover');
	    game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOver, this);
	},
	
	gameOver: function() {
		this.game.state.start('Gameover');
	},
	
	salvaScore: function() {
		var score = this.getCookie("score");
		if (score == "" || score < metrosPercorridos) {
			this.setCookie("score", metrosPercorridos, 100);
		}
	},
	getScore: function() {
		return this.getCookie("score");
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)	{
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	},
	setCookie: function(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	
};
