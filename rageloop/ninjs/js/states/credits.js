
(function (app_container) {
    
    function Credits() {};

    Credits.prototype = {

        create: function () {
            
        	var names = [
        		'Daniele Viera',
        		'Moacir de Oliveira',
        		'Paulo Carvalho',
        		'Rodrigo Braga'
        	];

        	var nameObj = null;

            this.stage.backgroundColor = '#000';

            var style = { font: "36px pixelFont", fill: "#ffffff"};

			this.team = this.game.add.text(480, 100, 'Equipe: ', style);            
			this.team.anchor.set(1, 0);

            for (var i = 0, amount = names.length; i < amount; i++) {

            	nameObj = this.game.add.text(480, 230 + (i * 70), names[i], style);
            	nameObj.anchor.set(0.5);
            }

            this.resetbutton = this.game.add.button(790, 550, 'reset_btn', this.onResetClick, this, 1, 0, 1);
            this.resetbutton.anchor.set(0.5, 0.5);

            this.clickAudio = this.game.add.audio('click');
        },

        update: function() {},

        onResetClick: function() {
        	this.clickAudio.play();
            this.game.state.start('Menu');
        }
    };

    app_container.Credits = Credits;

}(window.app_container = window.app_container || {}));