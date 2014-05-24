BreakoutGame.HeartBeat = {
    _currentIndex: 0,
    
    play: function() {
        var sounds = BreakoutGame.HeartBeat.sounds;
        var index = BreakoutGame.HeartBeat._currentIndex;
        
        // if (index === undefined)
            // index = parseInt(GameFramework.random(0, sounds.length - 1));
        // else
            // index = parseInt(index) % sounds.length;
        
        var heart = sounds[index].audio;
        if (heart === null) {
            if (GameFramework.isInternetExplorer()) {
                heart = GameFramework.SoundFactory.loadSound(sounds[index].path + '.mp3',
                                                             GameFramework.SoundFactory.Format.MP3);
            } else {
                heart = GameFramework.SoundFactory.loadSound(sounds[index].path + '.wav',
                                                             GameFramework.SoundFactory.Format.Wav);
            }
            sounds[index].audio = heart;
        }
        heart.play();
        
        BreakoutGame.HeartBeat._currentIndex = (index + 1) % sounds.length;
    },
    
    sounds: new Array()
};

BreakoutGame.HeartBeat.sounds.push({ path: 'sounds/heartbeat', audio: null });
BreakoutGame.HeartBeat.sounds.push({ path: 'sounds/heartbeat2', audio: null });
