// spawn a drum (invisible box)
// spawn hand colliders
// spawn an overlay
var COLLIDER_NAME = "Applause Colliders";

var COLLIDER_BASE_PROPERTIES = {
    type: 'Shape',
    shape: 'Sphere',
    dimensions: {x: 0.1, y: 0.1, z: 0.1},
    parentID: MyAvatar.sessionUUID,
    localPosition: {x: 0.02, y: 0.1, z: 0.0066},
    visible: false
};

var DRUM_BASE_PROPERTIES = {
    type: 'Box',
    dimensions: {x: 0.2485, y: 0.2776, z: 0.2468},
    rotation: {x: 154, y: -137, z: 29},
    parentID: MyAvatar.sessionUUID,
    parentJointIndex: MyAvatar.getJointIndex("Hips"),
    dynamic: true,
    name: "Applause Drum",
    script: Script.resolvePath('drumApplause.js'),
    locked: true
};

var entities = Array();
var overlays = Array();

var drumEntity;

function setup() {
    print("Setting up drum entities");
    var leftCollider = COLLIDER_BASE_PROPERTIES;
    leftCollider.name = COLLIDER_NAME + " Left";
    leftCollider.parentJointIndex = MyAvatar.getJointIndex("LeftHandMiddle1");
    entities.push(Entities.addEntity(leftCollider));

    var rightCollider = COLLIDER_BASE_PROPERTIES;
    rightCollider.name = COLLIDER_NAME + " Right";
    rightCollider.parentJointIndex = MyAvatar.getJointIndex("RightHandMiddle1");
    entities.push(Entities.addEntity(rightCollider));

    var drum = DRUM_BASE_PROPERTIES;
    drum.localPosition = {x: 0.03, y: 0.2, z: 0.4};
    drum.visible = false;
    drum.locked = true;
    drumEntity = Entities.addEntity(drum);
    entities.push(drumEntity); 

    overlays.push(Overlays.addOverlay("model", {
        parentID: MyAvatar.sessionUUID,
        parentJointIndex: MyAvatar.getJointIndex("Hips"),
        grabbable: true,
        url: Script.resolvePath('Models/tamberine.obj'),
        localPosition: {x: 0.03, y: 0.2, z: 0.4},
        dimensions: {x: 0.3, y: 0.06, z: 0.3}
    })); 
}

function cleanup() {
    print("Cleaning up drum entities");
    entities.forEach(function(entity) {
        Entities.editEntity(entity, {locked: false});
        Entities.deleteEntity(entity);
    });
    overlays.forEach(function(overlay){
        Overlays.deleteOverlay(overlay);
    });
}

setup();
Script.scriptEnding.connect(cleanup);