var game, DemoState;

//create the game state
function DemoState() {}

DemoState.prototype.preload = function() {
//  game.load.crossOrigin = "Anonymous"; //required to load assets for codepen
  // load the sprite texture
//  game.load.image('check', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/check.png');
  
  // load the physics data json
//  game.load.physics('physicsData', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/physics.json');
  
game.load.image('check', 'nave_100-40.png');

//
//// load the physics data json
game.load.json('physicsData', 'nave_100-40.json');
//alert("4");
};
  
DemoState.prototype.create = function() {
	game.add.sprite(10,10,'check');
//	game.physics.startSystem(Phaser.Physics.ARCADE);	
//	game.physics.arcade.gravity.y = this.GRAVITY;
//  game.physics.startSystem(Phaser.Physics.ARCADE);
  //set some initial gravity
//  game.physics.p2.gravity.y = 500;
};

// Game Bootstrapper
window.onload = function () {
  game = new Phaser.Game(600, 300, Phaser.AUTO, 'polygon-example');
  // add the game state to the state manager
//  alert("1");
  game.state.add('demo', DemoState);
//  alert("2");
  // and start the game
  game.state.start('demo');
//  alert("3");

  
};

//  game.load.image('check', 'nave_100-40.png');
//  
//  // load the physics data json
//  game.load.physics('physicsData', 'nave_100-40.json');
