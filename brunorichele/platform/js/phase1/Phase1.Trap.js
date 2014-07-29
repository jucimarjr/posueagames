Phase1.Trap = {
    init : function() {
        this.game.load.spritesheet('flame', 'assets/phase1/images/armadilha3_360-390-6.png', 60, 390);
    },
    createTrap : function(mymap) {
        flames = this.game.add.group();
        flames.enableBody = true;
        mymap.createFromObjects('flames', 1, 'flame', 0, true, false, flames);

        flames.callAll('animations.add', 'animations', 'move', [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 3, 4, 5, 4, 5, 4, 3, 2, 1], 8, true);
        flames.callAll('animations.play', 'animations', 'move');
    },
    update : function(player) {
        var i;
        for(i = 0; i < flames.children.length - 1; i++){
            flame = flames.children[i];
            frame = flame.animations._anims.move._frames[flame.animations._anims.move._frameIndex];
            if ((frame === 4 || frame === 5) && this.checkBurn(player.player, flame)) {
                player.state = PlayerState.BURNING;
                console.log('burn mother fucker! burn!!!');
				this.game.state.start('GameOver');
				player.state = PlayerState.IDLE;
            }
        }
    },
    checkBurn : function(player, flame) {
        var playerBounds = player.getBounds();
        var flameBounds = flame.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, flameBounds);
    }
}