BreakoutGame.MonitorBeat = {
    _monitor: null,
    _dying: null,
    
    play: function() {
        var monitor = BreakoutGame.MonitorBeat._monitor;
        if (monitor === null) {
            if (GameFramework.isInternetExplorer()) {
                monitor = GameFramework.SoundFactory.loadSound('sounds/monitorbeat.mp3',
                                                               GameFramework.SoundFactory.Format.MP3);;
            } else {
                monitor = GameFramework.SoundFactory.loadSound('sounds/monitorbeat.wav',
                                                               GameFramework.SoundFactory.Format.Wav);
            }
            BreakoutGame.MonitorBeat._monitor = monitor;
        }
        monitor.play(0.3);
    },
    
    dying: function() {
        var dying = BreakoutGame.MonitorBeat._dying;
        if (dying === null) {
            if (GameFramework.isInternetExplorer()) {
                dying = GameFramework.SoundFactory.loadSound('sounds/dying.mp3',
                                                             GameFramework.SoundFactory.Format.MP3);
            } else {
                dying = GameFramework.SoundFactory.loadSound('sounds/dying.wav',
                                                             GameFramework.SoundFactory.Format.Wav);
            }
            BreakoutGame.MonitorBeat._dying = dying;
        }
        dying.play();
    }
};
