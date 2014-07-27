var PlayerProperties = {
    path : "assets/spritesheets/player_4240-100-53.png",
    width : 80,
    height : 100,
    frames : 53,
    idle : 0,
    walk : [1, 2, 3, 4, 5, 6, 7, 8],
    run : [9, 10, 11, 12, 13, 14, 15, 16],
    jump : [17, 18, 19, 20, 21, 22, 23],
    velWalk : 250,
    explode : [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    burn : [45, 46, 47, 48, 49, 50, 51, 52],
    velRun : 400,
    velJump : -500
};

var PlayerState = {
    IDLE : 0,
    RUNNING : 1,
    JUMPING : 2,
    WALKING : 3
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

    create : function(x, y) {
        this.player = this.game.add.sprite(x, y, 'player');
        // animations
        //this.player.animations.add('idle', PlayerProperties.idle, 10, true);
        this.player.animations.add('run', PlayerProperties.run, 10, true);
        this.player.animations.add('walk', PlayerProperties.walk, 10, true);
        this.player.animations.add('jump', PlayerProperties.jump, 10, true);

        this.game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;
        this.player.body.collideWorldBounds = true;
		this.player.body.mass = 9999;
		/* this.player.body.setMaterial(playerMaterial);
		this.player.body.setCollisionGroup(playerCG);
    	this.player.body.collides([rockCG, enemyCG]);*/

        this.game.camera.follow(this.player);
    },

    update : function() {
        if(this.state == PlayerState.WALKING) {
            this.player.animations.play('walk');
        } else if(this.state == PlayerState.RUNNING) {
            this.player.animations.play('run');
        } else if(this.state == PlayerState.IDLE) {
            this.player.animations.stop();
            this.player.frame = PlayerProperties.idle;
        } else if(this.state == PlayerState.JUMPING) {
            this.player.animations.play('jump');
        }
    }
}