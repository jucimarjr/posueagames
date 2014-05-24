GameFramework.Easing = function (type) {
    this._type = type;
    this._backEase = false;

    switch (type) {
        case GameFramework.Easing.Type.InCubic:
            this._valueForProgress = GameFramework.Easing.easeInCubic;
            break;
        case GameFramework.Easing.Type.OutCubic:
            this._valueForProgress = GameFramework.Easing.easeOutCubic;
            break;
        case GameFramework.Easing.Type.InQuart:
            this._valueForProgress = GameFramework.Easing.easeInQuart;
            break;
        case GameFramework.Easing.Type.OutQuart:
            this._valueForProgress = GameFramework.Easing.easeOutQuart;
            break;
        case GameFramework.Easing.Type.InOutQuart:
            this._valueForProgress = GameFramework.Easing.easeInOutQuart;
            break;
        case GameFramework.Easing.Type.OutSine:
            this._valueForProgress = GameFramework.Easing.easeOutSine;
            break;
        case GameFramework.Easing.Type.InOutSine:
            this._valueForProgress = GameFramework.Easing.easeInOutSine;
            break;
        case GameFramework.Easing.Type.OutExpo:
            this._valueForProgress = GameFramework.Easing.easeOutExpo;
            break;
        case GameFramework.Easing.Type.InBack:
            this._valueForProgress = null;
            this._backEase = true;
            break;
        case GameFramework.Easing.Type.OutBack:
            this._valueForProgress = null;
            this._backEase = true;
            break;
        case GameFramework.Easing.Type.InOutBack:
            this._valueForProgress = null;
            this._backEase = true;
            break;
        case GameFramework.Easing.Type.OutInBack:
            this._valueForProgress = null;
            this._backEase = true;
            break;
        default:
            this._valueForProgress = GameFramework.Easing.easeNone;
            break;
    }
    
    return this;
};

GameFramework.Easing.Type = {
    Linear     : 0,
    InCubic    : 1,
    OutCubic   : 2,
    InQuart    : 3,
    OutQuart   : 4,
    InOutQuart : 5,
    OutSine    : 6,
    InOutSine  : 7,
    OutExpo    : 8,
    InBack     : 9,
    OutBack    : 10,
    InOutBack  : 11,
    OutInBack  : 12
};

GameFramework.Easing.prototype = {
    valueForProgress: function(value) {
        if (value < 0)
            value = 0.0;
        else if (value > 1)
            value = 1.0;
            
        if (this._valueForProgress != null)
            return this._valueForProgress(value);
        else if (this._backEase)
            return this.backEaseForProgress(value);

        return value;
    },
    
    backEaseForProgress: function(value) {
        var overshoot = 1.70158;
        switch (this._type) {
            case GameFramework.Easing.Type.InBack:
                return GameFramework.Easing.easeInBack(value, overshoot);
            case GameFramework.Easing.Type.OutBack:
                return GameFramework.Easing.easeOutBack(value, overshoot);
            case GameFramework.Easing.Type.InOutBack:
                return GameFramework.Easing.easeInOutBack(value, overshoot);
            case GameFramework.Easing.Type.OutInBack:
                return GameFramework.Easing.easeOutInBack(value, overshoot);
        }
        return value;
    }
};

GameFramework.Easing.easeNone = function(t) {
    return t;
};

GameFramework.Easing.easeInCubic = function(t) {
    return t*t*t;
};

GameFramework.Easing.easeOutCubic = function(t) {
    t -= 1.0;
    return t * t * t + 1.0;
};

GameFramework.Easing.easeInQuart = function(t) {
    return t * t * t * t;
};

GameFramework.Easing.easeOutQuart = function(t) {
    t -= 1.0;
    return - (t*t*t*t - 1);
};

GameFramework.Easing.easeInOutQuart = function(t) {
    t *= 2;
    if (t < 1) {
        return 0.5 * t * t * t * t;
    } else {
        t -= 2.0;
        return -0.5 * (t * t * t * t - 2);
    }
};

GameFramework.Easing.easeOutSine = function(t) {
    return Math.sin(t * (Math.PI / 2.0));
};

GameFramework.Easing.easeInOutSine = function(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
};

GameFramework.Easing.easeOutExpo = function(t) {
    return t === 1.0 
           ? 1.0 
           : 1.001 * (-Math.pow(2.0, -10 * t) + 1);
};

GameFramework.Easing.easeInBack = function(t, s) {
    return t * t * ((s + 1) * t - s);
};

GameFramework.Easing.easeOutBack = function(t, s) {
    t -= 1;
    return t * t * ((s + 1) * t + s) + 1;
};

GameFramework.Easing.easeInOutBack = function(t, s) {
    t *= 2.0;
    if (t < 1) {
        s *= 1.525;
        return 0.5 * (t * t * ((s + 1) * t - s));
    } else {
        t -= 2;
        s *= 1.525;
        return 0.5 * (t * t * ((s + 1) * t + s) + 2);
    }
};

GameFramework.Easing.easeOutInBack = function(t, s) {
    if (t < 0.5) {
        return GameFramework.Easing.easeOutBack(2 * t, s) / 2;
    }
    return GameFramework.Easing.easeInBack(2 * t - 1, s) / 2 + 0.5;
};
