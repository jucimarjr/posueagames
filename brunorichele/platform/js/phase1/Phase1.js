
State.Phase1 = function (game){
    "use strict";
    this.game = game;
	this.player = new Player(game);	
};

State.Phase1.prototype = {
    preload: function () {
        "use strict";
    },
    create: function() {
        "use strict";

		Phase1.World.createBg();
		Phase1.Trap.create();
		Phase1.Enemy.create();		
        this.player.create();
	    this.rocks = Phase1.Rock.create();
	    Phase1.Door.create();
		Phase1.World.createBgAlpha();
		Phase1.Smoke.create();
		Phase1.World.createSound(this.game);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game); 
		
		this.collisionFloor();

		this.control.update();
    },
    collisionFloor : function(){
        if (this.player.alive && this.player.y > game.world.height - this.player.height){
			this.game.state.start('GameOver');
        }
    },	
};