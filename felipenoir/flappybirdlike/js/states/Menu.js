//Menu.js
var menuState = {  
    create: function() {
        this.start();
    },
	
    start: function() {
        this.game.state.start('play');
    }
};