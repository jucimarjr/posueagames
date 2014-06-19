(function (app_container) {

    function ShadowEffect(game, objectFollow) {
        this.game = game;
        this.shadowTexture = null;
        this.lightSprite = null;
        this.objectFollow = objectFollow || null;
    }

    ShadowEffect.prototype.init = function(){
        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    };

    ShadowEffect.prototype.update = function() {
        this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
        this.updateShadowTexture();
    };

    ShadowEffect.prototype.updateShadowTexture = function() {
        // Draw shadow
        this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
        this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

        var radius = 300 + this.game.rnd.integerInRange(1,10),
            heroX = this.objectFollow.x - this.game.camera.x,
            heroY = this.objectFollow.y - this.game.camera.y;
       
        // Draw circle of light with a soft edge
        var gradient =
            this.shadowTexture.context.createRadialGradient(
                heroX, heroY, 100 * 0.75,
                heroX, heroY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
        this.shadowTexture.context.fill();

        // This just tells the engine it should update the texture cache
        this.shadowTexture.dirty = true;
    }

    window.ShadowEffect = ShadowEffect;

}(window.app_container = window.app_container || {}));