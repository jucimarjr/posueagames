// Namespace GameFramework encapsulates class Game to detach it from the wild world of the deepweb!GameFramework
var GameFramework = { };

// Constructor for the Game class.
GameFramework.Game = function (canvas, backgroundColor, debugDraw) {
	// Reference to the canvas html5 object.
	this.targetFPS;
	this.backgroundColor = backgroundColor;
	
	this._debugDraw = debugDraw;
	this._canvas = canvas;
	this._context2D = canvas.getContext("2d");
	this._gameObjects = new Array();
	this._mainIntervalID;
	this._time = {
		startTime: 0, elapsedTime: 0, deltaTime: 0, _lastUpdateTime: 0
	};
	
	if (!GameFramework.Game.Instance) {
		GameFramework.Game.Instance = this;
	} else {
		console.error("Trying to instantiate Breakout.Game again. It should be a singleton.");
	}
	
	return this;
};

GameFramework.Game.Instance;

GameFramework.Game.prototype = {

	startGame: function (targetFPS) {
		var self = this;
		
		self.targetFPS = targetFPS;
		self._time.startTime = +new Date();
		self._mainIntervalID = setInterval(function() { self.update(self); } , 1000 / self.targetFPS);
	},

	update: function () {
		var self = this;
		
		var millisecondsNow = +new Date();

		self._time.deltaTime = millisecondsNow - self._time._lastUpdateTime;
		self._time.elapsedTime += self._time.deltaTime;
		
		for (var i = 0; i < self._gameObjects.length; i++) {
			self._gameObjects[i].update(self._time);
		}
		
		self._context2D.fillStyle = self.backgroundColor;
		self._context2D.fillRect(0, 0, self._canvas.width, self._canvas.height);
		
		for (var i = 0; i < self._gameObjects.length; i++) {
			self._gameObjects[i].render(self._time, 
										self._context2D, 
										self._debugDraw);
		}
		
		self._time._lastUpdateTime = millisecondsNow;
	},
	
	addGameObject: function (newGameObject) {
		var self = this;
		
		newGameObject.init();
		self._gameObjects.push(newGameObject);
		self._gameObjects.sort(self._compareGameObjects);
	},
	
	removeGameObject: function (gameObject) {
		var index = this._gameObjects.indexOf(gameObject);
		
		if (index !== -1) {
			var removedObjects = this._gameObjects.splice(index, 1);
			removedObjects[0].dispose();
		}
	},
		
	_compareGameObjects: function (a, b) {
		if (a.zOrder === undefined || b.zOrder === undefined) {
			return 1;
		} else {
			return a.zOrder - b.zOrder;
		}
	}
};
