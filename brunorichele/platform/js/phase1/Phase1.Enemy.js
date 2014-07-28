Phase1.Enemy = {
    init : function() {
        this.game.load.spritesheet('skull', 'assets/phase2/enemy/skull_260-41-4.png', 65, 41);
        this.game.load.spritesheet('hands', 'assets/phase2/enemy/hands_166-56-2.png', 83, 56);
    },
    createEnemy : function(mymap) {
        skulls = this.game.add.group();
        skulls.enableBody = true;
        mymap.createFromObjects('enemy', 1, 'skull', 0, true, false, skulls)

        skulls.callAll('animations.add', 'animations', 'move', [0, 1], 12, true);
        skulls.callAll('animations.play', 'animations', 'move');
    }
}