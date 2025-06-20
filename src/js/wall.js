import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Wall extends Actor {
    constructor(x, y, rotation, scale) {
        super({
            x,
            y,
            width: Resources.Wall.width,
            height: Resources.Wall.height,
            rotation,
            collisionType: CollisionType.Fixed
        })


        this.scale = new Vector(scale, scale)
        this.graphics.use(Resources.Wall.toSprite())
    }
}