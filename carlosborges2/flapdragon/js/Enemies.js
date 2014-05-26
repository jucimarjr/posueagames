
var IMAGE_BOO = PATH_ASSETS + 'boo_116-139-2.png';

var BOO_COLLIDER_HEAD = PATH_ASSETS + 'boo_head_collider_31-7-57-63.png';
var BOO_COLLIDER_ARMS = PATH_ASSETS + 'boo_arms_collider_0-81-97-17.png';
var BOO_COLLIDER_TAIL = PATH_ASSETS + 'boo_tail_collider_42-101-72-34.png';


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
	
	this.incrementDificult = 3;
	this.startTimeGeneration = 2000;
	this.currentTimeGeneration = this.startTimeGeneration;
};

Enemies.prototype = {
		
	preload : function() {
		
		this.enemyVel = -200;
		
		game.load.spritesheet(IMAGE_BOO, IMAGE_BOO, 116, 139);
		
		game.load.image(BOO_COLLIDER_HEAD, BOO_COLLIDER_HEAD, 57, 63);
		game.load.image(BOO_COLLIDER_ARMS, BOO_COLLIDER_ARMS, 97, 17);
		game.load.image(BOO_COLLIDER_TAIL, BOO_COLLIDER_TAIL, 72, 34);
		
		//this.game.load.spritesheet(this.sprites[1], 'assets/char2_110-134.png',	 110, 134);
		//this.game.load.spritesheet(this.sprites[2], 'assets/char3_111-134.png',	 111, 134);
		
		game.load.audio(SOUND_ENEMY_KILL, SOUND_ENEMY_KILL);
	},

	create : function() {
		
		this.enemyCurrentVel = this.enemyVel;
		this.currentTimeGeneration = this.startTimeGeneration;
		
		for(var count = 0; count < this.maxEnemies; count++) {
			this.arrayEnemies[count] = null;
		}
		
		this.enemies = game.add.group();
		
		this.soundEnemyKill = game.add.audio(SOUND_ENEMY_KILL);
		
		this.generateEnemies = false;
		this.dateNewGenerate = new Date().getTime();
	},
	
	initEnemies: function() {
//		this.loopEnemies = game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateBarrier, this);
//		this.loopEnemies.timer.start();
		
		this.generateEnemies = true;
	},
	
	stopEnemies: function() {
		if(this.loopEnemies != null) {
			game.time.events.remove(this.loopEnemies);
		}
		
		for(var count = 0; count < this.maxEnemies; count++) {
			
			if(this.arrayEnemies[count] != null) {
				
				this.arrayEnemies[count].boo.body.velocity.x = 0;
				this.arrayEnemies[count].headCollider.body.velocity.x = 0;
				this.arrayEnemies[count].armsCollider.body.velocity.x = 0;
				this.arrayEnemies[count].tailCollider.body.velocity.x = 0;
				
				this.arrayEnemies[count].boo.animations.stop(ANIME_ENEMY_FLY);
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
			
			var enemy = new EnemyBoo();
			
			enemy.boo = game.add.sprite(game.world.width, randomY, IMAGE_BOO);
			
			enemy.headCollider = this.enemies.create(game.world.width + 31, randomY + 7, BOO_COLLIDER_HEAD);
			enemy.armsCollider = this.enemies.create(game.world.width, randomY + 81, BOO_COLLIDER_ARMS);
			enemy.tailCollider = this.enemies.create(game.world.width + 42, randomY + 101, BOO_COLLIDER_TAIL);
			
			this.setEnemyPhyshics(enemy.boo);
			this.setEnemyPhyshics(enemy.headCollider);
			this.setEnemyPhyshics(enemy.armsCollider);
			this.setEnemyPhyshics(enemy.tailCollider);
			
			enemy.boo.animations.add(ANIME_ENEMY_FLY, [0, 1], 10, true);
			enemy.boo.animations.play(ANIME_ENEMY_FLY);
			
			this.arrayEnemies[index] = enemy;
		}
	},
	
	updatePlayState : function() {
		
		var scoreCount = 0;
		
		for(var count = 0; count < this.maxEnemies; count++) {
			
			if(this.arrayEnemies[count] != null) {
				
				if(this.arrayEnemies[count].boo.x < -116) { // kill boo when pass screen
					this.arrayEnemies[count].boo.kill();
					this.arrayEnemies[count] = null;
					
					scoreCount++;
					
					this.soundEnemyKill.play('');
					
					this.enemyCurrentVel += -this.incrementDificult;
				}
				
			}
		}
		
		if(this.generateEnemies) {
			
			this.currentDate = new Date().getTime();
			
			if(this.currentDate >= this.dateNewGenerate) {
				this.generateBarrier();
				
				this.currentTimeGeneration -= this.incrementDificult * 10;
				this.dateNewGenerate = this.currentDate + this.currentTimeGeneration;
			}
			
		}
		
		return scoreCount;
	},
	
	setEnemyPhyshics: function(sprite) {
		
		game.physics.arcade.enableBody(sprite);
		
		sprite.body.allowGravity = false;
		sprite.body.immovable = true;
		sprite.body.velocity.x = this.enemyCurrentVel;
		
	}
	
};

function EnemyBoo() {
	boo: null;
	headCollider: null;
	armsCollider: null;
	tailCollider: null;
};
