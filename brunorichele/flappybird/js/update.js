var update = {
	init : function(){
		update.collisionEnemyGroup();
		update.collisionFloor();
	},
	collisionEnemyGroup : function(){
		if(game.physics.arcade.collide(pirarucu, create.enemy_group)){
		//	game.time.events.remove(create.timer);
			var style = { font: "50px helvetica", fill: "#ffffff" };
        	status = game.add.text(100, 100, "Morreu pro inimigo, fim de jogo", style);		
		}
	},
	collisionFloor : function(){
		if (pirarucu.inWorld == false){
		//	game.time.events.remove(create.timer);			
			var style = { font: "50px helvetica", fill: "#ffffff" };
        	status = game.add.text(50, 50, "Morreu no chão, fim de jogo", style);
		}	
	}
};