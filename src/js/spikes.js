import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources';

export class Spikes extends Actor {
    respawnX
    respawnY

    constructor(x, y, scale, respawnX, respawnY) {
        super({
            width: Resources.Spikes.width,
            height: Resources.Spikes.height,
            collisionType: CollisionType.Fixed
        });
        this.scale = new Vector(scale, scale);
        this.graphics.use(Resources.Spikes.toSprite());
        this.pos = new Vector(x, y);
        this.respawnX = respawnX
        this.respawnY = respawnY;
    }
}