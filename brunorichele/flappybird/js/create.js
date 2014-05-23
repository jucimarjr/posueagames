var create = {
    space_key   : null,
    enemy_group : null,
    timer : null,
    arrows : null,
    nearBackground : null,
    farBackground : null,

    init : function(){
        //game defs
        game.world.setBounds(0, 0, 960, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        farBackground = game.add.tileSprite(0, 0, 960, 600,  'background');
        farBackground.autoScroll(-200, 0);

        nearBackground = game.add.tileSprite(0, game.world.height - 100, 960, 100, 'river');
        nearBackground.autoScroll(-400, 0);

        //player defs
        this.createPlayer();

        //enemy defs
        this.enemy_group = game.add.group();

        //input defs
        this.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.space_key.onDown.add(this.jump, this);
        this.reset_key = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.reset_key.onDown.add(this.reset, this);

        // timer defs
        this.enemyTimer = game.time.events.loop(2000, this.createEnemy, this);

        // misc
        this.easingFunctions = [
            Phaser.Easing.Linear.In,
            Phaser.Easing.Quadratic.In,
            Phaser.Easing.Cubic.In,
            Phaser.Easing.Quartic.In,
            Phaser.Easing.Quintic.In,
        ]
    },
    createPlayer : function(){
        this.player = game.add.sprite(200, 423, 'pirarucu');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        this.player.body.gravity.y = 1000;
        this.player.jumpForce = -500;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.alive = true;
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
        var anzol = this.enemy_group.create(970, -100, 'anzol'); // criando do lado de fora
        game.physics.arcade.enable(anzol);
        anzol.body.velocity.x = -300 * (1 + enemySpeedMultiplier / 10);
        anzol.outOfBoundsKill = true;
    },
    createAriranha : function(enemySpeedMultiplier, easingIndex){
        var ariranha = this.enemy_group.create(1160, 170, 'ariranha'); // criando do lado de fora
        game.physics.arcade.enable(ariranha);
        ariranha.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        ariranha.outOfBoundsKill = true;
        ariranha.anchor.setTo(0.5, 0.5);
        game.add.tween(ariranha) //anima����o da ariranha descendo
            .to({y: 370, angle: -20}, 1000, this.easingFunctions[easingIndex], false, 500) // em 500ms, descer e apontar angulo para cima, levando 1000ms
            .to({y: 270, angle: 20}, 1000) // subir e apontar angulo para baixo, em 1000ms
            .to({y: 170, angle: 0}, 500) // voltar a altura normal, zerar angulo
            .start();
    },
    createArraia : function(enemySpeedMultiplier, easingIndex){
        var arraia = this.enemy_group.create(1160, 570, 'arraia'); // criando do lado de fora
        game.physics.arcade.enable(arraia);
        arraia.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        arraia.outOfBoundsKill = true;
        arraia.anchor.setTo(0.5, 0.5);
        game.add.tween(arraia) // anima����o da arraia subindo
            .to({y: 370, angle: 20}, 1000, this.easingFunctions[easingIndex], false, 500) // em 500ms, subir e apontar angulo para baixo, levando 1000ms
            .to({y: 470, angle: -20}, 1000) // descer e apontar angulo para cima, em 1000ms
            .to({y: 570, angle: 0}, 500) // voltar a altura normal, zerar angulo
            .start();
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
        update.status.destroy();

        this.enemy_group = game.add.group();
        this.createPlayer();
    },

    // numero aleatorio entre [max, min]
    random: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
};
