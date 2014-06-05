
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
		Phase1.World.createBg(this.game);
		Phase1.Trap.create(this.game);
        // player defs
        this.createPlayer();
        this.game.camera.follow(this.player);
		
	    Phase1.Rock.create(this.game);		
	    Phase1.Smoke.create(this.game);	   
	    Phase1.Door.create(this.game);
		Phase1.World.createBgAlpha(this.game);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
		//Phase1.World.createSound(this.game); /* Comentado pq encomoda durante o desenvolvimento*/
    },

    update: function(){
        "use strict";
        Config.global.screen.resize(this.game); 
        this.game.physics.arcade.overlap(this.player, Phase1.Trap.trapGroup, Phase1.Trap.trapCollision, null, this);
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
    }
};