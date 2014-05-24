Game.Load = function (game) { };

Game.Load.prototype = {
	start: function () {

		game.load.image('abertura', 'assets/tomas_960-600.png');
		game.load.spritesheet('iniciar', 'assets/iniciar_916-42-2.png', 458, 42, 2);

		game.load.image('nuvens', 'assets/nuvens_879-227.png');
		game.load.image('fundo', 'assets/cenario_960-600.png');
		game.load.image('caixa', 'assets/caixas_142-174.png');
		game.load.image('lata', 'assets/lixeira_89-174.png');
		game.load.image('cerca', 'assets/cerca_690-182.png');
		game.load.spritesheet('gato', 'assets/sequencias_150-80-18.png', 150, 80, 18);

		game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

	    game.load.start();

	},
	loadStart: function () {

		loading = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)-15+0.5, 'Carregando...', { font: '30px Arial', fill: '#fff' });
		loading.anchor.setTo(0.5, 0.5);

	},
	fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {

		loading.setText("Carregando arquivos: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

	},
	loadComplete: function () {

		loading.setText("Carregado com sucesso!");
		game.state.start('Menu');

	},
	create: function () {
		
		game.load.onLoadStart.add(this.loadStart, this);
	    game.load.onFileComplete.add(this.fileComplete, this);
	    game.load.onLoadComplete.add(this.loadComplete, this);
	    this.start();
		
	}
};