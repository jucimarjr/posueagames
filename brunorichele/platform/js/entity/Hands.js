function Hands(game) {
    this.game = game;
}

Hands.prototype = {
    preload : function() {
        this.game.load.spritesheet('hands', 'assets/phase2/enemy/hands_166-56-2.png', 83, 56);
    },
    create : function(mymap) {
        manyHands = this.game.add.group();
        manyHands.enableBody = true;
        mymap.createFromObjects('hands', 2, 'hands', 0, true, false, manyHands);

        manyHands.callAll('animations.add', 'animations', 'default', [0,1], 8, true);
        manyHands.callAll('animations.play', 'animations', 'default');
    },
    update : function(player) {
        var i;
        for(i = 0; i < manyHands.children.length; i++) {
            hands = manyHands.children[i];
            if (this.checkGrab(player.player, hands)) {
                player.state = PlayerState.CAUGHT;
            }
        }
    },
    checkGrab : function(player, hands) {
        var playerBounds = player.getBounds();
        var handsBounds = hands.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, handsBounds);
    }
}