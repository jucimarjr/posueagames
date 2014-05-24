

var game = new Phaser.Game(960, 600, Phaser.CANVAS, 'phaser-game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemap_example_1920-600.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tileset','assets/tileset.png');

    game.load.image('fundo', 'assets/fundo_1920-600.jpg');

    game.load.spritesheet('saci', 'assets/saci_75-116.png', 75, 116);

    game.load.image('coxa', 'assets/coxa.png');

    game.load.image('caximbo', 'assets/caximbo_183-82.png');

    
    //game.load.image('phaser', 'assets/sprites/arrow.png');
    // game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);

}

var cursors;
var map;
var coins;
var player;

var layer;
var sprite;

function create() {

    game.physics.startSystem(Phaser.Game.ARCADE);
    game.physics.arcade.gravity.y = 800;

    var bg = game.add.tileSprite(0,0,1920,600,'fundo');
    //bg.fixedToCamera = true;
    
    map = game.add.tilemap('map');
    map.addTilesetImage('tileset','tileset');
    
    layer = map.createLayer('Camada de Tiles 1');
    layer.resizeWorld(); //seta o mundo com as alterações feitas
    map.setCollisionBetween(0,3, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset

    /* Creating player  */    
    player = game.add.sprite(50, game.height -180 , 'saci');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.gravity.y = 500;
    player.scale.set(0.5,0.5);
    player.body.collideWorldBounds = true;

    player.animations.add('walk', [0,1], 6, true);
    game.camera.follow(player);

    coxas = game.add.group();
    coxas.enableBody = true;
    map.createFromObjects('Camada de Objetos 1', 4, 'coxa', 0,true,false, coxas);
    coxas.forEach(function (coxa){ coxa.body.allowGravity = false}, this); // faz com que as coxas nao caiam

    /*
    //  Here we create our coins group
    coins = game.add.group();
    coins.enableBody = true;

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);

    //  Add animations to all of the coin sprites
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');

    sprite = game.add.sprite(260, 100, 'phaser');
    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    //  This adjusts the collision body size.
    sprite.body.setSize(32, 32, 16, 16);

    //  We'll set a lower max angular velocity here to keep it from going totally nuts
    sprite.body.maxAngular = 500;

    //  Apply a drag otherwise the sprite will just spin and never slow down
    sprite.body.angularDrag = 50;

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();*/

}

function update() {   

   game.physics.arcade.collide(player, layer);
   game.physics.arcade.overlap(coxas, player, eatCoxa, null,this);

   handleKeyDown();

}

function handleKeyDown() {
            
            // PEGA A ENTRADA (tecla pressionada):  
            if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para esquerda
                
                player.x += 10;
                player.animations.play('walk');

            } else if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
                
                player.x -= 10;
                player.animations.play('walk');

            } else {
                
                player.animations.stop();
                player.frame = 0;
                
            }

            if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para esquerda
                
                //console.log("press up: " + this.player.body.touching.down);

                if (player.body.onFloor()) {
                    player.animations.stop();
                    player.frame = 0;
                
                    player.body.velocity.y = -600;    
                }                
                
            } 
};

function eatCoxa (player, coxa){
    coxa.kill();
}

function render() {

    game.debug.body(player);

}