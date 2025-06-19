import { Actor, Vector, CollisionType, clamp, DegreeOfFreedom } from 'excalibur';
import { Resources } from './resources.js';
import { platformP } from './collisiongroups.js';
import { pressure } from './collisiongroups.js';
import { Player } from './player.js';

export class ControlPlatform extends Actor {
    minX
    maxX
    minY
    maxY

    constructor(posX, posY, minX, maxX, minY, maxY) {
        super({ width: Resources.ControlPlatform.width, height: Resources.ControlPlatform.height, collisionGroup: platformP });
        this.pos = new Vector(posX, posY);
        this.scale = new Vector(0.1, 0.1);
        this.graphics.use(Resources.ControlPlatform.toSprite());
        this.minX = posX - minX;
        this.maxX = posX + maxX;
        this.minY = posY - minY;
        this.maxY = posY + maxY;
        this.body.useGravity = false;
        this.body.mass = 1000;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.body.collisionType = CollisionType.Active;
        platformP.canCollide(pressure)
    }

    

    onPreUpdate() {
        // Clamp position to stay within boundaries
        this.pos.x = clamp(this.pos.x, this.minX, this.maxX);
        this.pos.y = clamp(this.pos.y, this.minY, this.maxY);
        

        if (this.playerOnPlatform) {
            // If the player is on this platform, update their position to match
            this.playerOnPlatform.pos.x = this.pos.x;
            this.playerOnPlatform.pos.y = this.pos.y;
        }
    }
}