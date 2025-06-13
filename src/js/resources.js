import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Cryptographer: new ImageSource('images/Cryptographer.png'),
    Terminal: new ImageSource('images/Terminal.png'),
    ControlPlatform: new ImageSource('images/Controllable platform.png'),
    Platform: new ImageSource('images/Platform.png'),
    ContinuousPlatform: new ImageSource('images/Continuous platform.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }