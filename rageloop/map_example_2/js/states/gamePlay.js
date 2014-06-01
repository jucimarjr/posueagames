(function (app_container) {
    
    function Gameplay() {

        this.bg = null;
        this.map = null;
        this.layer = null;
        this.player = null;

    };
    
    Gameplay.prototype = {

        create: function () {
            
            this.game.physics.startSystem(Phaser.Game.ARCADE);
            //this.game.physics.arcade.gravity.y = 800;

            var bg = this.game.add.tileSprite(0, 0, 960, 600, 'bg');
            bg.fixedToCamera = true;
            
            
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('tileset','tileset');
            
            this.layer = this.map.createLayer('Camada de Tiles 1');
            this.layer.resizeWorld(); //seta o mundo com as alterações feitas
            this.map.setCollisionBetween(1, 6, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset

            this.platforms = this.game.add.group();
            this.platforms.create(0, 500, 'platform');
            this.platforms.create(0, 800, 'platform');
            this.platforms.enableBody = true;
            this.game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
            this.platforms.setAll("body.immovable", true);
            this.platforms.forEach(function (item){ 
                item.body.collideWorldBounds = true;
                item.body.velocity.x = 100;
                item.body.bounce.set(0.8);
            }, this);


            /* Creating player  */    
            this.player = this.game.add.sprite(50, 960 , 'saci');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.gravity.y = 800;
            this.player.scale.set(0.5,0.5);
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('walk', [0,1], 6, true);
            this.game.camera.follow(this.player);
            
            this.game.camera.y += 600;

        },

        update: function() {

            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.platforms, this.layer);
            this.game.physics.arcade.collide(this.player, this.platforms);

            this.handleKeyDown();

        },
        
        handleKeyDown: function() {
           
            if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) { // vai para esquerda

                this.player.x += 10;
                this.player.animations.play('walk');

            } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
                
                this.player.x -= 10;
                this.player.animations.play('walk');

            } else {
                
                this.player.animations.stop();
                this.player.frame = 0;
                
            }

            if ( this.game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para esquerda

                if (this.player.body.onFloor() || this.player.body.touching.down) {
                    this.player.animations.stop();
                    this.player.frame = 0;
                
                    this.player.body.velocity.y = -600;    
                }                
                
            } 
        }
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));