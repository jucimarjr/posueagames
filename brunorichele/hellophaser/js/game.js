var HelloPhaser = {
    preload: function () {
        game.load.image('background', 'assets/bg_960-600.png');
        game.load.image('bloco', 'assets/bloco_100-50.png');
        game.load.image('estrela', 'assets/estrela_30-30.png');
        game.load.image('porta', 'assets/porta_60-100.png');
        // animacao do jogador
        game.load.spritesheet('jogador', 'assets/spritejogador_357-77-7.png', 51, 77);
    },

    create: function() {
        this.bg = game.add.sprite(0, 0, 'background');
        this.blocos = [[27, 336], [127, 336], [227, 286], [327, 236], [479, 236], [579, 286], [679, 336]];
        this.estrela = game.add.sprite(362, 189, 'estrela');
        this.porta = game.add.sprite(49,236,'porta');
        this.jogador = game.add.sprite(450, 423, 'jogador');
        this.jogador.animations.add('walk', [1, 2, 3, 4, 5, 6, 7], 10, true);
        for(var i = 0; i < this.blocos.length; i++){
            this.blocos[i] = game.add.sprite(this.blocos[i][0], this.blocos[i][1], 'bloco');
        }
    },

    update: function(){
        this.jogador.animations.play('walk');
    }
};
