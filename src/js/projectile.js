import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Button } from "./button.js";
import { Wall } from "./wall.js";
import { Platform } from "./platform.js";
import { Door } from "./door.js";
import { Crate } from "./crate.js";
import { ControlPlatform } from "./controlPlatform.js";
import { ContinuousPlatform } from "./continuousPlatform.js";
import { Ramp } from "./ramp.js"
import { CrackedWall } from "./crackedWall.js"

export class Projectile extends Actor {
    #sprite
    constructor(x, y, direction) {
        super({
            width: 500,
            height: 500,
        });

        this.#sprite = Resources.Stone.toSprite();
        if (direction === -1) {
            this.#sprite.flipHorizontal = true;
        }

        this.graphics.use(this.#sprite);
        this.pos = new Vector(x + (direction === 1 ? 40 : -40), y + 15);
        this.vel = new Vector(300 * direction, 0);
        this.scale = new Vector(0.02, 0.02);
        this.on("collisionstart", (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other.owner && event.other.owner.constructor.name === "Button") {
        event.other.owner.activate();
        this.kill();
    }
    if (event.other.owner instanceof CrackedWall) {
        console.log("hallo");
        Resources.SecretSound.play();
        event.other.owner.kill();
        this.kill()
    }
        if (event.other.owner instanceof Wall || event.other.owner instanceof Platform || event.other.owner instanceof Ramp || event.other.owner instanceof Door || event.other.owner instanceof ControlPlatform || event.other.owner instanceof  Crate || event.other.owner instanceof  ContinuousPlatform && !(event.other.owner instanceof Button)) {
            this.kill();
        }
    }
}
