import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom, CompositeCollider, Shape, Axes, Buttons } from "excalibur"
import { Resources } from './resources.js'
import { Terminal } from "./terminal.js";
import { Spikes } from "./spikes.js";
import { friendsGroup } from './collisiongroups.js'
import { Ramp } from "./ramp.js";

export class Cryptographer extends Actor {
    interacting
    nearTerminal
    hitbox
    canRotate

    constructor(x, y, canRotate) {
        super({
            collisionType: CollisionType.Active,
            collisionGroup: friendsGroup,
        });
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.08, 0.08)
        this.graphics.use(Resources.Cryptographer.toSprite())
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        // this.body.bounciness = 0
        // this.body.friction = 0.5
        // this.body.mas = 100
        this.respawnX = x
        this.respawnY = y
        if (canRotate === undefined || canRotate === null) {
            this.canRotate = true
        } else {
            this.canRotate = canRotate
        }

        console.log("Cryptographer can rotate: " + this.canRotate)
        this.interacting = false
        this.nearTerminal = null

    }

    onInitialize(engine) {
        this.hitbox = new CompositeCollider([
            // Shape.Circle(300, new Vector(0, -200)),
            // Shape.Circle(300, new Vector(0, 200)),
            Shape.Box(Resources.Cryptographer.width - 300, Resources.Cryptographer.height),
        ])
        this.collider.set(this.hitbox)
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
        this.on('exitviewport', (event) => this.handleRespawn(event));
    }

    onPreUpdate(engine, delta) {
        this.move(engine, delta)
        this.checkInteraction(engine)
    }

    move(engine, delta) {
        const kb = engine.input.keyboard
        let controller = null
        let xController = 0
        let yController = 0
        let wheelieButton = false
        let xvel = 0
        let yvel = 0
        let move = 0
        this.angularVelocity = 0
        const keys = {
            Left: Keys.A,
            Right: Keys.D,
            Up: Keys.W,
            Down: Keys.S
        }

        if (engine.controllers[1] === null || engine.controllers[1] === undefined) {
            // console.log("er is geen gamepad")
        } else {
            controller = engine.controllers[1]
            console.log(controller)
            xController = controller.getAxes(Axes.LeftStickX)
            yController = controller.getAxes(Axes.LeftStickY)
            wheelieButton = controller.isButtonPressed(Buttons.Face3)
        }

        if (kb.isHeld(keys.Up) || wheelieButton) {
            // rotate the cryptographer to face up
            if (!this.interacting && this.canRotate) {
                if (this.graphics.flipHorizontal) {
                    this.angularVelocity = +1
                    xvel *= 2
                } else {
                    this.angularVelocity = -1
                    xvel *= 2
                }
            }
        } else {
            if (!this.interacting && this.canRotate) {
                if (this.graphics.flipHorizontal) {
                    this.angularVelocity = -1
                } else {
                    this.angularVelocity = +1
                }
            }
        }

        if (kb.isHeld(keys.Left) || xController < -0.5) {
            move = -5.5 * delta
            xvel = -1
            if (!this.interacting) {
                this.graphics.flipHorizontal = true
            }
        }
        if (kb.isHeld(keys.Right) || xController > 0.5) {
            move = 5.5 * delta
            xvel = 1

            if (!this.interacting) {
                this.graphics.flipHorizontal = false
            }
        }
        if (kb.isHeld(keys.Up) || yController < -0.5) {
            yvel = -1
        }
        if (kb.isHeld(keys.Down) || yController > 0.5) {
            yvel = 1
            // if (!this.interacting && this.canRotate) {
            //     if (this.graphics.flipHorizontal) {
            //         this.angularVelocity = -1
            //     } else {
            //         this.angularVelocity = +1
            //     }
            // }
        }

        const maxRotation = 359 * Math.PI / 180
        const minRotation = 330 * Math.PI / 180
        const maxFlippedRotation = 30 * Math.PI / 180
        const minFlippedRotation = 1 * Math.PI / 180

        if (this.graphics.flipHorizontal) {
            if (this.rotation > maxFlippedRotation + 1) {
                this.rotation = minFlippedRotation
            } else {
                this.rotation = Math.min(Math.max(this.rotation, minFlippedRotation), maxFlippedRotation)
            }
        } else {
            if (this.rotation < minRotation - 1) {
                this.rotation = maxRotation
            } else {
                this.rotation = Math.min(Math.max(this.rotation, minRotation), maxRotation)
            }
        }

        if (this.interacting) {
            // this.nearTerminal.movePlatform(xvel, yvel)
        } else {
            xvel *= 120
            this.vel.x = xvel
            // this.body.applyLinearImpulse(new Vector(move, 0))
        }
    }

    checkInteraction(engine) {
        let controller = null
        let button1 = false

        if (engine.controllers[1] !== null && engine.controllers[1] !== undefined) {
            controller = engine.controllers[1];
            if (controller.wasButtonPressed(Buttons.Face1)) button1 = true
        }


        if (engine.input.keyboard.wasPressed(Keys.E) || button1) {
            if (this.nearTerminal) {
                this.interactWithTerminal(this.nearTerminal)
            }
        }
    }

    handleRespawn(event) {
        this.pos = new Vector(this.respawnX, this.respawnY)
    }

    interactWithTerminal(terminal) {
        if (this.interacting) {
            this.interacting = false
            this.nearTerminal.interacting = false
            this.nearTerminal.interactionLabel.text = 'You left the terminal'
            Resources.TerminalExit.play();
            if (!this.nearTerminal.doorMode) {
                this.nearTerminal.movePlatform(0, 0)
            }
        } else {
            this.interacting = true
            this.nearTerminal.interacting = true
            // this.nearTerminal.interactionLabel.text = 'Press "E" to stop using terminal'
            Resources.TerminalEnter.play();
            this.vel = new Vector(0, 0)
        }
    }

    hitSomething(event) {
        if (event.other.owner instanceof Terminal) {
            this.nearTerminal = event.other.owner
        } if (event.other.owner instanceof Spikes) {
            console.log('You hit the spikes!')
            this.pos.x = event.other.owner.respawnX
            this.pos.y = event.other.owner.respawnY
            Resources.Fall.play();
        } if (event.other.owner instanceof Ramp) { }
    }

    leftSomething(event) {
        if (event.other.owner instanceof Terminal) {
            if (this.interacting) {
                this.interacting = false
                this.nearTerminal.interacting = false
                this.nearTerminal.movePlatform(0, 0)
            }
            this.nearTerminal = null;
        }
    }
}