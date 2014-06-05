
State.Phase1 = function (game){
    "use strict";
    this.game = game;
};

State.Phase1.prototype = {
    preload: function () {
        "use strict";
    },
    create: function() {
        "use strict";		
		Phase1.World.createBg();
		Phase1.Trap.create();
        this.player = Phase1.Player.create();		
	    Phase1.Rock.create();		
	    this.smoke = Phase1.Smoke.create();	   
	    Phase1.Door.create();
		Phase1.World.createBgAlpha();
	
		game.physics.ninja.enableAABB([this.player, this.smoke]);
		
        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		//Phase1.World.createSound(this.game); /* Comentado pq encomoda durante o desenvolvimento*/
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game); 
		

    	game.physics.ninja.collide(this.player, this.smoke, this.collisionHandler, null, this);
	
      //  this.game.physics.arcade.overlap(this.player, Phase1.Trap.trapGroup, Phase1.Trap.trapCollision, null, this);
	  
        if(this.cursors.left.isDown){
			this.player.animations.play('run');
			this.player.body.moveLeft(300);
         //   this.player.body.velocity.x = -this.player.velocity;
        }
        else if(this.cursors.right.isDown){
			this.player.animations.play('run');
			this.player.body.moveRight(300);
         //   this.player.body.velocity.x = this.player.velocity;
        }
        else this.player.body.velocity.x = 0;
        if(this.cursors.up.isDown){
			this.player.animations.play('jump');
			this.player.body.moveUp(30);
           // this.player.body.velocity.y = -this.player.velocity;
        }
/*        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = this.player.velocity;
        }
        else this.player.body.velocity.y = 0;*/

    },
	collisionHandler : function() {
		this.smoke.x = 0;
		this.smoke.y = 1700;
	}	
};