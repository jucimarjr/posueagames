BreakoutGame.MonitorBeat = {
    _monitor: null,
    _dying: null,
    
    play: function() {
        var monitor = BreakoutGame.MonitorBeat._monitor;
        if (monitor === null) {
            monitor = GameFramework.SoundFactory.loadSound('sounds/monitorbeat.wav',
                                                           GameFramework.SoundFactory.Format.Wav);
            BreakoutGame.MonitorBeat._monitor = monitor;
        }
        monitor.play(0.3);
    },
    
    dying: function() {
        var dying = BreakoutGame.MonitorBeat._dying;
        if (dying === null) {
            dying = GameFramework.SoundFactory.loadSound('sounds/dying.wav',
                                                         GameFramework.SoundFactory.Format.Wav);
            BreakoutGame.MonitorBeat._dying = dying;
        }
        dying.play();
    }
};
