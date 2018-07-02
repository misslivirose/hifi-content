var MENU_NAME = "Tutorial";
var MENU_ITEM_NAME = "Enable Visible Controllers";
var PREVIOUS_AVATAR_FST_SETTING = "io.highfidelity.tutorial.previousAvatarFST";

var INVISIBLE_AVATAR_FST = "https://hifi-content.s3-us-west-1.amazonaws.com/ozan/dev/avatars/invisible_avatar/invisible_avatar.fst";

var tutorialControllersAreEnabled;
var testMappingName = "io.highfidelity.tutorial.testMapping";

function setupMenu() {
    if (!Menu.menuExists(MENU_NAME)) {
        Menu.addMenu(MENU_NAME);
        Menu.addMenuItem({
            menuName : MENU_NAME,
            menuItemName: MENU_ITEM_NAME,
            isCheckable: true,
            isChecked: true
        });
        tutorialControllersAreEnabled = true;
    } else {
        tutorialControllersAreEnabled = Menu.isOptionChecked(MENU_ITEM_NAME);
    }
    toggleTutorialMode(MENU_ITEM_NAME);
    Menu.menuItemEvent.connect(toggleTutorialMode);
}

function toggleTutorialMode(menuItem) {
    if (menuItem === MENU_ITEM_NAME) {
        var isEnabled = Menu.isOptionChecked(MENU_ITEM_NAME);
        if (isEnabled) {
            Settings.setValue(PREVIOUS_AVATAR_FST_SETTING, MyAvatar.skeletonModelURL);
            MyAvatar.skeletonModelURL = INVISIBLE_AVATAR_FST;
            HMD.requestShowHandControllers();
            var mapping = Controller.newMapping(testMappingName);
            mapping.from(Controller.Hardware.OculusTouch.LeftPrimaryThumbTouch).to(testMapping);
            Controller.enableMapping(testMappingName);
            
        } else {
            MyAvatar.skeletonModelURL = Settings.getValue(PREVIOUS_AVATAR_FST_SETTING);
            HMD.requestHideHandControllers();
            
        }
    }
}

function testMapping() {
    print("I've been pressed!");
}

function removeMenu() {
    Menu.removeMenuItem(MENU_NAME, MENU_ITEM_NAME),
    Menu.removeMenu(MENU_NAME);
}

function cleanup() {
    MyAvatar.skeletonModelURL = Settings.getValue(PREVIOUS_AVATAR_FST_SETTING);
    HMD.requestHideHandControllers();
    removeMenu();
}

setupMenu();
Script.scriptEnding.connect(cleanup);