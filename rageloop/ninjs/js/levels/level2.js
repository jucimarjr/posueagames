(function (app_container) {

    function Level2() {
        app_container.Level.prototype.constructor.call(this);

        this.bgAsset = 'background';
        this.mapAsset = 'map2';
        this.audioAsset = 'bgsound';

        this.playerX = 40;
        this.playerY = 40*41;

        this.hasShadow = true;
    };

    Level2.prototype = app_container.Level.prototype;

    Level2.prototype.createEnemies = function () {
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

    app_container.Level2 = Level2;

}(window.app_container = window.app_container || {}));