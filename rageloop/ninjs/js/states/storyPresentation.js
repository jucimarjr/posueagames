
(function (app_container) {

    var introText = [
        " ",
        "- Ash, Ash, acorde! \n- Onde estou?", 
        "- Você está preso, no calabouço de Ryokan. \nSubaru aprisionou você.", 
        "- Por que ele faria isso? \n- Ele acredita que você é o único capaz de impedi-lo de unificar todos \nos clãs, e se tornar invecível. Você precisa deerrota-lo.",
        "- Nesse momento ele planeja um ataque feroz à sede do clã \nda estrela negra. Tome cuidado, seus capangas irão ataca-lo, \neles podem ser mortais.", 
        "- Seja forte! \nVocê tem que coletar os itens azuis, eles enfraquecerão Subaru. \nBoa sorte!",
        //"No final da história o herói consegue \nvencer/derrotar o vilão e sai do Ryokan,",
        //"onde ele terá que enfrentar um exército de ninjas \n(mas o jogo não mostra essa batalha, só fica subentendido)."
    ];
    
    function StoryPresentation() {

        this.content = null;

        this.index = 0;

        this.line = '';
    };

    StoryPresentation.prototype = {

        create: function () {

            this.content = introText;

            this.stage.backgroundColor = '#000';

            var style = { font: "22px pixelFont", fill: "#ffffff"};

            this.storyText = this.game.add.text(10, 450, '', style);

            var skipText = this.game.add.text(this.game.width, this.game.height, 'press "S" to skip.', style); 
            skipText.anchor.setTo(1, 1);

            this.nextLine();
        },

        update: function() {
            //SKIP
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.exit();
            }
        },

        updateLine: function() {

            if (this.line.length < this.content[this.index].length) {
                this.line = this.content[this.index].substr(0, this.line.length + 1);
                this.storyText.setText(this.line);
            }
            else {
                //  Wait 2 seconds then start a new line
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
            }

        },

        nextLine: function() {

            this.index++;

            if (this.index < this.content.length) {
                this.line = '';
                this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
            } else {
                this.exit();
            }


        },

        exit: function() {
            this.game.state.start('Menu');
        }

    };

    app_container.StoryPresentation = StoryPresentation;

}(window.app_container = window.app_container || {}));