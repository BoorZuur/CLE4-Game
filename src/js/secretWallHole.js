import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Wall } from './wall.js'

export class SecretWallHole extends Actor {
    constructor(x,y) {
        super({
            x,
            y,
            width: Resources.Platform.width - 800,
            height: Resources.Platform.height + 500,
            collisionType: CollisionType.Passive
        })
        this.z = -1
        this.rotation = 1*Math.PI
        this.scale = new Vector(0.15, 0.15)
        this.graphics.use(Resources.SecretHoleWall.toSprite())
    }
}