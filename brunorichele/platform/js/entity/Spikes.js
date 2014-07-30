function Spikes(game) {
    this.game = game;
}

Spikes.prototype = {
    preload : function() {
        this.game.load.image('spikes', 'assets/phase3/map/espinhos_56-75.png');
    },
    create : function(mymap) {
        manySpikes = this.game.add.group();
        manySpikes.enableBody = true;
        mymap.createFromObjects('spikes', 4, 'spikes', 0, true, false, manySpikes);

        var i;
        for(i = 0; i < manySpikes.children.length; i++) {
            spikes = manySpikes.children[i];
            spikes.startY = spikes.body.y;
            this.game.add.tween(spikes).to({y : spikes.body.y + 65}, 1000, Phaser.Easing.Cubic.InOut, true, 500, Number.MAX_VALUE, true);
        }
    },
    update : function(player) {
        var i;
        for (i = 0; i < manySpikes.children.length; i++) {
            spikes = manySpikes.children[i];
            if (this.checkCollision(player.player, spikes) && (spikes.body.y < spikes.startY + 45)) {
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