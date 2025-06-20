import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js";
import { Door } from "./door.js";
import { Crate } from "./crate.js";
import { Cryptographer } from "./cryptographer.js";
import { platformP } from './collisiongroups.js';
import { pressure } from './collisiongroups.js';
import { ControlPlatform } from "./controlPlatform.js";


export class PressurePlate extends Actor {
    constructor(x, y, linkedDoor, gameInstance) {
        super({
            width: 1000,
            height: 500,
            collisionType: CollisionType.Fixed,
            anchor: Vector.Half,
            collisionGroup: pressure
        });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.PressurePlate.toSprite());
        this.linkedDoor = linkedDoor;
        this.gameInstance = gameInstance;
        this.exists = true;
        this.scale = new Vector(0.05, 0.05);
        pressure.canCollide(platformP);
        if (this.linkedDoor) {
            this.linkedDoor.addLinkedPlate(this);
        }
    }

    onInitialize() {
        this.on('collisionstart', (event) => {
            if ((event.other.owner instanceof Player || 
                 event.other.owner instanceof Cryptographer || 
                 event.other.owner instanceof Crate||
                event.other.owner instanceof ControlPlatform) && 
                this.linkedDoor) {
                    console.log("me hit") 
                this.linkedDoor.kill();
                this.exists = false;
            }
        });

        this.on('collisionend', (event) => {
            if ((event.other.owner instanceof Player || 
                 event.other.owner instanceof Cryptographer || 
                 event.other.owner instanceof Crate||
                 event.other.owner instanceof ControlPlatform) && 
                this.linkedDoor && !this.exists) {
                this.exists = true;

                // Controleer of de deur gereset moet worden
                if (this.linkedDoor.isKilled() && this.linkedDoor.shouldReset()) {
                    this.linkedDoor = this.linkedDoor.resetDoor(this.gameInstance);
                }
            }
        });
    }
}