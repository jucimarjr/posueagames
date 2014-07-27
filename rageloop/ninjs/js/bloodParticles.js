(function (app_container) {

	function Blood(game) {
        this.game = game;
        this.emitter = null;
        this.lifespan = 500; //ms
        this.frequency = 5; //ms

        this.amount = 300;
    }

    Blood.prototype.init = function() {

        // add particles
        this.emitter = this.game.add.emitter (0, 0, this.amount);
        this.emitter.gravity = 1000;
        this.emitter.setXSpeed(-300, 300);
        this.emitter.fixedToCamera = true;

        this.emitter.makeParticles('blood_particle');
        this.emitter.start(false, this.lifespan, this.frequency);

        this.emitter.on = false;
    };

    Blood.prototype.update = function(obj) {

        this.emitter.x = obj.x;
        this.emitter.y = obj.y;
    };

    Blood.prototype.start = function(obj, duration) {

        var self = this;

        this.emitter.on = true;

        this.emitter.x = obj.x;
        this.emitter.y = obj.y;

        setTimeout(function(){
            self.emitter.on = false;
        }, duration);
    };

    Blood.prototype.destroy = function() {
        this.emitter.destroy();
    };

    window.Blood = Blood;

}(window.app_container = window.app_container || {}));