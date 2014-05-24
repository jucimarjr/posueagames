BasicGame.Obstacle = function (gameManager, group) {
    this.gameManager = gameManager;
    this.topSprite;
    this.topLabel;
    this.bottomSprite;
    this.bottomLabel;
    this.group = group;

    this._spriteWidth = 165;
    this._spriteHeight = 486;
};

BasicGame.Obstacle.defaultVelocity = -3;
BasicGame.Obstacle.velocity = BasicGame.Obstacle.defaultVelocity;
BasicGame.Obstacle.Type = {
	Default: 0,
	Hard: 1
}

BasicGame.Obstacle.prototype = {
    create: function (type) {
    	var frameName;

    	if (type === BasicGame.Obstacle.Type.Hard) {
    		frameName = 'columnHard_165-486.png';
    	} else {
    		frameName = 'columnDefault_165-486.png';
    	}

        // this.topSprite = this.group.create(0, 0, 'mainGameAtlas');
        this.topSprite = this.gameManager.add.sprite(0, 0, 'mainGameAtlas');
        this.topSprite.frameName = frameName;
        // this.bottomSprite = this.group.create(0, 0, 'mainGameAtlas');
        this.bottomSprite = this.gameManager.add.sprite(0, 0, 'mainGameAtlas');
        this.bottomSprite.frameName = frameName;

        this.topSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite.anchor.setTo(0.5, 0.5);

        // Physics code!
        this.gameManager.game.physics.p2.enableBody(this.topSprite, BasicGame.GameManager.debugDraw);
        this.gameManager.game.physics.p2.enableBody(this.bottomSprite, BasicGame.GameManager.debugDraw);
        
        // this.topSprite.body.mass = 0;
		// this.topSprite.body.motionState = 2;

		// this.bottomSprite.body.mass = 0;
		// this.bottomSprite.body.motionState = 2;

		this.topSprite.body.rotation = Math.PI;
        this.topSprite.body.kinematic = true;
        this.bottomSprite.body.kinematic = true;
        
        this.topSprite.body.collideWorldBounds = false;
        this.bottomSprite.body.collideWorldBounds = false;

  //       this.topSprite.body.setCollisionGroup(this.gameManager.obstaclesCollisionGroup);
  //       this.bottomSprite.body.setCollisionGroup(this.gameManager.obstaclesCollisionGroup);

		// this.topSprite.body.collides(this.gameManager.playerCollisionGroup);
  //       this.bottomSprite.body.collides(this.gameManager.playerCollisionGroup);
        
        // this.topSprite.body.gravity.y = 0;
        // this.bottomSprite.body.gravity.y = 0;

        this.topSprite.name = 'obstacle';
        this.bottomSprite.name = 'obstacle';

        // this.topSprite.body.onBeginContact.add(this.onBeginContact, this);
        // this.bottomSprite.body.onBeginContact.add(this.onBeginContact, this);
        
        // this.topSprite.body.collidesWith.push(Phaser.Physics.P2.everythingCollisionGroup);
        // this.bottomSprite.body.collidesWith.push(Phaser.Physics.P2.everythingCollisionGroup);

        // Create labels!
        var topLabelPosX = 0;
        var topLabelPosY = -170;
        this.topLabel = this.gameManager.add.bitmapText(topLabelPosX, 
        												topLabelPosY, 	
        												'hud_default');
        this.topLabel.fontSize = 22;
        this.topLabel.text = 'regular \n date';
        this.topLabel.align = 'center';
        this.topLabel.updateText();
        this.topLabel.x = this.topLabel.textWidth / 2.0 - 4;
        this.topLabel.angle = 180;

        this.topLabel.parent = this.topSprite;

        var bottomLabelPosX = 0;
        var bottomLabelPosY = -215;
        this.bottomLabel = this.gameManager.add.bitmapText(bottomLabelPosX, 
        												   bottomLabelPosY, 	
        												   'hud_default');
        this.bottomLabel.fontSize = 22;
        this.bottomLabel.text = 'regular \n date';
        this.bottomLabel.align = 'center';
        this.bottomLabel.updateText();
        this.bottomLabel.x = -this.bottomLabel.textWidth / 2.0 + 4;

        this.bottomLabel.parent = this.bottomSprite;
    },

    setUp: function (x, y, gapHeight, labelText) {
        this.topSprite.body.x = x;
        this.topSprite.body.y = y - gapHeight / 2.0 - this._spriteHeight / 2.0;

        this.bottomSprite.body.x = x;
        this.bottomSprite.body.y = y + gapHeight / 2.0 + this._spriteHeight / 2.0;

        // this.topLabel
    },

    update: function () {
        var velocity = BasicGame.Obstacle.velocity;
        this.topSprite.body.x += velocity;
        this.bottomSprite.body.x += velocity;

        // var velocity = BasicGame.Obstacle.velocity;
        //this.topSprite.body.moveLeft(velocity);
        // this.bottomSprite.body.velocity.x = -velocity;
    },
 
    x: function (value) {
        if (value === undefined)
            return this.topSprite.x;
        
        this.topSprite.x = value;
        this.bottomSprite.x = value;
    },

    y: function (value) {
        if (value === undefined)
            return this.topSprite.y;
        
        this.topSprite.y = value;
        this.bottomSprite.y = value;
    },

    spriteWidth: function () {
        return this._spriteWidth;
    },

    // onBeginContact: function () {
    // 	console.log("block onBeginContact");
    // }
};