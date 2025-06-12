import { Actor, Vector, Keys } from "excalibur"
import { Resources } from './resources.js'
import { Terminal } from "./terminal.js";

export class Cryptographer extends Actor {
    interacting
    nearTerminal

    constructor() {
        super({ width: Resources.Cryptographer.width, height: Resources.Cryptographer.height });
        this.pos = new Vector(200, 600)
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.Cryptographer.toSprite())
        this.interacting = false
        this.nearTerminal = null
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
    }

    onPreUpdate(engine) {
        this.move(engine)
        this.checkInteraction(engine)
    }

    move(engine) {
        const keys = {
            Left: Keys.A,
            Right: Keys.D,
            Up: Keys.W,
            Down: Keys.S
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
        if (kb.isHeld(keys.Up)) {
            yvel = -300
        }
        if (kb.isHeld(keys.Down)) {
            yvel = 300
        }

        if (this.interacting) {
            this.nearTerminal.platform.vel = new Vector(xvel * 5, yvel * 5)
        } else {
            this.vel.x = xvel
        }
    }

    checkInteraction(engine) {
        if (engine.input.keyboard.wasPressed(Keys.E) && this.nearTerminal) {
            this.interactWithTerminal(this.nearTerminal)
        }
    }

    interactWithTerminal(terminal) {
        console.log('Using terminal!')
        this.interacting = !this.interacting
    }

    hitSomething(event) {
        if (event.other.owner instanceof Terminal) {
            this.nearTerminal = event.other.owner
            console.log('Press E to use terminal')
        }
    }

    leftSomething(event) {
        if (event.other.owner instanceof Terminal) {
            this.nearTerminal = null
            console.log('You left the terminal area')
        }
    }
}