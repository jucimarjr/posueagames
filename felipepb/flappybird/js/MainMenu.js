BasicGame.MainMenu = function (game) {
    this.player;
    this.beloved;
    this.currentBitmapText;
    this.playButton;
};

BasicGame.MainMenu.backspaceKey = 8;
BasicGame.MainMenu.tabKey = 9;
BasicGame.MainMenu.maximumPlayerNameLength = 11;
BasicGame.MainMenu.playerName = '';
BasicGame.MainMenu.belovedName = '';

BasicGame.MainMenu.prototype = {

    create: function () {
        var self = this;
        var cameraWidth = this.game.camera.width;
        var cameraHeight = this.game.camera.height;
        this.add.sprite(0, 0, 'splashWithName');
        
        this.player = this.game.add.bitmapText(55, cameraHeight - 212, 'silkscreenblue', '', 40);
        this.beloved = this.game.add.bitmapText(55, cameraHeight - 90, 'silkscreenblue', '', 40);
        this.currentBitmapText = this.player;
        
        this.player.text = new String('');
        this.beloved.text = new String('');
        
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = function (args) {
            self.handleTextFieldsInput(args);
        };
        
        this.playButton = this.game.add.button(cameraWidth - 417, cameraHeight - 210,
                                               'playbutton',
                                               this.onPlayButtonClicked,
                                               this,
                                               'buttonPlayHover_314-66.png',
                                               'buttonPlayNone_314-66.png',
                                               'buttonPlayActive_314-66.png');
    },
    
    handleTextFieldsInput: function (args) {
        var player = this.player;
        var beloved = this.beloved;
        var keyCode = args.keyCode;
        var letter = String.fromCharCode(keyCode);
        var maximumNameLength = BasicGame.MainMenu.maximumPlayerNameLength;
        //console.log('key: ' + keyCode);
        
        if (keyCode == BasicGame.MainMenu.backspaceKey) {
            this.currentBitmapText.text = this.currentBitmapText.text.substr(0, this.currentBitmapText.text.length - 1);
        } else if (keyCode == BasicGame.MainMenu.tabKey) {
            this.currentBitmapText = this.currentBitmapText == player ? beloved : player;
            if (this.currentBitmapText == player) {
                console.log('player');
            } else {
                console.log('beloved');
            }
        } else {
            this.currentBitmapText.text += letter.toLowerCase();
        }
        
        this.currentBitmapText.text = this.currentBitmapText.text.substr(0, maximumNameLength);
        
        args.preventDefault();  
    },
    
    onPlayButtonClicked: function (button) {
        var playerName = this.player.text ? this.player.text.trim() : null;
        var belovedName = this.beloved.text ? this.beloved.text.trim() : null;

        if (!playerName || playerName.length == 0) {
            alert('Enter your name');
            this.currentBitmapText = this.player;
        } else if (!belovedName || belovedName.length == 0) {
            alert('Enter your beloved name');
            this.currentBitmapText = this.beloved;
        } else {
            BasicGame.MainMenu.playerName = playerName;
            BasicGame.MainMenu.belovedName = belovedName;
            this.state.start('GameManager');
        }
    }
};