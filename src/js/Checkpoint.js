import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class Checkpoint extends Actor {
    constructor(x, y, gameInstance) {
        super({ width: Resources.Checkpoint.width, height: Resources.Checkpoint.height });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Checkpoint.toSprite());
        this.scale = new Vector(0.05, 0.05);
        this.on('collisionstart', (event) => {
            // console.log('collisionstart', event);
            if (event.other.owner instanceof Player) {
                console.log('Player hit checkpoint');
                gameInstance.actors.forEach((actor) => {
                    if (actor instanceof Checkpoint) {
                        actor.CheckpointOff();
                    }
                });
                this.CheckpointActive(gameInstance);
                gameInstance.updateCheckPoint(this.pos.x, this.pos.y);
            }
        });
    }

    CheckpointActive(instance) {
        this.graphics.use(Resources.ActiveCheckpoint.toSprite());
        instance.currentCheckPoint = this.pos;
    }

    CheckpointOff() {
        this.graphics.use(Resources.Checkpoint.toSprite());
    }


    onInitialize(engine) {
    }

}