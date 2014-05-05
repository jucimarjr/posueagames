function Janela(ctx,width,height){
	this.width = width;
	this.height = height;
	this.ctx = ctx;
	this.ORIGEM = 0;
	
	this.desenhaJanela =  function(){
		this.limpaJanela();
	}
	
	this.limpaJanela = function(){
		this.ctx.clearRect(this.ORIGEM,this.ORIGEM,this.width,this.height);
	}
}