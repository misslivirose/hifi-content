(function () {

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

    var activeCollisions = {
        left: false,
        right: false
    };

    var individualClapSound; 
    var applauseInjector;

    var ApplauseDrum = function () {

    };

    function getRandomApplauseSound() {
        return INDIVIDUAL_CLAP_URLS[Math.round(Math.random() * INDIVIDUAL_CLAP_URLS.length - 1)];
    }

    ApplauseDrum.prototype = {
        collisionWithEntity: function (myID, theirID, collision) {
            var otherProperties = Entities.getEntityProperties(theirID, ['name', 'position']);
            if (otherProperties.name.indexOf(COLLIDER_NAME) !== -1) {
                var hand = otherProperties.name.indexOf("Left") !== -1 ? 0 : 1;
                print ("Collision type: " + collision.type);
                switch (collision.type) {
                    case 0: 
                        activeCollisions[hand] = true;
                        print("Beginning - " + hand + ":" + activeCollisions[hand]);
                        break;
                    case 1:
                        print("State: Left " + activeCollisions[0] + ", Right" + activeCollisions[1]);
                        if (activeCollisions[0] && activeCollisions[1]) {
                            print ("We're both ready!");
                            if (applauseInjector !== undefined && applauseInjector.isPlaying()) {
                                return;
                            }
                            individualClapSound = SoundCache.getSound(getRandomApplauseSound());
                            if (individualClapSound.downloaded) {
                                applauseInjector = Audio.playSound(
                                    individualClapSound,
                                    {
                                        volume: APPLAUSE_VOLUME,
                                        localOnly: false,
                                        position: otherProperties.position
                                    }
                                );
                            }
                            if (HMD.active) {
                                Controller.triggerHapticPulse(HAPTICS.strength, HAPTICS.duration, HAPTICS.hands);
                            }
                        } 
                        break;
                    case 2: 
                        activeCollisions[hand] = false;
                        print("Ending - " + hand + ":" + activeCollisions[hand]);
                        break;
                    default:
                        print("You got here in a weird way, this collision type shouldn't exist!");
                        break;
                }

            }
        }
    };

    return new ApplauseDrum();
});