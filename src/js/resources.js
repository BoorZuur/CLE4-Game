import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Ramp } from './ramp'
import { Terminal } from './terminal'

// voeg hier jouw eigen resources toe
const Resources = {
    Cryptographer: new ImageSource('images/Cryptographer.png'),
    Terminal: new ImageSource('images/Terminal.png'),
    TerminalRed: new ImageSource('images/TerminalRed.png'),
    TerminalGreen: new ImageSource('images/TerminalGreen.png'),
    ControlPlatform: new ImageSource('images/AutoElevator.png'),
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
    Button: new ImageSource('images/Target.png'),
    Ramp: new ImageSource('images/Ramp.png'),
    ControllableDoor: new ImageSource('images/ControllableDoor.png'),
    Elevator: new ImageSource('images/Ceiling.png'),
    CrackedWall: new ImageSource('images/CrackedWall.png'),
    SecretHoleWall: new ImageSource('images/SecretHoleWall.png'),
    BlueBorder: new ImageSource('images/BlueBorder.png'),
    GlowingBlueBorder: new ImageSource('images/GlowingBlueBorder.png'),
    FlatPlatform: new ImageSource('images/FlatPlatform.png'),
    UIArtifact: new ImageSource('images/UIArtifact.png'),
    UIKey: new ImageSource('images/UIKey.png'),
    CoinSound: new Sound('sounds/coin.mp3'),
    BackgroundMusic: new Sound('sounds/BackgroundTheme.mp3'),
    DingDong: new Sound('sounds/DingDong.mp3'),
    DoorOpen: new Sound('sounds/DoorOpen.mp3'),
    Fall: new Sound('sounds/Fall.mp3'),
    GrappleSound: new Sound('sounds/Grapple.mp3'),
    SecretSound: new Sound('sounds/Secret.mp3'),
    TerminalEnter: new Sound('sounds/TerminalEnter.mp3'),
    TerminalExit: new Sound('sounds/TerminalExit.mp3'),
    TerminalHacked: new Sound('sounds/TerminalHacked.mp3'),
    TerminalError: new Sound('sounds/TerminalError.mp3'),
    KeySound: new Sound('sounds/Key.mp3'),
    LevelCompleted: new Sound('sounds/LevelCompleted.mp3'),
    Slingshot: new Sound('sounds/Slingshot.mp3'),
    DingSound: new Sound('sounds/DingSound.mp3'),
    StartButtonControl: new ImageSource('images/StartButton.svg'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }