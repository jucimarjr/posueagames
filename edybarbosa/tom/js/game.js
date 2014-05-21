
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  37x45 is the size of each frame
	game.stage.backgroundColor = "#ffffff";

    //game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
    //game.load.spritesheet('man', 'assets/explosiveBallistics1024-504.png', 256, 504, 4);
    //game.load.spritesheet('jelly1', 'assets/sprite_jelly_630-300.png', 90, 60, 35);
	game.load.spritesheet('gato', 'assets/gato.png', 154, 81, 4);
    
}

function create() {

    //var mummy = game.add.sprite(400, 200, 'mummy');
    //var man = game.add.sprite(10, 10, 'man');
    //var jelly = game.add.sprite(10, 10, 'jelly1');
	
	var cat = game.add.sprite(20,20,'gato');

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    //mummy.animations.add('walk');
    //jelly.animations.add('jump');
    //man.animations.add('explode');
	cat.animations.add('run');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    //mummy.animations.play('walk',20, true);
    //jelly.animations.play('jump', [0,1,2], 1, true);
    //jelly.animations.play('jump', 1, true);
    //man.animations.play('explode', 20, true);
	
	cat.animations.play('run', 3, true);

}