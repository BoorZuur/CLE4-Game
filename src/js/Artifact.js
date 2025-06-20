import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class Artifact extends Actor {
    constructor(x, y, gameInstance) {
        super({
            width: Resources.Artifact.width,
            height: Resources.Artifact.height,
        });
        this.pos = new Vector(x, y);
        this.scale = new Vector(0.05, 0.05);
        this.on('collisionstart', (event) => this.handleCollision(event));
        this.gameInstance = gameInstance;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Artifact.toSprite());
    }

    handleCollision(event) {
        if (event.other.owner instanceof Player) {
            this.kill();
            this.gameInstance.collectibleCount++;
            console.log(this.gameInstance.collectibleCount);
            this.gameInstance.levelUI.updateCollectibles(this.gameInstance.collectibleCount);
        }
    }

}