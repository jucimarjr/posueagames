GameFramework.PropertyAnimation = function (gameObject,
                                    property,
                                    from,
                                    to,
                                    duration,
                                    easingType,
                                    onCompleted) {
    GameFramework.Animation.call(this);
    
    if (easingType === undefined)
        easingType = GameFramework.Easing.Type.Linear;

    this.from = from;
    this.to = to;
    this.duration = duration;
    this.state = GameFramework.Animation.Status.Stopped;
    this.onCompleted = onCompleted;

    this._gameObject = gameObject;
    this._property = property;
    this._propertyType = typeof(gameObject[property]);
    this._easing = new GameFramework.Easing(easingType);
    this._currentTime = 0;
    
    return this;
};

GameFramework.PropertyAnimation.prototype = new GameFramework.Animation();

GameFramework.PropertyAnimation.prototype.begin = function () {
    var gameObject = this._gameObject,
        property = this._property,
        propertyType = this._propertyType,
        from = this.from,
        to = this.to;
        
    if (propertyType === 'function') {
        gameObject[property](from);
    } else {
        gameObject[property] = from;
    }
    
    this.state = GameFramework.Animation.Status.Running;
    this._currentTime = 0;
    
    if (this.duration == 0) {
        this.state = GameFramework.Animation.Status.Stopped;
        if (propertyType === 'function') {
            gameObject[property](to);
        } else {
            gameObject[property] = to;
        }
        
        var onCompleted = this.onCompleted;
        if (typeof(onCompleted) === 'function')
            onCompleted(this);
        
        var _onCompleted = this._onCompleted;
        if (typeof(_onCompleted) === 'function')
            _onCompleted(this);
    }
};

GameFramework.PropertyAnimation.prototype.update = function (time) {
    if (this.state != GameFramework.Animation.Status.Running)
        return;
    
    var gameObject = this._gameObject;
    var property = this._property;
    var propertyType = this._propertyType;
    var from = this.from;
    var to = this.to;
    var progress = this._easing.valueForProgress(this._currentTime / parseFloat(this.duration));
    var value = gameObject[property];
    var propertyIsFunction = false;
        
    //console.log("property: " + property + " | " + propertyType + " | " + from + " | " + to + " | " + progress);
        
    if (propertyType === 'function') {
        value = gameObject[property]();
        propertyType = typeof(value);
        propertyIsFunction = true;
    }
    
    if (propertyType === 'number') {
        if (propertyIsFunction) {
            gameObject[property](from + (to - from) * progress);
        } else {
            gameObject[property] = from + (to - from) * progress;
        }
    }
    
    this._currentTime += time.deltaTime;
    
    if (this._currentTime >= this.duration) {
        this.state = GameFramework.Animation.Status.Stopped;
        if (propertyIsFunction) {
            gameObject[property](to);
        } else {
            gameObject[property] = to;
        }
        
        var onCompleted = this.onCompleted;
        if (typeof(onCompleted) === 'function')
            onCompleted(this);
        
        var _onCompleted = this._onCompleted;
        if (typeof(_onCompleted) === 'function') {
            _onCompleted(this);
        }
    }
};

GameFramework.PropertyAnimation.prototype.dispose = function () {
    GameFramework.Animation.prototype.dispose.apply(this);
    this.from = undefined;
    this.to = undefined;
    this.duration = undefined;
    this.state = undefined;
    this.onCompleted = undefined;

    this._gameObject = undefined;
    this._property = undefined;
    this._propertyType = undefined;
    this._easing = undefined;
    this._currentTime = undefined;
};
