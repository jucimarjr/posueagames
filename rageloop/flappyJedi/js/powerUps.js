(function(){
    
    function PowerUps(game) {

        this.game = game || null;

        this.types = [
            'multiBlaster',
            'simpleBlasterFast',
            'shield',
            'multiBlasterFast'
        ];

        this.group = null;
        this.amount = 5;
        this.asset = 'powerups';
    }

    PowerUps.prototype.init = function() {

        console.log("PowerUps.init()");

        this.group = this.game.add.group();
        this.group.createMultiple(this.amount, this.asset);
        this.group.setAll('anchor.x', 0.5);
        this.group.setAll('outOfBoundsKill', true);

    };

    PowerUps.prototype.update = function() {};

    PowerUps.prototype.spawnNew = function(x, y) {

        var item;
        var typeIdx;

        if (!this.group) {
            return;
        }

        item = this.group.getFirstDead();

        if (item) {
            
            this.game.physics.enable(item, Phaser.Physics.ARCADE);

            typeIdx = Utils.randomIntFromInterval(0, 3);

            item.frame = typeIdx;

            item.type = this.types[typeIdx];
            item.reset(x, y);

            item.body.velocity.x = -700;
            item.checkWorldBounds = true;
            item.outOfBoundsKill = true;
        }

    };

    window.PowerUps = PowerUps;

})();