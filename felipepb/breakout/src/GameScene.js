BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new BreakoutGame.Game(canvas, "black");
	
	var self = this;
	
	BreakoutGame.SpriteFactory.loadTexture("images/paddleBounds.png", function() { 
		self.onResourceLoaded();
	});
};

BreakoutGame.GameScene.prototype = {
	startGame: function () {
		var block = BreakoutGame.SpriteFactory.spriteFromTexture("images/paddleBounds.png");
		block.transform.x = this.canvas.width / 2;
		block.transform.y = this.canvas.height / 2;
		
		block.update = function(delta) {
			block.transform.angle += 0.01;
			console.log("delta: " + delta);
		};
		
		this.game.addGameObject(block);
		this.game.startGame(this.targetFPS);
	},
	
	onResourceLoaded: function () {
		this.startGame();
	}
}