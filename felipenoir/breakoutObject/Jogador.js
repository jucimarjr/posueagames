// Classe jogador

function Jogador(ctx, width, height) {
	this.ctx = ctx;
	this.width = 75;
	this.height = 10;
	this.velocidade = 5;
	this.posX = (width - this.width) / 2;
	this.posY = height - this.height;

	this.desenhaJogador = function() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
	}

	this.movimentaJogador = function(isDireita, isEsquerda, limite) {
		if (isDireita != isEsquerda)
			if (isDireita) {
				this.posX += this.velocidade;
				if (this.posX > limite - this.width)
					this.posX = limite - this.width;
			} else if (isEsquerda) {
				this.posX -= this.velocidade;
				if (this.posX < 0)
					this.posX = 0;
			}
	}

}