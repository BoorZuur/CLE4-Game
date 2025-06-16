import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"

export class Door extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 300,
            height: 1000,
            anchor: Vector.Half,
            collisionType: CollisionType.Fixed
        });
        this.graphics.use(Resources.Door.toSprite());
        this.scale = new Vector(0.1, 0.1);
        this.doorX = x; 
        this.doorY = y; 
    }

    resetDoor(gameInstance) {
        const newDoor = new Door(this.doorX, this.doorY);
        gameInstance.add(newDoor);
        return newDoor;
    }
}