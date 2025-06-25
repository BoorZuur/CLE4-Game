import { Resources } from './resources.js';
import { Actor, Vector, Buttons } from 'excalibur';
import { Player } from './player.js';
import { Cryptographer } from './cryptographer.js';
import { Keys } from 'excalibur';

export class Exit extends Actor {
    constructor(x, y, instance) {
        super({
            width: Resources.Exit.width,
            height: Resources.Exit.height,
        });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Exit.toSprite());
        this.scale = new Vector(0.15, 0.15);
        this.z = -1;
        this.PlayerNearExit = false;
        this.CryptographerNearExit = false;
        this.AllNearExit = false;
        this.gameInstance = instance;

    }


    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event));
        this.on('collisionend', (event) => this.CollisionEnd(event));
    }


    onCollision(event) {
        if (event.other.owner instanceof Player) {
            this.PlayerNearExit = true;
            console.log('Player near exit');
        }
        if (event.other.owner instanceof Cryptographer) {
            this.CryptographerNearExit = true;
            console.log('Cryptographer near exit');
        }

        if (this.PlayerNearExit && this.CryptographerNearExit) {
            console.log('Player and Cryptographer near exit, level can be completed');
            this.AllNearExit = true;
        }
    }

    onPreUpdate(engine, delta) {
        let interact1 = false;
        let interact2 = false;

        if (engine.controllers[0]) {
            interact1 = engine.controllers[0].wasButtonPressed(Buttons.Face4);
        } else if (engine.controllers[1]) {
            interact2 = engine.controllers[1].wasButtonPressed(Buttons.Face4);
        }
        if (this.AllNearExit) {
            if (engine.input.keyboard.wasPressed(Keys.I) || interact1 || interact2) {
                if (this.gameInstance.hasKey) {
                    this.gameInstance.levelCompleted = true;
                    Resources.DoorOpen.play();
                    console.log('Level completed: ' + this.gameInstance.levelCompleted);
                    this.gameInstance.levelUI.FinishLevel();
                }
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.I) || interact1 || interact2) {
            if (!this.gameInstance.hasKey) {
                console.log('No key');
                if (this.AllNearExit) {
                    Resources.DingDong.volume = 0.6;
                    Resources.DingDong.play();
                }
            }
        }

    }

    CollisionEnd(event) {
        if (event.other.owner instanceof Player) {
            this.PlayerNearExit = false;
            this.AllNearExit = false;
        }
        if (event.other.owner instanceof Cryptographer) {
            this.CryptographerNearExit = false;
            this.AllNearExit = false;
        }
    }
}