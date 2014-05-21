(function () {

    function SimpleBlaster(game, player) {
        this.game = game;
        this.player = player;
        this.group = null;
        this.timer = null;
        this.delay = 600;
        this.asset = 'bullet';
        this.totalGroup = 10;
    }

    SimpleBlaster.prototype = {
        create: function () {
            this.group = this.game.add.group();
            this.group.createMultiple(this.totalGroup, this.asset);
            this.group.setAll('anchor.x', 0.5);
            this.group.setAll('anchor.y', 0.5);
            this.group.setAll('outOfBoundsKill', true);
        },

        destroy: function () {
            clearTimeout(this.timer);
            this.timer = null;
            this.group.removeAll(true);
        },

        fire: function () {
            var bullet = this.group.getFirstDead();

            if (!bullet || this.timer) return;

            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

            bullet.scale.set(0.5, 0.5);
            bullet.reset(this.player.x + this.player.width, this.player.y + this.player.height -25);
            bullet.body.velocity.x = 1000;
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            this.startTimer();
        },

        startTimer: function () {
            var self = this;
            this.timer = setTimeout(function () {
                clearTimeout(self.timer);
                self.timer = null;
            }, this.delay);
        }
    };

    window.SimpleBlaster = SimpleBlaster;

})();