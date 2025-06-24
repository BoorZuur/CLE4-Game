import { Actor, Vector, Timer } from 'excalibur';
import { Resources } from './resources.js';
import { Dart } from './Dart.js';

export class DartShooter extends Actor {
    constructor(x, y, instance, respawnX, respawnY) {
        super({ width: Resources.DartShooter.width, height: Resources.DartShooter.height });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.DartShooter.toSprite());
        this.scale = new Vector(0.03, 0.03);
        this.instance = instance
        this.respawnX = respawnX
        this.respawnY = respawnY
    }

    onInitialize(engine) {
        this.engine = engine
        const ShootTimer = new Timer({
            fcn: () => {
                this.shootDart()
            },
            interval: 700, // milliseconds
            repeats: true
        })
        this.engine.add(ShootTimer)
        ShootTimer.start()
    }

    shootDart() {
        let dart = new Dart(this.pos.x, this.pos.y + 10, this.respawnX, this.respawnY);
        this.instance.add(dart);
        dart.scale = new Vector(0.04, 0.04);
    }
}