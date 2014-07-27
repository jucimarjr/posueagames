Phase1_test.Trap = {
    init : function() {
        this.game.load.spritesheet('flame', 'assets/phase1/images/armadilha3_360-390-6.png', 60, 390);
    },
    createTrap : function(mymap) {
        flames = this.game.add.group();
        flames.enableBody = true;
        mymap.createFromObjects('flames', 1001, 'flame', 0, true, false, flames);

        flames.callAll('animations.add', 'animations', 'move', [0, 1, 2, 3, 4, 5], 12, true);
        flames.callAll('animations.play', 'animations', 'move');
    }
}