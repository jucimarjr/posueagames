/*global setTimeout, Config, Phaser*/

(function (app_container) {
    
    function LudusSplash() {
    	this.ludus_splash = null;
    };

    LudusSplash.prototype = {

    	preload: function () {

    		this.game.load.image('ludus_splash','assets/images/LudusSplash_960-600.png');
    		this.game.load.image('progressBar_bar','assets/images/ProgressBar_960-30.png');
    	},

        create: function () {

        	var self = this;
        	var tween;
            
            //this.stage.backgroundColor = '#ccc';
            this.ludus_splash = this.game.add.sprite(0, 0, 'ludus_splash');

            setTimeout(function () {
				tween = self.game.add.tween(self.ludus_splash).to({alpha : 0}, 800, Phaser.Easing.Linear.None);
				tween.start();
				tween.onComplete.add(function() {
            		self.game.state.start('Preload');
            	}, this);
			}, 300);
        },

        update: function() {},        
    };

    app_container.LudusSplash = LudusSplash;

}(window.app_container = window.app_container || {}));