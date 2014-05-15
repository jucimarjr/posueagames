GameFramework.Sound = function (audio) {
    if (!audio)
        console.error('audio not defined');
        
    this.audio = audio;
    return this;
};

GameFramework.Sound.prototype = {
    play: function () {
        var audio = this.audio;
        // you cannot play the same audio at same time...
        try {
            // reset the audio if it is playing 
            audio.pause();
            audio.currentTime = 0;    
        } catch (e) {
            console.log(e);
            audio.load();
        }
        audio.play();
    },
    
    dispose: function () {
        this.audio = undefined;
    }
};
