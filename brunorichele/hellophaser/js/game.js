var HelloPhaser = {
    preload: function () {
        game.load.image('background', 'assets/bg_960-600.png');
        game.load.image('bloco', 'assets/bloco_100-50.png');
        game.load.image('estrela', 'assets/estrela_30-30.png');
        game.load.image('porta', 'assets/porta_60-100.png');
        // animacao do jogador
        game.load.spritesheet('jogador', 'assets/jogador_306-77-6.png', 51, 77);
    },

    create: function() {
        this.bg = game.add.sprite(0, 0, 'background');
        this.blocos = [[27, 336], [127, 336], [227, 286], [327, 236], [479, 236], [579, 286], [679, 336]];
        this.estrela = game.add.sprite(362, 189, 'estrela');
        this.porta = game.add.sprite(49,236,'porta');
        this.jogador = game.add.sprite(450, 423, 'jogador');

        this.jogador.animations.add('jump', [0, 1, 2, 1, 0], 10, true);
        this.jogador.animations.add('walk', [3, 4, 5, 4, 3], 10, true);
        this.blockGroup = game.add.group();
        game.physics.enable(this.blockGroup);
        this.blockGroup.enableBody = true;
        for(var i = 0; i < this.blocos.length; i++){
            this.blocos[i] = this.blockGroup.create(this.blocos[i][0], this.blocos[i][1], 'bloco');
            this.blocos[i].body.immovable = true;
        }

        game.physics.enable(this.jogador, Phaser.Physics.ARCADE);
        this.jogador.body.gravity.y = 1000;
        this.jogador.body.collideWorldBounds = true;
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function(){ 
        game.physics.arcade.collide(this.jogador, this.blockGroup);

            if(this.cursors.left.isDown){
                //mover para a esquerda
                this.jogador.body.velocity.x = -150;
                this.jogador.animations.play('walk');
            }
            else if(this.cursors.right.isDown){
                // mover para a direira
                this.jogador.body.velocity.x = 150;
                this.jogador.animations.play('walk');
            }
            else {
                this.jogador.animations.stop();
                this.jogador.body.velocity.x = 0;
                this.jogador.frame = 2;
            }
        
        // se nenhuma das teclas for pressionada, parar sprite
        //else this.jogador.body.velocity.x = 0;

        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            //this.jogador.body.velocity.y = -250;
            this.jogador.frame = 1;
        }
        else if(game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR)) {
            this.jogador.body.velocity.y = -250;
            this.jogador.frame = 2;
        }
    },

    moonwalk: function() {
        if(this.jogador.x <= 0) { 
            this.jogador.body.velocity.x = 200;
            this.jogador.scale.x = -1;
        }
        else if(this.jogador.x - this.jogador.width >= 960 - this.jogador.width) {
            this.jogador.body.velocity.x = -200;
            this.jogador.scale.x = 1;
        }
    }
};
