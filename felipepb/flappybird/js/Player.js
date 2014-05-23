BasicGame.Player = function (gameManager) {
    this.gameManager = gameManager;
    this.ship;
    this.leftThrusters;
    this.bottomThrusters;
    this.blockInput = false;
    this.keyboard = gameManager.game.input.keyboard;
    this.appliedJumpForce = false;

    this.currentAnim = 'none';

    this._leftMargin = 50 + BasicGame.Player.frameWidth / 2.0;
};

BasicGame.Player.frameWidth = 84;
BasicGame.Player.thrustersKey = Phaser.Keyboard.SPACEBAR;

BasicGame.Player.prototype = {
    create: function () {
        this.createShip();
        this.createThrusters();

        this.ship.body.force.y = BasicGame.GameManager.thrusterForce;
        this.playThrustersOpenAnimation();
    },

    update: function () {
        this.handleInput();
    },

    createShip: function () {
        var cameraHeight = this.gameManager.camera.height;
        var ship = this.gameManager.add.sprite(this._leftMargin,
                                               cameraHeight / 2.0,
                                               'shipAtlas');

        ship.frameName = 'ship_64-80.png';
        ship.smoothed = false;
        ship.anchor.setTo(0.5, 0.5);

        // Physics code!
        this.gameManager.game.physics.p2.enableBody(ship, BasicGame.GameManager.debugDraw);
        
        ship.body.clearShapes();
        ship.body.loadPolygon('physicsData', 'ship');
        ship.body.fixedRotation = true;
        ship.body.collideWorldBounds = true;
        // ship.body.static = true;

        this.ship = ship;
    },

    createThrusters: function() {
        
        var leftThrustersAnimationFrames = [
            'ship_left-thrusters_1.png',
            'ship_left-thrusters_2.png'
        ];

        this.leftThrusters = this.gameManager.add.sprite(0, 0, 'shipAtlas');
        this.leftThrusters.parent = this.ship;
        this.leftThrusters.anchor.setTo(1.0, 0.5);
        this.leftThrusters.x -= 10;
        this.leftThrusters.animations.add('leftThrusters', leftThrustersAnimationFrames, 10, true);
        this.leftThrusters.animations.play('leftThrusters');

        var bottomThrustersOpenAnimationFrames = [
            'ship_bottom-thrusters_1.png',
            'ship_bottom-thrusters_2.png'
        ];

        var bottomThrustersCloseAnimationFrames = [
            'ship_bottom-thrusters_2.png',
            'ship_bottom-thrusters_1.png'
        ];

        var bottomThrustersLoopAnimationFrames = [
            'ship_bottom-thrusters_3.png',
            'ship_bottom-thrusters_4.png'
        ];

        this.bottomThrusters = this.gameManager.add.sprite(0, 0, 'shipAtlas');
        this.bottomThrusters.parent = this.ship;
        this.bottomThrusters.anchor.setTo(0.5, 0.0);
        this.bottomThrusters.x += 17;
        this.bottomThrusters.y += 8;

        var openThrustersOnCompleteSignal = new Phaser.Signal();
        openThrustersOnCompleteSignal.add(this.onThrustersOpenned, this);

        var closeThrustersOnCompleteSignal = new Phaser.Signal();
        closeThrustersOnCompleteSignal.add(this.onThrustersClosed, this);        

        var anim = this.bottomThrusters.animations.add(
            'openThrusters', bottomThrustersOpenAnimationFrames, 10, false
        );
        anim.onComplete = openThrustersOnCompleteSignal;

        anim = this.bottomThrusters.animations.add(
            'closeThrusters', bottomThrustersCloseAnimationFrames, 10, false
        );
        anim.onComplete = closeThrustersOnCompleteSignal;

        this.bottomThrusters.animations.add('loopThrusters', bottomThrustersLoopAnimationFrames, 10, true);
        this.hideSprite(this.bottomThrusters);
    },

    playThrustersOpenAnimation: function () {
        // console.log('open');
        this.showSprite(this.bottomThrusters);
        this.currentAnim = 'openThrusters';
        this.bottomThrusters.animations.play('openThrusters');
    },

    playThrustersCloseAnimation: function () {
        // console.log('close');
        this.currentAnim = 'closeThrusters';
        this.bottomThrusters.animations.play('closeThrusters');
    },    

    onThrustersOpenned: function () {
        this.currentAnim = 'loopThrusters';
        this.bottomThrusters.animations.play('loopThrusters');
    },

    onThrustersClosed: function () {
        this.currentAnim = 'none';
        this.hideSprite(this.bottomThrusters);
    },

    hideSprite: function (sprite) {
        sprite.scale.x = 0.0;
        sprite.scale.y = 0.0;
    },

    showSprite: function (sprite) {
        sprite.scale.x = 1.0;
        sprite.scale.y = 1.0;
    },

    handleInput: function () {
        if (this.blockInput)
            return;

        var keyboard = this.keyboard;
        var thrustersKey = BasicGame.Player.thrustersKey;
        var hasInput = keyboard.isDown(thrustersKey);

        if (hasInput) {
            this.ship.body.force.y = BasicGame.GameManager.thrusterForce;

            if (this.currentAnim != 'openThrusters' && 
                this.currentAnim != 'loopThrusters') {
                
                this.playThrustersOpenAnimation();
            }

        } else {
            this.ship.body.force.y = 0.0;

            if (this.currentAnim != 'closeThrusters' && 
                this.currentAnim != 'none') {
                
                this.playThrustersCloseAnimation();
            }
        }
    },

    onPlayerCollided: function () {
        this.blockInput = true;
        this.ship.body.allowGravity = false;
        this.ship.body.velocity.y = 0.0;
    }, 

    clamp: function (x, min, max) {
        return x < min ? min : (x > max ? max : x);
    }
};