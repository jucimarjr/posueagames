(function (app_container) {

    var introText = [
        " ",
        "- Finalmente encontrei você Subaru!", 
        "- HAHAHA!! Você vai se arrepender por isso!!\n Idiota! Você mal vai conseguir ficar em pé.."        
    ];

    function Level3() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background';
        this.mapAsset = 'map3';
        this.audioAsset = 'bgsound';

        this.playerX = 40*10;
        this.playerY = 40*5;

        this.hasShadow = false;

        this.itemCount = 0;
        this.totalItems = 8;

        this.nextLevel = '';

        this.runningIntro = false;

        this.storyLine = '';
        this.storyLineIndex = 0;
    };

    Level3.prototype = new app_container.Level();

    Level3.prototype.createEnemies = function () {
        this.boss = new Boss(this.game, this.player);
        this.boss.init(40*22, 40*10);
    };

    Level3.prototype.openEscape = function () {
    };

    Level3.prototype.playIntro = function () {
        var tween;

        this.runningIntro = true;

        this.versus_img = this.game.add.sprite(0, 0, 'versus');
        this.versus_img.alpha = 0;

        tween = this.game.add.tween(this.versus_img).to({alpha : 1}, 800, Phaser.Easing.Linear.None);
        tween.start();

        var style = { font: "22px pixelFont", fill: "#ffffff"};

        this.ryokanSpeechText = this.game.add.text(400, 180, '', style);
        this.subaruSpeechText = this.game.add.text(30, 380, '', style);

        this.nextLine();
    };

    Level3.prototype.exitIntro = function () {

        tween = this.game.add.tween(this.versus_img).to({alpha : 0}, 800, Phaser.Easing.Linear.None);
        tween.start();

        this.ryokanSpeechText.destroy();
        this.subaruSpeechText.destroy();

        this.runningIntro = false;
    };

    Level3.prototype.nextLine = function() {

        this.storyLineIndex++;

        if (this.storyLineIndex % 2) {
            this.currentText = this.ryokanSpeechText;
        } else {
            this.currentText = this.subaruSpeechText;
        }

        if (this.storyLineIndex < introText.length) {
            this.storyLine = '';
            this.game.time.events.repeat(80, introText[this.storyLineIndex].length + 1, this.updateLine, this);
        } else {
            this.exitIntro();
        }

    };

    Level3.prototype.updateLine = function() {

        if (this.storyLine.length < introText[this.storyLineIndex].length) {
            this.storyLine = introText[this.storyLineIndex].substr(0, this.storyLine.length + 1);
            this.currentText.setText(this.storyLine);
        }
        else {
            //  Wait 2 seconds then start a new line
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
        }

    };

    app_container.Level3 = Level3;

}(window.app_container = window.app_container || {}));