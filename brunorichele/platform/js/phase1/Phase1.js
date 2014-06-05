
State.Phase1 = function (game){
    "use strict";
    this.game = game;
};

State.Phase1.prototype = {
	door : Phase1.Door,
    preload: function () {
        "use strict";
    },
    create: function() {
        "use strict";
        // game defs
		game.world.setBounds(0, 0, 3000, 2000);
        this.game.physics.startSystem(Phaser.Game.ARCADE);
		
		this.background = this.game.add.tileSprite(0, 0,  3000, 2000,  'bgphase1');
			
        // traps
        this.enemyGroup = game.add.group();
        this.createSpear(1500, 0);
        this.createSpear(2000, 0);

        // player defs
        this.createPlayer();
        this.game.camera.follow(this.player);
		
		this.backgroundAlpha = game.add.sprite(0, 0, 'bgphase1-alpha');
		
		this.smoke = game.add.sprite(0, 1700, 'smoke');
        this.smoke.animations.add('fear', [0, 1, 2, 3], 10, true);
        this.smoke.animations.play('fear');
		
	    Phase1.Rock.create(this.game);	   
	    Phase1.Door.create(this.game);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		//this.playBgSound(); /* Comentado pq encomoda durante o desenvolvimento*/
    },

    update: function(){
        "use strict";
        Config.global.screen.resize(this.game); 
        this.game.physics.arcade.overlap(this.player, this.enemyGroup, this.enemyCollision, null, this);
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -this.player.velocity;
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = this.player.velocity;
        }
        else this.player.body.velocity.x = 0;
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -this.player.velocity;
        }
        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = this.player.velocity;
        }
        else this.player.body.velocity.y = 0;

    },
    createPlayer : function (){
        "use strict";
        this.player = this.game.add.sprite(0, 300, 'jogador');
        this.game.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.velocity = 300;
    },
    
    createSpear : function (x, y){
        "use strict";
        var spear = this.enemyGroup.create(x, y, 'spearTrap');
        spear.enemyType = "spear";
        spear.frame = 2;
        spear.anchor.setTo(0.5, 0);
        spear.angle = 30;
        this.game.physics.enable(spear);
        this.game.add.tween(spear)
            .to({angle: -30}, 2200, Phaser.Easing.Sinusoidal.InOut)
            .to({angle: 30}, 2200, Phaser.Easing.Sinusoidal.InOut)
            .start().loop();
        
        // TODO: animacao
        console.log("desenhando lanca");
    },

    enemyCollision : function (player, enemy){
        "use strict";
        if(enemy.enemyType === "spear"){
            //TODO: animacao morte pela lanca
            console.log("e morreu: armadilha lanca");
        }
    },
	/* Adicionar depois a classe Phase1.World*/
	playBgSound : function(){
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
	}
};