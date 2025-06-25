import { Player } from './player.js';
import { Actor, Vector, CollisionType } from 'excalibur';
import { Projectile } from './projectile';
import { Resources } from './resources.js';

export class Button extends Actor {
    constructor(x, y, linkedDoor, gameInstance, flipped) {
        super({
            width: 500,
            height: 500,
            collisionType: CollisionType.Fixed,
            anchor: Vector.Half
        });
        this.pos = new Vector(x, y);
        this.linkedDoor = linkedDoor;
        this.gameInstance = gameInstance;
        this.exists = true;
        this.scale = new Vector(0.05, 0.05);
        this.graphics.use(Resources.Button.toSprite());
        this.scale = new Vector(0.1, 0.1);
        this.isActive = false;
        this.flipped = flipped || false;
        if (this.flipped) {
            this.graphics.flipHorizontal = true;
        }
    }

    onInitialize() {
        this.on('collisionstart', (event) => {
            if (event.other.owner instanceof Projectile) {
                this.activate();
            }
        });
    }

    activate() {
        this.linkedDoor.kill();
        Resources.DoorOpen.play();
    }
}