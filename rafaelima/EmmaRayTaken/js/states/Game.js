State.Game = function (game) {
	"use strict";
	this.game = game;
};

var layer;
var player;
var cursors;
var attackButton;
var map;
var rotate;
var bg1;
var bg2;
var bg3;
var bg4;
var bg5;
var bar, bar2, bar3;
var previousX;
var previousY;
var collects;
var itemsTaken;
var idPlayer;
var helper;
var flagId, flagMove;
var monster;
var playerCollisionGroup, obstacleCollisionGroup, monsterCollisionGroup, tileCollisionGroup, collectCollisionGroup, barCollisionGroup;
var isJumping, beInGround, yBeforeJump;
var timer;

State.Game.prototype = {
		preload: function () {
			"use strict";
			itemsTaken = 0;
			flagId = false;
			idPlayer = 0;
			beInGround = true;
			isJumping = false;
			yBeforeJump = 3504;
			rotate = 0.05;
			previousX = 0;
		    previousY = 0;
		    flagMove = false;
		    timer = 0;
		},
		create: function () {
			"use strict";
			
			//set p2
			this.game.physics.startSystem(Phaser.Physics.P2JS);
			this.game.physics.p2.setImpactEvents(true);
			this.game.physics.p2.restitution = 0.1;
		    this.game.physics.p2.gravity.y = 800;
		    this.game.stage.backgroundColor = '#2d2d2d';
		    this.game.physics.p2.updateBoundsCollisionGroup();

		    //collision groups
		    //start collision groups
			playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    obstacleCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    tileCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    collectCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    barCollisionGroup = this.game.physics.p2.createCollisionGroup();
		    
		    //bg
		    bg1 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg1');
		    bg2 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg2');
		    bg3 = this.game.add.tileSprite(0, 3060, 3000, 540, 'bg3');
		    bg4 = this.game.add.tileSprite(2560, 3060, 3000, 540, 'bg4');
		    bg4 = this.game.add.tileSprite(2560, 2520, 3000, 540, 'bg4');
		    this.game.add.tileSprite(2560, 1980, 3000, 540, 'bg4');
		    
		    //Map
		    map = this.game.add.tilemap('stage');
			map.addTilesetImage('tileset_arcane_forest', 'tileset');
			layer = map.createLayer('Camada de Tiles 1');
			map.setCollisionBetween(0, 38);
			this.game.physics.p2.enable(layer);
			var tileObjects = this.game.physics.p2.convertTilemap(map, layer);
 
		    //Tile collision
		    for(var tile in tileObjects)
		    {
		    	tileObjects[tile].setCollisionGroup(tileCollisionGroup);
		    	tileObjects[tile].collides(playerCollisionGroup, hitTiles, this);
		    }
		    
		    //player
		    player = this.game.add.sprite(60, 3300, 'dude');
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('turn', [4], 20, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);
			player.smoothed = false;
		    this.game.physics.p2.enable(player, true);
			this.game.camera.follow(player);
		    player.body.collideWorldBounds = true;
		    player.body.fixedRotation = true;
		    player.body.setCollisionGroup(playerCollisionGroup);
		    
		    //collide
			player.body.collides(monsterCollisionGroup, hitMonsters, this);
			player.body.collides(obstacleCollisionGroup, hitObstacles, this);
			player.body.collides(tileCollisionGroup, hitTiles, this);
			player.body.collides(collectCollisionGroup, this.collectItems, this);
			player.body.collides(barCollisionGroup);
		    
			//add 'things' to the world
			putObstacles();
			putMonsters();
			putBar();
			putCollect();
		    
		    //DEBUG LAYER - deletar
		    layer.debug = true;
		    
			layer.resizeWorld();
		    
		    cursors = this.game.input.keyboard.createCursorKeys();
			attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
		},
		update: function () {
			"use strict";

			//move the bars
			this.moveBar(bar, 500);
			this.moveBar(bar2, 300);
			this.moveBar(bar3, 500);
			
//			Config.global.screen.resize(this.game);
			if (cursors.left.isDown){
				player.body.moveLeft(200);
				player.animations.play('left');
			} else if (cursors.right.isDown) {
				player.body.moveRight(200);
				player.animations.play('right');
			} else if(cursors.up.isDown){
//				layer.rotation -=0.05;
//				layer.resizeWorld();
//				map.setCollisionBetween(1, 12);
//				this.game.physics.p2.enable(layer);
			}else if(cursors.down.isDown){
//				layer.rotation +=0.05;
//				layer.resizeWorld();
			}else{
				player.body.velocity.x = 0;
				player.animations.stop();
				player.frame = 4;
			}

			
			if( parseInt(player.x) > (Config.global.screen.width/2) && previousX!= parseInt(player.x)){
				if(previousX>player.x){
					bg2.tilePosition.x += 0.2;
					bg3.tilePosition.x += 0.3;
				}else{
					bg2.tilePosition.x -= 0.2;
					bg3.tilePosition.x -= 0.3;
				}
			}
			
			previousX = parseInt(player.x);

			doJump();
			doAttack();
			followPlayer();
			
			if(player.x	<3050 && player.y<2451){
				this.gameRotate();
			}
		},
		
		onClick: function () {
			"use strict";
		},

		gameRotate: function () {
			"use strict";
			this.game.state.start('GameRotate');
		},
		
		render: function () {
			"use strict";
			//DEBUG
		    this.game.debug.spriteInfo(player, 32, 32);
		},
		
		//collect item (diamond and key)
		collectItems: function (varPlayer, collect) {
			"use strict";
			//hit once
			if ((collect.data.id != idPlayer) && !flagId) {
				idPlayer = collect.data.id;
	
				console.log(varPlayer.data.id, collect.data.id);
				collect.sprite.kill();
				itemsTaken++;
	
				if (itemsTaken > 0) {
					var fixedItem = this.game.add.sprite(0, 0, 'collect');
					fixedItem.fixedToCamera = true;
					fixedItem.cameraOffset.setTo(720 + (40 * itemsTaken), 40);
					flagId = true;
				}
			}
			if ((collect.data.id == idPlayer) && flagId) {
				flagId = false;
			}
		},
		
		//move the bar (obstacle)
		moveBar: function (obj, velocity) {
			"use strict";
			obj.timer++;
			if(obj.timer >= 100 ){
				obj.body.moveLeft(velocity);
				if(obj.timer >= 200){obj.timer = 0;}
			}else {
				obj.body.moveRight(velocity);
			}
		},

};

function doJump(){
	if(cursors.up.isDown)
    {
		if(isJumping === false && beInGround === true)
		{
			yBeforeJump = player.body.y;
			player.body.moveUp(500);
			isJumping = true;
			beInGround = false;
		}
    }
	if(isJumping === true){
		player.body.moveUp(500);
		if(player.body.y <= (yBeforeJump-400)){
			isJumping = false;
			player.body.moveDown(500);
		}
	}else if (beInGround != true){
		player.body.moveDown(500);
	}
}

function doAttack(){
	if(attackButton.isDown)
    {
		player.animations.play('turn');
    }
}

function hitTiles(){
	beInGround = checkIfCanJump();
	isJumping = false;
}

function hitObstacles(){
	beInGround = checkIfCanJump();
	isJumping = false;
}

function hitMonsters(){
	if(player.animations.currentFrame.index === 4 && checkIfConered()===true)
	{
		monster.kill();
		player.body.moveLeft(500);
	}else
	{
		player.kill();
		monster.body.moveRight(500);
	}
}

//internet magic...player is over something
function checkIfCanJump() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === player.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    
    return result;

}
//internet magic...player has something beside her rightside
function checkIfConered() {

    var xAxis = p2.vec2.fromValues(1, 0);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
            if (c.bodyA === player.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    
    return result;

}

//Create Obstacles
function putObstacles(){
	obstacles = game.add.group();

    for (var i = 1; i <= 4; i++)
    {
        var obstacle = obstacles.create(game.world.randomX, game.world.randomY, 'obstacle'+i);
        game.physics.p2.enable(obstacle, true);
        obstacle.body.fixedRotation = true; //no circle movement 
        obstacle.body.kinematic = true;
        obstacle.body.setCollisionGroup(obstacleCollisionGroup);
        obstacle.body.collides([obstacleCollisionGroup, playerCollisionGroup]);
    }
}

//create monsters
function putMonsters(){
	//monster
    monster = game.add.sprite(160, 3500, 'monster1');
    monster.animations.add('walk', [0,1,2,3], 10, true);
    monster.play('walk');
    game.physics.p2.enable(monster, true);
    monster.body.fixedRotation = true; //no circle movement 
    monster.body.kinematic = true;
    monster.body.setCollisionGroup(monsterCollisionGroup);
    monster.body.collides([monsterCollisionGroup, playerCollisionGroup]);
}

//Create Bars
function putBar(){
    //bar 1
    bar = this.game.add.sprite(Config.game.bar.startX, Config.game.bar.startY, 'bar');
    this.game.physics.p2.enable(bar, true);
    bar.body.kinematic = true;
    bar.body.setCollisionGroup(barCollisionGroup);
    bar.body.collides([barCollisionGroup, playerCollisionGroup]);
    bar.timer = 0;
    
    //bar 2
    bar2 = this.game.add.sprite(300, 3200, 'bar');
    this.game.physics.p2.enable(bar2, true);
    bar2.body.kinematic = true;
    bar2.body.setCollisionGroup(barCollisionGroup);
    bar2.body.collides([barCollisionGroup, playerCollisionGroup]);
    bar2.timer = 0;
    
	//bar 3
    bar3 = this.game.add.sprite(200, 3300, 'bar');
    this.game.physics.p2.enable(bar3, true);
    bar3.body.kinematic = true;
    bar3.body.setCollisionGroup(barCollisionGroup);
    bar3.body.collides([barCollisionGroup, playerCollisionGroup]);
    bar3.timer = 0;
}

//Create Collects
function putCollect(){
	//Group Item
    var collects = this.game.add.group();
    
    //Collect Items 1
    var collect = collects.create(90, 3500, 'collect');
    this.game.physics.p2.enable(collect, true);
    collect.body.fixedRotation = true; //no circle movement 
    collect.body.kinematic = true;
    collect.body.setCollisionGroup(collectCollisionGroup);
    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);
    
    //Collect Items 2
    var collect = collects.create(150, 3500, 'collect');
    this.game.physics.p2.enable(collect, true);
    collect.body.fixedRotation = true; //no circle movement 
    collect.body.kinematic = true;
    collect.body.setCollisionGroup(collectCollisionGroup);
    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);
    
    //Collect Items 3
    var collect = collects.create(200, 3500, 'collect');
    this.game.physics.p2.enable(collect, true);
    collect.body.fixedRotation = true; //no circle movement 
    collect.body.kinematic = true;
    collect.body.setCollisionGroup(collectCollisionGroup);
    collect.body.collides([collectCollisionGroup ,playerCollisionGroup]);
}

var monster_speed = 5;
function followPlayer()
{
  if (player.body.x < monster.body.x)
  {
    monster.body.velocity.x = monster_speed * -1;
  }
  else
  {
    monster.body.velocity.x = monster_speed;
  }
    if (player.body.y < monster.body.y)
  {
    monster.body.velocity.y = monster_speed * -1;
  }
  else
  {
    monster.body.velocity.y = monster_speed;
  }
  
}