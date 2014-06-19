Tree = function(game, index, x, y) {
    "use strict";
    this.game = game;
    this.direction = Math.round(Math.random());

    this.x = x;
    this.y = y;

    this.index = index;
    this.key = 'tree';
    this.asset = 'assets/arvore_120-180.png';
    this.walk = 150;
    this.hasRope = false;
};

Tree.prototype = {
    getSprite : function() {
        return this.tree;
    },
    create : function() {
        "use strict";
        this.tree = this.game.add.sprite(this.x, this.y, this.key, 3);
        // permite que a sprite tenha um corpo fisico
        this.game.physics.enable(this.tree, Phaser.Physics.ARCADE);
        this.tree.body.collideWorldBounds = true;
        this.tree.anchor.setTo(0.5, 1);

    },
    update : function(layer) {
        "use strict";
        this.game.physics.arcade.collide(layer, this.tree);
        // Do nothing
    },
    checkCollision : function(rope, facingLeft) {
        if(this.checkOverlap(this.tree, rope)){
            this.ropeCollision(facingLeft);
        }
    },
    ropeCollision : function(facingLeft){
        if(this.hasRope) return;
        console.log("rope collided");
        this.hasRope = true;
        var angle = -90;
        if(facingLeft) angle *= -1;
        this.game.add.tween(this.tree)
            .to({angle: angle}, 2000, Phaser.Easing.Exponential.In)
            .start();
    },

    checkOverlap : function(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }

};

Trees = function(game) {
    "use strict";
    this.game = game;
    this.values = new Array();
};

Trees.prototype = {
    preload : function() {
        this.game.load.image('tree', 'assets/arvore_120-180.png', 120, 180);
    },
    create : function() {
        "use strict";

        // Do nothing
    },
    update : function(layer) {
        "use strict";

        for (var i = 0; i < this.values.length; i++) {
            this.values[i].update(layer);
        }
    },
    pop : function(x, y) {
        var tree = new Tree(game, this.values.length, x, y);
        this.values.push(tree);

        tree.create();
    },
    checkCollision : function(rope, facingLeft) {
        for (var i = 0; i < this.values.length; i++) {
            this.values[i].checkCollision(rope, facingLeft);
        }
    }
};
