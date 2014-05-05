//Objeto bola

function Bola(ctx,width,height){
	this.ctx = ctx
	this.posX = width/2;
	this.posY = height/2;
	this.raio = 0;
	this.angulo = 0;
	this.velocidadeX = 2;
	this.velocidadeY = 2;
	this.subindo = false;
	this.ORIGEM = 0;
	
	this.desenhaBola = function desenhaBola(raio){
		this.raio = raio;
		this.ctx.beginPath();
		this.ctx.arc(this.posX, this.posY, this.raio, this.ORIGEM, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	this.movimentaBola = function(){
		this.posX += this.velocidadeX;
		this.posY += this.velocidadeY;
	}

}