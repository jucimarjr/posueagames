Coin = function() {
	this.coins;
	this.velocityX = -200;
	this.secondCreate = 4;
	this.rerender = true;
}

Coin.prototype = {

	preload : function() {
		game.load.image('coin', 'assets/coin.png');
	},

	create : function() {
		this.coins = game.add.group();
		game.time.events
				.loop(Phaser.Timer.SECOND*this.secondCreate , this.coinGenerator, this).timer
				.start();
	},

	update : function() {

	},
	stop : function(){
		this.rerender = false;
	},
	resume : function(){
		this.rerender = true;
	},
	coinGenerator : function() {
			var randonType = Math.round(Math.random()*5);
			
			if(randonType === SNAKE_ENEMY){
				this.geraSnakeCoin();
			}else if(randonType === TRIANGLE_ENEMY){
				this.geraTriagleCoin();
			}else if(randonType === STAIRS_ENEMY){
				this.geraStairsCoin();
			}else if(randonType === SIMPLE_ENEMY){
				this.geraSimpleCoin();
			}else {
				this.createPowerUp();
			}
	},
	createPowerUp : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width


		var max = game.world.height  - 3*67;
		var min = game.world.height  + 3*67;

		for(var i = 0; i < 50;i++){
			var XX = initXenemY + 69;
			var YY = initYEneMy - 67;
			if(YY >= max){
				YY += 67;
			}
			if(YY <= min){
				YY -= 67;
			}
			this.createRandomCoin(XX,YY);

		}	
	},
	createRandomCoin : function(x,y){
		var coin = this.coins.create(x, y, 'coin');
		game.physics.arcade.enableBody(coin);
		if(!this.rerender)
			this.velocityX = -800;
		else
			this.velocityX = -200;
		coin.body.velocity.x = this.velocityX;
	}
	,
	geraStairsCoin : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		
		for(var i = 0; i < 6;i++){
			this.createRandomCoin(initXenemY + i*69,initYEneMy - i*67);
		}
	}
	,
	geraSnakeCoin : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		for(var i = 0; i < 6;i++){
			this.createRandomCoin(initXenemY + i*121,initYEneMy);
		}
	}
	,
	geraTriagleCoin : function(tipo){
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
	geraSimpleCoin : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		this.createRandomCoin(initXenemY,initYEneMy);
	}

}