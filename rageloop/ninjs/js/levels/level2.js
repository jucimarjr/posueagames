(function (app_container) {

    function Level2() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background';
        this.mapAsset = 'map2';
        this.audioAsset = 'bgsound';

        this.playerX = 40;
        this.playerY = 40*41;

        this.hasShadow = true;

        this.itemCount = 0;
        this.totalItems = 10;

        this.nextLevel = 'LevelSelect';

        this.runningIntro = false;
    };

    Level2.prototype = new app_container.Level();

    Level2.prototype.createEnemies = function () {

        window.app_container.currentLevel = "Level2";

        this.enemies.createNinjaIdle(40*26, 40*38);
        this.enemies.createNinjaIdle(40*51, 40*38);
        this.enemies.createNinjaIdle(40*22, 40*26);
        this.enemies.createNinjaIdle(40*10, 40*23);
        this.enemies.createNinjaIdle(40*31, 40*18);
        this.enemies.createNinjaIdle(40*8, 40*12);
        this.enemies.createNinjaIdle(40*17, 40*10);
        this.enemies.createNinjaIdle(40*27, 40*5);
        this.enemies.createNinjaIdle(40*47, 40*9);
        this.enemies.createNinjaIdle(40*51, 40*7);

        this.enemies.createNinjaWalker(40*37, 40*41);
        this.enemies.createNinjaWalker(40*46, 40*21);
        this.enemies.createNinjaWalker(40*28, 40*24);

        this.enemies.createNinjaDash(40*12, 40*6);
        this.enemies.createNinjaDash(40*60, 40*7);
        this.enemies.createNinjaDash(40*31, 40*10);
    };

    Level2.prototype.openEscape = function () {
        this.map.putTile(11, 71, 5, this.escapeLayer);
        this.map.putTile(11, 71, 6, this.escapeLayer);
        this.map.putTile(11, 71, 7, this.escapeLayer);
    };

    app_container.Level2 = Level2;

}(window.app_container = window.app_container || {}));