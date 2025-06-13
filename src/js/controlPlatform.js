import { Actor, Vector, Shape, CollisionType, CompositeCollider } from 'excalibur';
import { Resources } from './resources.js';

export class ControlPlatform extends Actor {
    platform

    constructor() {
        super(
            { collisionType: CollisionType.Fixed, }
        );
        this.platform = new Actor({
            width: Resources.ControlPlatform.width,
            height: Resources.ControlPlatform.height,
            pos: new Vector(0, 0),
            collisionType: CollisionType.Fixed
        });
        this.collider.useBoxCollider(1500, 1500);
    }

    onInitialize(engine) {
        this.platform.graphics.use(Resources.ControlPlatform.toSprite());
        this.addChild(this.platform);
    }
}