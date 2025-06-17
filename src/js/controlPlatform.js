import { Actor, Vector, CollisionType, clamp } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class ControlPlatform extends Actor {
    minX
    maxX
    minY
    maxY
    playerOnPlatform = null // Track the player

    constructor(posX, posY, minX, maxX, minY, maxY) {
        super({ width: Resources.ControlPlatform.width, height: Resources.ControlPlatform.height });
        this.pos = new Vector(posX, posY);
        this.scale = new Vector(1, 1);
        this.graphics.use(Resources.ControlPlatform.toSprite());
        this.minX = posX - minX;
        this.maxX = posX + maxX;
        this.minY = posY - minY;
        this.maxY = posY + maxY;
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event, engine))
        this.on('collisionend', (event) => this.leftSomething(event))
    }

    onPreUpdate() {
        // Clamp position to stay within boundaries
        this.pos.x = clamp(this.pos.x, this.minX, this.maxX);
        this.pos.y = clamp(this.pos.y, this.minY, this.maxY);

        // if (this.playerOnPlatform) {
        //     // If the player is on this platform, update their position to match
        //     this.playerOnPlatform.pos.x = this.pos.x;
        //     this.playerOnPlatform.pos.y = this.pos.y - 10; // Adjust for player height
        // }
    }

    hitSomething(event, engine) {
        if (event.other.owner instanceof Player) {
            this.playerOnPlatform = event.other.owner;
            this.scene.engine.remove(event.other.owner);
            // Add player as child to make them move together
            this.addChild(this.playerOnPlatform);
            this.playerOnPlatform.scale = new Vector(1, 1);
            console.log('Player added as child to platform');
            this.playerOnPlatform.pos.x = 10
            this.playerOnPlatform.pos.y = -50
        }
    }

    leftSomething(event) {
        if (event.other.owner instanceof Player && this.playerOnPlatform) {
            this.scene.engine.add(this.playerOnPlatform);
            this.removeChild(this.playerOnPlatform);

            this.event.other.owner.pos = 
            this.playerOnPlatform = null;
            console.log('Player removed from platform');
        }
    }
}