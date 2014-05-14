GameFramework.SoundFactory = {
    loadedSounds: { },
    
    loadSound: function (sound, type) {
        var loadedSounds = GameFramework.SoundFactory.loadedSounds;
        var audio = loadedSounds[sound];

        if (audio === undefined) {
            var audioElement = document.createElement('audio');
            var sourceElement = document.createElement('source');
    
            audioElement.preload = 'auto';
            //audioElement.autoplay = 'autoplay';
            sourceElement.src = sound;
            sourceElement.type = type;
    
            audioElement.appendChild(sourceElement);
            document.body.appendChild(audioElement);
            
            //audio = new Audio();
            //audio.src = audioElement.src === '' ? audioElement.currentSrc : audioElement.src;
            //audio.load();

            audio = new GameFramework.Sound(audioElement);
            loadedSounds[sound] = audio;
        }

        return audio;
    }
};