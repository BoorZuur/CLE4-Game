import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"

export class Door extends Actor {
    constructor(x, y, scale) {
        super({
            pos: new Vector(x, y),
            width: Resources.Door.width,
            height: Resources.Door.height,
            anchor: Vector.Half,
            collisionType: CollisionType.Fixed
        });
        this.graphics.use(Resources.Door.toSprite());
        this.scale = scale || new Vector(0.22, 0.22);
        this.doorX = x;
        this.doorY = y;
        this.z = -1
        this.linkedPlates = [];
    }

    addLinkedPlate(plate) {
        this.linkedPlates.push(plate);
    }

    shouldReset() {
        return this.linkedPlates.every(plate => plate.exists);
    }

    resetDoor(gameInstance) {
        const newDoor = new Door(this.doorX, this.doorY, this.scale);
        newDoor.linkedPlates = [...this.linkedPlates];
        newDoor.linkedPlates.forEach(plate => {
            plate.linkedDoor = newDoor;
        });
        gameInstance.add(newDoor);
        return newDoor;
    }
}