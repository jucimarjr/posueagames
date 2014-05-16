BreakoutGame.HeartBeat = {
    _heart: null,
    
    play: function() {
        var heart = BreakoutGame.HeartBeat._heart;
        if (heart === null) {
            if (GameFramework.isInternetExplorer()) {
                heart = GameFramework.SoundFactory.loadSound('sounds/heartbeat.mp3',
                                                             GameFramework.SoundFactory.Format.MP3);
            } else {
                heart = GameFramework.SoundFactory.loadSound('sounds/heartbeat.wav',
                                                             GameFramework.SoundFactory.Format.Wav);
            }
            BreakoutGame.HeartBeat._heart = heart;
        }
        heart.play();
    }
};
