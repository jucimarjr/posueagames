var timer2 =0,  text5;

var styleText2 = {
		font : "25px Arial",
		fill : "#fff"
};

var gameMenuHell = {
		
		preload: function(){
			  game.load.image('initBg', 'assets/background.png');
		      game.load.audio('audio', 'assets/menu.ogg');
		},
		
		create: function(){
			audio = game.add.audio('audio');
			audio.addMarker ('audioM',0,30,0,true);
			audio.play('audioM', 0, 1, true);
			var initBg = game.add.tileSprite(25, 0, 910, 600, 'initBg');
		    text5 = game.add.text(200, game.world.centerY, "Press Space Key To Start", styleText2);
		    
		    
		    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    spaceKey.onDown.add(this.start, this);
		    
		    /*if ( game.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR) ) {
				this.start();
			 }*/
		}, 
		
		update: function(){
			 	timer2 += game.time.elapsed; 
			    if ( timer2 >= 800 )
			    {
			        timer2 -= 800;
			        text5.visible = !text5.visible;
			    }
		},
		
		start: function(){
			 console.log("menu start");
			 audio.stop();
			 game.state.start('fase');
		}
		
		
};