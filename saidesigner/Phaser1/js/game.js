
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create });

function preload () {
         game.load.image('ceu'       , 'assets/sky.png');
         game.load.image('plataforma', 'assets/plataform.png');
}

function create () {

         game.add.sprite(0,0, "ceu");
         
         plataformas = game.add.group();
         
         plataformas.enablebody = true;
         
         var chao = plataformas.create(0, game.word.heigth - 64, 'plataformas');
         
         chao.scale.setTo(2,2);
         
         cha.body.imovable = true;
         
}
