var create = {
    space_key   : null,
    enemy_group : null,
    timer : null,
    arrows : null,
    nearBackground : null,
    farBackground : null,

    init : function(){
        //game defs
        game.world.setBounds(0, 0, 960, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        background = game.add.tileSprite(0, 0, 960, 800,  'background');
        background.autoScroll(-350, 0);


        //enemy defs
        this.enemy_group = game.add.group();
        this.enemyTimer = game.time.events.loop(2000, this.createEnemy, this);

        //input defs
        game.input.keyboard.addKeyCapture(
            [
                Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.R
            ]
        );
        this.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.space_key.onDown.add(this.jump, this);
        this.reset_key = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.reset_key.onDown.add(this.reset, this);

        // NPC defs
        this.npc_list = [
            'peixes1',
            'peixes2',
            'peixes3',
            'peixes4',
            'peixes5'
        ];

        // Timer NPCs: passando atrás do jogador
        this.npcTimer = game.time.events.loop(900, this.createNPC, this);
        this.npc_group = game.add.group();

        //player defs
        this.createPlayer();

        // Funcoes de interpolacao
        // Influenciam na movimentacao dos inimigos
        this.easingFunctions = [
            Phaser.Easing.Linear.In,
            Phaser.Easing.Quadratic.In,
            Phaser.Easing.Cubic.In,
            Phaser.Easing.Quartic.In,
            Phaser.Easing.Quintic.In,
        ]
    },
    createPlayer : function(){
        this.player = game.add.sprite(350, 200, 'pirarucu');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        this.player.body.gravity.y = 1000;
        this.player.body.setSize(140, 30, 0, 15);
        this.player.jumpForce = -500;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.alive = true;
        this.player.animations.add('swim', [0, 1, 2, 3], 10, true);
        this.player.animations.add('shock', [5, 6], 30, true);
        this.player.animations.play('swim');
        // anima����o de rota����o para cima, quando o jogador pula
        this.player.rotateAnim = game.add.tween(this.player).to({angle: -15}, 300);
        // adicionando player a classe update
        update.player = this.player;
    },

    createEnemy : function() {
        if(!this.player.alive) return;
        var enemyIndex = this.random(1, 3);
        var enemySpeedMultiplier = this.random(1, 9);
        var enemyEasingFunction = this.random(1, 5);
        switch(enemyIndex){
            case 1:
                this.createAriranha(enemySpeedMultiplier, enemyEasingFunction);
                break;
                case 2:
                    this.createArraia(enemySpeedMultiplier, enemyEasingFunction);
                break;
            case 3:
                this.createAnzol(enemySpeedMultiplier);
                break;
            default:
                this.createAriranha(enemySpeedMultiplier, enemyEasingFunction);
        }
    },

    //criacao dos inimigos
    createAnzol : function(enemySpeedMultiplier){
        var anzol = this.enemy_group.create(970, 0, 'anzol'); // criando do lado de fora
        game.physics.arcade.enable(anzol);
        anzol.enemyType = 'barco';
        anzol.body.setSize(64, 64, 160, 350);
        anzol.animations.add('swim', [0, 1], 5, true);
        anzol.animations.play('swim');
        anzol.body.velocity.x = -300 * (1 + enemySpeedMultiplier / 10);
        anzol.outOfBoundsKill = true;
    },
    createAriranha : function(enemySpeedMultiplier, easingIndex){
        var ariranha = this.enemy_group.create(1160, 190, 'ariranha'); // criando do lado de fora
        game.physics.arcade.enable(ariranha);
        ariranha.enemyType = 'ariranha';
        ariranha.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        ariranha.outOfBoundsKill = true;
        ariranha.anchor.setTo(0.5, 0.5);
        ariranha.animations.add('swim', [0, 1], 5, true);
        ariranha.animations.play('swim');
        game.add.tween(ariranha) //anima����o da ariranha descendo
            .to({y: 390, angle: -20}, 1000, this.easingFunctions[easingIndex], false, 500) // em 500ms, descer e apontar angulo para cima, levando 1000ms
            .to({y: 290, angle: 20}, 1000) // subir e apontar angulo para baixo, em 1000ms
            .to({y: 190, angle: 0}, 500) // voltar a altura normal, zerar angulo
            .start();
    },
    createArraia : function(enemySpeedMultiplier, easingIndex){
        var arraia = this.enemy_group.create(1160, 670, 'arraia'); // criando do lado de fora
        game.physics.arcade.enable(arraia);
        arraia.enemyType = 'arraia';
        arraia.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        arraia.outOfBoundsKill = true;
        arraia.anchor.setTo(0.5, 0.5);
        arraia.animations.add('swim', [0, 1, 2, 3], 5, true);
        arraia.animations.play('swim');
        game.add.tween(arraia) // anima����o da arraia subindo
            .to({y: 470, angle: 20}, 1000, this.easingFunctions[easingIndex], false, 500) // em 500ms, subir e apontar angulo para baixo, levando 1000ms
            .to({y: 570, angle: -20}, 1000) // descer e apontar angulo para cima, em 1000ms
            .to({y: 670, angle: 0}, 500) // voltar a altura normal, zerar angulo
            .start();
    },

    // criacao de NPCs
    createNPC : function(){
        var index = this.random(1, 5);
        var height = this.random(250, 750);
        var speedMultiplier = this.random(0, 5);
        var npc = this.npc_group.create(960, height, this.npc_list[index]);
        game.physics.arcade.enable(npc);
        //npc.body.velocity.x = -300 * (1 + speedMultiplier / 5);
        npc.body.velocity.x = -400;
        npc.x = 960 + npc.width;
        npc.animations.add('swim', [0, 1, 2, 3], 10, true);
        npc.animations.play('swim');
        npc.outOfBoundsKill = true;
    },

    jump: function() {
        if(this.player.alive) {
            this.player.body.velocity.y = this.player.jumpForce;
            this.player.rotateAnim.start();
        }
    },

    reset: function(){
        this.enemy_group.destroy(true);
        this.player.destroy();
        if(update.status) update.status.destroy();

        this.enemy_group = game.add.group();
        this.createPlayer();
    },

    // numero aleatorio entre [max, min]
    random: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
};
