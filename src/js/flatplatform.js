import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class FlatPlatform extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
            width: Resources.FlatPlatform.width,
            height: Resources.FlatPlatform.height,
            collisionType: CollisionType.Fixed
        })
        this.z = -1

        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.FlatPlatform.toSprite())
    }
}