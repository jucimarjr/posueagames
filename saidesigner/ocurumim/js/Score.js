Curumim.Score = function(game) 
{
	this.game = game;

	this.numLifes = 3;
	this.numPoints = 0;
	this.numBullets = 0;

	this.txtLifes;
	this.txtPoints;
	this.txtBullets;
};

Curumim.Score.prototype = 
{
	create: function() 
	{
		var lifes = this.game.add.sprite(Config.score.lifes.img.x, Config.score.lifes.img.y, 'fruitsBig');
		lifes.frame = Config.fruit.life.frame;
		lifes.fixedToCamera = true;

		this.txtLifes = this.game.add.text(Config.score.lifes.txt.x, Config.score.lifes.txt.y, '', Config.score.lifes.txt.style);		
		this.txtLifes.fixedToCamera = true;

		var points = this.game.add.sprite(Config.score.points.img.x, Config.score.points.img.y, 'fruitsBig');
		points.frame = Config.fruit.point.frame;
		points.fixedToCamera = true;

		this.txtPoints = this.game.add.text(Config.score.points.txt.x, Config.score.points.txt.y, '', Config.score.points.txt.style);		
		this.txtPoints.fixedToCamera = true;		

		var bullets = this.game.add.sprite(Config.score.bullets.img.x, Config.score.bullets.img.y, 'fruitsBig');
		bullets.frame = Config.fruit.bullet.frame;
		bullets.fixedToCamera = true;

		this.txtBullets = this.game.add.text(Config.score.bullets.txt.x, Config.score.bullets.txt.y, '', Config.score.bullets.txt.style);		
		this.txtBullets.fixedToCamera = true;				
	},

	update: function()
	{
		this.txtLifes.text = pad(this.numLifes, 2);
		this.txtPoints.text = pad(this.numPoints, 2);
		this.txtBullets.text = pad(this.numBullets, 2);
	},

	updateLife: function(value)
	{
		var text = this.game.add.text(Config.score.lifes.txt.x + 30, Config.score.lifes.txt.y, 
			value > 0 ? '+' + value : value , Config.score.lifes.txt.styleBig);		
		text.fixedToCamera = true;

		var tween = this.game.add.tween(text);

	 	tween.onComplete.add(function() {
			this.numLifes += value;
			text.destroy();
	 	}, this);

		tween.to({ alpha: 0 }, 700, null).start();
	},

	addBullets: function()
	{
		var text = this.game.add.text(Config.score.bullets.txt.x + 30, Config.score.bullets.txt.y, '+10', Config.score.bullets.txt.styleBig);		
		text.fixedToCamera = true;

		var tween = this.game.add.tween(text);

	 	tween.onComplete.add(function() {
			this.numBullets += 10;
			text.destroy();
	 	}, this);

		tween.to({ alpha: 0 }, 700, null).start();
	},	

	addPoints: function()
	{
		var text = this.game.add.text(Config.score.points.txt.x + 30, Config.score.points.txt.y, '+1', Config.score.points.txt.styleBig);		
		text.fixedToCamera = true;

		var tween = this.game.add.tween(text);

	 	tween.onComplete.add(function() {
			this.numPoints++;
			text.destroy();			
	 	}, this);

		tween.to({ alpha: 0 }, 700, null).start();
	},
}