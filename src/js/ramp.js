import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Ramp extends Actor {
    constructor(x,y) {
        super({
            x,
            y,
            width: Resources.Ramp.width,
            height: Resources.Ramp.height,
            collisionType: CollisionType.Fixed
        })
        
        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.Ramp.toSprite())
    }
}