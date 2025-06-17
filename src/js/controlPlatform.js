import { Actor, Vector, CollisionType, clamp } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class ControlPlatform extends Actor {
    minX
    maxX
    minY
    maxY

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
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
    }

    onPreUpdate() {
        // Clamp position to stay within boundaries
        this.pos.x = clamp(this.pos.x, this.minX, this.maxX);
        this.pos.y = clamp(this.pos.y, this.minY, this.maxY);
    }

    hitSomething(event) {
        console.log('Collision started with:', event.other);
    }

    leftSomething(event) {
        // Handle collision end logic here
        console.log('Collision ended with:', event.other);
    }

}