var play_state = { create: create, update: update };	
	
	var speed = 1;
	//Sem function preload() pq já existe no load.js
    function create() {
    	
    	background1 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background1').height, 'background1');
    	game.physics.arcade.enable(background1);

        background2 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background2').height, 'background2');
        game.physics.arcade.enable(background2);
        
        background3  = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background3').height, 'background3');
        game.physics.arcade.enable(background3);

        plataformas = game.add.group();
        plataformas.enableBody = true;
        plataformas.createMultiple(20, 'obstacle2');

        playerSprite = game.add.sprite(272, 281.5, 'player');
        playerSprite.animations.add('walk', [0, 1, 2, 3], 8, true);
        game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
        playerSprite.body.gravity.y = 1000;
        playerSprite.body.collideWorldBounds = false; // para no limite inferior da tela
        game.camera.follow(playerSprite.sprite);

        deathSprite = game.add.sprite(playerSprite.body.position.x, playerSprite.body.position.y, 'death');
        deathSprite.exists = false;
        deathSprite.animations.add('walk', [0, 1, 2, 4, 5], 13, true);
        game.physics.enable(deathSprite, Phaser.Physics.ARCADE);
        deathSprite.body.gravity.y = 1500;
        deathSprite.body.collideWorldBounds = false; // para no limite inferior da tela

        background4 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background4').height, 'background4');
        game.physics.arcade.enable(background4);

        background5 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background5').height, 'background5');
        game.physics.arcade.enable(background5);

        powerUp_multiply(); //comment to not multiply
        // Call the 'jump' function when the spacebar key is hit
        space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(jump, this);
        space_key.onUp.add(notJump, this);
        
        jump_sound = this.game.add.audio('flap_song'); 
        
        this.timer = this.game.time.events.loop(1500, add_obstacle, this);
        
        cursors = game.input.keyboard.createCursorKeys();
    }

    // Start the actual game
    function update() {
        playerSprite.animations.play('walk');

        if (playersGroup.exists) {
            playersGroup.callAll('animations.play', 'animations', 'walk');
            playersGroup.forEach(function (item) { game.physics.arcade.overlap(item, plataformas, function () { item.kill(); }, null, this); });
        }

        game.physics.arcade.overlap(playerSprite, plataformas, playerDies, null, this)

        if (playerSprite.inWorld === false)
            restart_game();

        if (cursors.left.isDown){
        	slow();
        }else if(cursors.right.isDown){
        	fast();
        }else if (cursors.up.isDown){
        	normal();
        }
        
		playerSprite.body.velocity.x = 0;
        background1.tilePosition.x -= 0.5 * speed;
        background2.tilePosition.x -= 2 * speed;
        background3.tilePosition.x -= 3 * speed;
        background4.tilePosition.x -= 4 * speed;
        background5.tilePosition.x -= 0 * speed;
        
    }

    function jump() {
        playerSprite.body.velocity.y = -450;
        if (playersGroup.exists === true) {
            playersGroup.forEach(function (item) { item.body.velocity.y = -450; }, null, this);
        }
        jump_sound.play();
    }

    function notJump() {
        playerSprite.animations.stop();
        playerSprite.frame = 0;
    }

    function playerDies() {
        playDeadAnimation();
    }
    
    function fast(){
    	playerSprite.body.gravity.y = 3000;
    	speed = 4;
    }
    
    function slow(){
    	playerSprite.body.gravity.y = 500;
    	speed = 0.3;
    }
    
    function normal(){
    	playerSprite.body.gravity.y = 1500;
    	speed = 1;
    }
    
    function restart_game() {
        // Start the 'main' state, which restarts the game
        setTimeout(restart_game, 1000);
    }

    function playDeadAnimation() {
        deathSprite.body.position.x = playerSprite.body.position.x;
        deathSprite.body.position.y = playerSprite.body.position.y;
        deathSprite.exists = true;
        playerSprite.exists = false;
        
        game.camera.follow(deathSprite.sprite);
        deathSprite.animations.play('walk');
        
    }

    function add_one_obstacle(x, y) {
        // Get the first dead pipe of our group
        var obstacle = plataformas.getFirstDead();

        // Set the new position of the pipe
        obstacle.reset(x, y);

        // Add velocity to the pipe to make it move left
        obstacle.body.velocity.x = -300;

        // Kill the pipe when it's no longer visible 
        obstacle.outOfBoundsKill = true;
    }

    function add_obstacle() {
        var hole = Math.floor(Math.random() * 4);

        for (var i = 0; i < 5; i++)
            if (i != hole)
                add_one_obstacle(800, i * 154);
    }

    function powerUp_multiply() {
        playersGroup = game.add.group();
        playersGroup.enableBody = true;
        for (var i = 0; i < 10; i++) {
            player = playersGroup.create(game.world.randomX, game.world.randomY, 'player');
            player.animations.add('walk', [0, 1, 2, 3], 8, true);
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.gravity.y = 1000;
            player.body.collideWorldBounds = false; // para no limite inferior da tela
            player.animations.play('walk');
        }
        setTimeout(powerUp_multiply_Off, 5000);
    }

    function powerUp_multiply_Off() {
        playersGroup.forEach(function (item) { item.kill(); }, null, this);
        playersGroup.kill();
     }
