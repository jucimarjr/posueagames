
function keyDown(e) {
        if (e.keyCode == 37) { // up
            jogador.teclaEsquerdaPressionada = true;
        } else if (e.keyCode == 39) { // down
            jogador.teclaDireitaPressionada = true;
        } else if (e.keyCode == 27) { // esc
            teclaPause = !teclaPause;
        }
    }

function keyUp(e) {
	if (e.keyCode == 37) { // up
		jogador.teclaEsquerdaPressionada = false;
	} else if (e.keyCode == 39) { // down
		jogador.teclaDireitaPressionada = false;
	}
}


