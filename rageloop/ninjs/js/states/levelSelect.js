
(function (app_container) {
    
    function LevelSelect() {

        this.levels = [
            {name: "Calabouço", scene: 'Level1', position: {x: 300, y: 300}},
            {name: "Torre", scene: 'Level2', position: {x: 500, y: 300}},
            {name: "Subaru Room", scene: 'Level3', position: {x: 700, y: 300}}
        ];

    };

    LevelSelect.prototype = {

        create: function () {
            
            this.bg = this.game.add.tileSprite(0, 0, 960, 600, 'background_level_select');
            this.bg.fixedToCamera = true;

            var style = { font: "36px pixelFont", fill: "#000000"};

            this.team = this.game.add.text(this.game.width / 2 , 50, 'Select Level', style);
            this.team.anchor.set(0.5, 0.5);

            this.returnbutton = this.game.add.button(790, 550, 'back_btn', this.onResetClick, this, 1, 0, 1);
            this.returnbutton.anchor.set(0.5, 0.5);

            for (var i = 0, amount = this.levels.length; i < amount; i++) {
                this.drawLevel(this.levels[i]);
            }

            this.clickAudio = this.game.add.audio('click');
        },

        drawLevel: function(levelInfo) {

            if (!levelInfo) {
                return -1;
            }

            var levelIcon = this.game.add.button(levelInfo.position.x, levelInfo.position.y, 'shuriken', function () {
                this.game.state.start(levelInfo.scene);
            }, this, 0, 0, 0);

            levelIcon.anchor.set(0.5, 0.5);

            var style = { font: "15px pixelFont", fill: "#000000"};

            this.team = this.game.add.text(levelInfo.position.x, levelInfo.position.y + 50, levelInfo.name, style);
            this.team.anchor.set(0.5, 0.5);

        },

        update: function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)) {
                this.onResetClick();
            }

        },

        onOpenLevel: function(level) {

            this.game.state.start(level);

        },

        onResetClick: function() {
            this.clickAudio.play();
            this.game.state.start('Menu');
        }
    };

    app_container.LevelSelect = LevelSelect;

}(window.app_container = window.app_container || {}));