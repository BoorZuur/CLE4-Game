import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";
import { ControlPlatform } from "./controlPlatform";
import { PressurePlate } from "./pressure-plate";
import { Cryptographer } from "./cryptographer";
import { Player } from "./player";

export class Elevator extends Actor {

    x
    y
    platform
    platformX
    platformY
    minX
    maxX
    minY
    maxY
    inverted

    constructor(x, y, platformX, platformY, minY, maxY, inverted) {
        super({
            width: 1000,
            height: 500,
            collisionType: CollisionType.Fixed,
        });
        this.scale = new Vector(0.05, 0.05);
        this.pos = new Vector(x, y);
        this.z = 2;
        this.platform = null;
        this.platformX = platformX;
        this.platformY = platformY;
        this.minX = 0;
        this.maxX = 0;
        this.minY = minY;
        this.maxY = maxY;
        this.onPlatform = false
        this.inverted = inverted
        this.graphics.use(Resources.PressurePlate.toSprite());
    }

    onInitialize() {
        console.log("inv", this.inverted)
        this.on('collisionstart', (event) => this.handleCollision(event));
        this.on('collisionend', (event) => this.handleCollisionEnd(event));
        this.platform = new ControlPlatform(this.platformX, this.platformY, this.minX, this.maxX, this.minY, this.maxY);
        this.platform.graphics.use(Resources.Elevator.toSprite());
        this.platform.collider.useBoxCollider(Resources.Elevator.width, Resources.Elevator.height);
        this.scene.add(this.platform);
    }

    onPreUpdate(engine) {
        if (this.onPlatform) {
            if (this.inverted) {
                this.platform.vel = new Vector(0, 100);
            } else {
                this.platform.vel = new Vector(0, -100);
            }
        } else {
            if (this.inverted) {
                this.platform.vel = new Vector(0, -100);
            } else {
                this.platform.vel = new Vector(0, 100);
            }
        }
    }

    handleCollision(event) {
        if (event.other.owner instanceof Cryptographer || event.other.owner instanceof Player) {
            this.onPlatform = true;
            console.log("onPlatform", this.onPlatform);
        }
    }

    handleCollisionEnd(event) {
        if (event.other.owner instanceof Cryptographer || event.other.owner instanceof Player) {
            this.onPlatform = false;
            console.log("onPlatform", this.onPlatform);
        }
    }
}