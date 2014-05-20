
(function() {

    var UserData = {};

    UserData.highscore = {
        
        score: 0,
        id: 'flappyjedy_score',

        get: function() {

            if (typeof window.localStorage == 'undefined'){
                return -1;
            }
            
            this.score = localStorage.getItem(this.id);

            if (this.score === null) {
                this.score = 0;
            }

            return parseInt(this.score);
        },

        set: function(value) {

            if (typeof value !== 'number') {
                return -1;
            }

            if (typeof window.localStorage == 'undefined') {
                return -2;
            }

            if (value > this.get()) {
                this.score = value;
                localStorage.setItem(this.id, value);
            } 
        }

    };

    window.UserData = UserData;

})();

