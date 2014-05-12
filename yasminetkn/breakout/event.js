function keyDown(e) {
        if (e.keyCode == 37) { // up
            teclaEsquerdaPressionada = true;
        } else if (e.keyCode == 39) { // down
            teclaDireitaPressionada = true;
        }
    }

function keyUp(e) {
	if (e.keyCode == 37) { // up
		teclaEsquerdaPressionada = false;
	} else if (e.keyCode == 39) { // down
		teclaDireitaPressionada = false;
	}
}