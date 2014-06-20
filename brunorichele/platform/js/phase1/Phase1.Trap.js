Phase1.Trap = {
	greatSpearTrap : "assets/phase1/images/armadilha2_330-535.png",
	fireTrap : "assets/phase1/images/armadilha3_360-390-6.png",
	trapGroup : null,
	init : function(){
		this.game.load.image('greatspeartrap', this.greatSpearTrap);
		this.game.load.spritesheet('fireTrap', this.fireTrap, 60, 390);
	},
	create : function(){
        // traps
        this.trapGroup = this.game.add.group();
        this.createGreatSpear(1500, 0);
        this.createGreatSpear(1000, 550);
		this.createGreatSpear(1800, 550);

		this.createFire(1270, 1500);		
		this.createFire(1470, 1500);
		this.createFire(1670, 1500);
		this.createFire(1870, 1500);
	},
    createGreatSpear : function (x, y){
        "use strict";
        var greatSpear = this.trapGroup.create(x, y, 'greatspeartrap');
        greatSpear.trapType = "spear";
//        spear.frame = 2;
        greatSpear.anchor.setTo(0.5, 0);
        greatSpear.angle = 30;
        this.game.physics.enable(greatSpear);
        this.game.add.tween(greatSpear)
            .to({angle: -30}, 2200, Phaser.Easing.Sinusoidal.InOut)
            .to({angle: 30}, 2200, Phaser.Easing.Sinusoidal.InOut)
            .start().loop();
			
        // TODO: animacao
        console.log("desenhando lanca");
    },
	createFire : function(x, y){
		this.fire = this.game.add.sprite(x, y, 'fireTrap');
        this.fire.animations.add('burn', [0, 1, 2, 3, 4, 5], 5, true);
        this.fire.animations.play('burn');		
	},	
    trapCollision : function (player, trap){
        "use strict";
        if(trap.trapType === "spear"){
            //TODO: animacao morte pela lanca
            console.log("e morreu: armadilha lanca");
        }
    }	
};