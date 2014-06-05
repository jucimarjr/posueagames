Phase1.Smoke = {
	itemSmoke : "assets/phase1/images/smoke_12000-300-4.png",
	smoke : null,
	init : function(){
		this.game.load.spritesheet('smoke', this.itemSmoke, 3000, 300);	
	},
	create : function(){
		this.smoke = this.game.add.sprite(0, 1700, 'smoke');
        this.smoke.animations.add('fear', [0, 1, 2, 3], 10, true);
        this.smoke.animations.play('fear');
		
		//this.game.physics.ninja.enableTile(this.smoke, this.smoke.frame);
				
		return this.smoke;	
	}
};