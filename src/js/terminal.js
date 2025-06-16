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
        this.createPlatform();
    }

    createPlatform() {
        // niet aankomen zelfs einstein weet niet hoe dit werkt
        let width = (this.maxX - this.minX) / 2;
        let height = (this.maxY - this.minY) / 2;

        let border = new Actor({
            pos: new Vector(this.platformx + width, this.platformy + height),
            collisionType: CollisionType.Fixed,
        });
        border.scale = new Vector((this.minX + this.maxX) / Resources.Border.width, (this.minY + this.maxY) / Resources.Border.width);
        border.graphics.use(Resources.Border.toSprite());

        this.platform = new ControlPlatform(this.platformx, this.platformy,
            this.minX, this.maxX, this.minY, this.maxY);

        this.addChild(border);
        this.addChild(this.platform);
    }


    movePlatform(x, y) {
        const speed = 1000

        // diagonal movement
        if (x && y) {
            x *= 0.7071; // 1/sqrt(2)
            y *= 0.7071; // 1/sqrt(2)
        }

        this.platform.vel = new Vector(x * speed, y * speed)
    }
}