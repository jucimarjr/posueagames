var update = {
    player : null,
    enemyTimer: null,
    status: null,
    score: 0 ,
    score_placa : null,
    botaoinicio: null,
    botaojogar: null,
    
    update : function(){
        // fazer o angulo apontar para baixo quando o jogador n������������������o esta pulando
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
        
        create.score_label.y = game.camera.y + 30;
        create.cabeca.y = game.camera.y + 20;
        create.score_label.setText (" " + create.score);
        
    },
    collisionEnemyGroup : function(player, enemy){
        if(player && player.alive){
            var style = { font: "40px Helvetica", fill: "#ffffff" };
            if(enemy.enemyType === 'ariranha'){
				update.waitGameOver(1000);
                player.destroy();
                enemy.animations.stop();
                enemy.frame = 2;
            }
            else if(enemy.enemyType === 'barco') {
				update.waitGameOver(1000);
                player.destroy();
                enemy.animations.stop();
                enemy.frame = 2;
            }
            else {
			  	update.waitGameOver(1000);
                player.alive = false;
                player.animations.play('shock');
                player.body.gravity.y = 500;
                player.body.velocity.y = 0;
            }
        }
    },
	waitGameOver : function(second){	
		 game.time.events.add(second, function(){update.createGameOverButtons()});
	},
    collisionFloor : function(){
        if (this.player.alive && this.player.y > game.world.bounds.height){
			update.waitGameOver(2000);
            var style = { font: "40px Helvetica", fill: "#ffffff" };
            this.player.alive = false;
            this.player.animations.stop();
            this.player.frame = 4;
            this.player.body.velocity.y = 0;
			this.player.scale.y *= -1;
			this.player.body.gravity.y = -300;
        }
    },
    createGameOverButtons : function(){
        startY = game.camera.y - 80;
        this.pointWall = game.add.sprite(180, startY + 120, 'placapontos');
        
        var style = { font: "100px Helvetica", fill: "#ffffff" };
        this.score_placa = game.add.text((game.width - 50)/2, startY + 350, create.score + "", style);

        this.buttonJogar = game.add.sprite(320, startY + 520, 'botaojogar');
        this.buttonJogar.inputEnabled = true;
        this.buttonJogar.input.useHandCursor = true;
        this.buttonJogar.events.onInputDown.add(this.resetGame, this);

        this.buttonInicio = game.add.sprite(510, startY + 520, 'botaoinicio');
        this.buttonInicio.inputEnabled = true;
        this.buttonInicio.input.useHandCursor = true;
        this.buttonInicio.events.onInputDown.add(this.startMenu, this);
		
		this.player.destroy();
    },
    startMenu: function(){
        this.buttonJogar.kill();
        this.buttonInicio.kill();
        this.pointWall.kill();
        create.bgmusic.stop();
        game.state.start('menu');
    },
    resetGame: function(){
    	
        this.buttonJogar.kill();
        this.buttonInicio.kill();
        this.score_placa.setText(" ");
        this.pointWall.kill();
        create.reset();
      
    }
};
