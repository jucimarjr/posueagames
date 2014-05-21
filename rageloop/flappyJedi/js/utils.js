
(function(){
    
    var Utils = {};

    Utils.randomIntFromInterval = function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    window.Utils = Utils;

})()

