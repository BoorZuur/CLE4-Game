import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'
import { Terminal } from "./terminal.js";
import { InteractionLabel } from "./interactionLabel.js";
import { Spikes } from "./spikes.js";

export class Cryptographer extends Actor {
    interacting
    interactionLabel
    nearTerminal

    constructor(x, y) {
        super({ collisionType: CollisionType.Active });
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.08, 0.08)
        this.graphics.use(Resources.Cryptographer.toSprite())
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.interacting = false
        this.nearTerminal = null
    }

    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Circle(300, new Vector(0, -200)),
            // Shape.Box(Resources.Cryptographer.width - 400, Resources.Cryptographer.height- 400),
            Shape.Circle(300, new Vector(0, 200)),
        ])
        this.collider.set(capsule)
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
    }

    onPreUpdate(engine, delta) {
        this.move(engine, delta)
        this.checkInteraction(engine)
    }

    move(engine, delta) {
        const keys = {
            Left: Keys.A,
            Right: Keys.D,
            Up: Keys.W,
            Down: Keys.S
        }
        const kb = engine.input.keyboard
        let xvel = 0
        let yvel = 0
        let move = 0

        if (kb.isHeld(keys.Left)) {
            move = -7 * delta
            xvel = -1
            if (!this.interacting) {
                this.graphics.flipHorizontal = true
            }
        }
        if (kb.isHeld(keys.Right)) {
            move = 7 * delta
            xvel = 1
            if (!this.interacting) {
                this.graphics.flipHorizontal = false
            }
        }
        if (kb.isHeld(keys.Up)) {
            yvel = -1
        }
        if (kb.isHeld(keys.Down)) {
            yvel = 1
        }

        if (this.interacting) {
            this.nearTerminal.movePlatform(xvel, yvel)
        } else {
            // this.vel.x = xvel
            this.body.applyLinearImpulse(new Vector(move, 0))
        }
    }

    checkInteraction(engine) {
        if (engine.input.keyboard.wasPressed(Keys.E) && this.nearTerminal) {
            this.interactWithTerminal(this.nearTerminal)
        }
    }

    interactWithTerminal(terminal) {
        if (this.interacting) {
            this.interacting = false
            this.interactionLabel.text = 'Press "E" to use terminal'
            this.nearTerminal.movePlatform(0, 0)
        } else {
            this.interacting = true
            this.interactionLabel.text = 'Press "E" to stop interacting'
            this.vel = new Vector(0, 0)
        }
    }

    hitSomething(event) {
        if (event.other.owner instanceof Terminal) {
            this.nearTerminal = event.other.owner
            console.log('Press E to use terminal')
            this.interactionLabel = new InteractionLabel(0, -1000, 'Press "E" to use terminal', 50, 'White')
            this.addChild(this.interactionLabel)
        } if (event.other.owner instanceof Spikes) {
            console.log('You hit the spikes!')
            this.pos.x = event.other.owner.respawnX
            this.pos.y = event.other.owner.respawnY
        }
    }

    leftSomething(event) {
        if (event.other.owner instanceof Terminal) {
            this.nearTerminal = null
            console.log('You left the terminal area')
            if (this.interactionLabel) {
                this.interactionLabel.kill()
                this.interactionLabel = null
            }
        }
    }
}