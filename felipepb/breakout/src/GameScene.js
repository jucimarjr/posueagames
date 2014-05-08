var BreakoutGame = { };

BreakoutGame.GameScene = function (canvas, targetFPS) {
	this.canvas = canvas;
	this.targetFPS = targetFPS;
	this.game = new GameFramework.Game(canvas, "black");
	
	var self = this;
	
	GameFramework.SpriteFactory.loadTexture("images/paddleBounds.png", function() { 
		self.onResourceLoaded();
	});
};

BreakoutGame.GameScene.prototype = {
	startGame: function () {
		var block = GameFramework.SpriteFactory.spriteFromTexture("images/paddleBounds.png");
		block.transform.x = this.canvas.width / 2;
		block.transform.y = this.canvas.height / 2;
		block.transform.scaleX = 0.5;
		block.transform.scaleY = 0.5;
		block.zOrder = 2;
		
		block.update = function(delta) {
			block.transform.angle += 0.01;
		};
		
		this.game.addGameObject(block);
		
		var staticBlock = GameFramework.SpriteFactory.spriteFromTexture("images/paddleBounds.png");
		staticBlock.transform.x = this.canvas.width / 2 + 50;
		staticBlock.transform.y = this.canvas.height / 2;
		staticBlock.zOrder = 1;
		staticBlock.opacity = 0.5;

		this.game.addGameObject(staticBlock);
		
		this.game.startGame(this.targetFPS);
	},
	
	onResourceLoaded: function () {
		this.startGame();
	}
}