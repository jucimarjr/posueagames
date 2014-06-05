Phase1.Trap = {
	spearTrap : "assets/phase1/images/armadilha1_30-305-3.png",
	//greatSpearTrap : "assets/phase1/images/greatspeartrap_10-525.png",
	trapGroup : null,
	init : function(){
		this.game.load.spritesheet('spearTrap', this.spearTrap, 10, 305);
		//this.game.load.spritesheet('greatspeartrap', Phase1.World.greatSpearTrap);
	},
	create : function(){
        // traps
        this.trapGroup = this.game.add.group();
        this.createSpear(1500, 0);
        this.createSpear(2000, 0);
	},
    createSpear : function (x, y){
        "use strict";
        var spear = this.trapGroup.create(x, y, 'spearTrap');
        spear.trapType = "spear";
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
    trapCollision : function (player, trap){
        "use strict";
        if(trap.trapType === "spear"){
            //TODO: animacao morte pela lanca
            console.log("e morreu: armadilha lanca");
        }
    }	
};