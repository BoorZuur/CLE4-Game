import { Actor, Vector, CollisionType, Shape, CompositeCollider, Rectangle } from 'excalibur';
import { Resources } from './resources.js';

export class Ramp extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
            width: Resources.Ramp.width,
            height: Resources.Ramp.height,
            collisionType: CollisionType.Fixed
        })

        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.Ramp.toSprite())
    }
    onInitialize() {
        let capsule = new CompositeCollider([
            // Shape.Circle(300, new Vector(0, -200)),
            // Shape.Box(Resources.Ramp.width / 2, Resources.Ramp.height, new Vector(0.5, 0.5)),
            Shape.Edge(new Vector(-Resources.Ramp.width / 2, Resources.Ramp.height / 2), new Vector(Resources.Ramp.width / 2 - 300, -Resources.Ramp.height / 2)),
            Shape.Edge(new Vector(Resources.Ramp.width / 2 - 300, -Resources.Ramp.height / 2), new Vector(Resources.Ramp.width / 2, -Resources.Ramp.height / 2)),
            Shape.Edge(new Vector(Resources.Ramp.width / 2, -Resources.Ramp.height / 2), new Vector(Resources.Ramp.width / 2, Resources.Ramp.height / 2)),
        ])
        this.body.bounciness = 0
        this.body.friction = 0.5
        this.collider.set(capsule)
    }
}