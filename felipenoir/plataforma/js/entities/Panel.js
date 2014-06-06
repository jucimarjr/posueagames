var w1 = {name:'weapon1', x:10, y:10}
var w2 = {name:'weapon2', x:70, y:10}
var w3 = {name:'weapon3', x:130, y:10}

function Panel(weapon) {
    this.weapon = weapon,
    this.selector;
}

Panel.prototype = {
    preload : function() {
        game.load.image(w1.name, 'assets/images/weapon/arma1.jpg');
        game.load.image(w2.name, 'assets/images/weapon/arma2.jpg');
        game.load.image(w3.name, 'assets/images/weapon/arma3.png');
        game.load.image('selector', 'assets/images/weapon/selector.png');
    },

    create : function() {
        arma1 = game.add.sprite(w1.x, w1.y, w1.name);
        arma2 = game.add.sprite(w2.x, w2.y, w2.name);
        arma3 = game.add.sprite(w3.x, w3.y, w3.name);
        this.selector = game.add.sprite(10, 10, 'selector');

        arma1.fixedToCamera = true;
        arma2.fixedToCamera = true;
        arma3.fixedToCamera = true;
        this.selector.fixedToCamera = true;
    },

    change : function(weapon) {
        console.log(weapon.key);
        this.selector.fixedToCamera = false;
        if (weapon.key == w1.name) {
            this.selector.x = w1.x;
            this.selector.y = w1.y;
        } else if (weapon.key == w2.name) {
            this.selector.x = w2.x;
            this.selector.y = w2.y;
        } else if (weapon.key == w3.name) {
            this.selector.x = w3.x;
            this.selector.y = w3.y;
        }
        this.selector.fixedToCamera = true;
    }
}