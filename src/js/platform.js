import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Platform extends Actor {
    constructor() {
        super({
            width: Resources.Platform.width,
            height: Resources.Platform.height
        })
        
        // this.body.collisionType = CollisionType.Fixed
        this.pos = new Vector(200, 200)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Platform.toSprite())
    }
}