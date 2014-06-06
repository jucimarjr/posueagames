Phase1.Rock = {
	itemRock9075 : "assets/phase1/images/rock_90-75.png",
	itemRock92230 : "assets/phase1/images/rock_92-230.png",
	itemRock10035 : "assets/phase1/images/rock_100-35.png",
	itemRock12575 : "assets/phase1/images/rock_125-75.png",
	itemRock22085 : "assets/phase1/images/rock_220-85.png",	
	itemRock37085 : "assets/phase1/images/rock_370-85.png",	
	itemRock371108 : "assets/phase1/images/rock_371-108.png",	
	itemRock412190 : "assets/phase1/images/rock_412-190.png",	
	itemRock500100 : "assets/phase1/images/rock_500-100.png",	
	itemRock515130 : "assets/phase1/images/rock_515-130.png",	
	itemRock540190 : "assets/phase1/images/rock_540-190.png",	
	itemRock550165 : "assets/phase1/images/rock_550-165.png",	
	itemRock655230 : "assets/phase1/images/rock_655-230.png",	
	itemRock825100 : "assets/phase1/images/rock_825-100.png",	
	itemRock925220 : "assets/phase1/images/rock_925-220.png",
	init : function(){
		this.game.load.image('itemRock9075', this.itemRock9075);			
		this.game.load.image('itemRock92230', this.itemRock92230);
		this.game.load.image('itemRock10035', this.itemRock10035);
		this.game.load.image('itemRock12575', this.itemRock12575);
		this.game.load.image('itemRock22085', this.itemRock22085);	
		this.game.load.image('itemRock37085', this.itemRock37085);			
		this.game.load.image('itemRock371108', this.itemRock371108);
		this.game.load.image('itemRock412190', this.itemRock412190);
		this.game.load.image('itemRock500100', this.itemRock500100);
		this.game.load.image('itemRock515130', this.itemRock515130);			
		this.game.load.image('itemRock540190', this.itemRock540190);			
		this.game.load.image('itemRock550165', this.itemRock550165);
		this.game.load.image('itemRock655230', this.itemRock655230);
		this.game.load.image('itemRock825100', this.itemRock825100);
		this.game.load.image('itemRock925220', this.itemRock925220);
	},
	create : function(){
		this.rocks = []; 
		this.rocks[0] = this.game.add.sprite(1764, 1772, 'itemRock9075');
		this.rocks[1] = this.game.add.sprite(0, 1620, 'itemRock92230');
		this.rocks[2] = this.game.add.sprite(212, 406, 'itemRock10035');
		this.rocks[3] = this.game.add.sprite(348, 504, 'itemRock10035');	
		this.rocks[4] = this.game.add.sprite(245, 852, 'itemRock10035');
		this.rocks[5] = this.game.add.sprite(2510, 1413, 'itemRock10035');	
		this.rocks[6] = this.game.add.sprite(2638, 1505, 'itemRock10035');
		this.rocks[7] = this.game.add.sprite(2792, 1582, 'itemRock10035');
		this.rocks[8] = this.game.add.sprite(1336, 1772, 'itemRock12575');
		this.rocks[9] = this.game.add.sprite(1538, 1772, 'itemRock12575');
		this.rocks[10] = this.game.add.sprite(0, 240, 'itemRock22085');
		this.rocks[11] = this.game.add.sprite(1383, 1275, 'itemRock37085');
		this.rocks[12] = this.game.add.sprite(2634, 1737, 'itemRock371108');
		this.rocks[13] = this.game.add.sprite(99, 1659, 'itemRock412190');
		this.rocks[14] = this.game.add.sprite(1996, 1256, 'itemRock500100');
		this.rocks[15] = this.game.add.sprite(1986, 1716, 'itemRock515130');
		this.rocks[16] = this.game.add.sprite(738, 1170, 'itemRock540190');
		this.rocks[17] = this.game.add.sprite(681, 1686, 'itemRock550165');
		this.rocks[18] = this.game.add.sprite(0, 1021, 'itemRock655230');
		this.rocks[19] = this.foorTheDoors = this.game.add.sprite(3000, 354, 'itemRock655230');
		this.foorTheDoors.scale.x *= -1;
		this.rocks[20] = this.game.add.sprite(1552, 704, 'itemRock825100');
		this.rocks[21] = this.game.add.sprite(478, 587, 'itemRock925220');
		
		this.enableTile();
		
		return this.rocks;
	},
	enableTile : function(){
		for(var x = 0; x < 21; x++ ){	
			this.game.physics.ninja.enableTile(this.rocks[x], this.rocks[x].frame);	
		}
	},
	collide : function(player){
		for(var x = 0; x < 21; x++){
			this.game.physics.ninja.collide(player, this.rocks[x]);		
		}	
	}
};