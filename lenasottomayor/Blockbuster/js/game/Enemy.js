Enemy = function(game, layer1, tilemap){
	
	this.game = game;
	this.layer1 = layer1;
	this.tilemap = tilemap;
	this.cruellasWalker = null;
	this.cruellasJumper = null;
	this.freddysWalker = null;
	this.freddysJumper = null;
	this.hannibalsWalker = null;
	this.hannibalsJumper = null;
	this.jasonsWalker = null;
	this.jasonsJumper = null;
	this.jokersWalker = null;
	this.jokersJumper = null;
};

Enemy.prototype = {
	create: function () {
	"use strict";
		/* 
		 * Create Cruellas Enemies 
		 */
		this.cruellasWalker = game.add.group();
		this.cruellasJumper = game.add.group();
		
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.walk.gid, 'cruella', Config.enemy.cruella.walk.frame,true,false,this.cruellasWalker);
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.jump.gid, 'cruella', Config.enemy.cruella.jump.frame,true,false,this.cruellasJumper);
		
		this.cruellasWalker.forEach(
				function (cruella){
					this.game.physics.enable(cruella, Phaser.Physics.ARCADE);
					
					cruella.anchor.setTo(Config.enemy.cruella.anchor.x, Config.enemy.cruella.anchor.y);
					cruella.body.collideWorldBounds = true;
					cruella.scale.x = -1;
					
					cruella.animations.add('walk', [0,1,2,3], 4, true);
					cruella.animations.add('dead',[4],1,false);
					cruella.animations.play('walk');
					
					cruella.alive = true;
					cruella.pi = cruella.position.x - 100;
					cruella.pf = cruella.position.x;
					
					cruella.body.velocity.x = -Config.enemy.cruella.walk.x;
				}, 
				this
		);
		
		this.cruellasJumper.forEach(
				function (cruella){
					this.game.physics.enable(cruella, Phaser.Physics.ARCADE);
					
					cruella.anchor.setTo(Config.enemy.cruella.anchor.x, Config.enemy.cruella.anchor.y);
					cruella.body.collideWorldBounds = true;
					cruella.scale.x = -1;
					
					cruella.animations.add('jump', [1], 1, true);
					cruella.animations.add('fall', [2], 1, true);
					cruella.animations.add('dead',[4],1,false);
					
					cruella.alive = true;
					
					cruella.frame = Config.enemy.cruella.jump.frame;
				}, 
				this
		);

		/* 
		 * Create Freddys Enemies 
		 */
		this.freddysWalker = game.add.group();
		this.freddysJumper = game.add.group();
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.walk.gid, 'freddy', Config.enemy.freddy.walk.frame,true,false,this.freddysWalker);
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.jump.gid, 'freddy', Config.enemy.freddy.jump.frame,true,false,this.freddysJumper);
		
		this.freddysWalker.forEach(
				function (freddy){
					this.game.physics.enable(freddy, Phaser.Physics.ARCADE);
					
					freddy.anchor.setTo(Config.enemy.freddy.anchor.x, Config.enemy.freddy.anchor.y);
					freddy.body.collideWorldBounds = true;
					freddy.scale.x = -1;
					
					freddy.animations.add('walk', [0,1,2,3,4,5,6], 8, true);
					freddy.animations.add('dead', [7], 1, false);
					freddy.animations.play('walk');
					
					freddy.alive = true;
					
					switch (this.freddysWalker.getIndex(freddy)) {
						case 0:
							freddy.pi = freddy.position.x - 600;
							break;
						case 1:
							freddy.pi = freddy.position.x - 150;
							break;
						default:
							break;
					}
					
					freddy.pf = freddy.position.x;
					
					freddy.body.velocity.x = -Config.enemy.freddy.walk.x;
				}, 
				this
		);
		
		this.freddysJumper.forEach(
				function (freddy){
					this.game.physics.enable(freddy, Phaser.Physics.ARCADE);
					
					freddy.anchor.setTo(Config.enemy.freddy.anchor.x, Config.enemy.freddy.anchor.y);
					freddy.body.collideWorldBounds = true;
					freddy.scale.x = -1;
					
					freddy.animations.add('jump', [3], 1, true);
					freddy.animations.add('fall', [2], 1, true);
					freddy.animations.add('dead', [7], 1, false);
					
					freddy.alive = true;
					
					freddy.frame = Config.enemy.freddy.jump.frame;
				}, 
				this
		);

		/* 
		 * Create Hannibals Enemies 
		 */
		this.hannibalsWalker = game.add.group();
		this.hannibalsJumper = game.add.group();
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.walk.gid, 'hannibal', Config.enemy.hannibal.walk.frame,true,false,this.hannibalsWalker);
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.jump.gid, 'hannibal', Config.enemy.hannibal.jump.frame,true,false,this.hannibalsJumper);
		
		this.hannibalsWalker.forEach(
				function (hannibal){
					this.game.physics.enable(hannibal, Phaser.Physics.ARCADE);
					
					hannibal.anchor.setTo(Config.enemy.hannibal.anchor.x, Config.enemy.hannibal.anchor.y);
					hannibal.body.collideWorldBounds = true;
					hannibal.scale.x = -1;
					
					hannibal.animations.add('walk', [0,1,2,3,4,5,6], 6, true);
					hannibal.animations.add('dead', [7], 1, false);
					hannibal.animations.play('walk');
					
					hannibal.alive = true;
					
					switch (this.hannibalsWalker.getIndex(hannibal)) {
						case 0:
							hannibal.pi = hannibal.position.x - 600;
							break;
						case 1:
							hannibal.pi = hannibal.position.x - 350;
							break;
						default:
							break;
					}
					
					hannibal.pf = hannibal.position.x;
					
					hannibal.body.velocity.x = -Config.enemy.hannibal.walk.x;
				}, 
				this
		);
		
		this.hannibalsJumper.forEach(
				function (hannibal){
					this.game.physics.enable(hannibal, Phaser.Physics.ARCADE);
					
					hannibal.anchor.setTo(Config.enemy.hannibal.anchor.x, Config.enemy.hannibal.anchor.y);
					hannibal.body.collideWorldBounds = true;
					hannibal.scale.x = -1;
					
					hannibal.animations.add('jump', [3], 1, true);
					hannibal.animations.add('fall', [2], 1, true);
					hannibal.animations.add('dead', [7], 1, false);
					
					hannibal.alive = true;
					
					hannibal.frame = Config.enemy.hannibal.jump.frame;
				}, 
				this
		);

		/* 
		 * Create Jasons Enemies 
		 */
		this.jasonsWalker = game.add.group();
		this.jasonsJumper = game.add.group();
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.walk.gid, 'jason', Config.enemy.jason.walk.frame,true,false,this.jasonsWalker);
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.jump.gid, 'jason', Config.enemy.jason.jump.frame,true,false,this.jasonsJumper);
		
		this.jasonsWalker.forEach(
				function (jason){
					this.game.physics.enable(jason, Phaser.Physics.ARCADE);
					
					jason.anchor.setTo(Config.enemy.jason.anchor.x, Config.enemy.jason.anchor.y);
					jason.body.collideWorldBounds = true;
					jason.scale.x = -1;
					
					jason.animations.add('walk', [0,1,2,3,4,5,6], 6, true);
					jason.animations.add('dead', [7], 1, false);
					jason.animations.play('walk');
					
					jason.alive = true;
					
					switch (this.jasonsWalker.getIndex(jason)) {
						case 0:
							jason.pi = jason.position.x - 125;
							break;
						case 1:
							jason.pi = jason.position.x - 600;
							break;
						default:
							break;
					}
					
					jason.pf = jason.position.x;
					
					jason.body.velocity.x = -Config.enemy.jason.walk.x;
				}, 
				this
		);
		
		this.jasonsJumper.forEach(
				function (jason){
					this.game.physics.enable(jason, Phaser.Physics.ARCADE);
					
					jason.anchor.setTo(Config.enemy.jason.anchor.x, Config.enemy.jason.anchor.y);
					jason.body.collideWorldBounds = true;
					jason.scale.x = -1;
					
					jason.animations.add('jump', [3], 1, true);
					jason.animations.add('fall', [2], 1, true);
					jason.animations.add('dead', [7], 1, false);
					
					jason.alive = true;
					
					jason.frame = Config.enemy.jason.jump.frame;
				}, 
				this
		);

		/* 
		 * Create Jokers Enemies 
		 */
		this.jokersWalker = game.add.group();
		this.jokersJumper = game.add.group();
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.walk.gid, 'joker', Config.enemy.joker.walk.frame,true,false,this.jokersWalker);
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.jump.gid, 'joker', Config.enemy.joker.jump.frame,true,false,this.jokersJumper);
		
		this.jokersWalker.forEach(
				function (joker){
					this.game.physics.enable(joker, Phaser.Physics.ARCADE);
					
					joker.anchor.setTo(Config.enemy.joker.anchor.x, Config.enemy.joker.anchor.y);
					joker.body.collideWorldBounds = true;
					joker.scale.x = -1;
					
					joker.animations.add('walk', [0,1,2,3,4,5,6], 6, true);
					joker.animations.add('dead', [7], 1, false);
					joker.animations.play('walk');
					
					joker.alive = true;
					
					switch (this.jokersWalker.getIndex(joker)) {
						case 0:
							joker.pi = joker.position.x - 100;
							break;
						case 1:
							joker.pi = joker.position.x - 525;
							break;
						default:
							break;
					}
					
					joker.pf = joker.position.x;
					
					joker.body.velocity.x = -Config.enemy.joker.walk.x;
				}, 
				this
		);
		
		this.jokersJumper.forEach(
				function (joker){
					this.game.physics.enable(joker, Phaser.Physics.ARCADE);
					
					joker.anchor.setTo(Config.enemy.joker.anchor.x, Config.enemy.joker.anchor.y);
					joker.body.collideWorldBounds = true;
					joker.scale.x = -1;
					
					joker.animations.add('jump', [3], 1, true);
					joker.animations.add('fall', [2], 1, true);
					joker.animations.add('dead', [7], 1, false);
					
					joker.alive = true;
					
					joker.frame = Config.enemy.joker.jump.frame;
				}, 
				this
		);
		
		this.vaders = game.add.group();
		this.vaders.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.vader.name, Config.enemy.vader.gid, 'vader', Config.enemy.vader.frame,true,false,this.vaders);
		this.vaders.forEach(
			function (vader){ 
				this.game.physics.enable(vader, Phaser.Physics.ARCADE);
				
				vader.anchor.setTo(Config.enemy.vader.anchor.x, Config.enemy.vader.anchor.y);
				vader.body.collideWorldBounds = true;
				vader.scale.x = -1;
				
				vader.animations.add('walk', [0,1,2,3,4,5,6,7], 8, true);
				vader.animations.add('dead',[8,9],4,true);
				vader.animations.play('walk');
				
				vader.alive = true;
				vader.hp = Config.enemy.vader.hp;
				
				vader.frame = Config.enemy.vader.frame;
			},
			this
		);

	
	},
	
	update: function() {
		
		this.game.physics.arcade.collide(this.cruellasWalker, this.layer1.platform);
		this.game.physics.arcade.collide(this.cruellasJumper, this.layer1.platform);
		this.game.physics.arcade.collide(this.freddysWalker, this.layer1.platform);
		this.game.physics.arcade.collide(this.freddysJumper, this.layer1.platform);
		this.game.physics.arcade.collide(this.hannibalsWalker, this.layer1.platform);
		this.game.physics.arcade.collide(this.hannibalsJumper, this.layer1.platform);
		this.game.physics.arcade.collide(this.jasonsWalker, this.layer1.platform);
		this.game.physics.arcade.collide(this.jasonsJumper, this.layer1.platform);
		this.game.physics.arcade.collide(this.jokersWalker, this.layer1.platform);
		this.game.physics.arcade.collide(this.jokersJumper, this.layer1.platform);
		this.game.physics.arcade.collide(this.vaders, this.layer1.platform);
		
		this.cruellasWalker.forEachAlive(
			function (cruella) {
				if (cruella.position.x <= cruella.pi) {
					cruella.scale.x = 1;
				}

				if (cruella.position.x >= cruella.pf) {
					cruella.scale.x = -1;
				}
				
				cruella.body.velocity.x = (cruella.scale.x > 0) ? Config.enemy.cruella.walk.x : -Config.enemy.cruella.walk.x;
			}, 
			this
		);
		
		this.cruellasJumper.forEachAlive(
			function (cruella) {
				cruella.body.velocity.x = Config.enemy.cruella.jump.x;
				
				if (cruella.body.onFloor()) {
					cruella.body.velocity.y = -Config.enemy.cruella.jump.y;
				}
				
				if(cruella.body.velocity.y < 0){
			    	cruella.animations.play('jump');
		    	} else if (cruella.body.velocity.y > 0){
		    		cruella.animations.play('fall');
		    	}
			}, 
			this
		);
		
		this.freddysWalker.forEachAlive(
			function (freddy) {
				if (freddy.position.x <= freddy.pi) {
					freddy.scale.x = 1;
				}

				if (freddy.position.x >= freddy.pf) {
					freddy.scale.x = -1;
				}
				
				freddy.body.velocity.x = (freddy.scale.x > 0) ? Config.enemy.freddy.walk.x : -Config.enemy.freddy.walk.x;
			}, 
			this
		);
		
		this.freddysJumper.forEachAlive(
			function (freddy) {
				freddy.body.velocity.x = Config.enemy.freddy.jump.x;
				
				if (freddy.body.onFloor()) {
					freddy.body.velocity.y = -Config.enemy.freddy.jump.y;
				}
				
				if(freddy.body.velocity.y < 0){
					freddy.animations.play('jump');
		    	} else if (freddy.body.velocity.y > 0){
		    		freddy.animations.play('fall');
		    	}
			}, 
			this
		);
		
		this.hannibalsWalker.forEachAlive(
			function (hannibal) {
				if (hannibal.position.x <= hannibal.pi) {
					hannibal.scale.x = 1;
				}

				if (hannibal.position.x >= hannibal.pf) {
					hannibal.scale.x = -1;
				}
				
				hannibal.body.velocity.x = (hannibal.scale.x > 0) ? Config.enemy.hannibal.walk.x : -Config.enemy.hannibal.walk.x;
			}, 
			this
		);
		
		this.hannibalsJumper.forEachAlive(
			function (hannibal) {
				hannibal.body.velocity.x = Config.enemy.hannibal.jump.x;
				
				if (hannibal.body.onFloor()) {
					hannibal.body.velocity.y = -Config.enemy.hannibal.jump.y;
				}
				
				if(hannibal.body.velocity.y < 0){
					hannibal.animations.play('jump');
		    	} else if (hannibal.body.velocity.y > 0){
		    		hannibal.animations.play('fall');
		    	}
			}, 
			this
		);
		
		this.jasonsWalker.forEachAlive(
			function (jason) {
				if (jason.position.x <= jason.pi) {
					jason.scale.x = 1;
				}

				if (jason.position.x >= jason.pf) {
					jason.scale.x = -1;
				}
				
				jason.body.velocity.x = (jason.scale.x > 0) ? Config.enemy.jason.walk.x : -Config.enemy.jason.walk.x;
			}, 
			this
		);
		
		this.jasonsJumper.forEachAlive(
			function (jason) {
				jason.body.velocity.x = Config.enemy.jason.jump.x;
				
				if (jason.body.onFloor()) {
					jason.body.velocity.y = -Config.enemy.jason.jump.y;
				}
				
				if(jason.body.velocity.y < 0){
					jason.animations.play('jump');
		    	} else if (jason.body.velocity.y > 0){
		    		jason.animations.play('fall');
		    	}
			}, 
			this
		);
		
		this.jokersWalker.forEachAlive(
			function (joker) {
				if (joker.position.x <= joker.pi) {
					joker.scale.x = 1;
				}

				if (joker.position.x >= joker.pf) {
					joker.scale.x = -1;
				}
				
				joker.body.velocity.x = (joker.scale.x > 0) ? Config.enemy.joker.walk.x : -Config.enemy.joker.walk.x;
			}, 
			this
		);
		
		this.jokersJumper.forEachAlive(
			function (joker) {
				joker.body.velocity.x = Config.enemy.joker.jump.x;
				
				if (joker.body.onFloor()) {
					joker.body.velocity.y = -Config.enemy.joker.jump.y;
				}
				
				if(joker.body.velocity.y < 0){
					joker.animations.play('jump');
		    	} else if (joker.body.velocity.y > 0){
		    		joker.animations.play('fall');
		    	}
			}, 
			this
		);
	}
};
