Phase1.Enemy = {
	hand : "assets/phase1/images/hand_150-30-6.png",
	trapGroup : null,
	init : function(){
		this.game.load.spritesheet('enemyHand', this.hand, 25, 30);
	},
	create : function(){
        // traps
        this.trapGroup = this.game.add.group();

		this.createHead(800, 1130);
	},
    createGreatSpear : function (x, y){
        "use strict";
        var greatSpear = this.trapGroup.create(x, y, 'enemyHand');
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
	createHead : function(x, y){
		this.fire = this.game.add.sprite(x, y, 'enemyHand');
        this.fire.animations.add('burn', [0, 1, 2, 3, 4, 5], 5, true);
        this.fire.animations.play('burn');		
	}	
};