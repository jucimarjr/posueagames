(function (app_container) {

    function Level3() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background';
        this.mapAsset = 'map3';
        this.audioAsset = 'bgsound';

        this.playerX = 40*10;
        this.playerY = 40*5;

        this.hasShadow = false;

        this.itemCount = 0;
        this.totalItems = 8;

        this.nextLevel = '';
    };

    Level3.prototype = new app_container.Level();

    Level3.prototype.createEnemies = function () {
        this.boss = new Boss(this.game, this.player);
        this.boss.init(40*22, 40*10);
    };

    Level3.prototype.openEscape = function () {
    };

    app_container.Level3 = Level3;

}(window.app_container = window.app_container || {}));