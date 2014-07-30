function FinalDoor(game) {
    this.game = game,
    this.listener;
}

FinalDoor.prototype = {
    preload : function() {
        this.game.load.spritesheet('finaldoor', 'assets/phase3/map/doorfinal__880-120-11.png', 80, 120);
    },
    create : function(listener, x, y) {
        this.listener = listener;
        door = this.game.add.sprite(x, y, 'finaldoor');
        door.animations.add('default', [0, 1, 2, 3, 4, 5]);
        finishAnim = door.animations.add('finish', [6, 7, 8, 9, 10]);
        finishAnim.onStart.add(this.finishAnimStart, this);
        finishAnim.onComplete.add(this.finishAnimComplete, this);

        door.animations.play('default', 6, true);
    },
    update : function(player, x, y) {
        if (this.checkFinish(player.player, door)) {
            player.player.reset(x, y);
            player.player.kill();
            door.animations.stop();
            door.animations.play('finish', 6, true);
        }
    },
    checkFinish : function(player, door) {
        var playerBounds = player.getBounds();
        var doorBounds = door.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, doorBounds);
    },
    finishAnimStart : function(sprite, animation) {
        animation.loop = false;
    },
    finishAnimComplete : function(sprite, animation) {
        this.listener.changeLevel();
    }
}