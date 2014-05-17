(function (app_container) {
    
    function Gameplay() {};

    Gameplay.prototype = {

        create: function () {
        	this.stage.backgroundColor = '#ccc';
        	this.game.add.image(0, 0, 'bg');
        	this.game.add.image(0, this.game.height -70, 'platmaior');
        	this.game.add.image(this.game.width - 530, this.game.height -225, 'platmenor');
        	this.game.add.image(this.game.width - 82, this.game.height -165 , 'escada');

        	this.game.add.image(50, this.game.height -180 , 'doll');
        },

        update: function() {}, 
    };

    app_container.Gameplay = Gameplay;

}(window.app_container = window.app_container || {}));