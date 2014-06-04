

Player = function(game, coins, layer1) {

	this.game = game;
	this.coins = coins;
	this.layer1 = layer1;
	this.sprite = null;
	this.cursors = null;
	
};

Player.prototype = {
	create: function () {
		this.sprite = game.add.sprite(400, game.world.height - 200, 'oscar');

	    //  Player physics properties. Give the little guy a slight bounce.
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.bounce.y = 0.2;
	    this.sprite.body.gravity.y = 200;
	    this.sprite.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0], 10, true);
	    this.sprite.animations.add('right', [0], 10, true);
	    
	    this.game.camera.follow(this.sprite);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {

		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(this.sprite, this.layer1.mainLayer);

    	this.game.physics.arcade.overlap(this.sprite, this.coins.group, this.collectStar, null, this);

		this.sprite.body.velocity.x = 0;

	    if(this.cursors.left.isDown)
	    {
	    	this.sprite.body.velocity.x = -250;

	    	this.sprite.animations.play('left');
	    }
	    else if(this.cursors.right.isDown)
	    {
	    	this.sprite.body.velocity.x = 250;

	    	this.sprite.animations.play('right');
	    }
	    else
	    {
	    	this.sprite.animations.stop();
	    	this.sprite.frame = 0;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.cursors.up.isDown && this.sprite.body.touching.down)
	    {
	        this.sprite.body.velocity.y = -65;
	    }
	},
	
	collectStar: function(sprite, coins) {
	    // Removes the star from the screen
		coins.kill();
	}
};