GameFramework.SequentialAnimation = function (callback) {
    GameFramework.Animation.call(this);

    this.onCompleted = callback;
    this.animations = new Array();
    this._currentAnimationIndex = -1;

    return this;
};

GameFramework.SequentialAnimation.prototype = new GameFramework.Animation();

GameFramework.SequentialAnimation.prototype.count = function () {
    return this.animations.length;
};

GameFramework.SequentialAnimation.prototype.animationAt = function (i) {
    return this.animations[i];
};

GameFramework.SequentialAnimation.prototype.add = function (animation) {
    this.push(animation);
};

GameFramework.SequentialAnimation.prototype.push = function (animation) {
    if (!animation || 
        this.state === GameFramework.Animation.Status.Running ||
        this.state === GameFramework.Animation.Status.Paused) {
        return;
    }
    var self = this;
    var lastAnimation = this.lastAnimation();
    if (lastAnimation) {
        lastAnimation._onCompleted = function () {
            self._animationCompleted(animation);
        };
    }
    this.animations.push(animation);
};

GameFramework.SequentialAnimation.prototype.remove = function (animation) {
    if (!animation ||
        this.state === GameFramework.Animation.Status.Running ||
        this.state === GameFramework.Animation.Status.Paused) {
        return;
    }
    GameFramework.removeObjectFromArray(this.animations, animation);
};

GameFramework.SequentialAnimation.prototype.clear = function () {
    this.stop();
    GameFramework.clearArray(this.animation);
};

GameFramework.SequentialAnimation.prototype.begin = function () {
    var self = this;
    var animations = this.animations;
    var onCompleted = this.onCompleted;
    var _onCompleted = this._onCompleted;
    
    if (animations.length === 0) {
        this.state = GameFramework.Animation.Status.Stopped;
        if (typeof(onCompleted) === 'function') {
            onCompleted(this);
        }
        if (typeof(_onCompleted) === 'function') {
            _onCompleted(this);
        }
        return;
    }
    
    this.lastAnimation()._onCompleted = function () {
        self._animationCompleted(null);
    };
    
    this._currentAnimationIndex = 0;
    GameFramework.Animation.prototype.begin.apply(this);
    animations[0].begin();
};

GameFramework.SequentialAnimation.prototype.update = function (time) {
    var animations = this.animations;

    if (this.state !== GameFramework.Animation.Status.Running ||
        animations.length === 0) {
        return;
    }
    
    var currentAnimation = animations[this._currentAnimationIndex];
    if (currentAnimation) {
        currentAnimation.update(time);
    }
};

GameFramework.SequentialAnimation.prototype.dispose = function() {
    GameFramework.Animation.prototype.dispose.apply(this);
    
    var animations = this.animations;
    GameFramework.clearArray(animations);
    this.animations = undefined;
};

GameFramework.SequentialAnimation.prototype.lastAnimation = function() {
    var animations = this.animations;
    if (animations.length === 0) {
        return null;
    }
    return animations[animations.length - 1];
};

GameFramework.SequentialAnimation.prototype._animationCompleted = function(nextAnimation) {
    var onCompleted = this.onCompleted,
        _onCompleted = this._onCompleted,
        animations = this.animations;

    if (this._currentAnimationIndex + 1 === animations.length) {
        this.state = GameFramework.Animation.Status.Stopped;
        if (typeof(onCompleted) === 'function') {
            onCompleted(this);
        }
        if (typeof(_onCompleted) === 'function') {
            _onCompleted(this);
        }
    } else {
        this._currentAnimationIndex++;
        nextAnimation.begin();
    }
};
