BasicGame.PlayerController = function (gameState) {
    this.gameState = gameState;
    this.sprite;
};

BasicGame.PlayerController.prototype = {
    create: function () {
        this.sprite = this.gameState.game.add.sprite(0, 0, 'player');
        this.sprite.anchor.setTo(0.5, 1.0);
        this.sprite.x = 225;
        this.sprite.y = 100;
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;

        this.gameState.registerBody(this.sprite);
    },

    update: function () {
  
    },

    handleInput: function () {
        if (this.blockInput)
            return;
    }
};