(function () {

    function WeaponFactory(game, player) {
        this.game = game;
        this.player = player;
        this.list = [];
        this.map = {};
    }

    WeaponFactory.prototype = {
        create: function () {
            var simple = new SimpleBlaster(this.game, this.player);
            var simpleFast = new SimpleBlaster(this.game, this.player);
            var multi = new MultiBlaster(this.game, this.player);
            var multiFast = new MultiBlaster(this.game, this.player);

            simple.create();
            simpleFast.create();
            multi.create();
            multiFast.create();

            simpleFast.delay = 250;
            multiFast.delay = 250;

            this.list = [simple, simpleFast, multi, multiFast];

            this.map = {
                'simpleBlasterFast': simpleFast,
                'multiBlaster': multi,
                'multiBlasterFast': multiFast
            };

        },

        nextWeapon: function () {
            if (!this.list.length) return null;

            var weapon = this.list.shift();
            weapon.create();

            return weapon;
        },

        hasWeapon: function () {
            return this.list.length > 0;
        },

        getWeapon: function(id) {

            if (typeof id !== 'string') {
                return -1;
            }

            return this.map[id];

        }
    };

    window.WeaponFactory = WeaponFactory;

})();