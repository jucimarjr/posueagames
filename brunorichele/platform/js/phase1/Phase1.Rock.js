Phase1.Rock = {
	itemRocks : [
		["assets/phase1/images/rock_90-75.png", "rock_90-75"],
		["assets/phase1/images/rock_92-230.png", "rock_92-230"],
		["assets/phase1/images/rock_100-35.png", "rock_100-35"],
		["assets/phase1/images/rock_125-75.png", "rock_125-75"],
		["assets/phase1/images/rock_220-85.png", "rock_220-85"],	
		["assets/phase1/images/rock_370-85.png", "rock_370-85"],	
		["assets/phase1/images/rock_371-108.png", "rock_371-108"],	
		["assets/phase1/images/rock_412-190.png", "rock_412-190"],	
		["assets/phase1/images/rock_500-100.png", "rock_500-100"],	
		["assets/phase1/images/rock_515-130.png", "rock_515-130"],	
		["assets/phase1/images/rock_540-190.png", "rock_540-190"],	
		["assets/phase1/images/rock_550-165.png", "rock_550-165"],	
		["assets/phase1/images/rock_655-230.png", "rock_655-230"],
		["assets/phase1/images/rock2_655-230.png", "rock2_655-230"],			
		["assets/phase1/images/rock_825-100.png", "rock_825-100"],	
		["assets/phase1/images/rock_925-220.png", "rock_925-220"]		
	],
	posItem : [
		{"x": 3000, "y": 354,  "item": "rock2_655-230"},	
		{"x": 1764, "y": 1772, "item": "rock_90-75"},
		{"x": 0,    "y": 1620, "item": "rock_92-230"},
		{"x": 212,  "y": 406,  "item": "rock_100-35"},
		{"x": 348,  "y": 504,  "item": "rock_100-35"},
		{"x": 245,  "y": 852,  "item": "rock_100-35"},
		{"x": 2510, "y": 1413, "item": "rock_100-35"},
		{"x": 2638, "y": 1505, "item": "rock_100-35"},		
		{"x": 2792, "y": 1582, "item": "rock_100-35"},				
		{"x": 1336, "y": 1772, "item": "rock_125-75"},
		{"x": 1538, "y": 1772, "item": "rock_125-75"},
		{"x": 0,    "y": 240,  "item": "rock_220-85"},
		{"x": 1383, "y": 1275, "item": "rock_370-85"},
		{"x": 2634, "y": 1737, "item": "rock_371-108","scaleX":  1},
		{"x": 99,   "y": 1659, "item": "rock_412-190","scaleX":  1},
		{"x": 1996, "y": 1256, "item": "rock_500-100","scaleX":  1},
		{"x": 1986, "y": 1716, "item": "rock_515-130","scaleX":  1},
		{"x": 738,  "y": 1170, "item": "rock_540-190","scaleX":  1},
		{"x": 681,  "y": 1686, "item": "rock_550-165","scaleX":  1},
		{"x": 0,    "y": 1021, "item": "rock_655-230","scaleX":  1},				
		{"x": 1552, "y": 704,  "item": "rock_825-100","scaleX":  1},
		{"x": 478,  "y": 587,  "item": "rock_925-220","scaleX":  1}		
	],
	init : function(){				
		for(var x = 0; x < this.itemRocks.length; x++){
			this.game.load.image(this.itemRocks[x][1], this.itemRocks[x][0]);		
		}
	},
	create : function(){
		this.rocks = []; 	
		for(var x = 0; x < this.posItem.length; x++){		
			this.rocks[x] = this.game.add.sprite(this.posItem[x].x, this.posItem[x].y, this.posItem[x].item);
			
			this.game.physics.p2.enable(this.rocks[x], true);
						
			this.rocks[x].body.clearShapes();
			this.rocks[x].body.loadPolygon('physicsDataRocks', this.posItem[x].item);
			this.rocks[x].body.static = true;
			this.rocks[x].body.fixedRotation = true;
		}	
					
		return this.rocks;
	},
	collide : function(player){
	}
};