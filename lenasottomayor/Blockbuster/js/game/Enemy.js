

Enemy = function(game, layer, coins){
	
	this.game = game;
	this.layer = layer;
	this.sprite = null;
	this.coins = coins;
};

Enemy.prototype = {
	create: function () {
		this.sprite = game.add.sprite(Config.enemy.position.x, Config.enemy.position.y , 'enemy');
	    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(Config.enemy.anchor.x,Config.enemy.anchor.y );
	    this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.enemy.gravity;
		this.sprite.animations.add('left', [0], 10, true);
	    this.sprite.animations.add('right', [0], 10, true);
	},
	
	update: function() {

		this.game.physics.arcade.collide(this.sprite, this.layer.mainLayer);
		
		this.game.physics.arcade.overlap(this.sprite, this.coins.group, this.moveBack, null, this);

    	this.sprite.body.velocity.x = 5;
		this.sprite.body.allowGravity = true;
		
		//this.move();

	},
	
	moveBack: function (sprite, coins) {
		
		this.sprite.body.velocity.x = Config.enemy.speed * (-1);
	    this.sprite.animations.play('left');
	    
	   // this.sprite.body.velocity.x = Config.enemy.speed;

	    //this.sprite.animations.play('right');  
		
	}
};
