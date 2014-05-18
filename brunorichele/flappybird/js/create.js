var create = {
	space_key : null,
	init : function(){
		create.keyboard();
 		create.pirarucu();
	},
	pirarucu : function(){
		pirarucu = game.add.sprite(100, 100, 'pirarucu');
		game.physics.enable(pirarucu, Phaser.Physics.ARCADE);
		pirarucu.body.gravity.y = 1000;		
	},
	keyboard : function(){
        create.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        create.space_key.onDown.add(create.jump, this);    
	},
    jump: function() {
        pirarucu.body.velocity.y = -200;
    },	
};