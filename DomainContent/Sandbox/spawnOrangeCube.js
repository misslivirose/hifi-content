//
// Sandbox/spawnOrangeCube.js
// 
// Author: Liv Erickson
// Copyright High Fidelity 2018
//
// Licensed under the Apache 2.0 License
// See accompanying license file or http://apache.org/
//
(function(){
    var LIFETIME = 300;
    var SPAWN_POSITION = {x: 0, y: -10, z: 0}; // change in sandbox domain
    var CHECK_INTERVAL = LIFETIME * 10;

    var cubeProperties; 
    var spawnCubeInterval;
    
    var OrangeCubeSpawner = function(){

    };

    OrangeCubeSpawner.prototype = {
        preload: function(entityID) {
            cubeProperties = {
                type: "Box",
                shape: "Cube",
                color : {"red" : 240, "green" : 112, "blue" : 0}, 
                lifetime: LIFETIME,
                position: SPAWN_POSITION,
                "parentID": entityID,            
                "userData" : "{\"grabbableKey\":{\"grabbable\":true}}",
                script: "atp:/cubeScript.js"
            };        
            spawnCubeInterval = Script.setInterval(function() {
                print(JSON.stringify(Entities.getChildrenIDs(entityID)));
                if (Entities.getChildrenIDs(entityID).length === 0) {
                    Entities.addEntity(cubeProperties); // add a cube if none exists 
                }
            }, CHECK_INTERVAL);
        },
        unload: function() {
            Script.clearInterval(spawnCubeInterval);
        }
    };

    return new OrangeCubeSpawner();
});