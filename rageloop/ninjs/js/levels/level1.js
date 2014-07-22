(function (app_container) {

    function Level1() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background';
        this.mapAsset = 'map1';
        this.audioAsset = 'bgsound';

        this.playerX = 40;
        this.playerY = 40;

        this.hasShadow = false;

        this.itemCount = 0;
        this.totalItems = 8;

        this.nextLevel = 'LevelSelect';

        this.runningIntro = false;
    };

    Level1.prototype = new app_container.Level();

    Level1.prototype.createEnemies = function () {
        this.enemies.createNinjaIdle(40*31, 40*10);
        this.enemies.createNinjaIdle(40*43, 40*8);
        this.enemies.createNinjaIdle(40*69, 40*9);
        this.enemies.createNinjaIdle(40*49, 40*3);
        this.enemies.createNinjaIdle(40.1*70, 40*3);
        this.enemies.createNinjaIdle(40.1*101, 40*5);
        this.enemies.createNinjaIdle(40.1*118, 40*3);
        this.enemies.createNinjaIdle(40*141, 40*8);
        this.enemies.createNinjaIdle(40*169, 40*3);
        this.enemies.createNinjaIdle(40*174, 40*12);
        this.enemies.createNinjaIdle(40*210, 40*5);
        this.enemies.createNinjaIdle(40.1*232, 40*5);

        this.enemies.createNinjaWalker(40*52, 40*11);

        this.enemies.createNinjaDash(40*151, 40*12);
        this.enemies.createNinjaDash(40*146, 40*3);
        this.enemies.createNinjaDash(40*156, 40*3);
    };

    Level1.prototype.openEscape = function () {
        this.map.putTile(4, 239, 1, this.escapeLayer);
        this.map.putTile(4, 239, 2, this.escapeLayer);
        this.map.putTile(4, 239, 3, this.escapeLayer);
        this.map.putTile(4, 239, 4, this.escapeLayer);
    };

    app_container.Level1 = Level1;

}(window.app_container = window.app_container || {}));