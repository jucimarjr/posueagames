/*global State, Config*/

GameOver = function (game, style, score) {
	"use strict";
	this.game = game;
	this.style = style;
	this.score = score;
	this.bgGO;
	this.labelBestScore;
	this.labelFinalScore;
	this.btnPlay;
	this.btnPlayer;
};

GameOver.prototype = {
	show: function () {
		this.bgGO = this.game.add.sprite(-this.game.world.centerX, 50, 'bgGameOver');
		this.bgGO.anchor.set(0.5, 0);

		this.game.add.tween(this.bgGO).to( { x: this.game.world.centerX }, 2400, Phaser.Easing.Bounce.Out, true);

		var hScore = localStorage.getItem("highscore"); 
		if (this.score > hScore) {
			hScore = this.score;
        	localStorage.setItem("highscore", hScore);       	
    	}

    	this.labelBestScore = this.game.add.text(this.game.world.centerX,-200, 'Best: ' + hScore, this.style);
        this.labelBestScore.anchor.set(0.5,0);

        this.labelFinalScore = this.game.add.text(this.game.world.centerX,-200, 'Score: ' + this.score, this.style);
        this.labelFinalScore.anchor.set(0.5,0);

    	this.game.add.tween(this.labelBestScore).to( { y: 200 }, 2400, Phaser.Easing.Bounce.Out, true);
    	this.game.add.tween(this.labelFinalScore).to( { y: 250 }, 2400, Phaser.Easing.Bounce.Out, true);    	

    	this.btnPlay = this.game.add.button(this.game.world.centerX, this.game.world.height, 'btnPlay', this.restart, this, 1, 0, 1);
    	this.btnPlay.anchor.set(0.5,0);

    	this.btnPlayer = this.game.add.button(this.btnPlay.x+this.btnPlay.width+10, this.game.world.height, 'btnPlayer', this.restart, this, 1, 0, 1);
    	this.btnPlayer.anchor.set(0.5,0);

    	this.game.add.tween(this.btnPlay).to( { y: this.btnPlay.y-this.btnPlay.height }, 1000, Phaser.Easing.Bounce.Out, true);
    	this.game.add.tween(this.btnPlayer).to( { y: this.btnPlayer.y-this.btnPlayer.height }, 1000, Phaser.Easing.Bounce.Out, true);
	},
	restart: function(){
		this.game.state.start('GamePlay');
	}
};