Phase1.Door = {
	itemDoor : "assets/phase1/images/door_810-255-6.png",
	door : null,
	init : function(){
		this.game.load.spritesheet('door', this.itemDoor, 135, 255);	
	},
	create : function(){
		//this.door = this.game.add.sprite(2770, 140, 'door');
		this.door = this.game.add.sprite(2850, 270, 'door');
        this.door.animations.add('blink', [0, 1, 2, 3,4,5], 10, true);
        this.door.animations.play('blink');	
		
		this.game.physics.p2.enable(this.door);
        this.door.body.static = true;
        this.door.body.fixedRotation = true;		
		
		return this.door;	
	}
};