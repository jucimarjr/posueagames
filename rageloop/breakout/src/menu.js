//===============================================================
// Menu
//===============================================================

function Menu(id) {
    this.id = id || '';
    this.menuElemContainer = null;
    this.buttons = [];
}

Menu.prototype.init= function() {
    
    var self = this;

    this.menuElemContainer = document.getElementById(this.id);

    this.buttons['start'] = document.getElementById('start_btn');
    this.buttons['start'].onclick = function(){
        
        self.hide();
        game.init();
        game.start();
        game.show();
    };

};

Menu.prototype.show = function() {
    if (this.menuElemContainer) {
        this.menuElemContainer.style.display = 'block';
    }
};

Menu.prototype.hide = function() {
    if (this.menuElemContainer) {
        this.menuElemContainer.style.display = 'none';
    }
};