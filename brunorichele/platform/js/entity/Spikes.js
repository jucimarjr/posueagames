function Spikes(game) {
    this.game = game;
}

var SpikeState = {
    STATIC : 0, TWEEN : 1
};

Spikes.prototype = {
    preload : function() {
        this.game.load.image('spikes', 'assets/phase3/map/espinhos_56-75.png');
    },
    create : function(mymap, state) {
        manySpikes = this.game.add.group();
        manySpikes.enableBody = true;
        mymap.createFromObjects('spikes', 4, 'spikes', 0, true, false, manySpikes);

        if(state == SpikeState.TWEEN) {
            var i;
            for(i = 0; i < manySpikes.children.length; i++) {
                this.game.add.tween(manySpikes.children[i]).to({y : manySpikes.children[i].body.y + 85}, 1000, Phaser.Easing.Cubic.InOut, true, 500, Number.MAX_VALUE, true);
            }
        }
    },
    update : function(player) {
        var i;
        for (i = 0; i < manySpikes.children.length; i++) {
            spikes = manySpikes.children[i];
            if (this.checkCollision(player.player, spikes)) {
                player.state = PlayerState.BURNING;
            }
        }
    },
    checkCollision : function(player, spikes) {
        var playerBounds = player.getBounds();
        var spikesBounds = spikes.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, spikesBounds);
    }
}