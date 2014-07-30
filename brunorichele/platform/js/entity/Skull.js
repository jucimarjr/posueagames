function Skull(game) {
    this.game = game;
}

var TypeSkulls = {
    easy : 0,
    medium : 1,
    hard : 2
};

Skull.prototype = {
    preload : function() {
        this.game.load.spritesheet('skull', 'assets/phase2/enemy/skull_260-41-4.png', 65, 41);
    },
    create : function(mymap) {
        skulls = this.game.add.group();
        skulls.enableBody = true;
        mymap.createFromObjects('skulls', 5, 'skull', 0, true, false, skulls);

        skulls.callAll('animations.add', 'animations', 'default', [0, 1], 4, true);
        skulls.callAll('animations.play', 'animations', 'default');

        var i;
        for(i = 0; i < skulls.children.length; i++) {
            this.game.add.tween(skulls.children[i]).to({y : skulls.children[i].body.y - 80}, 800, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
        }
    },
    update : function(player) {
        var i;
        for(i = 0; i < skulls.children.length; i++) {
            skull = skulls.children[i];
            if (player.player.body.x > skull.body.x) {
                skull.body.velocity.x = 30;
                skull.scale.x = -1;
            } else if (player.player.body.x < skull.body.x) {
                skull.body.velocity.x = -30;
                skull.scale.x = +1;
            }
            if (this.checkCollision(player.player, skull)) {
                player.state = PlayerState.BURNING;
            }
        }
    },
    checkCollision : function(player, skull) {
        var playerBounds = player.getBounds();
        var skullBounds = skull.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, skullBounds);
    }
}