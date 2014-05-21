(function () {

    function WeaponFactory(game, player) {
        this.game = game;
        this.player = player;
        this.list = [];
    }

    WeaponFactory.prototype = {
        create: function () {
            var simple = new SimpleBlaster(this.game, this.player);
            var simpleFast = new SimpleBlaster(this.game, this.player);
            var multi = new MultiBlaster(this.game, this.player);
            var multiFast = new MultiBlaster(this.game, this.player);

            simpleFast.delay = 250;
            multiFast.delay = 250;

            this.list = [simple, simpleFast, multi, multiFast];
        },

        nextWeapon: function () {
            if (!this.list.length) return null;

            var weapon = this.list.shift();
            weapon.create();

            return weapon;
        },

        hasWeapon: function () {
            return this.list.length > 0;
        }
    };

    window.WeaponFactory = WeaponFactory;

})();