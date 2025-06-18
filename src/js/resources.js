import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Cryptographer: new ImageSource('images/Cryptographer.png'),
    Terminal: new ImageSource('images/Terminal.png'),
    TerminalRed: new ImageSource('images/TerminalRed.png'),
    TerminalGreen: new ImageSource('images/TerminalGreen.png'),
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
    Adventurer: new ImageSource('images/Adventurer.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }