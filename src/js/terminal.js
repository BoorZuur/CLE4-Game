import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Terminal extends Actor {
    constructor() {
        super({width: Resources.Terminal.width, height: Resources.Terminal.height});

        this.pos = new Vector(600, 550)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Terminal.toSprite())
    }
}