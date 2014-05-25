State.Play = function() {
};

State.Play.prototype = {
    preload:function() {
        game.load.image('bg','assets/images/bg1.jpg');
    },

    create:function(){
        game.add.sprite(0,0,'bg');
    }

}