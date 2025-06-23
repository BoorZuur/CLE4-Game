import { Actor, Vector, CollisionType, Keys, Axes, Buttons } from 'excalibur';
import { Resources } from './resources.js';
import { ControlPlatform } from './controlPlatform.js';
import { Cryptographer } from './cryptographer.js';
import { InteractionLabel } from './interactionLabel.js';
import { Door } from './door.js';

export class Terminal extends Actor {
    doorMode
    door
    platform
    objectX
    objectY
    minX
    maxX
    minY
    maxY
    interactionLabel
    interacting
    hacked
    cryptographer = null
    isGreen = false
    minigameTimer = 0
    nextSwitchTime = 0
    onCooldown = false
    cooldownTimer

    constructor(posX, posY, scale, objectX, objectY, doorMode, minX, maxX, minY, maxY) {
        super({ width: Resources.Terminal.width, height: Resources.Terminal.height });
        this.pos = new Vector(posX, posY)
        this.scale = new Vector(scale, scale)
        this.graphics.use(Resources.Terminal.toSprite())
        this.body.collisionType = CollisionType.Passive;
        this.initScale = scale;
        this.doorMode = doorMode
        this.door = null;
        this.objectX = objectX;
        this.objectY = objectY;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.hacked = false;
        this.interactionLabel = null;
        this.interacting = false;
        this.cooldownTimer = 120;
        this.onCooldown = false;
        this.z = -2
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leftSomething(event))
        if (this.doorMode) {
            this.createDoor();
        } else {
            this.createPlatform();
        }
        this.setNextSwitchTime();
    }

    hitSomething(event) {
        if (event.other.owner instanceof Cryptographer) {
            this.cryptographer = event.other.owner;
            if (!this.interactionLabel) {
                this.interactionLabel = new InteractionLabel(0, -1000, 'Press "E" to use terminal', 50, 'White')
                this.addChild(this.interactionLabel)
            }
        }
    }

    leftSomething(event) {
        if (event.other.owner instanceof Cryptographer) {
            if (this.interactionLabel) {
                this.interactionLabel.kill()
                this.interactionLabel = null
            }
            this.graphics.use(Resources.Terminal.toSprite());
            this.graphics.flipHorizontal = false;
            this.scale = new Vector(this.initScale, this.initScale);
            this.isGreen = false;
            this.minigameTimer = 0;
            this.onCooldown = false;
            this.interacting = false;
            this.hacked = false;
        }
    }

    createPlatform() {
        // niet aankomen zelfs einstein weet niet hoe dit werkt
        let width = (this.maxX - this.minX) / 2;
        let height = (this.maxY - this.minY) / 2;

        let border = new Actor({
            pos: new Vector(this.objectX + width, this.objectY + height),
            collisionType: CollisionType.Fixed,
        });
        border.scale = new Vector((this.minX + this.maxX) / Resources.Border.width, (this.minY + this.maxY) / Resources.Border.width);
        border.graphics.use(Resources.Border.toSprite());

        this.platform = new ControlPlatform(this.objectX, this.objectY,
            this.minX, this.maxX, this.minY, this.maxY);

        border.z = -1
        this.scene.add(border)
        this.scene.add(this.platform);
    }

    createDoor() {
        this.door = new Door(this.objectX, this.objectY);
        this.door.graphics.use(Resources.ControllableDoor.toSprite());
        this.scene.add(this.door);
    }

    setNextSwitchTime() {
        this.nextSwitchTime = Math.random() * 30 + 30;
    }

    movePlatform(x, y) {
        const speed = 100

        // diagonal movement
        if (x && y) {
            x *= 0.7071; // 1/sqrt(2)
            y *= 0.7071; // 1/sqrt(2)
        }

        this.platform.vel = new Vector(x * speed, y * speed)
    }

    onPreUpdate(engine) {
        let controller = null
        let controllerX = 0;
        let controllerY = 0;
        let button2 = false;

        if (engine.controllers[1] !== null && engine.controllers[1] !== undefined) {
            controller = engine.controllers[1];
            controllerX = controller.getAxes(Axes.LeftStickX);
            controllerY = controller.getAxes(Axes.LeftStickY);
            if (controller.wasButtonPressed(Buttons.Face2)) button2 = true;
        }


        if (this.onCooldown) {
            this.cooldownTimer--;
            if (this.cooldownTimer <= 0) {
                this.onCooldown = false;
                if (this.interactionLabel) {
                    this.interactionLabel.text = 'Press "E" to use terminal';
                }
            }
        }

        if (this.interacting && !this.hacked && !this.onCooldown) {
            this.minigameTimer++;
            this.interactionLabel.text = 'When green, press "W" to hack.';

            if (this.minigameTimer > this.nextSwitchTime) {
                this.isGreen = !this.isGreen;
                this.minigameTimer = 0;
                this.setNextSwitchTime();
            }

            if (this.isGreen) {
                this.graphics.use(Resources.TerminalGreen.toSprite());
                this.graphics.flipHorizontal = true;
                // this.scale = new Vector(0.1, 0.1);
            } else {
                this.graphics.use(Resources.TerminalRed.toSprite());
                this.graphics.flipHorizontal = true;
                // this.scale = new Vector(0.1, 0.1);
            }

            if (engine.input.keyboard.wasPressed(Keys.W) || button2) {
                if (this.isGreen) {
                    this.hacked = true;
                    this.interactionLabel.text = 'Hacked! Press "E" to exit';
                } else {
                    this.onCooldown = true;
                    this.cooldownTimer = 120;
                    this.interactionLabel.text = 'Failed! Cooldown...';
                    this.graphics.use(Resources.Terminal.toSprite());
                    this.graphics.flipHorizontal = false;
                    // this.scale = new Vector(0.08, 0.08);
                }
            }
        } else if (this.interacting && this.hacked) {
            if (this.doorMode && this.door) {
                this.door.kill();
            } else {
                let x = 0;
                let y = 0;

                if (engine.input.keyboard.isHeld(Keys.W) || controllerY < -0.5) y = -1;
                if (engine.input.keyboard.isHeld(Keys.S) || controllerY > 0.5) y = 1;
                if (engine.input.keyboard.isHeld(Keys.A) || controllerX < -0.5) x = -1;
                if (engine.input.keyboard.isHeld(Keys.D) || controllerX > 0.5) x = 1;
                this.movePlatform(x, y);
            }
        }
    }
}