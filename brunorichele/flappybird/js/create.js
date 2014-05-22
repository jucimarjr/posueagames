var create = {
    space_key   : null,
    enemy_group : null,
    timer : null,
    arrows : null,
    tilesprite : null,
    tilespritedois : null,

    
    init : function(){
        //game defs
        game.world.setBounds(0, 0, 960, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
      //  game.add.sprite(0,0,'background');

        // background
        // TODO: parallax background     
        //Tentativa de parallax background
        
    	tilesprite = game.add.tileSprite(0, 0, 960,600,  'background');
    	tilesprite.autoScroll(-200, 0);

    	tilespritedois = game.add.tileSprite(0, 500, 960, 100, 'river');
    	tilespritedois.autoScroll(-100, 0);
        

        //player defs
        this.createPlayer();

        //enemy defs
        this.enemy_group = game.add.group();

        //input defs
        this.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.space_key.onDown.add(this.jump, this);

        // timer defs
        this.enemyTimer = game.time.events.loop(3000, this.createEnemy, this);
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
        switch(enemyIndex){
            case 1:
                this.createAriranha(enemySpeedMultiplier);
                break;
            case 2:
                this.createArraia(enemySpeedMultiplier);
                break;
            case 3:
                this.createAnzol(enemySpeedMultiplier);
                break;
            default:
                this.createAriranha(enemySpeedMultiplier);
        }
    },

    //criacao dos inimigos
    createAnzol : function(enemySpeedMultiplier){
        var anzol = this.enemy_group.create(970, 0, 'anzol'); // criando do lado de fora
        game.physics.arcade.enable(anzol);
        anzol.body.velocity.x = -300 * (1 + enemySpeedMultiplier / 10);
        anzol.outOfBoundsKill = true;
    },
    createAriranha : function(enemySpeedMultiplier){
        var ariranha = this.enemy_group.create(1160, 170, 'ariranha'); // criando do lado de fora
        game.physics.arcade.enable(ariranha);
        ariranha.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        ariranha.outOfBoundsKill = true;
        ariranha.anchor.setTo(0.5, 0.5);
        game.add.tween(ariranha) //anima����o da ariranha descendo
            .to({y: 370, angle: -20}, 1000, null, false, 500) // em 500ms, descer e apontar angulo para cima, levando 1000ms
            .to({y: 270, angle: 20}, 1000) // subir e apontar angulo para baixo, em 1000ms
            .to({y: 170, angle: 0}, 500) // voltar a altura normal, zerar angulo
            .start();
    },
    createArraia : function(enemySpeedMultiplier){
        var arraia = this.enemy_group.create(1160, 570, 'arraia'); // criando do lado de fora
        game.physics.arcade.enable(arraia);
        arraia.body.velocity.x = -300* (1 + enemySpeedMultiplier / 10);
        arraia.outOfBoundsKill = true;
        arraia.anchor.setTo(0.5, 0.5);
        game.add.tween(arraia) // anima����o da arraia subindo
            .to({y: 370, angle: 20}, 1000, null, false, 500) // em 500ms, subir e apontar angulo para baixo, levando 1000ms
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

    // numero aleatorio entre [max, min]
    random: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
};