function Door(game) {
    this.game = game,
    this.listener;
}

Door.prototype = {
    preload : function() {
        this.game.load.spritesheet('door', 'assets/phase1/images/door_4320-255-32.png', 135, 255);
    },
    create : function(listener, x, y) {
        this.listener = listener;
        door = this.game.add.sprite(x, y, 'door');
        door.animations.add('default', [0, 1, 2, 3, 4, 5]);
        finishAnim = door.animations.add('finish', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        finishAnim.onStart.add(this.finishAnimStart, this);
        finishAnim.onComplete.add(this.finishAnimComplete, this);

        door.animations.play('default', 6, true);
    },
    update : function(player, x, y) {
        if (this.checkFinish(player.player, door)) {
            player.player.kill();
            player.player.reset(x, y);
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