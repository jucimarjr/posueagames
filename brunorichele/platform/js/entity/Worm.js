function Worm(game) {
    this.game = game;
}

Worm.prototype = {
    preload : function() {
        this.game.load.spritesheet('worm', 'assets/phase3/map/vermes_240-18-3.png', 80, 18);
    },
    create : function(mymap) {
        worms = this.game.add.group();
        worms.enableBody = true;
        mymap.createFromObjects('worms', 7, 'worm', 0, true, false, worms);

        var i;
        for (i = 0; i < worms.children.length; i++) {
            worms.children[i].scale.setTo(.5, .5);
        }

        worms.callAll('animations.add', 'animations', 'default', [0, 1, 2], 4, true);
        worms.callAll('animations.play', 'animations', 'default');
    },
    update : function(player) {
        var i;
        for (i = 0; i < worms.children.length; i++) {
            worm = worms.children[i];
            if (player.player.body.x > worm.body.x) {
                worm.body.velocity.x = 20;
                worm.scale.x = +1;
            } else if (player.player.body.x < worm.body.x) {
                worm.body.velocity.x = -20;
                worm.scale.x = -1;
            }
            if (this.checkCollision(player.player, worm)) {
                player.state = PlayerState.BURNING;
            }
        }
    },
    checkCollision : function(player, worm) {
        var playerBounds = player.getBounds();
        var wormBounds = worm.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, wormBounds);
    }
}