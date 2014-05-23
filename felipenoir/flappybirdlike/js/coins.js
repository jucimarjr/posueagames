var coins = {

	preload : function() {
		game.load.image('coin', 'assets/coin.png');
	},

	create : function() {
		game.time.events
				.loop(Phaser.Timer.SECOND , this.coinGenerator, this).timer
				.start();
	},

	update : function() {

	},

	coinGenerator : function() {
		var randonType = Math.round(Math.random()*4);
		
		if(randonType === SNAKE_ENEMY){
			this.geraEnemySnake();
		}else if(randonType === TRIANGLE_ENEMY){
			this.geraEnemyTriagle();
		}else if(randonType === STAIRS_ENEMY){
			this.geraStairsEnemy();
		}else if(randonType === SIMPLE_ENEMY){
			this.geraSimpleEnemy();
		}
		
	},
	createRandomCoin : function(x,y){
		var coin = game.add.sprite(x, y, 'coin');
		game.physics.arcade.enableBody(coin);
		coin.body.velocity.x = -200;
	}
	,
	geraStairsEnemy : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		
		for(var i = 0; i < 6;i++){
			this.createRandomCoin(initXenemY + i*69,initYEneMy - i*67);
		}
	}
	,
	geraEnemySnake : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		for(var i = 0; i < 6;i++){
			this.createRandomCoin(initXenemY + i*121,initYEneMy);
		}
	}
	,
	geraEnemyTriagle : function(tipo){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		
		for(var i = 0; i < 3;i++){
			if(i === 0 ){
				this.createRandomCoin(initXenemY,initYEneMy);
			}else if(i === 1){
				this.createRandomCoin(initXenemY + i*121,initYEneMy - i*134);
			}else if(i === 2){
				this.createRandomCoin(initXenemY + i*121,initYEneMy);
			}
		}
	
	},
	geraSimpleEnemy : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		this.createRandomCoin(initXenemY,initYEneMy);
	}

}