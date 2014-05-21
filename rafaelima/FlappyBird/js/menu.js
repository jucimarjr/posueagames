var menu_state = { create: create, update: update };

	//Tela de Menu
	function create() {
		var background = game.add.sprite(0, 0, 'background');
	}
	
	// Começa o jogo
	function update() {
		game.state.start('play');
	}