var PlayerProperties = {
    path : "assets/phase1/images/player_1200-100-15.png",
    width : 80,
    height : 100,
    frames : 15,
    idle : 14,
    run : [0, 1, 2, 3, 4, 5, 6, 7],
    jump : [8, 9, 10, 11, 12, 13, 14],
    velRun : 250,
    velJump : -400
};

var PlayerState = {
    IDLE : 0,
    RUNNING : 1,
    JUMPING : 2
};

function Player(game) {
    this.game = game,
    this.player,
    this.jumpTimer = 0,
    this.state = PlayerState.IDLE;
};

Player.prototype = {
    preload : function() {
        this.game.load.spritesheet('player', PlayerProperties.path, PlayerProperties.width, PlayerProperties.height);
    },

    create : function() {
        this.player = this.game.add.sprite(50, 1600, 'player');
        // animations
        //this.player.animations.add('idle', PlayerProperties.idle, 10, true);
        this.player.animations.add('run', PlayerProperties.run, 10, true);
        this.player.animations.add('jump', PlayerProperties.jump, 10, true);

        this.game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;
        this.player.body.collideWorldBounds = true;
		this.player.body.mass = 9999;

        this.game.camera.follow(this.player);
    },

    update : function() {
        if(this.state == PlayerState.RUNNING) {
            this.player.animations.play('run');
        } else if(this.state == PlayerState.IDLE) {
            this.player.animations.stop();
            this.player.frame = 14;
        } else if(this.state == PlayerState.JUMPING) {
            console.log('jump animation');
            this.player.animations.play('jump');
        }
    }
}