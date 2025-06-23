import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Cryptographer } from './cryptographer.js';
import { Player } from './player.js';

export class SecretWall extends Actor {
    constructor(x, y, rotation, swidth, sheight) {
        super({
            x,
            y,
            width: Resources.Wall.width,
            height: Resources.Wall.height,
            rotation,
            collisionType: CollisionType.Passive
        });
        this.rotation = 0.5 *Math.PI
        // Default scale values if not provided
        if (!swidth) {
            swidth = 0.125;
        }
        if (!sheight) {
            sheight = 0.125;
        }

        this.scale = new Vector(swidth, sheight);
        this.graphics.use(Resources.Wall.toSprite());
        
        // Set initial opacity
        this.graphics.opacity = 1;

        // Set up collision events
        this.on('collisionstart', (evt) => this.onPlayerCollisionStart(evt));
        this.on('collisionend', (evt) => this.onPlayerCollisionEnd(evt));
    }

    onPlayerCollisionStart(event) {
        // Check if colliding with a player (you might need to adjust this check)
        if (event.other.owner instanceof Player || event.other.onwer instanceof Cryptographer) {
            this.graphics.opacity = 0.5;
        }
    }

    onPlayerCollisionEnd(event) {
        // Check if the player is no longer colliding
        if (event.other.owner instanceof Player || event.other.onwer instanceof Cryptographer) {
            this.graphics.opacity = 1;
        }
    }
}