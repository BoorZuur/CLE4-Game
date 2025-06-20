import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class ContinuousPlatform extends Actor {
    constructor(x,y,rotation) {
        super({
            x,
            y,
            width: Resources.ContinuousPlatform.width,
            height: Resources.ContinuousPlatform.height,
            rotation,
            collisionType: CollisionType.Fixed
        })
        this.z = 1
        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.ContinuousPlatform.toSprite())
    }
}