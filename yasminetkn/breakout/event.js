function keyDown(e) {
        if (e.keyCode == 37) { // up
            jogador.teclaEsquerdaPressionada = true;
        } else if (e.keyCode == 39) { // down
            jogador.teclaDireitaPressionada = true;
        }
    }

function keyUp(e) {
	if (e.keyCode == 37) { // up
		jogador.teclaEsquerdaPressionada = false;
	} else if (e.keyCode == 39) { // down
		jogador.teclaDireitaPressionada = false;
	}
}

