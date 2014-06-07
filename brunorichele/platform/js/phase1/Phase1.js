
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
	    this.rocks = Phase1.Rock.create();		
	    Phase1.Smoke.create();	   
	    Phase1.Door.create();
		Phase1.World.createBgAlpha();
						
        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		//Phase1.World.createSound(this.game); /* Comentado pq encomoda durante o desenvolvimento*/
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game); 
		
        if(this.cursors.left.isDown){
			this.player.animations.play('run');
			this.player.body.moveLeft(300);
        }
        else if(this.cursors.right.isDown){
			this.player.animations.play('run');
			this.player.body.moveRight(300);
        }
        else if(this.cursors.up.isDown){
			this.player.animations.play('jump');
			this.player.body.moveUp(300);
        }
    }
};