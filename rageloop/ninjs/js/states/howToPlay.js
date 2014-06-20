(function (app_container) {
    
    function HowToPlay() {};

    HowToPlay.prototype = {

        create: function () {
            //this.stage.backgroundColor = '#ccc';

            this.game.add.sprite(0, 0, 'howto_bg');
			
			this.returnbutton = this.game.add.button(790, 550, 'back_btn', this.onResetClick, this, 1, 0, 1);
            this.returnbutton.anchor.set(0.5, 0.5);

            this.clickAudio = this.game.add.audio('click');
        },

        update: function() {},

        onResetClick: function() {
        	this.clickAudio.play();
            this.game.state.start('Menu');
        }
    };

    app_container.HowToPlay = HowToPlay;

}(window.app_container = window.app_container || {}));