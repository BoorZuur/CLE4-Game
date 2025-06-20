import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class CrackedWall extends Actor {
    constructor(x,y) {
        super({
            x,
            y,
            width: Resources.Platform.width-450,
            height: Resources.Platform.height,
            collisionType: CollisionType.Fixed
        })
        this.z = 1
        this.rotation = 0.5 * Math.PI
        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.CrackedWall.toSprite())
    }
    gone(){
        this.kill()
    }
}