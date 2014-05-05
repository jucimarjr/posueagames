// Classe jogador

function Jogador(ctx,width, height){
	this.ctx = ctx;
	this.width = 75;
	this.height = 10;
	this.velocidade = 5;
	this.posX = width/2;
	this.posY = height - this.height;
	
	
	this.desenhaJogador = function(){
		this.ctx.fillRect(this.posX - this.width/2,this.posY,this.width,this.height);
	}
	
	this.movimentaJogador = function(isDireita,isEsquerda){
		if(isDireita)
			this.posX += this.velocidade;
		else if(isEsquerda)
			this.posX -= this.velocidade;
	}

}