GameFramework.PauseAnimation = function (duration, callback) {
    GameFramework.Animation.call(this);
    this.duration = duration;
    this.onCompleted = callback;
    return this;
};

GameFramework.PauseAnimation.prototype = new GameFramework.Animation();

GameFramework.PauseAnimation.prototype.update = function (time) {
    GameFramework.Animation.prototype.update.apply(this, [time]);
    
    var onCompleted = this.onCompleted;
    var _onCompleted = this._onCompleted;

    if (this.state === GameFramework.Animation.Status.Running) {
        if (this._currentTime >= this.duration) {
            this.state = GameFramework.Animation.Status.Stopped;
            if (typeof(onCompleted) === 'function') {
                onCompleted(this);
            }
            if (typeof(_onCompleted === 'function')) {
                _onCompleted(this);
            }
        }
    }
};
