(function () {

    var TIMEOUT = 250;

    var INDIVIDUAL_CLAP_URLS = [
        Script.resolvePath("Claps/clap-3.wav"),
        Script.resolvePath("Claps/clap-4.wav"),
        Script.resolvePath("Claps/clap-5.wav"),
        Script.resolvePath("Claps/clap-6.wav"),
        Script.resolvePath("Claps/clap-7.wav"),
        Script.resolvePath("Claps/clap-8.wav"),
        Script.resolvePath("Claps/clap-9.wav"),
        Script.resolvePath("Claps/clap-10.wav")
    ];

    var COLLIDER_NAME = "Applause Colliders";
    var APPLAUSE_VOLUME = 10;    
    var HAPTICS = {
        strength: 0.75,
        duration: 25,
        hands: 2
    };

    var individualClapSound; 
    var applauseInjector;
    var canClap = true;

    var ApplauseDrum = function () {

    };

    function getRandomApplauseSound() {
        return INDIVIDUAL_CLAP_URLS[Math.round(Math.random() * INDIVIDUAL_CLAP_URLS.length - 1)];
    }

    ApplauseDrum.prototype = {
        collisionWithEntity: function (myID, theirID, collision) {
            print(JSON.stringify(collision));
            var otherProperties = Entities.getEntityProperties(theirID, ['name', 'position']);
            if (otherProperties.name === COLLIDER_NAME) {
                if (applauseInjector !== undefined && applauseInjector.isPlaying()) {
                    return;
                }
                individualClapSound = SoundCache.getSound(getRandomApplauseSound());
                if (individualClapSound.downloaded && canClap) {
                    applauseInjector = Audio.playSound(
                        individualClapSound,
                        {
                            volume: APPLAUSE_VOLUME,
                            localOnly: false,
                            position: otherProperties.position
                        }
                    );
                    canClap = false;
                    Script.setTimeout(function(){
                        canClap = true;
                    }, TIMEOUT);
                }
                if (HMD.active) {
                    Controller.triggerHapticPulse(HAPTICS.strength, HAPTICS.duration, HAPTICS.hands);
                }
            }
        }
    };

    return new ApplauseDrum();
});