//Objeto bola

function Bola(ctx, posX, width, height) {
	this.ctx = ctx
	this.posX = posX;
	this.posY = height / 2;
	this.raio = 10;
	this.angulo = 0;
	this.velocidadeX = 2;
	if (posX < width / 2)
		this.velocidadeX = -this.velocidadeX;
	this.velocidadeY = 2;
	this.subindo = false;
	this.ORIGEM = 0;
	this.tempo = 0;

	this.desenhaBola = function desenhaBola() {
		this.ctx.beginPath();
		this.ctx.arc(this.posX, this.posY, this.raio, this.ORIGEM, Math.PI * 2,
				true);
		this.ctx.closePath();
		this.ctx.fill();
	}

	this.movimentaBola = function(limite) {
		this.posX += this.velocidadeX;
		if (this.posX < 0 || this.posX > limite - this.raio)
			this.velocidadeX = -this.velocidadeX;

		this.posY += this.velocidadeY;
		if (this.posY - this.raio < 0)
			this.velocidadeY = -this.velocidadeY;
	}

}
