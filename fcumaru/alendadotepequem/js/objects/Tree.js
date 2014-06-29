Tree = function(game, index, x, y) {
    "use strict";
    this.game = game;

    this.x = x;
    this.y = y;

    this.index = index;
    this.key = 'tree';
    this.asset = 'assets/tree_118-360.png';
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
        this.game.physics.enable(this.tree, Phaser.Physics.ARCADE);
        this.tree.body.collideWorldBounds = true;
        this.tree.body.immovable = true;
        this.tree.body.setSize(50, 316, 0, 0);
        this.tree.anchor.setTo(0.5, 0.9);

		this.tree.body.allowGravity = false;
    },
    update : function(layer) {
        "use strict";
        this.game.physics.arcade.collide(layer, this.tree);
    },
    checkCollision : function(hero) {
        this.game.physics.arcade.collide(this.tree, hero, this.heroCollision);

    },
	heroCollision : function(tree, hero) {
		if (tree.body.touching.up) {
			hero.jumpCount = 0;
			hero.body.allowGravity = false;
			return;
		}
	},
    ropeCollision : function(rope, facingLeft){
        if(this.hasRope) return;
        if(this.checkOverlap(this.tree, rope)){
            this.hasRope = true;
            var angle = -90;
            if(!facingLeft) {
                this.game.add.tween(this.tree)
                    .to({angle: angle}, 1500, Phaser.Easing.Exponential.In)
                    .start()
                    .onComplete.add(function() {this.tree.body.setSize(360, 50, -80, 20);}, this);
            }
            else {
                this.game.add.tween(this.tree)
                    .to({angle: -angle}, 1500, Phaser.Easing.Exponential.In)
                    .start()
                    .onComplete.add(function() {this.tree.body.setSize(360, 50, 80, 20);}, this);
            }                
        }
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
        this.game.load.image('tree', 'assets/tree_118-360.png', 118, 360);
    },
    create : function() {
        "use strict";
        
        this.pop(1710, 1705);
		this.pop(2670, 1645);
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
    checkCollision : function(hero) {
        for (var i = 0; i < this.values.length; i++) {
            this.values[i].checkCollision(hero);
        }
    },
    ropeCollision : function(rope, facingLeft) {
        for (var i = 0; i < this.values.length; i++) {
            this.values[i].ropeCollision(rope, facingLeft);
        }
    }
};
