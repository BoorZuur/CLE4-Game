import { Actor, Vector, Keys } from "excalibur"
import { Resources } from './resources.js'
import { Terminal } from "./terminal.js";

export class Cryptographer extends Actor {
    constructor() {
        super({ width: Resources.Cryptographer.width, height: Resources.Cryptographer.height });

        this.pos = new Vector(200, 600)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Cryptographer.toSprite())
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    onPreUpdate(engine) {
        this.move(engine)
    }

    move(engine) {
        const keys = {
            Left: Keys.A,
            Right: Keys.D
        }
        const kb = engine.input.keyboard
        let xvel = 0
        let yvel = 0

        if (kb.isHeld(keys.Left)) {
            xvel = -300
            this.graphics.flipHorizontal = true
        }
        if (kb.isHeld(keys.Right)) {
            xvel = 300
            this.graphics.flipHorizontal = false
        }
        this.vel = new Vector(xvel, yvel)
    }

    hitSomething(event) {
        if (event.other.owner instanceof Terminal) {
            // logic om een platform te showen of te verbergen
        }


        // if (event.other.owner instanceof Bomb) {
        //     let fishes = this.scene.actors.filter(actor => actor instanceof Fish)
        //     event.other.owner.kill()
        //     for (const fish of fishes) {
        //         fish.kill()
        //     }        
        // }
    }
}