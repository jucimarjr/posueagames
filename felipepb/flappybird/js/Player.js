BasicGame.Player = function (gameManager) {
    this.gameManager = gameManager;
    this.ship;
    this.leftThrusters;
    this.bottomThrusters;
    this.blockInput = false;
    this.keyboard = gameManager.game.input.keyboard;
    this.appliedJumpForce = false;

    this.currentAnim = 'none';
    this.explode = false;
    this.deathX;
    this.deathY;

    this._leftMargin = 60 + BasicGame.Player.frameWidth / 2.0;
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

        this.ship.x = this._leftMargin;
        this.ship.body.x = this._leftMargin;
        this.ship.body.velocity.x = 0.0;

        if (this.explode) {
            this.ship.x = this.deathX;
            this.ship.y = this.deathY;
            this.gameManager.game.physics.p2.clear();
        }
    },

    createShip: function () {
        var cameraHeight = this.gameManager.camera.height;
        var ship = this.gameManager.add.sprite(this._leftMargin,
                                               cameraHeight / 2.0,
                                               'mainGameAtlas');

        ship.frameName = 'ship_64-80.png';
        ship.smoothed = false;
        ship.anchor.setTo(0.5, 0.5);

        // Physics code!
        this.gameManager.game.physics.p2.enableBody(ship, BasicGame.GameManager.debugDraw);

        ship.body.clearShapes();
        ship.body.loadPolygon('physicsData', 'ship');
        ship.body.fixedRotation = true;
        ship.body.collideWorldBounds = true;
        // ship.body.collidesWith.push(Phaser.Physics.P2.everythingCollisionGroup);

        // ship.body.setCollisionGroup(this.gameManager.playerCollisionGroup);
        // ship.body.collides(this.gameManager.obstaclesCollisionGroup);

        // ship.body.onBeginContact.add(this.onShipBeginContact, this);

        ship.name = 'player';

        this.ship = ship;
    },

    createThrusters: function() {
        
        var leftThrustersAnimationFrames = [
            'ship_left-thrusters_1.png',
            'ship_left-thrusters_2.png'
        ];

        this.leftThrusters = this.gameManager.add.sprite(0, 0, 'mainGameAtlas');
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

        this.bottomThrusters = this.gameManager.add.sprite(0, 0, 'mainGameAtlas');
        this.bottomThrusters.parent = this.ship;
        this.bottomThrusters.anchor.setTo(0.5, 0.0);
        this.bottomThrusters.x += 17;
        this.bottomThrusters.y += 8;

        var anim = this.bottomThrusters.animations.add(
            'openThrusters', bottomThrustersOpenAnimationFrames, 10, false
        );
        anim.onComplete.add(this.onThrustersOpenned, this);

        anim = this.bottomThrusters.animations.add(
            'closeThrusters', bottomThrustersCloseAnimationFrames, 10, false
        );
        anim.onComplete.add(this.onThrustersClosed, this);

        this.bottomThrusters.animations.add('loopThrusters', bottomThrustersLoopAnimationFrames, 10, true);
        this.gameManager.hideSprite(this.bottomThrusters);
    },

    playExplodeAnimation: function () {
        var animationFrames = [];

        for (var i = 0; i <= 13; i++) {
            animationFrames.push('explosion' + i + '_148-158.png');
        }

        var anim = this.ship.animations.add('explode', animationFrames, 10, false);
        anim.onComplete.add(this.onExplosionAnimationFinished, this);
        this.ship.animations.play('explode');
        this.gameManager.hideSprite(this.leftThrusters);
        this.gameManager.hideSprite(this.bottomThrusters);
    },

    playThrustersOpenAnimation: function () {
        // console.log('open');
        this.gameManager.showSprite(this.bottomThrusters);
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
        this.gameManager.hideSprite(this.bottomThrusters);
    },

    onShipBeginContact: function () {
        console.log('begin contact');
    },

    onExplosionAnimationFinished: function () {
        this.gameManager.hideSprite(this.ship);
        // TODO: call game over screen.
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
        this.explode = true;
        this.deathX = this.ship.x;
        this.deathY = this.ship.y;
        this.ship.body.velocity.x = 0;
        this.ship.body.velocity.y = 0;
        this.ship.body.gravity.y = 0;
        this.playThrustersCloseAnimation();
        this.playExplodeAnimation();
    }, 

    clamp: function (x, min, max) {
        return x < min ? min : (x > max ? max : x);
    }
};