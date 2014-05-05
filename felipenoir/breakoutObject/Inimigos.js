//Classe  Inimigos

function Inimigos(ctx,width,height){
	this.ctx = ctx;
	this.QTDLINHAS = 5;
	this.QTDCOLUNAS = 5;
	this.width = (width/this.QTDLINHAS) -1;
	this.height = 20; 
	this.DISTANCIA = 1;
	
	this.inimigos = new Array(this.QTDLINHAS);
	for(var i =0; i < this.QTDLINHAS; i++){
		this.inimigos[i] = new Array(this.QTDCOLUNAS)
		for(var j = 0; j < this.QTDCOLUNAS; j++){
			this.inimigos[i][j] = 1;
		}
	}
	
	this.desenhaInimigos = function(){
		for(var i =0; i < this.QTDLINHAS; i++){
			for(var j =0; j < this.QTDCOLUNAS; j++){
				if(this.inimigos[i][j] == 1){
					this.ctx.beginPath();
					this.ctx.rect((j*(this.width + this.DISTANCIA)) + this.DISTANCIA,(i*(this.height + this.DISTANCIA)) + this.DISTANCIA, this.width,this.height);
					this.ctx.closePath();
					this.ctx.fill();
				}
			}
		}
	}
		
}