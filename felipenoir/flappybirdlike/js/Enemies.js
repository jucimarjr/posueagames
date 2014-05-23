Enemies = function(game) {
	this.game = game;
	this.enemies;
	this.sprites = [ 'char1', 'char2', 'char3' ];
	this.x = game.world.width;
    this.y = game.world.randomY;
	this.minSpeed = -75;
    this.maxSpeed = 75;
	this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
    this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
	
}

var TRIANGLE_ENEMY = 0;
var SNAKE_ENEMY = 1;
var STAIRS_ENEMY = 2;
var SIMPLE_ENEMY = 3;

function geraEnemyFloor(){
	return (game.world.height -90) -134;
}

function geraEnemyMiddle(){
	return (game.world.height -90) - 2*134;
}

function geraEnemyTop(){
	return (game.world.height -90) - 3*134;
}

function selecionaEnemy(){
	var ran = Math.round(Math.random()*3);
	
	if(ran == 0){
		return geraEnemyFloor();
	}else if (ran == 1 ){
		return geraEnemyMiddle();
	}else if(ran == 2){
		return geraEnemyTop();
	}
}

Enemies.prototype = {
	preload : function() {
		this.game.load.spritesheet(this.sprites[0], 'assets/char1_121-134.png',
				120, 130);
		this.game.load.spritesheet(this.sprites[1], 'assets/char2_110-134.png',
				110, 130);
		this.game.load.spritesheet(this.sprites[2], 'assets/char3_111-134.png',
				110, 130);
	},

	create : function() {
		this.enemies = this.game.add.group();
		this.game.time.events.loop(Phaser.Timer.SECOND * 2,
				this.generateEnemy, this).timer.start();
	},
	generateBarrier : function(x, y) {
		var enemy = this.enemies.create(x,
				y, this.sprites[this.game.rnd
						.integerInRange(0, 2)]);
		this.game.physics.arcade.enableBody(enemy);
		enemy.body.allowGravity = false;
		enemy.body.immovable = true;
		enemy.body.velocity.x = -400;
		
		return enemy;
	},
	
	generateEnemy : function(){
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
	geraSimpleEnemy : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		var enemy = this.generateBarrier(initXenemY,initYEneMy);
		enemy.animations.add('run', [ 0, 1 ], 2, true);
		enemy.animations.play('run');
	}
	,
	geraStairsEnemy : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		
		for(var i = 0; i < 3;i++){
			var enemy = this.generateBarrier(initXenemY + i*121,initYEneMy - i*134);
			enemy.animations.add('run', [ 0, 1 ], 2, true);
			enemy.animations.play('run');
		}
	}
	,
	geraEnemySnake : function(){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		for(var i = 0; i < 3;i++){
			var enemy = this.generateBarrier(initXenemY + i*121,initYEneMy);
			enemy.animations.add('run', [ 0, 1 ], 2, true);
			enemy.animations.play('run');
		}
	}
	,
	geraEnemyTriagle : function(tipo){
		var initYEneMy = selecionaEnemy();
		var initXenemY = game.world.width;
		
		for(var i = 0; i < 3;i++){
			if(i === 0 ){
				var enemy = this.generateBarrier(initXenemY,initYEneMy);
				enemy.animations.add('run', [ 0, 1 ], 2, true);
				enemy.animations.play('run');
			}else if(i === 1){
				var enemy = this.generateBarrier(initXenemY + i*121,initYEneMy - i*134);
				enemy.animations.add('run', [ 0, 1 ], 2, true);
				enemy.animations.play('run');
			}else if(i === 2){
				var enemy = this.generateBarrier(initXenemY + i*121,initYEneMy);
				enemy.animations.add('run', [ 0, 1 ], 2, true);
				enemy.animations.play('run');
			}
		}
	
	}
}