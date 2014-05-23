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

function geraEnemyFloor(){
	return game.world.height -90;
}

function geraEnemyMiddle(){
	return (game.world.height -90) - 134;
}

function geraEnemyTop(){
	return (game.world.height -90) - 2*134;
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
				121, 134);
		this.game.load.spritesheet(this.sprites[1], 'assets/char2_110-134.png',
				110, 134);
		this.game.load.spritesheet(this.sprites[2], 'assets/char3_111-134.png',
				111, 134);
	},

	create : function() {
		this.enemies = this.game.add.group();
		this.game.time.events.loop(Phaser.Timer.SECOND * 2,
				this.generateBarrier, this).timer.start();
	},

	/*createEnemy : function(){
		var enemy = this.enemies.create(this.x,this.y, this.sprites[this.game.rnd
						.integerInRange(0, 2)]);
						
		enemy.anchor.setTo(0.5, 0.5);
		enemy.body.collideWorldBounds = true;
		enemy.body.bounce.setTo(1, 1);
		enemy.body.velocity.x = this.vx;
		enemy.body.velocity.y = this.vy;
		enemy.body.immovable = true;
	}*/

	generateBarrier : function() {
		console.log('level -> generateBarrier');
		var enemy = this.enemies.create(this.x,
				selecionaEnemy(), this.sprites[this.game.rnd
						.integerInRange(0, 2)]);
		enemy.animations.add('run', [ 0, 1 ], 2, true);
		enemy.animations.play('run');
		this.game.physics.arcade.enableBody(enemy);
		enemy.body.allowGravity = false;
		enemy.body.immovable = true;
		enemy.body.velocity.x = -200;
	}
}