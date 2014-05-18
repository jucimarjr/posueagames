var game = new Phaser.Game(
    960, 
    600, 
	Phaser.AUTO, 
	'', 
	{ 
		preload : preload.init, 
		create  : create.init, 
		update  : update.init 
	}
);



