

Enemy = function(game, layer1, tilemap){
	
	this.game = game;
	this.layer1 = layer1;
	this.tilemap = tilemap;
	this.cruellas = null;
	this.hannibals  = null;
	this.freddy = null;
	this.jasons = null;
	this.jokers = null;
	this.vaders = null;
};

Enemy.prototype = {
	create: function () {
	"use strict";
		this.cruellas = game.add.group();
		this.cruellas.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.walk.gid, 'cruella', Config.enemy.cruella.walk.frame,true,false,this.cruellas);
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.jump.gid, 'cruella', Config.enemy.cruella.jump.frame,true,false,this.cruellas);
		this.cruellas.forEach(
				function (cruella){

					switch (this.cruellas.getIndex(cruella)) {
					case 0:
						cruella.animations.add('walk', [0,1,2,3], 4, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.frame = 0;
						break;
					case 1:
						cruella.animations.add('walk', [0,1,2,3], 4, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.frame = 0;
						break;
					case 2:
						cruella.animations.add('jump', [1], 1, true);
						cruella.animations.add('fall', [2], 1, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.frame = 1;
						break;
					case 3:
						cruella.animations.add('jump', [1], 1, true);
						cruella.animations.add('fall', [2], 1, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.frame = 1;
						break;
					default:
						break;
					}
					
					this.game.physics.enable(cruella);
					cruella.body.collideWorldBounds = true;
					cruella.anchor.setTo(Config.enemy.cruella.anchor.x, Config.enemy.cruella.anchor.y);
				}, 
				this
		);
		
		this.hannibals = game.add.group();
		this.hannibals.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.walk.gid, 'hannibal', Config.enemy.hannibal.walk.frame,true,false,this.hannibals);
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.jump.gid, 'hannibal', Config.enemy.hannibal.jump.frame,true,false,this.hannibals);
		this.hannibals.forEach(function (hannibal){ hannibal.body.allowGravity = false;}, this);
		
		this.freddys = game.add.group();
		this.freddys.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.walk.gid, 'freddy', Config.enemy.freddy.walk.frame,true,false,this.freddys);
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.jump.gid, 'freddy', Config.enemy.freddy.jump.frame,true,false,this.freddys);
		this.freddys.forEach(function (freddy){ freddy.body.allowGravity = false;}, this);
		
		this.jasons = game.add.group();
		this.jasons.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.walk.gid, 'jason', Config.enemy.jason.walk.frame,true,false,this.jasons);
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.jump.gid, 'jason', Config.enemy.jason.jump.frame,true,false,this.jasons);
		this.jasons.forEach(function (jason){ jason.body.allowGravity = false;}, this);
		
		this.jokers = game.add.group();
		this.jokers.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.walk.gid, 'joker', Config.enemy.joker.walk.frame,true,false,this.jokers);
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.jump.gid, 'joker', Config.enemy.joker.jump.frame,true,false,this.jokers);
		this.jokers.forEach(function (joker){ joker.body.allowGravity = false;}, this);
		
		this.vaders = game.add.group();
		this.vaders.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.vader.name, Config.enemy.vader.gid, 'vader', Config.enemy.vader.frame,true,false,this.vaders);
		this.vaders.forEach(function (vader){ vader.body.allowGravity = false;}, this);

	
	},
	
	update: function() {
		
		this.cruellas.forEach(
			function (cruella){
				this.game.physics.arcade.collide(cruella, this.layer1.platform);

				switch (this.cruellas.getIndex(cruella)) {
					case 0:
							
						break;
					case 1:
						break;
					case 2:
						cruella.body.velocity.x = 0;
						
						if(cruella.body.velocity.y < 0){
					    	cruella.animations.play('jump');
				    	} else if (cruella.body.velocity.y > 0){
				    		cruella.animations.play('fall');
				    	}
						
						if (cruella.body.onFloor()) {
							cruella.body.velocity.y = -Config.enemy.cruella.jump.y;
						}
						break;
					case 3:
						cruella.body.velocity.x = 0;
						
						if(cruella.body.velocity.y < 0){
					    	cruella.animations.play('jump');
				    	} else if (cruella.body.velocity.y > 0){
				    		cruella.animations.play('fall');
				    	}
						
						if (cruella.body.onFloor()) {
							cruella.body.velocity.y = -Config.enemy.cruella.jump.y;
						}
						break;
					default:
						
						break;
				}
					
			},
			this
		);

		
		//this.move();

	}
	
	/*moveBack: function (sprite, coins) {
		
		this.sprite.body.velocity.x = Config.enemy.speed * (-1);
	    this.sprite.animations.play('left');
	    
	   // this.sprite.body.velocity.x = Config.enemy.speed;

	    //this.sprite.animations.play('right');  
		
	}*/
};
