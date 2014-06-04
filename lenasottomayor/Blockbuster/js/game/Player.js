

Player = function(game, coins, layer1) {

	this.game = game;
	this.coins = coins;
	this.layer1 = layer1;
	this.sprite = null;
	this.cursors = null;
	
};

Player.prototype = {
	create: function () {
		this.sprite = game.add.sprite(Config.player.position.x, Config.player.position.y, 'oscar');
	    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(Config.player.archor.x, Config.player.archor.y);
	    this.sprite.body.collideWorldBounds = true;
		//this.sprite.body.checkCollision.up = false;
		//this.sprite.body.checkCollision.left = false;
		//this.sprite.body.checkCollision.right = false;
		this.sprite.body.gravity.y = Config.player.gravity;
	    
	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0], 10, true);
	    this.sprite.animations.add('right', [0], 10, true);
	    
	    this.game.camera.follow(this.sprite);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {

		this.game.physics.arcade.collide(this.sprite, this.layer1.mainLayer);

    	this.game.physics.arcade.overlap(this.sprite, this.coins.group, this.collectStar, null, this);

		this.sprite.body.velocity.x = 0;

	    if(this.cursors.left.isDown)
	    {
	    	this.sprite.body.velocity.x = -Config.player.speed;

	    	this.sprite.animations.play('left');
	    }
	    else if(this.cursors.right.isDown)
	    {
	    	this.sprite.body.velocity.x = Config.player.speed;

	    	this.sprite.animations.play('right');
	    }
	    else
	    {
	    	this.sprite.animations.stop();
	    	this.sprite.frame = 0;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.jump.isDown && this.sprite.body.onFloor())
	    {
	        this.sprite.body.velocity.y = -Config.player.jump;
	    }
	},
	
	collectStar: function(sprite, coins) {
	    // Removes the star from the screen
		coins.kill();
	}
};