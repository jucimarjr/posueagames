(function (app_container) {

    var introText = [
        " ",
        "- Finalmente encontrei você Subaru!", 
        "- HAHAHA!! Você vai se arrepender por isso!!\n Idiota! Você mal vai conseguir ficar em pé.."
    ];

    function Level3() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background_boss';
        this.mapAsset = 'map3';
        this.audioAsset = 'bgsound';

        this.playerX = 40*10;
        this.playerY = 40*5;

        this.hasShadow = false;

        this.itemCount = 0;
        this.totalItems = 0;

        this.nextLevel = 'EndScene';

        this.runningIntro = true;

        this.storyLine = '';
        this.storyLineIndex = 0;
    };

    Level3.prototype = new app_container.Level();

    Level3.prototype.createEnemies = function () {

        window.app_container.currentLevel = "Level3";

        this.boss = new Boss(this.game, this.player);
        this.boss.init(40*22, 40*10);
    };

    Level3.prototype.openEscape = function () {
    };

    Level3.prototype.playIntro = function () {

        var self = this;

        setTimeout(function(){

            var tween;

            self.runningIntro = true;
            self.storyLineIndex = 0;

            self.versus_img = self.game.add.sprite(0, 0, 'versus');
            self.versus_img.alpha = 0;

            tween = self.game.add.tween(self.versus_img).to({alpha : 1}, 800, Phaser.Easing.Linear.None);
            tween.start();

            var style = { font: "22px pixelFont", fill: "#ffffff"};

            self.ryokanSpeechText = self.game.add.text(400, 180, '', style);
            self.subaruSpeechText = self.game.add.text(30, 380, '', style);

            self.skipText = self.game.add.text(self.game.width, self.game.height, 'pressione "S" para sair.', style); 
            self.skipText.anchor.setTo(1, 1);

            self.nextLine();

        }, 1000);

    };

    Level3.prototype.exitIntro = function () {

        if (!this.versus_img) {
            return;
        }

        this.game.tweens.removeAll();

        tween = this.game.add.tween(this.versus_img).to({alpha : 0}, 800, Phaser.Easing.Linear.None);
        tween.start();

        this.ryokanSpeechText.destroy();
        this.subaruSpeechText.destroy();
        this.skipText.destroy();

        this.runningIntro = false;
    };

    Level3.prototype.nextLine = function() {

        if (!this.runningIntro) {
            return;
        }

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

        if (!this.runningIntro) {
            return;
        }

        if (this.storyLine.length < introText[this.storyLineIndex].length) {
            this.storyLine = introText[this.storyLineIndex].substr(0, this.storyLine.length + 1);
            if (this.currentText) {
                this.currentText.setText(this.storyLine);
            }
        }
        else {
            //  Wait 2 seconds then start a new line
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
        }

    };

    app_container.Level3 = Level3;

}(window.app_container = window.app_container || {}));