Game = {};

var w = 960;
var h = 600;
// var score = 0;
// var best_score = 0;
// var sound = true;

var cat;
var fence;
var obstacles;
var metrosPercorridos = 0;
var score;
var gameOver;
var obstacleTime = 0;
var scoreTime = 0;
var music;

var loading;
var iniciar;
var i;
var a;
var s;

WebFontConfig = {

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Nunito']
    }

};

function rand(num){ return Math.floor(Math.random() * num) };

Game.Boot = function (game) { };

Game.Boot.prototype = {
	create: function() {
		this.game.state.start('Load');
	},
	preload: function() {
	    //  Load the Google WebFont Loader script
	    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},	
};