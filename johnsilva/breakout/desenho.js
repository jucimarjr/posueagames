function desenhar(x, y, w, h, style) {
	context.beginPath();
	if (style) {
		context.fillStyle = style;
	}
	context.rect(x, y, w, h);
	context.fill();
}

function desenharBorda() {
	context.beginPath();
	context.moveTo(bordaW,h); 
	context.lineTo(bordaW,bordaW); 
	context.lineTo(w - bordaW,bordaW); 
	context.lineTo(w - bordaW,h);
	context.lineTo(w,h);
	context.lineTo(w,0);
	context.lineTo(0,0);
	context.lineTo(0,h);
	context.closePath(); 
	context.fillStyle = "silver"; 
	context.fill();
}

