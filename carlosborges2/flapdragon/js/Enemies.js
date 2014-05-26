
var IMAGE_BOO = PATH_ASSETS + 'boo_116-139-2.png';

var ANIME_ENEMY_FLY = 'ANIME_ENEMY_FLY';

var SOUND_ENEMY_KILL = PATH_SOUND + 'select.wav';

Enemies = function() {
	this.enemies;
//	this.sprites = [ 'char1', 'char2', 'char3' ];
	
	this.arrayEnemies = [];
	this.maxEnemies = 10;
	
	this.loopEnemies = null;
	
	this.enemyVel = -200;
	this.enemyCurrentVel = this.enemyVel;
};

Enemies.prototype = {
		
	preload : function() {
		
		game.load.spritesheet(IMAGE_BOO, IMAGE_BOO, 116, 139);
		
		//this.game.load.spritesheet(this.sprites[1], 'assets/char2_110-134.png',	 110, 134);
		//this.game.load.spritesheet(this.sprites[2], 'assets/char3_111-134.png',	 111, 134);
		
		game.load.audio(SOUND_ENEMY_KILL, SOUND_ENEMY_KILL);
	},

	create : function() {
		
		for(var count = 0; count < this.maxEnemies; count++) {
			this.arrayEnemies[count] = null;
		}
		
		this.enemies = game.add.group();
		
		this.soundEnemyKill = game.add.audio(SOUND_ENEMY_KILL);
		
	},
	
	initEnemies: function() {
		this.loopEnemies = game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateBarrier, this);
		this.loopEnemies.timer.start();
	},
	
	stopEnemies: function() {
		if(this.loopEnemies != null) {
			game.time.events.remove(this.loopEnemies);
		}
		
		for(var count = 0; count < this.maxEnemies; count++) {
			
			if(this.arrayEnemies[count] != null) {
				this.arrayEnemies[count].body.velocity.x = 0;
				this.arrayEnemies[count].animations.stop(ANIME_ENEMY_FLY);
			}
		}
		
	},

	generateBarrier : function() {
		
		console.log('level -> generateBarrier');
		
		var index = -1;
		
		for(var count = 0; count < this.maxEnemies; count++) {
			
			if(this.arrayEnemies[count] == null) {
				index = count;
			}
		}
		
		if(index > -1) {
			var randomY = game.rnd.integerInRange(0, game.world.height - 90 - 139); // minus ground minus boo
			
			var enemy = this.enemies.create(game.world.width, randomY, IMAGE_BOO);
			
			game.physics.arcade.enableBody(enemy);
			
//			console.log('game.cache.getPhysicsData(key, object): '+game.cache.getPhysicsData(COLLIDE_ENEMY, 'boo_116-139-2'));
//			enemy.body.loadPolygon(COLLIDE_ENEMY, 'boo_116-139-2');
			
			enemy.body.allowGravity = false;
			enemy.body.immovable = true;
			enemy.body.velocity.x = this.enemyCurrentVel;
			
			enemy.animations.add(ANIME_ENEMY_FLY, [0, 1], 10, true);
			enemy.animations.play(ANIME_ENEMY_FLY);
			
			this.arrayEnemies[index] = enemy;
		}
	},
	
	updatePlayState : function() {
		
		var scoreCount = 0;
		
		for(var count = 0; count < this.maxEnemies; count++) {
			
			if(this.arrayEnemies[count] != null) {
				
				if(this.arrayEnemies[count].body.x < -116) { // kill boo when pass screen
					this.arrayEnemies[count].kill();
					this.arrayEnemies[count] = null;
					
					scoreCount++;
					
					this.soundEnemyKill.play('');
				}
				
			}
		}
		
		return scoreCount;
		
	}
	
};
