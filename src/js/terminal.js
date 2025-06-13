import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { ControlPlatform } from './controlPlatform.js';

export class Terminal extends Actor {
    platform

    constructor() {
        super({width: Resources.Terminal.width, height: Resources.Terminal.height});
        this.pos = new Vector(600, 550)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Terminal.toSprite())
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.platform = new ControlPlatform();
        this.platform.pos = new Vector(0, -2000);
        this.addChild(this.platform);
    }
}