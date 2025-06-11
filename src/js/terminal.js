import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Terminal extends Actor {
    constructor() {
        super({width: Resources.Terminal.width, height: Resources.Terminal.height});

        this.pos = new Vector(600, 550)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Terminal.toSprite())
    }

    createPlatform() {
        // Logica om een platform te maken
        console.log('Platform created');
    }
    
    destroyPlatform() {
        // Logica om een platform te vernietigen
        console.log('Platform destroyed');
    }
}