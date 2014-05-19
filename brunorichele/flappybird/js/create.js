var create = {
	space_key   : null,
	enemy_group : null,
	timer : null,
	init : function(){
		create.group();
		create.keyboard();
 		create.pirarucu();
		create.anzol();
		create.ariranha();
		create.arraia();
		create.loop();
	},
	pirarucu : function(){
		pirarucu = game.add.sprite(game.width/2, game.height/2, 'pirarucu');
		game.physics.enable(pirarucu, Phaser.Physics.ARCADE);
		pirarucu.body.gravity.y = 100;		
	},
	anzol : function(){
		anzol = create.enemy_group.create(game.width - 30, 0, 'anzol');
		game.physics.enable(anzol, Phaser.Physics.ARCADE);
		anzol.body.velocity.x = -100;	
	},
	ariranha : function(){
		ariranha = create.enemy_group.create(game.width + 300, 0, 'ariranha');
		game.physics.enable(ariranha, Phaser.Physics.ARCADE);
		ariranha.body.velocity.x = -100;			
	},
	arraia : function(){
		arraia = create.enemy_group.create(game.width + 600, game.height - 50, 'arraia');	
		game.physics.enable(arraia, Phaser.Physics.ARCADE);
		arraia.body.velocity.x = -100;			
	},
	group : function(){
		create.enemy_group = game.add.group();
	},
	keyboard : function(){
        create.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        create.space_key.onDown.add(create.jump, this);    
	},
    jump: function() {
        pirarucu.body.velocity.y = -200;
    },
	loop : function(){
        create.timer = game.time.events.loop(17000, create.loopAction, this);  	
	},
	loopAction : function(){
		anzol.reset(game.width - 30, 0);
		anzol.body.velocity.x = -100;
	
		ariranha.reset(game.width + 300, 0);
		ariranha.body.velocity.x = -100;
	
		arraia.reset(game.width + 600, game.height - 50);
		arraia.body.velocity.x = -100;
	},	
};