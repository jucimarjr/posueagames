function Pontuacao(ctx, x, y) {

	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.valor = 0;

	this.desenha = function() {
		this.ctx.font = "28pt Helvetica";
		this.ctx.fillStyle = "#FF00FF";
		this.ctx.fillText(this.valor, this.x, this.y);
	}
	
	this.incrementa = function(valor) {
		this.valor += valor;
	}

}