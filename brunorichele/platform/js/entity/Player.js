var PlayerProperties = {
    path : "assets/phase1/images/player_1200-100-15.png",
    width : 80,
    height : 100,
    frames : 15,
    idle : [0, 1, 2, 3, 4, 5, 6, 7],
    run : [0, 1, 2, 3, 4, 5, 6, 7],
    jump : [8, 9, 10, 11, 12, 13, 14],
    velRun : 250,
    velJump : -400
}

function Player(game) {
    this.game = game,
    this.player;
}

Player.prototype = {
    preload : function() {
        this.game.load.spritesheet('player', PlayerProperties.path, PlayerProperties.width, PlayerProperties.height, PlayerProperties.frames);
    },

    create : function() {
        this.player = this.game.add.sprite(100, 100, 'player');
        this.game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;
        this.player.body.collideWorldBounds = true;

        // animations
        this.player.animations.add('idle', PlayerProperties.idle, 10, true);
        this.player.animations.add('run', PlayerProperties.run, 10, true);
        this.player.animations.add('jump', PlayerProperties.jump, 10, false);

        this.game.camera.follow(this.player);
    },

    update : function(cursors) {
        if (cursors.left.isDown) {
            this.player.body.velocity.x = -PlayerProperties.velRun;
            this.player.scale.x = -1;
            this.player.animations.play('run');
        } else if (cursors.right.isDown) {
            this.player.body.velocity.x = PlayerProperties.velRun;
            this.player.scale.x = +1;
            this.player.animations.play('run');
        } else {
            this.player.animations.play('idle');
        }

        if (cursors.up.isDown /*&& this.player.body.onFloor()*/) {
            this.player.body.velocity.y = PlayerProperties.velJump;
            this.player.animations.play('jump');
        }
    }
}