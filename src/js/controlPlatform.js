import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class ControlPlatform extends Actor {
    constructor() {
        super({ width: Resources.ControlPlatform.width, height: Resources.ControlPlatform.height });
        this.scale = new Vector(1, 1);
        this.graphics.use(Resources.ControlPlatform.toSprite());
    }
}