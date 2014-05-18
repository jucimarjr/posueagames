var create = {
	init : function(){
 		create.pirarucu();
	},
	pirarucu : function(){
		pirarucu = game.add.sprite(100, 100, 'pirarucu');
		game.physics.enable(pirarucu, Phaser.Physics.ARCADE);
		pirarucu.body.gravity.y = 1000;		
	}
};