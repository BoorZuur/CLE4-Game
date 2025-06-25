import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Player } from './player.js';
import { Cryptographer } from './cryptographer.js';


export class Key extends Actor {
    constructor(x, y, gameInstance) {
        super({
            width: Resources.Key.width,
            height: Resources.Key.height,
        });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Key.toSprite());
        this.scale = new Vector(0.05, 0.05);
        this.on('collisionstart', (event) => this.handleCollision(event));
        this.time = 0 // for animation
        this.gameInstance = gameInstance;
    }

    onPreUpdate(engine, delta) {
        // Rotate back and forth using sine wave
        this.time += delta / 1000
        this.rotation = Math.sin(this.time * 2) * 0.3 // radians, adjust 0.3 for angle
    }

    handleCollision(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof Cryptographer) {
            console.log('Key collected');
            Resources.KeySound.play();
            this.kill();
            this.gameInstance.hasKey = true;
            this.gameInstance.levelUI.updateKeyStatus(true);
        }
    }
}