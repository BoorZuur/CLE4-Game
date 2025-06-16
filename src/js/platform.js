import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Platform extends Actor {
    constructor(x,y) {
        super({
            x,
            y,
            width: Resources.Platform.width,
            height: Resources.Platform.height,
            collisionType: CollisionType.Fixed
        })
        
        this.scale = new Vector(0.075, 0.075)
        this.graphics.use(Resources.Platform.toSprite())
    }
}