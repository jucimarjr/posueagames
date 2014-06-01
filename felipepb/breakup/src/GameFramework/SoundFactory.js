GameFramework.SoundFactory = {
    loadedSounds: { },
    
    loadSound: function (sound, format) {
        var loadedSounds = GameFramework.SoundFactory.loadedSounds;
        var audio = loadedSounds[sound];

        if (audio === undefined) {
            var audioElement = document.createElement('audio');
            var sourceElement = document.createElement('source');
    
            audioElement.preload = 'auto';
            //audioElement.autoplay = 'autoplay';
            sourceElement.src = sound;
            sourceElement.type = GameFramework.SoundFactory.MIME[format];
    
            audioElement.appendChild(sourceElement);
            document.body.appendChild(audioElement);

            audio = new GameFramework.Sound(audioElement);
            loadedSounds[sound] = audio;
        }

        return audio;
    },
    
    Format: {
        MP3: 0,
        Ogg: 1,
        Wav: 2
    },
    
    MIME: { }
};

GameFramework.SoundFactory.MIME[GameFramework.SoundFactory.Format.MP3] = 'audio/mpeg';
GameFramework.SoundFactory.MIME[GameFramework.SoundFactory.Format.Ogg] = 'audio/ogg';
GameFramework.SoundFactory.MIME[GameFramework.SoundFactory.Format.Wav] = 'audio/wav';
