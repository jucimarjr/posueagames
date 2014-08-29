/*global State, Config*/

SelectPlayer = function (game, player) {
	"use strict";
	this.game = game;
	this.player = player;
	this.setaDir;
	this.setaEsq;
	this.select;
};

SelectPlayer.prototype = {
	show: function () {
		this.select = this.game.add.button(this.game.world.centerX, this.game.world.height, 'btnSelect', this.select, this, 0, 0, 0);
		this.select.anchor.set(0.5, 0);

		this.setaDir = this.game.add.button(this.select.x+this.select.width+10, this.game.world.height, 'btnSeta', this.nextPlayer, this, 0, 0, 0);
		this.setaDir.anchor.set(0.5, 0);

		this.setaEsq = this.game.add.button(this.select.x-this.select.width-10, this.game.world.height, 'btnSeta', this.prevPlayer, this, 0, 0, 0);
		this.setaEsq.scale.x = -1;
		this.setaEsq.anchor.set(0.5, 0);

		this.startAnimations();
	},

	startAnimations: function(){
		this.game.add.tween(this.select).to( { y: this.select.y-this.select.height }, 2400, Phaser.Easing.Bounce.Out, true);
		this.game.add.tween(this.setaDir).to( { y: this.setaDir.y-this.setaDir.height }, 2400, Phaser.Easing.Bounce.Out, true);
		this.game.add.tween(this.setaEsq).to( { y: this.setaEsq	.y-this.setaDir.height }, 2400, Phaser.Easing.Bounce.Out, true);
	},
	
	select: function(){
		localStorage.setItem("player", Config.player.op);
		this.game.state.start('GamePlay');
	},

	prevPlayer: function(){
		Config.player.op-=1;
		if(Config.player.op <0)
			Config.player.op = 3;
		this.player.loadTexture('player'+Config.player.op, 0);
	},

	nextPlayer: function(){
		Config.player.op+=1;
		if(Config.player.op >3)
			Config.player.op = 1;
		this.player.loadTexture('player'+Config.player.op, 0);
	}
};