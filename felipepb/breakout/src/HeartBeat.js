BreakoutGame.HeartBeat = {
    _heart: null,
    
    play: function() {
        var heart = BreakoutGame.HeartBeat._heart;
        if (heart === null) {
            heart = GameFramework.SoundFactory.loadSound('sounds/heartbeat.wav',
                                                         GameFramework.SoundFactory.Format.Wav);
            BreakoutGame.HeartBeat._heart = heart;
        }
        heart.play();
    }
};
