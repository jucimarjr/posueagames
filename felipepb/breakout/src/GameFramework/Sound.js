GameFramework.Sound = function (audio) {
    if (!audio)
        console.error('audio not defined');
        
    this.audio = audio;
    this._playedOnce = false;
    return this;
};

GameFramework.Sound.prototype = {
    play: function (volume) {
        var audio = this.audio;
        if (this._playedOnce) {
            // you cannot play the same audio at same time...
            try {
                // reset the audio if it is playing 
                audio.pause();
                audio.currentTime = 0;    
            } catch (e) {
                console.log(e);
                audio.load();
            }
        }
		
		if (volume !== undefined)
			audio.volume = volume;
		
        this._playedOnce = true;
        audio.play();
    },
    
    dispose: function () {
        this.audio = undefined;
    }
};
