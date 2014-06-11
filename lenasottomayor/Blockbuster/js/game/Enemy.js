Enemy = function(game, layer1, tilemap){
	
	this.game = game;
	this.layer1 = layer1;
	this.tilemap = tilemap;
	this.cruellas = null;
	this.hannibals  = null;
	this.freddys = null;
	this.jasons = null;
	this.jokers = null;
	this.vaders = null;
	this.cruellaWalk1 = 0;
	this.cruellaIsLeft1 = true;
	this.cruellaWalk2 = 0;
	this.cruellaIsLeft2 = true;
	this.freddyWalk1 = 0;
	this.freddyIsLeft1 = true;
	this.freddyWalk2 = 0;
	this.freddyIsLeft2 = true;
	this.hannibalWalk1 = 0;
	this.hannibalIsLeft1 = true;
	this.hannibalWalk2 = 0;
	this.hannibalIsLeft2 = true;
	this.jasonWalk1 = 0;
	this.jasonIsLeft1 = true;
	this.jasonWalk2 = 0;
	this.jasonIsLeft2 = true;
	this.jokerWalk1 = 0;
	this.jokerIsLeft1 = true;
	this.jokerWalk2 = 0;
	this.jokerIsLeft2 = true;
	this.vaderWalk = 0;
	this.vaderIsLeft = true;
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
						cruella.scale.x = -1;
						cruella.frame = Config.enemy.cruella.walk.frame;
						break;
					case 1:
						cruella.animations.add('walk', [0,1,2,3], 4, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.scale.x = -1;
						cruella.frame = Config.enemy.cruella.walk.frame;
						break;
					case 2:
						cruella.animations.add('jump', [1], 1, true);
						cruella.animations.add('fall', [2], 1, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.scale.x = -1;
						cruella.frame = Config.enemy.cruella.jump.frame;
						break;
					case 3:
						cruella.animations.add('jump', [1], 1, true);
						cruella.animations.add('fall', [2], 1, true);
						cruella.animations.add('dead',[4],1,false);
						cruella.scale.x = -1;
						cruella.frame = Config.enemy.cruella.jump.frame;
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
		this.hannibals.forEach(
			function(hannibal){
				switch (this.hannibals.getIndex(hannibal)) {
					case 0:
						hannibal.animations.add('walk', [0,1,2,3,4,5,6], 6, true);
						hannibal.animations.add('dead',[7],1,false);
						hannibal.scale.x = -1;
						hannibal.frame = Config.enemy.hannibal.walk.frame;;
						break;
					case 1:
						hannibal.animations.add('walk', [0,1,2,3,4,5,6], 6, true);
						hannibal.animations.add('dead',[7],1,false);
						hannibal.scale.x = -1;
						hannibal.frame = Config.enemy.hannibal.walk.frame;;
						break;
					case 2:
						hannibal.animations.add('jump', [3], 1, true);
						hannibal.animations.add('fall', [2], 1, true);
						hannibal.animations.add('dead',[7],1,false);
						hannibal.scale.x = -1;
						hannibal.frame = Config.enemy.hannibal.jump.frame;
						break;
					case 3:
						hannibal.animations.add('jump', [3], 1, true);
						hannibal.animations.add('fall', [2], 1, true);
						hannibal.animations.add('dead',[7],1,false);
						hannibal.scale.x = -1;
						hannibal.frame = Config.enemy.hannibal.jump.frame;
						break;
					default:
						break;
				}
				
				this.game.physics.enable(hannibal);
				hannibal.body.collideWorldBounds = true;
				hannibal.anchor.setTo(Config.enemy.hannibal.anchor.x, Config.enemy.hannibal.anchor.y);
			},
			this
		);
		
		this.freddys = game.add.group();
		this.freddys.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.walk.gid, 'freddy', Config.enemy.freddy.walk.frame,true,false,this.freddys);
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.jump.gid, 'freddy', Config.enemy.freddy.jump.frame,true,false,this.freddys);
		this.freddys.forEach(
			function(freddy){
				switch (this.freddys.getIndex(freddy)) {
					case 0:
						freddy.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						freddy.animations.add('dead',[7],1,false);
						freddy.scale.x = -1;
						freddy.frame = Config.enemy.freddy.walk.frame;
						break;
					case 1:
						freddy.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						freddy.animations.add('dead',[7],1,false);
						freddy.scale.x = -1;
						freddy.frame = Config.enemy.freddy.walk.frame;
						break;
					case 2:
						freddy.animations.add('jump', [3], 1, true);
						freddy.animations.add('fall', [2], 1, true);
						freddy.animations.add('dead',[7],1,false);
						freddy.scale.x = -1;
						freddy.frame = Config.enemy.freddy.jump.frame;
						break;
					case 3:
						freddy.animations.add('jump', [3], 1, true);
						freddy.animations.add('fall', [2], 1, true);
						freddy.animations.add('dead',[7],1,false);
						freddy.scale.x = -1;
						freddy.frame = Config.enemy.freddy.jump.frame;
						break;
					default:
						break;
				}
				
				this.game.physics.enable(freddy);
				freddy.body.collideWorldBounds = true;
				freddy.anchor.setTo(Config.enemy.freddy.anchor.x, Config.enemy.freddy.anchor.y);
			},
			this
		);
		
		
		this.jasons = game.add.group();
		this.jasons.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.walk.gid, 'jason', Config.enemy.jason.walk.frame,true,false,this.jasons);
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.jump.gid, 'jason', Config.enemy.jason.jump.frame,true,false,this.jasons);
		this.jasons.forEach(
			function(jason){
				switch (this.jasons.getIndex(jason)) {
					case 0:
						jason.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						jason.animations.add('dead',[7],1,false);
						jason.scale.x = -1;
						jason.frame = Config.enemy.jason.walk.frame;
						break;
					case 1:
						jason.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						jason.animations.add('dead',[7],1,false);
						jason.scale.x = -1;
						jason.frame = Config.enemy.jason.walk.frame;
						break;
					case 2:
						jason.animations.add('jump', [3], 1, true);
						jason.animations.add('fall', [2], 1, true);
						jason.animations.add('dead',[7],1,false);
						jason.scale.x = -1;
						jason.frame = Config.enemy.jason.jump.frame;
						break;
					case 3:
						jason.animations.add('jump', [3], 1, true);
						jason.animations.add('fall', [2], 1, true);
						jason.animations.add('dead',[7],1,false);
						jason.scale.x = -1;
						jason.frame = Config.enemy.jason.jump.frame;
						break;
					default:
						break;
				}
				
				this.game.physics.enable(jason);
				jason.body.collideWorldBounds = true;
				jason.anchor.setTo(Config.enemy.jason.anchor.x, Config.enemy.jason.anchor.y);
			},
			this
		);
		
		this.jokers = game.add.group();
		this.jokers.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.walk.gid, 'joker', Config.enemy.joker.walk.frame,true,false,this.jokers);
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.jump.gid, 'joker', Config.enemy.joker.jump.frame,true,false,this.jokers);
		this.jokers.forEach(
			function(joker){
				switch (this.jokers.getIndex(joker)) {
					case 0:
						joker.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						joker.animations.add('dead',[7],1,false);
						joker.scale.x = -1;
						joker.frame = Config.enemy.joker.walk.frame;
						break;
					case 1:
						joker.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
						joker.animations.add('dead',[7],1,false);
						joker.scale.x = -1;
						joker.frame = Config.enemy.joker.walk.frame;
						break;
					case 2:
						joker.animations.add('jump', [3], 1, true);
						joker.animations.add('fall', [2], 1, true);
						joker.animations.add('dead',[7],1,false);
						joker.scale.x = -1;
						joker.frame = Config.enemy.joker.jump.frame;
						break;
					case 3:
						joker.animations.add('jump', [3], 1, true);
						joker.animations.add('fall', [2], 1, true);
						joker.animations.add('dead',[7],1,false);
						joker.scale.x = -1;
						joker.frame = Config.enemy.joker.jump.frame;
						break;
					default:
						break;
				}
				
				this.game.physics.enable(joker);
				joker.body.collideWorldBounds = true;
				joker.anchor.setTo(Config.enemy.joker.anchor.x, Config.enemy.joker.anchor.y);
			},
			this
		);
		
		this.vaders = game.add.group();
		this.vaders.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.vader.name, Config.enemy.vader.gid, 'vader', Config.enemy.vader.frame,true,false,this.vaders);
		this.vaders.forEach(
			function (vader){ 
				vader.animations.add('walk', [0,1,2,3,4,5,6,7], 5, true);
				vader.animations.add('dead',[8,9],2,true);
				vader.scale.x = -1;
				vader.frame = Config.enemy.vader.frame;
				this.game.physics.enable(vader);
				vader.body.collideWorldBounds = true;
				vader.anchor.setTo(Config.enemy.vader.anchor.x, Config.enemy.vader.anchor.y);
			},
			this
		);

	
	},
	
	update: function() {
		
		this.cruellas.forEach(
			function (cruella){
				this.game.physics.arcade.collide(cruella, this.layer1.platform);

				switch (this.cruellas.getIndex(cruella)) {
					case 0:
						if(this.cruellaIsLeft1) {
							cruella.scale.x = -1;
							cruella.body.velocity.x = -Config.enemy.cruella.walk.x;
							this.cruellaWalk1 += Config.enemy.cruella.walk.x; 
						} else {
							cruella.scale.x = 1;
							cruella.body.velocity.x = Config.enemy.cruella.walk.x;
							this.cruellaWalk1 += Config.enemy.cruella.walk.x;
						} 
						
						if (this.cruellaWalk1 >= 2500) {
							this.cruellaWalk1 = 0;
							this.cruellaIsLeft1 = !this.cruellaIsLeft1;
						}
						
				    	cruella.animations.play('walk');
						break;
						
					case 1:
						if(this.cruellaIsLeft2) {
							cruella.scale.x = -1;
							cruella.body.velocity.x = -Config.enemy.cruella.walk.x;
							this.cruellaWalk2 += Config.enemy.cruella.walk.x; 
						} else {
							cruella.scale.x = 1;
							cruella.body.velocity.x = Config.enemy.cruella.walk.x;
							this.cruellaWalk2 += Config.enemy.cruella.walk.x;
						} 
						
						if (this.cruellaWalk2 >= 2000) {
							this.cruellaWalk2 = 0;
							this.cruellaIsLeft2 = !this.cruellaIsLeft2;
						}
						
				    	cruella.animations.play('walk');
						break;
						
					case 2:
						cruella.body.velocity.x = Config.enemy.cruella.jump.x;
						
						if (cruella.body.onFloor()) {
							cruella.body.velocity.y = -Config.enemy.cruella.jump.y;
						}
						
						if(cruella.body.velocity.y < 0){
					    	cruella.animations.play('jump');
				    	} else if (cruella.body.velocity.y > 0){
				    		cruella.animations.play('fall');
				    	}
						break;
						
					case 3:
						cruella.body.velocity.x = Config.enemy.cruella.jump.x;
						
						if (cruella.body.onFloor()) {
							cruella.body.velocity.y = -Config.enemy.cruella.jump.y;
						}
						
						if(cruella.body.velocity.y < 0){
					    	cruella.animations.play('jump');
				    	} else if (cruella.body.velocity.y > 0){
				    		cruella.animations.play('fall');
				    	}
						break;
						
					default:
						break;
				}
					
			},
			this
		);
		
		this.hannibals.forEach(
			function (hannibal){
				this.game.physics.arcade.collide(hannibal, this.layer1.platform);

				switch (this.hannibals.getIndex(hannibal)) {
					case 0:
						if(this.hannibalIsLeft1) {
							hannibal.scale.x = -1;
							hannibal.body.velocity.x = -Config.enemy.hannibal.walk.x;
							this.hannibalWalk1 += Config.enemy.hannibal.walk.x; 
						} else {
							hannibal.scale.x = 1;
							hannibal.body.velocity.x = Config.enemy.hannibal.walk.x;
							this.hannibalWalk1 += Config.enemy.hannibal.walk.x;
						} 
						
						if (this.hannibalWalk1 >= 15000) {
							this.hannibalWalk1 = 0;
							this.hannibalIsLeft1 = !this.hannibalIsLeft1;
						}
						
				    	hannibal.animations.play('walk');
						break;
						
					case 1:
						if(this.hannibalIsLeft2) {
							hannibal.scale.x = -1;
							hannibal.body.velocity.x = -Config.enemy.hannibal.walk.x;
							this.hannibalWalk2 += Config.enemy.hannibal.walk.x; 
						} else {
							hannibal.scale.x = 1;
							hannibal.body.velocity.x = Config.enemy.hannibal.walk.x;
							this.hannibalWalk2 += Config.enemy.hannibal.walk.x;
						} 
						
						if (this.hannibalWalk2 >= 10000) {
							this.hannibalWalk2 = 0;
							this.hannibalIsLeft2 = !this.hannibalIsLeft2;
						}
						
				    	hannibal.animations.play('walk');
						break;
						
					case 2:
						hannibal.body.velocity.x = 0;
						
						if(hannibal.body.velocity.y < 0){
					    	hannibal.animations.play('jump');
				    	} else if (hannibal.body.velocity.y > 0){
				    		hannibal.animations.play('fall');
						}
						if (hannibal.body.onFloor()) {
							hannibal.body.velocity.y = -Config.enemy.hannibal.jump.y;
						}
						break;
						
					case 3:
						hannibal.body.velocity.x = 0;
						
						if(hannibal.body.velocity.y < 0){
					    	hannibal.animations.play('jump');
				    	} else if (hannibal.body.velocity.y > 0){
				    		hannibal.animations.play('fall');
						}
						if (hannibal.body.onFloor()) {
							hannibal.body.velocity.y = -Config.enemy.hannibal.jump.y;
						}
						break;
						
					default:
						break;
				}
			}, 
			this
		);
		
		this.freddys.forEach(
			function (freddy){
				this.game.physics.arcade.collide(freddy, this.layer1.platform);

				switch (this.freddys.getIndex(freddy)) {
					case 0:
						if(this.freddyIsLeft1) {
							freddy.scale.x = -1;
							freddy.body.velocity.x = -Config.enemy.freddy.walk.x;
							this.freddyWalk1 += Config.enemy.freddy.walk.x; 
						} else {
							freddy.scale.x = 1;
							freddy.body.velocity.x = Config.enemy.freddy.walk.x;
							this.freddyWalk1 += Config.enemy.freddy.walk.x;
						} 
						
						if (this.freddyWalk1 >= 6000) {
							this.freddyWalk1 = 0;
							this.freddyIsLeft1 = !this.freddyIsLeft1;
						}
						
				    	freddy.animations.play('walk');
						break;
						
					case 1:
						if(this.freddyIsLeft2) {
							freddy.scale.x = -1;
							freddy.body.velocity.x = -Config.enemy.freddy.walk.x;
							this.freddyWalk2 += Config.enemy.freddy.walk.x; 
						} else {
							freddy.scale.x = 1;
							freddy.body.velocity.x = Config.enemy.freddy.walk.x;
							this.freddyWalk2 += Config.enemy.freddy.walk.x;
						} 
						
						if (this.freddyWalk2 >= 4000) {
							this.freddyWalk2 = 0;
							this.freddyIsLeft2 = !this.freddyIsLeft2;
						}
						
				    	freddy.animations.play('walk');
						break;
						
					case 2:
						if(freddy.body.velocity.y < 0){
					    	freddy.animations.play('jump');
				    	} else if (freddy.body.velocity.y > 0){
				    		freddy.animations.play('fall');
						}
						if (freddy.body.onFloor()) {
							freddy.body.velocity.y = -Config.enemy.freddy.jump.y;
						}
						break;
						
					case 3:
						freddy.body.velocity.x = 0;
						
						if(freddy.body.velocity.y < 0){
					    	freddy.animations.play('jump');
				    	} else if (freddy.body.velocity.y > 0){
				    		freddy.animations.play('fall');
						}
						if (freddy.body.onFloor()) {
							freddy.body.velocity.y = -Config.enemy.freddy.jump.y;
						}
						break;
						
					default:
						break;
				}
			}, 
			this
		);
		
		this.jasons.forEach(
			function (jason){
				this.game.physics.arcade.collide(jason, this.layer1.platform);

				switch (this.jasons.getIndex(jason)) {
					case 0:
						if(this.jasonIsLeft1) {
							jason.scale.x = -1;
							jason.body.velocity.x = -Config.enemy.jason.walk.x;
							this.jasonWalk1 += Config.enemy.jason.walk.x; 
						} else {
							jason.scale.x = 1;
							jason.body.velocity.x = Config.enemy.jason.walk.x;
							this.jasonWalk1 += Config.enemy.jason.walk.x;
						} 
						
						if (this.jasonWalk1 >= 3000) {
							this.jasonWalk1 = 0;
							this.jasonIsLeft1 = !this.jasonIsLeft1;
						}
						
				    	jason.animations.play('walk');
						break;
						
					case 1:
						if(this.jasonIsLeft2) {
							jason.scale.x = -1;
							jason.body.velocity.x = -Config.enemy.jason.walk.x;
							this.jasonWalk2 += Config.enemy.jason.walk.x; 
						} else {
							jason.scale.x = 1;
							jason.body.velocity.x = Config.enemy.jason.walk.x;
							this.jasonWalk2 += Config.enemy.jason.walk.x;
						} 
						
						if (this.jasonWalk2 >= 10000) {
							this.jasonWalk2 = 0;
							this.jasonIsLeft2 = !this.jasonIsLeft2;
						}
						
				    	jason.animations.play('walk');
						break;
						
					case 2:
						jason.body.velocity.x = 0;
						
						if(jason.body.velocity.y < 0){
					    	jason.animations.play('jump');
				    	} else if (jason.body.velocity.y > 0){
				    		jason.animations.play('fall');
						}
						if (jason.body.onFloor()) {
							jason.body.velocity.y = -Config.enemy.jason.jump.y;
						}
						break;
						
					case 3:
						jason.body.velocity.x = 0;
						
						if(jason.body.velocity.y < 0){
					    	jason.animations.play('jump');
				    	} else if (jason.body.velocity.y > 0){
				    		jason.animations.play('fall');
						}
						if (jason.body.onFloor()) {
							jason.body.velocity.y = -Config.enemy.jason.jump.y;
						}
						break;
						
					default:
						break;
				}
			}, 
			this
		);
		
		this.jokers.forEach(
			function (joker){
				this.game.physics.arcade.collide(joker, this.layer1.platform);

				switch (this.jokers.getIndex(joker)) {
					case 0:
						if(this.jokerIsLeft1) {
							joker.scale.x = -1;
							joker.body.velocity.x = -Config.enemy.joker.walk.x;
							this.jokerWalk1 += Config.enemy.joker.walk.x; 
						} else {
							joker.scale.x = 1;
							joker.body.velocity.x = Config.enemy.joker.walk.x;
							this.jokerWalk1 += Config.enemy.joker.walk.x;
						} 
						
						if (this.jokerWalk1 >= 2200) {
							this.jokerWalk1 = 0;
							this.jokerIsLeft1 = !this.jokerIsLeft1;
						}
						
						joker.animations.play('walk');
						break;
						
					case 1:
						if(this.jokerIsLeft2) {
							joker.scale.x = -1;
							joker.body.velocity.x = -Config.enemy.joker.walk.x;
							this.jokerWalk2 += Config.enemy.joker.walk.x; 
						} else {
							joker.scale.x = 1;
							joker.body.velocity.x = Config.enemy.joker.walk.x;
							this.jokerWalk2 += Config.enemy.joker.walk.x;
						} 
						
						if (this.jokerWalk2 >= 15100) {
							this.jokerWalk2 = 0;
							this.jokerIsLeft2 = !this.jokerIsLeft1;
						}
						
						joker.animations.play('walk');
						break;
						
					case 2:
						joker.body.velocity.x = 0;
						
						if(joker.body.velocity.y < 0){
					    	joker.animations.play('jump');
				    	} else if (joker.body.velocity.y > 0){
				    		joker.animations.play('fall');
						}
						if (joker.body.onFloor()) {
							joker.body.velocity.y = -Config.enemy.joker.jump.y;
						}
						break;
						
					case 3:
						joker.body.velocity.x = 0;
						
						if(joker.body.velocity.y < 0){
					    	joker.animations.play('jump');
				    	} else if (joker.body.velocity.y > 0){
				    		joker.animations.play('fall');
						}
						if (joker.body.onFloor()) {
							joker.body.velocity.y = -Config.enemy.joker.jump.y;
						}
						break;
						
					default:
						break;
				}
			}, 
			this
		);
		
		this.vaders.forEach(
			function (vader){
				this.game.physics.arcade.collide(vader, this.layer1.platform);
				
			}, this
		);
	}
};
