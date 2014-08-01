/*global State, Config*/

State.Level2 = function (game) {
    "use strict";

    this.game = game;
    this.map = null;
    this.drop = null;
    this.crabs = null;
    this.shell = null;
    this.crabMaterial = null;
    this.groundMaterial = null;
    this.hotsandMaterial = null;
    this.mainLayer = null;
    this.hotSandLayer = null;
    this.irregularLayer = null;
    this.fakeplatform = null;
    this.haveEnergy = false;
    this.smokeTimer = null;
    this.dropIsInvincible = false;
    this.hotSandTimerActivated = null;
    this.energyState = null;
    this.restartState = null;
    this.acidgroup = null;
    this.smokeEmitter = null;
    this.timerEventRain = [];
    this.fakePositions = [];
    this.onAir = false;
    this.jumpKey = null;
    this.pauseKey = null;

    this.countCall = 0; //count how many times the collision function is called.
};
State.Level2.prototype = {
    preload: function () {
        "use strict";

        // Player
        try {
            this.drop = new Character(this.game, 'drop',
                    'assets/spritesheets/drop_4845-60.png', [51, 60],
                    hud.getDropCounter());
        } catch(exception) {
            console.log(exception.toString());
        }
        this.drop.preload();
    },
    create: function () {
        "use strict";
        this.timerEventRain = [];
        this.fakePositions = [];

        this.haveEnergy = false;
        this.onAir = false;
        this.hotSandTimerActivated = false;
        this.dropIsInvincible = false;
        this.energyState = false;
        this.restartState = false;
        this.winState = false;

        this.game.onPause.add(this.pauseGame, this);
        this.game.onResume.add(this.resumeGame, this);

        this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.add(this.jumpPlayer, this);

        this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.pauseKey.onDown.add(this.startPauseGameEvent, this);

        var background;
        background = this.game.add.tileSprite(0, 0, 4800, 600, 'gameplay-bg');
        background.fixedToCamera = true;

        this.map = this.game.add.tilemap('maplevel2');
        this.map.addTilesetImage('hotsand_40-40', 'hotsand');
        this.map.addTilesetImage('platform_160-80', 'platform');
        this.map.addTilesetImage('glass_280-320', 'glass');
        this.map.addTilesetImage('seashell_120-40', 'seashell');

        this.mainLayer = this.map.createLayer('mainlayer2');
        this.hotSandLayer = this.map.createLayer('hotsandlayer');
        this.irregularLayer = this.map.createLayer('irregularlayer');
        this.mainLayer.resizeWorld();

        this.setupPhysics();
        this.setupLayers();
        this.setupPlayer(100, 100);
        this.setupMolecule();
        this.setupAcidDrop();
        this.setupUmbrella(7625, 280);

        // falling acid rain
        this.timerEventRain[0] = game.time.events.loop(Phaser.Timer.SECOND,
                this.fallRain, this, 1360, 0);
        this.timerEventRain[1] = game.time.events.loop(Phaser.Timer.SECOND*1.2,
                this.fallRain, this, 2640, 0, 1);
        this.timerEventRain[2] = game.time.events.loop(Phaser.Timer.SECOND*1.3,
                this.fallRain, this, 2800, 0);
        this.timerEventRain[3] = game.time.events.loop(Phaser.Timer.SECOND*1.2,
                this.fallRain, this, 2960, 0, 3);
        this.timerEventRain[4] = game.time.events.loop(Phaser.Timer.SECOND*1.3,
                this.fallRain, this, 3120, 0);
        this.timerEventRain[5] = game.time.events.loop(Phaser.Timer.SECOND*1.2,
                this.fallRain, this, 3280, 0, 5);
        this.timerEventRain[6] = game.time.events.loop(Phaser.Timer.SECOND*1.6,
                this.fallRain, this, 6200, 0);
        this.timerEventRain[7] = game.time.events.loop(Phaser.Timer.SECOND*1.5,
                this.fallRain, this, 6600, 0, 7);
        this.timerEventRain[8] = game.time.events.loop(Phaser.Timer.SECOND*1.6,
                this.fallRain, this, 7040, 0);

        this.setupSmokeEmitter(1550, this.game.height-80);
        hud.create();

        // Sounds
        this.jumpSound = this.game.add.audio("jump");
        this.lifeSound = this.game.add.audio("life");
        this.mainSound = this.game.add.audio("main");
        this.powUpSound = this.game.add.audio("powup");
        this.loseSound = this.game.add.audio('lose');
        this.loseSound.onStop.add(this.restartGameState, this);
        this.winSound = this.game.add.audio('stageclear');
        this.winSound.onStop.add(this.nextLevel, this);
        this.mainSound.loop = true;
        this.mainSound.play();

        this.countCall = 0;
    },
    update: function () {
        "use strict";

        if (this.restartState || this.winState) {
            this.drop.getSpriteObject().body.velocity.x = 0;
            this.crabs.getAt(0).body.velocity.x = 0;
            this.crabs.getAt(1).body.velocity.x = 0;
            this.crabs.getAt(2).body.velocity.x = 0;
            this.crabs.getAt(3).body.velocity.x = 0;
            this.crabs.getAt(4).body.velocity.x = 0;
            this.crabs.getAt(5).body.velocity.x = 0;
            this.crabs.getAt(6).body.velocity.x = 0;
            return;
        }

        this.handleKeyDown();
        this.isOnAir();
        this.drop.playerAnimations();

        this.moveCrab(this.crabs.getAt(0), 330);
        this.moveCrab(this.crabs.getAt(1), 330);
        this.moveCrab(this.crabs.getAt(2), 330);
        this.moveCrab(this.crabs.getAt(3), 330);
        this.moveCrab(this.crabs.getAt(4), 290);
        this.moveCrab(this.crabs.getAt(5), 290);
        this.moveCrab(this.crabs.getAt(6), 290);

        if (this.haveEnergy) {
            this.smokeEmitter.x = this.drop.getSpriteObject().x;
            this.smokeEmitter.y = this.drop.getSpriteObject().y + 56;
        }
    },
    pauseGame: function() {
        hud.showPauseImage();
    },
    resumeGame: function() {
        "use strict";

        this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.add(this.jumpPlayer, this);

        this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.pauseKey.onDown.add(this.startPauseGameEvent, this);

        hud.hidePauseImage();
    },
    jumpPlayer: function() {
        if (this.game.paused == true || this.restartState || this.winState) {
            return;
        }

        if (this.touchingDown(this.drop.getSpriteObject().body)) {
            if (this.energyState == false) {
                this.drop.jump(700);
                this.jumpSound.play();
            } else {
                this.drop.jump(1500);
                this.jumpSound.play();
                this.smokeEmitter.start(false, 3000, 50);
                this.haveEnergy = true;
                var self = this;
                if (this.smokeTimer != null) {
                    this.smokeTimer.stop();
                }
                this.smokeTimer = this.game.time.create();
                this.smokeTimer.add(2000, function() {
                        self.stopSmoke();
                }, this);
                this.smokeTimer.start();
                this.energyState = false;
                this.drop.playerstate = 'normal';
            }
        }
    },
    startPauseGameEvent: function() {
        this.game.paused = !this.game.paused;
    },
    clearTimers: function() {
        if (this.lastDropTimer != null) {
            this.lastDropTimer.destroy();
        }
        if (this.disableSundropTimer != null) {
            this.disableSundropTimer.destroy();
        }
        if (this.decreaseDropTimer != null) {
            this.decreaseDropTimer.destroy();
        }
        if (this.smokeTimer != null) {
            this.smokeTimer.destroy();
        }
    },
    removeTimerRain: function() {
        for (var i = 0; i < this.timerEventRain.length; i++) {
            this.game.time.events.remove(this.timerEventRain[i]);
        }
    },
    handleKeyDown: function () {
        "use strict";

        if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
            if (!this.onAir) {
                this.drop.animestate = 'right';
            } else {
                this.drop.animestate = 'jumpright';
            }
            this.drop.moveRight(300);
        } else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            if (!this.onAir) {
                this.drop.animestate = 'left';
            } else {
                this.drop.animestate = 'jumpleft';
            }
            this.drop.moveLeft(300);
        }  else {
            this.drop.stop();
            this.drop.animestate = 'stop';
        }
    },
    setupSmokeEmitter: function(posX, posY) {
        // smoke animation
        // add smoke particles
        this.smokeEmitter = this.game.add.emitter(posX, posY, 100);
        this.smokeEmitter.gravity = 0;
        this.smokeEmitter.setXSpeed(-15, 15);
        this.smokeEmitter.setYSpeed(-80, -50);
        this.smokeEmitter.setAlpha(1, 0, 3000, Phaser.Easing.Linear.InOut);
        this.smokeEmitter.makeParticles('smoke');
    },
    setupPhysics: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;
        this.game.physics.defaultRestitution = 0;
        this.game.stage.smoothed = false;  // no antialiasing
        this.game.world.enableBodySleeping=true;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.updateBoundsCollisionGroup();

        // define collision group
        this.playerCG = game.physics.p2.createCollisionGroup();
        this.groundCG = game.physics.p2.createCollisionGroup();
        this.fakeCG = game.physics.p2.createCollisionGroup();
        this.crabCG = game.physics.p2.createCollisionGroup();
        this.moleculeCG = game.physics.p2.createCollisionGroup();
        this.energyCG = game.physics.p2.createCollisionGroup();
        this.urchinsCG = game.physics.p2.createCollisionGroup();
        this.hotsandCG = game.physics.p2.createCollisionGroup();
        this.glassCG = game.physics.p2.createCollisionGroup();
        this.acidCG = game.physics.p2.createCollisionGroup();
        this.umbrellaCG = game.physics.p2.createCollisionGroup();

        // Create and Setup Material
        this.characterMaterial = game.physics.p2.createMaterial('characterMaterial');
        this.crabMaterial = game.physics.p2.createMaterial('crabMaterial');
        this.groundMaterial = game.physics.p2.createMaterial('groundMaterial');
        this.hotsandMaterial = game.physics.p2.createMaterial('hotsandMaterial');

        // create contact material
        this.game.physics.p2.createContactMaterial(this.groundMaterial,
                this.crabMaterial, {friction: 0.0, restitution: 0.0});
        this.game.physics.p2.createContactMaterial(this.characterMaterial,
                this.groundMaterial, {friction: 0.0, restitution: 0.0});
        this.game.physics.p2.createContactMaterial(this.crabMaterial,
                this.hotsandMaterial, {friction: 0.0, restitution: 0.0});
        this.game.physics.p2.createContactMaterial(this.characterMaterial,
                this.slidingMaterial, {friction: 0.1, restitution: 0.0});
    },
    setupLayers: function () {
        this.tilesMainLayer = game.physics.p2.convertTilemap(this.map,
                this.mainLayer);
        this.tilesHotSandLayer = game.physics.p2.convertTilemap(this.map,
                this.hotSandLayer);

        this.tilesIrregularLayer = game.physics.p2.convertTilemap(this.map,
                this.irregularLayer);

        var basicShapes = game.physics.p2.convertCollisionObjects(this.map,
                'basic-shapes');
        var glassPolygon = game.physics.p2.convertCollisionObjects(this.map,
                'glass-polygon');

        //setup all tiles with collisiongroups or materials
        for (var i=0; i < this.tilesMainLayer.length; i++) {
            this.tilesMainLayer[i].setCollisionGroup(this.groundCG);
            this.tilesMainLayer[i].collides([this.playerCG, this.crabCG,
                    this.moleculeCG, this.acidCG]);
            this.tilesMainLayer[i].setMaterial(this.groundMaterial);
        }
        for (var i=0; i < this.tilesHotSandLayer.length; i++) {
            this.tilesHotSandLayer[i].setCollisionGroup(this.hotsandCG);
            this.tilesHotSandLayer[i].collides([this.playerCG, this.crabCG,
                    this.moleculeCG, this.groundCG]);
            this.tilesHotSandLayer[i].setMaterial(this.groundMaterial);
        }
        for (var i = 0; i < basicShapes.length; i++) {
            basicShapes[i].setCollisionGroup(this.groundCG);
            basicShapes[i].collides([this.playerCG, this.crabCG,this.moleculeCG,
                    this.energyCG]);
            basicShapes[i].setMaterial(this.groundMaterial);
        }
        for (var i = 0; i < glassPolygon.length; i++) {
            glassPolygon[i].setCollisionGroup(this.glassCG);
            glassPolygon[i].collides([this.playerCG]);
            glassPolygon[i].setMaterial(this.groundMaterial);
        }

        this.fakeplatform = game.add.group();
        this.fakeplatform.enableBody = true;
        this.fakeplatform.physicsBodyType = Phaser.Physics.P2JS;
        this.map.createFromObjects('fakeplatform', 74, 'fakeplatform', 0, true,
                false, this.fakeplatform);
        this.fakeplatform.forEach(this.setupFakePlatform, this);

        this.crabs = game.add.group();
        this.crabs.enableBody = true;
        this.crabs.physicsBodyType = Phaser.Physics.P2JS;
        this.map.createFromObjects('crab-objects', 10, 'crab', 0, true, false,
                this.crabs);
        this.crabs.forEach(this.setupCrab, this);

        this.urchins = game.add.group();
        this.map.createFromObjects('seaurchins', 72, 'urchin', 0, true, false,
                this.urchins);
        this.urchins.forEach(this.setupUrchins, this);
    },
    setupPlayer: function (posX, posY) {
        this.drop.create(posX, posY);
        var dropSprite = this.drop.getSpriteObject();
        this.game.camera.follow(dropSprite);
        this.game.physics.p2.enableBody(dropSprite, false);
        this.drop.setCharacterInicialValues();
        dropSprite.body.setMaterial(this.characterMaterial);
        dropSprite.body.setCollisionGroup(this.playerCG);
        dropSprite.body.collides([this.groundCG, this.crabCG, this.moleculeCG,
                this.energyCG, this.urchinsCG, this.hotsandCG, this.glassCG,
                this.acidCG, this.fakeCG, this.umbrellaCG]);
        // collide callbacks
        dropSprite.body.createGroupCallback(this.crabCG,
                this.checkOverlapCrabDrop, this);
        dropSprite.body.createGroupCallback(this.urchinsCG,
                this.checkCollisionUrchins, this);
        dropSprite.body.createGroupCallback(this.moleculeCG,
                this.checkOverlapWithLifeDrop, this);
        dropSprite.body.createGroupCallback(this.hotsandCG,
                this.killDrop, this);
        dropSprite.body.createGroupCallback(this.glassCG,
                this.playerLose, this);
        dropSprite.body.createGroupCallback(this.acidCG,
                this.acidHitPlayer, this);
        dropSprite.body.createGroupCallback(this.fakeCG,
                this.hitFakePlatform, this);
        dropSprite.body.createGroupCallback(this.umbrellaCG,
                this.startUmbrellaAnimation, this);

    },
    setupCrab: function() {
        for (var i = 0; i < this.crabs.length; i++) {
            this.crabs.getAt(i).body.fixedRotation = true;
            this.crabs.getAt(i).body.setCollisionGroup(this.crabCG);
            this.crabs.getAt(i).body.setMaterial(this.crabMaterial);
            this.crabs.getAt(i).animations.add('walkL', [0, 1, 2], 10, true);
            this.crabs.getAt(i).animations.add('walkR', [0, 1, 2], 10, true);
            this.crabs.getAt(i).body.collides([this.crabCG, this.playerCG,
                    this.groundCG, this.urchinsCG]);
        }
        this.crabs.getAt(0).body.moveLeft(350);
        this.crabs.getAt(1).body.moveRight(350);
        this.crabs.getAt(2).body.moveLeft(350);
        this.crabs.getAt(3).body.moveLeft(350);
        this.crabs.getAt(4).body.moveLeft(300);
        this.crabs.getAt(5).body.moveRight(300);
        this.crabs.getAt(6).body.moveLeft(300);
    },
    setupFakePlatform: function() {
        for (var i = 0; i < this.fakeplatform.length; i++) {
            this.fakeplatform.getAt(i).body.fixedRotation = true;
            this.fakeplatform.getAt(i).body.kinematic=true;
            this.fakeplatform.getAt(i).body.collideWorldBounds=false;
            this.fakeplatform.getAt(i).body.setCollisionGroup(this.fakeCG);
            this.fakeplatform.getAt(i).body.sprite.name = i;
            this.fakeplatform.getAt(i).body.setMaterial(this.groundMaterial);
            this.fakeplatform.getAt(i).body.collides([this.playerCG, this.acidCG]);
            this.fakePositions.push({x: this.fakeplatform.getAt(i).body.x,
                    y: this.fakeplatform.getAt(i).body.y});
        }
    },
    setupUrchins: function(urchin) {
        game.physics.p2.enable(urchin);
        urchin.body.setCollisionGroup(this.urchinsCG);
        urchin.body.static = true;
        urchin.body.sprite.name = 'urchin';
        urchin.body.collides([this.playerCG, this.crabCG]);
    },
    setupUmbrella: function(posX, posY) {
        this.umbrella = this.game.add.sprite(posX, posY, 'umbrella');
        this.game.physics.p2.enableBody(this.umbrella);
        this.umbrella.body.fixedRotation = true;
        this.umbrella.body.static = true;
        this.umbrella.body.setCollisionGroup(this.umbrellaCG);
        this.umbrella.body.collides([this.playerCG]);
        this.umbrella.animations.add('openUmbrella', [0, 1, 2], 10, false);
    },
    setupMolecule: function () {
        // Add a "life drop"
        this.molecule = game.add.group();
        this.molecule.enableBody = true;
        this.molecule.enableBodyDebug = true;
        this.molecule.physicsBodyType = Phaser.Physics.P2JS;

        this.molecule.create(1040, 150, 'lifedrop'); //lifedrop1
        this.molecule.create(1675, 190, 'lifedrop'); //lifedrop2
        this.molecule.create(3600, this.game.world.height-80, 'energy'); //energy1
        this.molecule.create(4200, this.game.world.height-120, 'energy'); //energy2
        // evildrop
        this.molecule.create(1990, 300, 'evildrop'); //evildrop1
        this.molecule.create(2115, 300, 'evildrop'); //evildrop2
        this.molecule.create(2195, 300, 'evildrop'); //evildrop3
        this.molecule.create(2320, 300, 'evildrop'); //evildrop4
        // life UP
        this.molecule.create(2960, 150, 'lifeup'); //1 life

        this.molecule.getAt(0).body.sprite.name='lifedrop';
        this.molecule.getAt(1).body.sprite.name='lifedrop';
        this.molecule.getAt(2).body.sprite.name='energy';
        this.molecule.getAt(3).body.sprite.name='energy';
        // evil drop
        this.molecule.getAt(4).body.sprite.name='evildrop';
        this.molecule.getAt(5).body.sprite.name='evildrop';
        this.molecule.getAt(6).body.sprite.name='evildrop';
        this.molecule.getAt(7).body.sprite.name='evildrop';

        this.molecule.getAt(8).body.sprite.name='lifeup';

        for (var i = 0; i < this.molecule.length; i++) {
            this.molecule.getAt(i).body.setCollisionGroup(this.moleculeCG);
            this.molecule.getAt(i).body.fixedRotation = true;
            this.molecule.getAt(i).body.static = true;
            if (this.molecule.getAt(i).body.sprite.name == 'evildrop') {
                // animation is different to evildrop
                this.molecule.getAt(i).animations.add('dropAnimation',[0, 1],
                        10, true);
            } else if (this.molecule.getAt(i).body.sprite.name != 'lifeup') {
                this.molecule.getAt(i).animations.add('dropAnimation',[0, 1, 2,
                        3, 4], 10, true);
            }
            this.molecule.getAt(i).animations.play('dropAnimation');
            this.molecule.getAt(i).body.collides([this.playerCG, this.groundCG,
                    this.fakeCG]);
            this.molecule.getAt(i).hasCollided = false;
        }
    },
    setupAcidDrop: function() {
        this.acidgroup = game.add.group();
        this.acidgroup.enableBody = true;
        this.acidgroup.physicsBodyType = Phaser.Physics.P2JS;
    },
    fallRain: function(posX, posY) {
        var aciddrop;
        aciddrop = this.acidgroup.create(posX, posY, 'aciddrop');
        aciddrop.body.collideWorldBounds=false;
        aciddrop.body.allowSleep=true;
        aciddrop.body.sprite.name = 'aciddrop';
        aciddrop.body.setCollisionGroup(this.acidCG);
        aciddrop.body.fixedRotation = true;
        aciddrop.body.collides([this.playerCG, this.groundCG, this.fakeCG]);
        // kill acid drop when collides to ground
        aciddrop.body.createGroupCallback(this.groundCG, this.collidesAcidRain,
                this);
        aciddrop.body.createGroupCallback(this.fakeCG, this.collidesAcidRain,
                this);
    },
    collidesAcidRain: function(body1, body2) {
        var timerAcidRain;
        timerAcidRain = this.game.time.create();
        body1.sprite.frame = 1;

        timerAcidRain.add(200, function() {
            var timerSplitAcid = this.game.time.create();
            body1.sprite.frame = 2;
            timerAcidRain.destroy();

            timerSplitAcid.add(100, function() {
                body1.sprite.kill();
                timerSplitAcid.destroy();
            }, this);
            timerSplitAcid.start();

        }, this);
        timerAcidRain.start();
    },
    acidHitPlayer: function(body1, body2) {
        var timerAcidRain;
        timerAcidRain = this.game.time.create();
        body2.sprite.frame = 1;

        timerAcidRain.add(200, function() {
            var timerSplitAcid = this.game.time.create();
            body2.sprite.frame = 2;
            timerAcidRain.destroy();

            timerSplitAcid.add(50, function() {
                body2.sprite.kill();
                this.playerLose();
                timerSplitAcid.destroy();
            }, this);
            timerSplitAcid.start();

        }, this);
        timerAcidRain.start();
    },
    checkOverlapCrabDrop: function (body1, body2) {
        // body1 is the drop, body2 is the crab.
        if (!this.touchingUp(body2)) {
            console.log('Matou o Player!!!!');
            this.playerLose();

            return true;
        }
        return false;
    },
    checkCollisionUrchins: function(body1, body2) {
        // body1 is the drop, body2 is the sea urchin.
        this.playerLose();

        return true;
    },
    checkOverlapWithLifeDrop: function (body1, body2) {
        // body1 is the drop; body2 is the life drop.
        if (!body2.hasCollided) {
            if (body2.sprite.name == 'lifedrop') {
                console.log('Player get the life drop!!!!');
                this.powUpSound.play();
                hud.increaseDropBar();
                body2.sprite.kill();
                body2.hasCollided = true;
                this.drop.playersize = 'big';
            } else if (body2.sprite.name == 'energy') {
                this.drinkEnergy(body1, body2);
            } else if (body2.sprite.name == 'evildrop') {
                this.hitEvilDrop(body1, body2);
            } else if (body2.sprite.name == 'lifeup') {
            	this.lifeSound.play();
                hud.increaseLife();
                body2.sprite.kill();
            }
            return true;
        }

        return false;
    },
    hitEvilDrop: function(body1, body2) {
        var timerEvilDrop = this.game.time.create();
        if (hud.getDropCounter() > 0) {
            hud.decreaseDropBar();
            if (hud.getDropCounter() == 0){
                this.drop.playersize = 'small';
            }
        } else if(hud.getDropCounter() == 0) {
            if (timerEvilDrop != null) {
                timerEvilDrop.destroy();
                timerEvilDrop = null;
            }
            this.playerLose();
            return;
        }
        // stop animation
        body2.sprite.animations.stop();
        body2.sprite.frame = 2;
        timerEvilDrop.add(2000, function() {
            body2.sprite.animations.play('dropAnimation');
            timerEvilDrop.destroy();
            if (this.touchingUp(body2) || this.touchingLeft(body2) ||
                    this.touchingRight(body2)) {
                this.hitEvilDrop(body1, body2);
            } else {
                return;
            }
        }, this);
        timerEvilDrop.start();
    },
    hitFakePlatform: function(body1, body2) {
        var timerFakeFall = this.game.time.create();
        var timerBackPlatform;
        timerFakeFall.add(1500, function() {
            timerBackPlatform = this.game.time.create();
            body2.velocity.y=240;
            timerFakeFall.destroy();
            timerBackPlatform.add(4000, function() {
                body2.velocity.y=0;
                body2.sprite.reset(this.fakePositions[body2.sprite.name].x,
                        this.fakePositions[body2.sprite.name].y);
                timerBackPlatform.destroy();
            }, this);
            timerBackPlatform.start();
        }, this);
        timerFakeFall.start();
    },
    drinkEnergy: function(body1, body2) {
        console.log('Player get the energy drop!!!!');

        this.energyState = true;
        this.drop.playerstate = 'energy';
    },
    killDrop: function (body1, body2) {
        if (this.dropIsInvincible || this.restartState) {
            return;
        }

        this.countCall++;
        if (this.countCall == 1 && !this.hotSandTimerActivated) {
            console.log('moreeeeeeeeeeeeeeeeeu!!! killlDrop');
            if (this.drop.playersize == 'big') {
                hud.decreaseDropBar();
                this.haveEnergy = true;
                this.smokeEmitter.on = true;
                this.smokeEmitter.start(false, 3000, 50);
                var stopSmokeTimer = this.game.time.create();
                stopSmokeTimer.add(2000, function() {
                    stopSmokeTimer.destroy();
                    this.smokeEmitter.on = false;
                }, this);
                stopSmokeTimer.start();
                var self = this;
                if (hud.getDropCounter() == 0) {
                    this.lastDropTimer = this.game.time.create();
                    this.lastDropTimer.add(2000, function() {
                        self.hotSandTimerActivated = false;
                        if (self.map.getTileWorldXY(body1.x, body1.y + 23, 40,
                                40, self.hotSandLayer)) {
                            self.playerLose();
                        }
                        self.countCall = 0;
                    }, this);
                    this.lastDropTimer.start();
                    this.drop.playersize = 'small';
                    this.hotSandTimerActivated = true;
                } else {
                    this.decreaseDropTimer = this.game.time.create();
                    this.decreaseDropTimer.add(2000, function() {
                        self.hotSandTimerActivated = false;
                        self.countCall = 0;
                        if (self.map.getTileWorldXY(body1.x, body1.y + 23, 40,
                                40, self.hotSandLayer)) {
                            self.killDrop(body1, null);
                        }
                    }, this);
                    this.decreaseDropTimer.start();
                    this.hotSandTimerActivated = true;
                }
            } else if (this.drop.playersize == 'small') {
                this.playerLose();
            }
        }
        if (this.countCall == 2) {
            this.countCall = 0;
        }
    },
    stopSmoke: function() {
        this.haveEnergy = false;
        this.smokeEmitter.on = false;
        this.smokeTimer.destroy();
    },
    playerLose: function () {
        if (this.restartState == false) {
            this.restartState = true;
            this.clearTimers();
            this.removeTimerRain();
            this.mainSound.stop();
            this.smokeEmitter.kill();
            this.hotSandTimerActivated = false;
            this.drop.animestate = 'evaporate';
            this.drop.playerAnimations();
            this.loseSound.play();
        }
    },
    restartGameState: function() {
        this.drop.kill();
        hud.initDropCounter();
        hud.decreaseLife();
        if (hud.getLifeCounter() == 0) {
            this.game.state.start('gameover-state');
        } else {
            this.game.state.restart();
        }
    },
    nextLevel: function() {
        this.game.onPause.remove(this.pauseGame, this);
        this.game.onResume.remove(this.resumeGame, this);
        this.pauseKey.onDown.remove(this.startPauseGameEvent, this);
        this.jumpKey.onDown.remove(this.jumpPlayer, this);
        this.game.state.start('ending-state');
    },
    startUmbrellaAnimation: function(body1, body2) {
        if (this.winState == false) {
            this.winState = true;
            this.clearTimers();
            this.removeTimerRain();
            var umbrellaSprite = body2.sprite;
            umbrellaSprite.animations.play('openUmbrella');
            this.drop.animestate = 'stop';
            this.drop.playerAnimations();
            this.mainSound.stop();
            this.winSound.play();
        }
    },
    touchingDown: function (someone) {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;
        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === someone.data || c.bodyB === someone.data)        {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === someone.data){d *= -1;}
                if (d > 0.5){result = true;}
            }
        } return result;
    },
    touchingUp: function (someone) {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;
        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === someone.data || c.bodyB === someone.data)        {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === someone.data){d *= -1;}
                if (d < -0.5){result = true;}
            }
        } return result;
    },
    touchingLeft: function (someone) {
        var xAxis = p2.vec2.fromValues(1,0);
        var result = false;
        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === someone.data || c.bodyB === someone.data)        {
                var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
                if (c.bodyA === someone.data){d *= -1;}
                if (d < -0.5){result = true;}
            }
        } return result;
    },
    touchingRight: function (someone) {
        var xAxis = p2.vec2.fromValues(1,0);
        var result = false;
        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === someone.data || c.bodyB === someone.data)        {
                var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
                if (c.bodyA === someone.data){d *= -1;}
                if (d > 0.5){result = true;}
            }
        } return result;
    },
    isOnAir: function () {
        if( this.touchingDown(this.drop.getSpriteObject().body) ||
            this.touchingUp(this.drop.getSpriteObject().body)   ||
            this.touchingLeft(this.drop.getSpriteObject().body) ||
            this.touchingRight(this.drop.getSpriteObject().body)) {
                this.onAir = false;
        } else {
            this.onAir = true;
        }
    },
    moveCrab: function (crab, velocity) {
        if (crab.name == "crab1") {
            if (this.touchingLeft(crab.body)) {
                crab.body.moveRight(velocity);
                crab.animations.play('walkR');
            } else if (this.touchingRight(crab.body)) {
                crab.body.moveLeft(velocity);
                crab.animations.play('walkL');
            } else {
            }
        } else {
            if (this.touchingRight(crab.body)) {
                crab.body.moveLeft(velocity);
                crab.animations.play('walkL');
            } else if (this.touchingLeft(crab.body)) {
                crab.body.moveRight(velocity);
                crab.animations.play('walkR');
            }
        }
    },
};

