(function () {

    function MultiBlaster(game, player) {
        this.game = game;
        this.player = player;
        this.group = null;
        this.timer = null;
        this.delay = 600;
        this.asset = 'bullet';
        this.totalGroup = 15;
    }

    MultiBlaster.prototype = {
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
            if (this.timer) {
                return false;
            }

            var bullets = [];

            bullets.push(this.group.next());
            bullets.push(this.group.next());
            bullets.push(this.group.next());

            if (!bullets[0] || !bullets[1] || !bullets[2]) {
                return false;
            }

            for (var i=0; i<bullets.length; i++) {
                this.game.physics.enable(bullets[i], Phaser.Physics.ARCADE);

                bullets[i].scale.set(0.5, 0.5);
                bullets[i].reset(this.player.x + this.player.width, this.player.y + this.player.height -25);
                bullets[i].body.velocity.x = 1000;
                bullets[i].checkWorldBounds = true;
                bullets[i].outOfBoundsKill = true;
            }

            bullets[0].body.velocity.y = -100;
            bullets[2].body.velocity.y = 100;

            this.startTimer();

            return true;
        },

        startTimer: function () {
            var self = this;
            this.timer = setTimeout(function () {
                clearTimeout(self.timer);
                self.timer = null;
            }, this.delay);
        }
    };

    window.MultiBlaster = MultiBlaster;

})();