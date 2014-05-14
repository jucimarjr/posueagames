//Objeto bola

function Bola(ctx, posX, posY) {
	this.ctx = ctx
	this.raio = 7;
	this.posX = posX;
	this.posY = posY;
	this.angulo = 0;
	this.velocidadeX = 0;
	this.velocidadeY = 0;
	this.subindo = false;
	this.ORIGEM = 0;
	this.tempo = 0;

	this.VELX = 8;
	this.VELY = 16;

	this.PARADOX = 10;

	this.PARADO = 0;
	this.MOVIMENTANDO = 1;
	this.state = this.PARADO;

	this.desenhaBola = function desenhaBola() {
		this.ctx.beginPath();
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.arc(this.posX, this.posY, this.raio, this.ORIGEM, Math.PI * 2,
				true);
		this.ctx.closePath();
		this.ctx.fill();
	}

	this.movimentaBola = function(limite) {
		this.posX += this.velocidadeX;
		if (this.posX - this.raio < 0 || this.posX > limite - this.raio) {
			this.velocidadeX = -this.velocidadeX;
			if (this.posX - this.raio < 0)
				this.posX = this.raio;
			else
				this.posX = limite - this.raio;
		}

		this.posY += this.velocidadeY;
		if (this.posY - this.raio < 0) {
			this.velocidadeY = -this.velocidadeY;
			this.posY = this.raio;
		}
	}

	this.movimentaParado = function(limite, isDireita, isEsquerda) {
		if (isDireita != isEsquerda) {
			if (isEsquerda) {
				this.posX -= this.PARADOX;
				if (this.posX < 35) {
					this.posX = 35;
				}
			} else {
				this.posX += this.PARADOX;
				if (this.posX > limite - 35) {
					this.posX = limite - 35;
				}
			}
		}
	}

	this.lancarBola = function() {
		this.state = this.MOVIMENTANDO;
		this.velocidadeX = 0;
		this.velocidadeY = -this.VELY;
	}

}
