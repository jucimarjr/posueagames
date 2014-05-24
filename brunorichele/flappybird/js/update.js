var update = {
    player : null,
    enemyTimer: null,
    status: null,
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
        game.physics.arcade.overlap(this.player, create.enemy_group, update.collisionEnemyGroup);
        update.collisionFloor();
        if(this.player.y < 200) this.player.y = 200;
    },
    collisionEnemyGroup : function(player, enemy){
        if(player && player.alive){
            var style = { font: "40px helvetica", fill: "#000000" };
            if(enemy.enemyType === 'ariranha'){
                update.status = game.add.text(100, 400, "Pressione R para reiniciar", style);
                player.destroy();
                enemy.animations.stop();
                enemy.frame = 2;
            }
            else {
                update.status = game.add.text(100, 400, "Pressione R para reiniciar", style);
                player.alive = false;
                player.animations.play('shock');
                player.body.gravity.y = 500;
                player.body.velocity.y = 0;
            }
        }
    },
    collisionFloor : function(){
        if (this.player.alive && this.player.y > game.world.bounds.height){
            var style = { font: "40px helvetica", fill: "#000000" };
            this.status = game.add.text(100, 400, "Pressione R para reiniciar", style);
            this.player.alive = false;
            this.player.animations.stop();
            this.player.frame = 4;
            this.player.body.velocity.y = 0;
        }
    }
};
