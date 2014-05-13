//Classe  Inimigos

function Inimigos(ctx, width, height) {
	this.ctx = ctx;

	this.inimigos = [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	                  [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
	                  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
	                  [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
	                  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ];

	this.qtd;

//	this.cores = [ "#E92922", "#0B968F", "#576D58", "#B9C065", "#F55C2E" ];

	this.img1 = document.createElement('img');
	this.img2 = document.createElement('img');
	this.img3 = document.createElement('img');
	this.img1.src = "assets/alvo1.png";
	this.img2.src = "assets/alvo2.png";
	this.img3.src = "assets/alvo3.png";
	this.imgs = [ this.img1, this.img2, this.img3 ];

	this.DISTANCIA = 1;
	this.COLUNAS = 10;

	this.width = (width / this.COLUNAS) - this.DISTANCIA;
	this.height = 20;
	
	this.desenhaInimigos = function() {
		this.qtd = 0;
		for (var i = 0; i < this.inimigos.length; i++) {
			for (var j = 0; j < this.inimigos[i].length; j++) {
				if (this.inimigos[i][j] > 0) {
					this.ctx.drawImage(this.imgs[this.inimigos[i][j] - 1], (j * (this.width + this.DISTANCIA)) + this.DISTANCIA, (i * (this.height + this.DISTANCIA)) + this.DISTANCIA, this.width, this.height);
					// this.ctx.beginPath();
					// this.ctx.fillStyle = this.cores[i];
					// this.ctx.rect((j*(this.width + this.DISTANCIA)) + this.DISTANCIA,(i*(this.height + this.DISTANCIA)) + this.DISTANCIA, this.width,this.height);
					// this.ctx.closePath();
					// this.ctx.fill();
					this.qtd += 1;
				}
			}
		}
	}

}