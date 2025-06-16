import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
// import { Button } from "./button.js";

export class Projectile extends Actor {
    #sprite
    damage
    constructor(x, y, direction) {
        super({
            width: 500,
            height: 500,
            collisionType: CollisionType.Active
        });

        this.#sprite = Resources.Stone.toSprite();
        if (direction === -1) {
            this.#sprite.flipHorizontal = true;
        }

        this.graphics.use(this.#sprite);
        this.pos = new Vector(x + (direction === 1 ? 40 : -40), y + 15);
        this.vel = new Vector(300 * direction, 0);
        this.scale = new Vector(0.02, 0.02);
        this.damage = 2;

        this.on("exitviewport", () => this.kill());
        // this.on("collisionstart", (event) => this.hitSomething(event));
    }

    // hitSomething(event) {
    //     if (event.other.owner instanceof Button) {
    //         Button.actived()
    //     }
    // }
}
