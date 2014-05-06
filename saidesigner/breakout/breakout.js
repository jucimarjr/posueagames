/**
 * 
 * BreakoutBoard Object
 * 
 */

function BreakoutBoard(canvasElementId) {

	var canvasElement = document.getElementById(canvasElementId);

	Board.call(this, canvasElement.getContext("2d"), 0, 0, canvasElement.width,
			canvasElement.height);

	this.bars = new Array();
	this.initBars();
}

BreakoutBoard.prototype = new Board();
BreakoutBoard.prototype.constructor = BreakoutBoard;
BreakoutBoard.prototype.bars = null;

BreakoutBoard.prototype.initBars = function() {

	var BAR_NUM_COL = 10;
	var BAR_NUM_LIN = 7;
	var BAR_HEIGHT = 20;
	var BAR_SPACE = 1;
	var BAR_WIDTH = (this.width - (BAR_NUM_LIN + 1) * BAR_SPACE) / BAR_NUM_COL;
	var COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8f00ff"];

	var posX = this.x;
	var posY = this.y;
	var colorIndex = 0;
	
	for (var i = 0; i < BAR_NUM_COL * BAR_NUM_LIN; i++) {

		var bar = new Bar(posX, posY, BAR_WIDTH, BAR_HEIGHT);
		bar.color = COLORS[colorIndex];
		
		this.add(bar);

		posX += BAR_WIDTH + BAR_SPACE;
		if (posX >= this.width) {
			posX = this.x;
			posY += BAR_HEIGHT + BAR_SPACE;
			colorIndex++;
			if (colorIndex == COLORS.length) {
				colorIndex = 0;
			}
		}
	}
};
