function Vidas(ctx) {

	this.ctx = ctx;
	this.qtd = 3;

	this.desenha = function() {
		this.ctx.beginPath();
		this.ctx.fillStyle = "#FFFFFF";
		for (var i = 0; i < this.qtd; i++) {
			this.ctx.arc((i + 1) * 20, 53, 7, 0, Math.PI * 2, true);
		}
		this.ctx.closePath();
		this.ctx.fill();
	}

	this.removeVida = function() {
		this.qtd -= 1;
	}

}