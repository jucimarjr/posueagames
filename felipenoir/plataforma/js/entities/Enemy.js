//Enemy
var Enemy = function(game){
	this.game = game;
	this.tipo;
	this.path = ['assets/images/hero/hero.png'];
	this.LITTLE_TYPE = 1;
	this.MIDLE_TYPE = 2;
	this.BIG_TYPE = 3;
	this.enemies;
	this.map;
	this.inimigos = 'inimigos';

	//Properties
	this.width = 50;
    this.height  = 50;
    this.animationsQtd = 6;
};

Enemy.prototype = {
	preload : function(){
		this.game.load.spritesheet('enemy', this.path[0], this.width, this.height, this.animationsQtd);
	},
	create : function(map){
		this.map = map;
		this.enemies =  this.game.add.group();
		this.enemies.enableBody = true;
		this.map.createFromObjects(this.inimigos, 6, 'enemy', 0, true, false, this.enemies);
		this.enemies.forEach(this.setupEnemies,this);
	},
	update : function(){
	},
	setupEnemies : function(enemy){
	    if (enemy.key == 'enemy'){
	    	this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
	    	enemy.body.collideWorldBounds = true;
	        enemy.scale.setTo(0.5,0.5);
	        enemy.animations.add('walk', [0,1,2,3,4,3,2,1], 10, true);
	        enemy.animations.play('walk');
	        enemy.health = 100;
	    }
	}
};