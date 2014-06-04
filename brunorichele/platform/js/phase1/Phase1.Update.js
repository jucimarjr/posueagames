State.Phase1.prototype.update = function(){
        "use strict";
        Config.global.screen.resize(this.game);
        this.game.physics.arcade.collide(this.layer, this.player, this.wallCollision, null, this);
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -100;
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 100;
        }
        else this.player.body.velocity.x = 0;
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -100;
        }
        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = 100;
        }
        else this.player.body.velocity.y = 0;
	
	};
  State.Phase1.prototype.wallCollision = function (){
        //do something
    
};