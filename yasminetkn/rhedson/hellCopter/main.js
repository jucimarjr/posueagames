var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_div');

var main_state = {

    preload: function() { 
        //this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/helicoptero_128_80.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('chao', 'assets/chao2_325-28.png');
        this.game.load.image('ground', 'assets/backchop.png');
        // Load jump sound
        this.game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {

        this.background1 = this.game.add.sprite(0, 0, 'ground');
        //this.background1.autoScroll(-20,0);
        //this.background2 = this.game.add.sprite(game.width/2,580, 'chao');

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);



        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.body.gravity.y = 1000; 
         // Change the anchor point of the bird
        this.bird.anchor.setTo(-0.2, 0.5);
               
        this.score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        // Add sounds to the game
        this.jump_sound = this.game.add.audio('jump');
    },

    update: function() {




        if (this.bird.inWorld == false)
            this.restart_game(); 

        // Make the bird slowly rotate downward
        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
    },

    jump: function() {
        // if the bird hit a pipe, no jump
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;

        // Animation to rotate the bird
        this.game.add.tween(this.bird).to({angle: -20}, 0).start();

        // Play a jump sound
        this.jump_sound.play();
    },

    // Dead animation when the bird hit a pipe
    hit_pipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive flag to false
        this.bird.alive = false;

        // Prevent new pipes from apearing
        this.game.time.events.remove(this.timer);

        // Go trough all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    add_one_pipe: function(x,y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x,y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+2;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.add_one_pipe(960, i*60+10);
    
        this.score += 1;
        this.label_score.content = this.score;  
    }
};

game.state.add('main', main_state);  
game.state.start('main'); 