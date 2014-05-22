var play_state = { create: create, update: update, render: render };
	
	//Sem function preload() pq já existe no load.js
    function create() {
    	
        background1 = game.add.sprite(0, 0, 'background1');

        background2 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background2').height, 'background2');
        game.physics.arcade.enable(background2);
        
        background3  = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background3').height, 'background3');
        game.physics.arcade.enable(background3);

        plataformas = game.add.group();
        plataformas.enableBody = true;
        plataformas.createMultiple(20, 'obstacle2');

        billySprite = game.add.sprite(480, 281.5, 'billy');
        billySprite.animations.add('walk', [0, 1, 2], 13, true);
        game.physics.enable(billySprite, Phaser.Physics.ARCADE);
        billySprite.body.gravity.y = 1000;
        billySprite.body.collideWorldBounds = false; // para no limite inferior da tela
        game.camera.follow(billySprite.sprite);

        background4 = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('background4').height, 'background4');
        game.physics.arcade.enable(background4);

        // Call the 'jump' function when the spacebar key is hit
        space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(jump, this);
        space_key.onUp.add(notJump, this);

        this.timer = this.game.time.events.loop(1500, add_obstacle, this);
    }

    // Start the actual game
    function update() {
        game.physics.arcade.overlap(billySprite, plataformas, restart_game, null, this)

        if (billySprite.inWorld === false)
            restart_game();

        billySprite.body.velocity.x = 0;
        background2.tilePosition.x -= 0.3;
        background3.tilePosition.x -= 0.5;
        background4.tilePosition.x -= 1;

        /*if (game.camera.x >= 0) {
            background2.body.velocity.x = -10;
            background3.tilePosition.x  = -25;
            background4.body.velocity.x = -70;
        }*/
    }

    function jump() {
        billySprite.body.velocity.y = -450;
        billySprite.animations.play('walk');
    }

    function notJump() {
        billySprite.animations.stop();
        billySprite.frame = 0;
    }

    function restart_game() {
        // Start the 'main' state, which restarts the game
        game.time.events.remove(this.timer);
        game.state.start('play');
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

    function render() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(billySprite, 32, 200);
    }