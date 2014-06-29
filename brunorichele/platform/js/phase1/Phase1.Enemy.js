Phase1.Enemy = {
	hand : "assets/phase1/images/hand_150-30-6.png",
	trapGroup : null,
	init : function(){
		this.game.load.spritesheet('enemyHand', this.hand, 25, 30);
	},
	create : function(){
        // traps
        this.trapGroup = this.game.add.group();

        //Grupo 1
		this.createHead(280, 1660);
		this.createHead(290, 1660);
		this.createHead(300, 1660);
		this.createHead(310, 1660);
		
		//Grupo 2
		this.createHead(760, 1700);
		this.createHead(770, 1700);
		this.createHead(780, 1700);	
		
		this.createHead(1060, 1665);
		this.createHead(1065, 1665);
		this.createHead(1070, 1665);
		this.createHead(1075, 1665);
		this.createHead(1080, 1665);
		
        //Grupo 3
		this.createHead(2220, 1710);
		this.createHead(2230, 1712);
		this.createHead(2240, 1713);
		this.createHead(2250, 1713);
		this.createHead(2260, 1714);
		
		//Grupo 4					
		this.createHead(2710, 1720);
		this.createHead(2840, 1722);		
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