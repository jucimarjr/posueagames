BasicGame.Obstacle = function (gameManager, group) {
    this.gameManager = gameManager;
    this.topSprite;
    this.topLabel;
    this.bottomSprite;
    this.bottomLabel;
    this.group = group;
    this.lightningSprite;

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

		this.topSprite.body.rotation = Math.PI;
        this.topSprite.body.kinematic = true;
        this.bottomSprite.body.kinematic = true;
        
        this.topSprite.body.collideWorldBounds = false;
        this.bottomSprite.body.collideWorldBounds = false;

        this.topSprite.name = 'obstacle';
        this.bottomSprite.name = 'obstacle';

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

        // Create lightning
        this.lightningSprite = this.gameManager.add.sprite(0, 0, 'lightningAtlas');
        // this.lightningSprite.anchor.setTo(0.5, 1.0);
        this.gameManager.game.physics.p2.enableBody(this.lightningSprite, BasicGame.GameManager.debugDraw);
        this.lightningSprite.body.kinematic = true;
        this.lightningSprite.body.y = -this._spriteHeight / 2.0 - 100;
        // this.lightningSprite.parent = this.bottomSprite;

        this.playLightningAnimation();
    },

    playLightningAnimation: function () {
        var animationFrames = [];

        for (var i = 1; i <= 6; i++) {
            animationFrames.push('lightning_0' + i + '.png');
        }

        var anim = this.lightningSprite.animations.add('idle', animationFrames, 30, true);
        this.lightningSprite.animations.play('idle');
    },

    setUp: function (x, y, gapHeight, missionEvent, type) {
        this.topSprite.body.x = x;
        this.topSprite.body.y = y - gapHeight / 2.0 - this._spriteHeight / 2.0;

        this.bottomSprite.body.x = x;
        this.bottomSprite.body.y = y + gapHeight / 2.0 + this._spriteHeight / 2.0;

        var frameName;

    	if (type === BasicGame.Obstacle.Type.Hard) {
    		frameName = 'columnHard_165-486.png';
    		this.lightningSprite.tint = 0xff0011;
    		this.lightningSprite.name = 'trigger_unique_event';
    	} else {
    		frameName = 'columnDefault_165-486.png';
    		this.lightningSprite.tint = 0xffffff;
    		this.lightningSprite.name = 'trigger_default_event';
    	}

    	this.gameManager.showSprite(this.lightningSprite);

    	this.topSprite.frameName = frameName;
        this.bottomSprite.frameName = frameName;

        this.topLabel.text = missionEvent.name;
        this.topLabel.updateText();
        this.topLabel.x = this.topLabel.textWidth / 2.0 - 4;

        this.bottomLabel.text = missionEvent.name;
        this.bottomLabel.updateText();
        this.bottomLabel.x = -this.bottomLabel.textWidth / 2.0 + 4;

        this.lightningSprite.body.missionEvent = missionEvent;
        this.lightningSprite.body.trigered = false;
        this.lightningSprite.body.x = x;
        this.lightningSprite.body.y = y;
    },

    update: function () {
        var velocity = BasicGame.Obstacle.velocity;
        this.topSprite.body.x += velocity;
        this.bottomSprite.body.x += velocity;
        this.lightningSprite.body.x += velocity;
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

    hideSprite: function (sprite) {
        sprite.scale.x = 0.0;
        sprite.scale.y = 0.0;
    },

    showSprite: function (sprite) {
        sprite.scale.x = 1.0;
        sprite.scale.y = 1.0;
    },

    spriteWidth: function () {
        return this._spriteWidth;
    }
};