var create = {
	space_key : null,
	init : function(){
		create.keyboard();
 		create.pirarucu();
		create.anzol();
	},
	pirarucu : function(){
		pirarucu = game.add.sprite(game.width/2, game.height/2, 'pirarucu');
		game.physics.enable(pirarucu, Phaser.Physics.ARCADE);
		pirarucu.body.gravity.y = 100;		
	},
	anzol : function(){
		anzol = game.add.sprite(game.width - 30, 0, 'anzol');	
		game.physics.enable(anzol, Phaser.Physics.ARCADE);
		anzol.body.velocity.x = -100;	
	},
	ariranha : function(){
	},
	arraia : function(){
	},
	keyboard : function(){
        create.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        create.space_key.onDown.add(create.jump, this);    
	},
    jump: function() {
        pirarucu.body.velocity.y = -200;
    },	
};