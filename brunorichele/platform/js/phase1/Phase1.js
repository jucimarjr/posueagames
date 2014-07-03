
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
		Phase1.Enemy.collide(this.player.player);
		Phase1.Smoke.collide(this.player.player);
		Phase1.Door.collide(this.player.player);
		
		Phase1.World.createSound(this.game);

        //misc defs
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
		
		Config.pause(this.game);
    },
    update: function(){
        "use strict";
        Config.screen.resize(this.game); 

		this.control.update();
    }	
};