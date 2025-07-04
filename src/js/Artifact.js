import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';
import { Cryptographer } from './cryptographer.js';

export class Artifact extends Actor {
    constructor(x, y, gameInstance) {
        super({
            width: Resources.Artifact.width,
            height: Resources.Artifact.height,
        });
        this.z = -2
        this.pos = new Vector(x, y);
        this.baseScale = new Vector(0.05, 0.05); // base scale
        this.scale = this.baseScale.clone();
        this.time = 0; // for animation
        this.on('collisionstart', (event) => this.handleCollision(event));
        this.gameInstance = gameInstance;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Artifact.toSprite());
    }

    onPreUpdate(engine, delta) {
        // Pulsate using sine wave
        this.time += delta / 1000; // convert ms to seconds
        const pulse = 1 + Math.sin(this.time * 2) * 0.2; // slow, gentle pulse
        this.scale = this.baseScale.scale(pulse);
    }

    handleCollision(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof Cryptographer) {
            Resources.CoinSound.volume = 0.2; // Set volume to 50%
            Resources.CoinSound.play();
            this.kill();
            this.gameInstance.collectibleCount++;
            console.log(this.gameInstance.collectibleCount);
            this.gameInstance.levelUI.updateCollectibles(this.gameInstance.collectibleCount);
        }
    }

}