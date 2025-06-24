import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';
import { Platform } from './platform.js';
import { ContinuousPlatform } from './continuousPlatform.js';
import { ControlPlatform } from './controlPlatform.js';
import { Wall } from './wall.js';

export class Dart extends Actor {
    constructor(x, y, respawnX, respawnY) {
        super({ width: Resources.Dart.width, height: Resources.Dart.height });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Dart.toSprite());
        this.scale = new Vector(0.03, 0.03);
        this.on('collisionstart', (event) => {
            if (event.other.owner instanceof Player) {
                // console.log('Dart hit player');
                event.other.owner.pos.x = this.respawnX
                event.other.owner.pos.y = this.respawnY
            }
            if (event.other.owner instanceof Wall || event.other.owner instanceof Platform || event.other.owner instanceof ContinuousPlatform || event.other.owner instanceof ControlPlatform) {
                // console.log('Dart hit wall');
                this.kill()
            }
        });
        this.vel = new Vector(0, 200);
        this.respawnX = respawnX
        this.respawnY = respawnY
    }
}