var preload = {
    init : function(){
        // jogador
        game.load.spritesheet('pirarucu', 'assets/pirarucu_1400-60-7.png', 200, 60);
        // inimigos
        game.load.spritesheet('anzol', 'assets/barco_1500-531-3.png', 500, 531);
        game.load.spritesheet('ariranha', 'assets/ariranha_600-72-3.png', 200, 72);
        game.load.spritesheet('arraia', 'assets/arraia_800-100-4.png', 200, 100);
        //fundo
        game.load.image('background', 'assets/bg_4000-800.jpg');
        //peixes no fundo
        //game.load.spritesheet('peixes1', 'assets/peixes1_800-100-4.png', 200, 100);
        game.load.spritesheet('peixes2', 'assets/peixes2_220-25-4.png', 55, 25);
        game.load.spritesheet('peixes3', 'assets/peixes3_220-25-4.png', 55, 25);
        game.load.spritesheet('peixes4', 'assets/peixes4_240-60-4.png', 60, 60);
        game.load.spritesheet('peixes5', 'assets/peixes5_220-25-4.png', 55, 25);

        // botoes para game over
        game.load.image('botaoinicio', 'assets/botaoinicio_150-120.png ');
        game.load.image('botaojogar', 'assets/botaojogar_150-120.png ');
        game.load.image('placapontos', 'assets/pontos_600-600.png');

        // musica do jogo
        game.load.audio('bgmusic', 'assets/In my own place.mp3');
    }
};
