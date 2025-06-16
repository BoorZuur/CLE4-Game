import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js";
import { Door } from "./door.js";
import { Crate } from "./crate.js";

export class PressurePlate extends Actor {
    constructor(x, y, linkedDoor, gameInstance, type) {
        super({ 
            width: 1000, 
            height: 500, 
            collisionType: CollisionType.Fixed, 
            anchor: Vector.Half 
        });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.PressurePlate.toSprite());
        this.linkedDoor = linkedDoor;
        this.gameInstance = gameInstance;
        this.scale = new Vector(0.05, 0.05);
        console.log(this.gameInstance)
    }

    onInitialize() {
        this.on('collisionstart', (event) => {
             if (event.other.owner instanceof Player || event.other.owner instanceof Crate && this.linkedDoor) {
                this.linkedDoor.kill();
            }
            else if (event.other.owner instanceof Player && event.other.owner instanceof Crate && this.linkedDoor) {
                this.linkedDoor.kill();
            }
            
        });

        this.on('collisionend', (event) => {
            if (event.other.owner instanceof Player || event.other.owner instanceof Crate && this.linkedDoor) {
                this.linkedDoor = this.linkedDoor.resetDoor(this.gameInstance);
            }
            else if (event.other.owner instanceof Player && event.other.owner instanceof Crate && this.linkedDoor) {
                this.linkedDoor = this.linkedDoor.resetDoor(this.gameInstance);
            }
        });
        
    }
}