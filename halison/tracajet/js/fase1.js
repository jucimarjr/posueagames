
var tracajet, star, plataform, map,layer;

var game = new Phaser.Game(600, 1920, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function preload () {

    game.load.tilemap('mapa','assets/mapaFase1.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height); // 200x160 eh o tamanho do frame da sprite
    //game.load.image('star',  Config.game.star.dir);
    //game.load.image('block', Config.game.tileset.dir);
    game.load.image('bg',"assets/bg2_600-1920.png");
    game.load.image('tilesetRocha1','assets/rocha_120-40.png');
}

function create () {


    var bg = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('bg').height, 'bg');
    //bg.fixedToCamera = true;

    game.physics.startSystem(Phaser.Game.ARCADE);

    map = game.add.tilemap('mapa');//adicionando o map
    map.addTilesetImage('rocha_120-40.png','tilesetRocha1' );// primeiro vem nome do arquivo, depois o apelido

    layer = map.createLayer('Camada de Tiles 1');
    layer.resizeWorld(); //seta o mundo com as alterações feitas
    map.setCollisionBetween(1,12, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset




    tracajet = game.add.sprite(100, 100, 'tracajet');
    tracajet.animations.add('walk',[0,1,2,1],6,false);
    tracajet.animations.add('swim',[5,6,7],6,false);
    tracajet.animations.add('startSwim',[3,4],4,true);
    game.physics.enable(tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico



    tracajet.body.acceleration.y = 20;
    tracajet.body.collideWorldBounds = true;
    //tracajet.body.drag.x = 700;
    tracajet.anchor.setTo(.5,.5);
    //tracajet.body.gravity.y = 150;
    game.camera.follow(tracajet);


//    star = game.add.group();
//    star.create( 500, 50, 'osso');
//    game.physics.enable(star, Phaser.Physics.ARCADE);
//
//    plataform = game.add.group();
//    plataform.enableBody = true;

//    //cria um bloco para o dino ficar em cima
//    var block = plataform.create(350, 250, 'bloco');
//    block.body.immovable = true;

}


function update () {

    game.physics.arcade.collide(tracajet, layer);

    game.physics.arcade.overlap(tracajet, star, tracajetEatStar,null,this);

    if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
        tracajet.body.velocity.x = -100;
        tracajet.animations.play('walk');
        tracajet.scale.x = -1;
    }
    else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
        tracajet.body.velocity.x = 100;
        tracajet.scale.x = +1;  // espelha se antes 1
        tracajet.animations.play('walk');
    }
    else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

        tracajet.body.velocity.y = -100;
//		tracajet.animations.play('jump');
        }
    else if ( game.input.keyboard.isDown (Phaser.Keyboard.DOWN) ) { // vai para cima

        tracajet.body.velocity.y = 100;
//		tracajet.animations.play('jump');
    }
    else{
        tracajet.animations.stop();
        tracajet.frame = 0;
    }
}

function tracajetEatStar (dino, star)	{
    star.kill();
}

