Phase1.Smoke = {
	itemSmoke : "assets/phase1/images/smoke_12000-300-4.png",
	smoke : null,
	init : function(){
		this.game.load.spritesheet('smoke', this.itemSmoke, 3000, 300);	
	},
	create : function(){
		this.smoke = this.game.add.sprite(1500, 1850, 'smoke');
        this.smoke.animations.add('fear', [0, 1, 2, 3], 4, true);
        this.smoke.animations.play('fear');
		this.smoke.width = 3000;
    	this.smoke.height = 300;
		
		game.physics.p2.enable(this.smoke, false);
		
		this.smoke.body.fixedRotation = true;
		this.smoke.body.static = true;
		this.smoke.body.setRectangle(3000, 100);
			
		return this.smoke;	
	},
	collide : function(player){	
		player.body.createBodyCallback(this.smoke, this.action, this);		
	},
	action : function(){
		this.game.state.start('GameOver');		
	}	
};