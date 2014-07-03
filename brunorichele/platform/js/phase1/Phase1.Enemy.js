Phase1.Enemy = {
	hand : "assets/phase1/images/hand_150-30-6.png",
	trapGroup : null,
	fire : [],
	posItem : [
	//	{"x" : 280, "y" : 1660},
	//	{"x" : 290, "y" : 1660},
	//	{"x" : 300, "y" : 1660},	
		{"x" : 310, "y" : 1660},	
		{"x" : 760, "y" : 1700},	
		{"x" : 770, "y" : 1700},	
		{"x" : 780, "y" : 1700},	
		{"x" : 1060, "y" : 1665},	
		{"x" : 1065, "y" : 1665},	
		{"x" : 1070, "y" : 1665},	
		{"x" : 1075, "y" : 1665},	
		{"x" : 1080, "y" : 1665},
		{"x" : 2220, "y" : 1710},	
		{"x" : 2230, "y" : 1712},	
		{"x" : 2240, "y" : 1713},	
		{"x" : 2250, "y" : 1713},	
		{"x" : 2260, "y" : 1714},
		{"x" : 2710, "y" : 1720},	
		{"x" : 2840, "y" : 1722},
		{"x" : 2100, "y" : 1225},	
		{"x" : 2350, "y" : 1247},
		{"x" : 1550, "y" : 1255},	
		{"x" : 1560, "y" : 1255},	
		{"x" : 1570, "y" : 1255},	
		{"x" : 1580, "y" : 1255},	
		{"x" : 900, "y" : 1148},	
		{"x" : 910, "y" : 1148},	
		{"x" : 1060, "y" : 1145},	
		{"x" : 1070, "y" : 1147},
		{"x" : 300, "y" : 995},	
		{"x" : 1670, "y" : 655},	
		{"x" : 1830, "y" : 675},	
		{"x" : 1980, "y" : 680},	
		{"x" : 2130, "y" : 667}
	],	
	init : function(){
		this.game.load.spritesheet('enemyHand', this.hand, 25, 30);
	},
	create : function(){		
		for(var x = 0; x < this.posItem.length; x++){		
			this.fire[x] = this.game.add.sprite(this.posItem[x].x, this.posItem[x].y, 'enemyHand');
			
			this.game.physics.p2.enable(this.fire[x], false);
			
			this.fire[x].animations.add('burn', [0, 1, 2, 3, 4, 5], 10, true);
			this.fire[x].animations.play('burn');	
			this.fire[x].body.fixedRotation = true;
			this.fire[x].body.static = true;
			this.fire[x].body.setRectangle(15, 20);
			this.fire[x].body.setMaterial(enemyMaterial);
			this.fire[x].body.setCollisionGroup(enemyCG);
    		this.fire[x].body.collides([playerCG]);
			this.fire[x].body.createGroupCallback(playerCG, this.collide);			
		}						
	},
	collide : function(player){
		game.add.text(Config.screen.width/2, 1500, 'Colidiu com o inimigo', { font: '30px Arial', fill: '#fff' });	
		//		this.game.state.start('GameOver');		
	}
};