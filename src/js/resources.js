import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Cryptographer: new ImageSource('images/Cryptographer.png'),
    Terminal: new ImageSource('images/Terminal.png'),
    ControlPlatform: new ImageSource('images/Controllable platform.png'),
    Platform: new ImageSource('images/Platform.png'),
    ContinuousPlatform: new ImageSource('images/Continuous platform.png'),
    Spikes: new ImageSource('images/Spikes.png'),
    Stone: new ImageSource('images/projectile.png'),
    HookPoint: new ImageSource('images/GrapplePoint.png'),
    Secret: new ImageSource('images/SecretHoleWall.png'),
    PressurePlate: new ImageSource('images/PressurePlate.png'),
    Door: new ImageSource('images/LockedDoor.png'),
    Crate: new ImageSource('images/Crate.png'),
    Border: new ImageSource('images/Border.png'),
    Wall: new ImageSource('images/Wall.png'),
    Background: new ImageSource('images/Background.png'),
    Adventurer: new ImageSource('images/Adventurer.png'),
    MenuBackground: new ImageSource('images/MenuBackground.png'),
    StartButton: new ImageSource('images/StartGame.png'),
    Artifact: new ImageSource('images/Artifact.png'),
    Exit: new ImageSource('images/LevelExit.png'),
    Key: new ImageSource('images/Key.png'),
    Lever: new ImageSource('images/Lever.png'),
    Checkpoint: new ImageSource('images/Checkpoint.png'),
    ActiveCheckpoint: new ImageSource('images/ActiveCheckpoint.png'),
    Dart: new ImageSource('images/Dart.png'),
    DartShooter: new ImageSource('images/DartLauncher.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }