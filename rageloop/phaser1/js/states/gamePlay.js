(function (app_container) {
    
    function Gameplay() {
    	this.player = null;
    	this.platforms = null;
    	this.trofeu = null;
    	this.bombs = null;
    	
    };
    
    Gameplay.prototype = {

        create: function () {
        	this.stage.backgroundColor = '#ccc';
        	
        	this.game.add.image(0, 0, 'bg');
        	
        	this.game.physics.startSystem(Phaser.Physics.ARCADE);
        	
        	this.platforms = this.game.add.group();
        	this.platforms.create(this.game.width - 530, this.game.height -225, 'platmenor');
        	this.platforms.create(0, this.game.height/2-80, 'platmenor');
        	this.platforms.create(200, 65, 'platmenor');
        	this.platforms.create(0, this.game.height -70, 'platmaior');
        	this.game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        	this.platforms.enableBody = true;
        	this.platforms.setAll("body.immovable", true);
        	
        	
        	var groupStair = this.game.add.group();
        	groupStair.create(this.game.width - 82, this.game.height -165 , 'escada');
        	groupStair.create(this.game.width/2-20, this.game.height -165-95-61 , 'escada');
        	groupStair.create(261, 125 , 'escada');
        	        	        	
        	this.player = this.game.add.sprite(50, this.game.height -180 , 'doll');
        	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        	this.player.body.gravity.y = 500;
        	this.player.scale.set(0.5,0.5);
        	this.player.body.collideWorldBounds = true;
        	this.player.animations.add('walk', [0,1], 6, true);
        	
        	this.trofeu = this.game.add.sprite(600, 20 , 'trofeu');
        	this.game.physics.enable(this.trofeu, Phaser.Physics.ARCADE);
        	this.trofeu.scale.set(0.5,0.5);
        	
        	this.bombs = this.game.add.group();       	
        	this.bombs.create(150, this.game.height-165+54 , 'bomb');
        	
        	this.bombs.create(150, this.game.height-165+54 , 'bomb');
        	this.bombs.create(this.game.width/2 + 100, this.game.height -165-95 , 'bomb');
        	this.bombs.create(130, 105, 'bomb');
        	
        	this.game.physics.enable(this.bombs, Phaser.Physics.ARCADE);
        	this.bombs.enableBody = true;
        	this.bombs.setAll("body.immovable", true);    	
        	
        },

        update: function() {
        	
        	this.game.physics.arcade.collide(this.player, this.platforms);
        	this.game.physics.arcade.overlap(this.player, this.trofeu, this.getTrofeu, null, this);
        	this.game.physics.arcade.overlap(this.player, this.bombs, this.killPlayer, null, this);
       	
        	this.handleKeyDown();       	
        },
        
        handleKeyDown: function() {
        	
        	// PEGA A ENTRADA (tecla pressionada):	
        	if ( this.game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para esquerda
        		this.player.x += 5;
        		this.player.animations.play('walk');
        	} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
        		this.player.x -= 5;
        		this.player.animations.play('walk');
        	} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para esquerda
    			
        		this.player.animations.stop();
        		this.player.frame = 0;
        		
     			if (this.player.body.touching.down) {
     				this.player.body.velocity.y = -400;
     			}
     			
        	} else {
        		
        		this.player.animations.stop();
        		this.player.frame = 0;
        		
        	}
        },
        
        getTrofeu: function(player, trofeu) {
        	
        	trofeu.kill();
        },
        
        killPlayer: function(player, bomb) {
        	
        	player.kill();
        	bomb.kill();
        	
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));