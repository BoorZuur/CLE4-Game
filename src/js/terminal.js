import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { ControlPlatform } from './controlPlatform.js';

export class Terminal extends Actor {
    platform
    platformx
    platformy
    minX
    maxX
    minY
    maxY

    constructor(posX, posY, platformX, platformY, minX, maxX, minY, maxY) {
        super({ width: Resources.Terminal.width, height: Resources.Terminal.height });
        this.pos = new Vector(posX, posY)
        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.Terminal.toSprite())
        this.body.collisionType = CollisionType.Passive;
        this.platformx = platformX;
        this.platformy = platformY;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    onInitialize(engine) {
        this.platform = new ControlPlatform(this.platformx, this.platformy,
            this.minX, this.maxX, this.minY, this.maxY);
        this.addChild(this.platform);
    }

    movePlatform(x, y) {
        const speed = 1000

        if (x && y) {
            x *= 0.7071; // 1/sqrt(2)
            y *= 0.7071; // 1/sqrt(2)
        }

        this.platform.vel = new Vector(x * speed, y * speed)
    }
}