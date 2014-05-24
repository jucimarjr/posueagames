GameFramework.Animation = function () {
    GameFramework.GameObject.call(this);
    
    this.duration = 0;
    this.state = GameFramework.Animation.Status.Stopped;
    this.onCompleted = null;
    this._onCompleted = null;
    this._currentTime = 0;
    
    return this;
};

GameFramework.Animation.Status = {
    Stopped: 0,
    Paused: 1,
    Running: 2
};

GameFramework.Animation.prototype = new GameFramework.GameObject();

GameFramework.Animation.prototype.begin = function () {
    this.state = GameFramework.Animation.Status.Running;
    this._currentTime = 0;
};
    
GameFramework.Animation.prototype.stop = function () {
    this.state = GameFramework.Animation.Status.Stopped;
    this._currentTime = 0;
};

GameFramework.Animation.prototype.update = function (time) {
    GameFramework.GameObject.prototype.update.apply(this, [time]);
    if (this.state === GameFramework.Animation.Status.Running)
        this._currentTime += time.deltaTime;
};

GameFramework.Animation.prototype.dispose = function () {
    GameFramework.GameObject.prototype.dispose.apply(this);
    this.duration = undefined;
    this.state = undefined;
    this.onCompleted = undefined;
    this._onCompleted = undefined;
    this._currentTime = undefined;
};

GameFramework.Animation.play = function (animation) {
    var game = GameFramework.Game.Instance;
    animation._onCompleted = function () {
        game.removeGameObject(animation);
    };
    game.addGameObject(animation);
    animation.begin();
};
