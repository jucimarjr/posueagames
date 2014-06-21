(function (app_container) {
    
    function Menu() {};

    Menu.prototype = {

        create: function () {

            this.game.add.sprite(0, 0, 'menu_bg');

            this.startbutton = this.game.add.button(360,  460, 'start_btn', this.onPlayClick, this, 0, 1, 0);
            this.startbutton.anchor.set(0.5, 0.5);

            this.resetbutton = this.game.add.button(610, 460, 'credits_btn', this.onCreditsClick, this, 1, 0, 1);
            this.resetbutton.anchor.set(0.5, 0.5);

            this.howtobutton = this.game.add.button(this.game.width/2, 560, 'howto_btn', this.onHowtoClick, this, 1, 0, 1);
            this.howtobutton.anchor.set(0.5, 0.5);

            this.clickAudio = this.game.add.audio('click');

        },

        update: function() {},

        onPlayClick: function() {
            this.clickAudio.play();
            this.game.state.start('Level1');
        },

        onCreditsClick: function() {
            this.clickAudio.play();
            this.game.state.start('Credits');
        },

        onHowtoClick: function() {
            this.clickAudio.play();
            this.game.state.start('Howto');
        },
    };

    app_container.Menu = Menu;

}(window.app_container = window.app_container || {}));