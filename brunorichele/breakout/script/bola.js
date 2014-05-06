// Bola (JS Object)
var bola = {
	raio: 10, 
	x: null, 
	y: null,
	baixo: false,
	angulo: 5,
	velocidade: 10,
	
	render : function(root){
		root.fillStyle = "red";
		root.beginPath();
		root.arc(bola.x, bola.y, bola.raio, 0, Math.PI*2, true);
		root.closePath();
		root.fill();
	}
};