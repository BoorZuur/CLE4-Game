import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Player } from './player.js';


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
        this.gameInstance = gameInstance;
    }

    handleCollision(event) {
        if (event.other.owner instanceof Player) {
            console.log('Key collected');
            this.kill();
            this.gameInstance.hasKey = true;
            this.gameInstance.levelUI.updateKeyStatus(true);
        }
    }
}