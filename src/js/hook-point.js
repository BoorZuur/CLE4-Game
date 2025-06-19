import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Player } from './player.js';

export class HookPoint extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 500,
            height: 500,
            anchor: Vector.full
        });
        this.scale = new Vector(0.05, 0.05);
        this.grappleRadius = 150;
    }

    isPlayerInRange(playerPos) {
        return this.pos.distance(playerPos) <= this.grappleRadius;
    }

    onInitialize() {
        this.graphics.use(Resources.HookPoint.toSprite());
    }

}