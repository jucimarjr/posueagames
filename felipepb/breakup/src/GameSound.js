BreakoutGame.GameSound = function (bricks, bigBrick, player) {
	this.heartSoundFrequence;
	this._heartSoundTimeControl = 0.0;
	this.bricks = bricks;
	this.bigBrick = bigBrick;
	this.player = player;
};

BreakoutGame.GameSound.prototype = new GameFramework.GameObject();

BreakoutGame.GameSound.prototype.update = function (time) {
	GameFramework.GameObject.prototype.update.apply(this, [time]);
	
	if (this.heartSoundFrequence < 0)
		return;
	
	this._heartSoundTimeControl += time.deltaTime;
	
	if (this._heartSoundTimeControl > this.heartSoundFrequence) {
        BreakoutGame.HeartBeat.play();
		this._heartSoundTimeControl = 0.0;
		
		for (var i = 0; i < this.bricks.length; i++) {
			this.bricks[i].playGlowAnimation();
		}
		
		if (this.bigBrick.active()) {
			this.bigBrick.playGlowAnimation();
		}
		
		if (!this.player.dead) {
			this.player.playGlowAnimation();
		}
	}
};

BreakoutGame.GameSound.prototype.onBallHit = function () {
	BreakoutGame.MonitorBeat.play();
};

BreakoutGame.GameSound.prototype.playGameWinSound = function () {
	BreakoutGame.MonitorBeat.dying();
};
