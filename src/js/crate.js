import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { PressurePlate } from "./pressure-plate.js";
import { Spikes } from "./spikes.js";
import { ContinuousPlatform } from "./continuousPlatform.js";
import { Cryptographer } from "./cryptographer.js";
import { ControlPlatform } from "./controlPlatform.js"


export class Crate extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 800,
            height: 600,
            collisionType: CollisionType.Active,
            anchor: Vector.Half,
            mass: 15
        });
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.graphics.use(Resources.Crate.toSprite());
        this.scale = new Vector(0.055, 0.05);

        // Physics instellingen
        this.gravity = 7000;
        this.isGrounded = false;
        this.pushForce = 120;
        this.friction = 0.85;
    }

    onInitialize() {
        this.on('precollision', (event) => this.handlePush(event));
        this.on('collisionstart', (event) => this.handleCollision(event));
        this.on('collisionend', (event) => this.handleCollision(event));
        this.on('exitviewport', (event) => this.handleRespawn(event));
    }

    handlePush(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof Cryptographer || event.other.owner instanceof ControlPlatform) {
            const player = event.other.owner;

            // Calculate the relative position to determine collision direction
            const relativeX = player.pos.x - this.pos.x;
            const relativeY = player.pos.y - this.pos.y;

            // Only allow pushing from the sides (horizontal collision)
            // Check if the collision is more horizontal than vertical
            if (Math.abs(relativeX) > Math.abs(relativeY) * 1.5) {
                if (Math.abs(player.vel.x) > 50) {
                    const direction = player.vel.x > 0 ? 1 : -1;
                    this.vel.x += direction * this.pushForce;
                }
            }
        }
    }

    handleCollision(event) {
        if (event.other.owner instanceof Platform ||
            event.other.owner instanceof PressurePlate ||
            event.other.owner instanceof Spikes ||
            event.other.owner instanceof ContinuousPlatform) {
            this.isGrounded = true;
            this.vel.y = 0;
        }
    }

    handleRespawn(event){
        this.pos = new Vector(x, y)
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        if (!this.isGrounded) {
            this.vel.y += this.gravity * (delta / 2000);
        }

        if (this.isGrounded) {
            this.vel.x *= this.friction;
            if (Math.abs(this.vel.x) < 5) this.vel.x = 0;
        }
    }
}