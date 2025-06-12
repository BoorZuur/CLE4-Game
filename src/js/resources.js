import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Platform } from './platform'

// voeg hier jouw eigen resources toe
const Resources = {
    Cryptographer: new ImageSource('images/Cryptographer.png'),
    Terminal: new ImageSource('images/Terminal.jpg'),
    Platform: new ImageSource('images/Platform.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }