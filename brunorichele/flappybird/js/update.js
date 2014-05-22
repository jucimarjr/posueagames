var update = {
    player : null,
    enemyTimer: null,
    update : function(){
        // fazer o angulo apontar para baixo quando o jogador n��o esta pulando
        if(this.player.angle < 20){
            this.player.angle += 1;
        }
        if(this.player.x > game.world.bounds.height){
            // no need to fall anymore
            this.player.body.gravity.y = 0;
        }
        update.collisionEnemyGroup();
        update.collisionFloor();
    },
    collisionEnemyGroup : function(){
        if(this.player.alive && game.physics.arcade.overlap(this.player, create.enemy_group)){
            var style = { font: "50px helvetica", fill: "#000000" };
            status = game.add.text(100, 400, "Morreu pro inimigo, fim de jogo", style);
            this.player.alive = false;
            this.player.body.velocity.y = 0;
        }
    },
    collisionFloor : function(){
        if (this.player.alive && this.player.y > game.world.bounds.height){
            var style = { font: "50px helvetica", fill: "#000000" };
            status = game.add.text(50, 400, "Morreu no chao, fim de jogo", style);
            this.player.alive = false;
            this.player.body.velocity.y = 0;
        }
    }
};
