import { Actor, Engine, Keys, Vector, CollisionType, DegreeOfFreedom, CompositeCollider, Shape, Axes, Buttons } from "excalibur"
import { Resources } from "./resources.js"
import { Projectile } from "./projectile.js"
import { HookPoint } from "./hook-point.js"
import { Platform } from "./platform.js"
import { ContinuousPlatform } from "./continuousPlatform.js"
import { PressurePlate } from "./pressure-plate.js"
import { ControlPlatform } from "./controlPlatform.js"
import { Spikes } from "./spikes.js"
import { Door } from "./door.js"
import { Button } from "./button.js"
import { Crate } from "./crate.js"
import { Wall } from "./wall.js"
import { friendsGroup } from "./collisiongroups.js"
import { Ramp } from "./ramp.js"
import { Color } from "excalibur"
import { Elevator } from "./elevator.js"


export class Player extends Actor {
    sprite
    controller

    constructor(x, y) {
        super({ width: 400, height: 900, collisionType: CollisionType.Active, anchor: Vector.Half, collisionGroup: friendsGroup });
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.08, 0.08)
        this.grappling = false;
        this.grapplePoint = null;
        this.grappleSpeed = 50;
        this.grappleCooldown = 0;
        this.grappleMaxCooldown = 60;
        this.jumpForce = -400;
        this.isGrounded = false;
        this.gravity = 800;
        this.body.friction = 0;
        this.controller = null;
        this.onPlatform = false;
        this.recentPlatform = null;
        this.sprite = Resources.Adventurer.toSprite()
        this.graphics.use(this.sprite)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }
    onInitialize(engine) {


        this.on('collisionstart', (event) => this.handleCollision(event));
        this.on('collisionend', (event) => this.collisionEnd(event));
    }


    #Shoot() {
        const direction = this.sprite.flipHorizontal ? -1 : 1;
        this.scene.add(new Projectile(this.pos.x, this.pos.y, direction));
    }
    Jump() {
        if (this.isGrounded === true && !this.grappling) {
            this.vel.y = this.jumpForce;
            this.isGrounded = false;
        }
    }
    handleCollision(event) {
        const contacts = event.contact;
        const normal = contacts.normal;

        if (event.other.owner instanceof Spikes) {
            this.pos.x = event.other.owner.respawnX
            this.pos.y = event.other.owner.respawnY
        }

        if (normal.y > 0.5) {
            if (event.other.owner instanceof Platform || event.other.owner instanceof Elevator|| event.other.owner instanceof HookPoint|| event.other.owner instanceof PressurePlate || event.other.owner instanceof Crate || event.other.owner instanceof ContinuousPlatform || event.other.owner instanceof ControlPlatform || event.other.owner instanceof Ramp || event.other.owner instanceof Wall) {
                this.isGrounded = true;
                this.vel.y = 0;
            }
            console.log('Hit from above - landing on platform');
            // this.isGrounded = true;
            // this.vel.y = 0;
        }
        if (event.other.owner instanceof ControlPlatform) {
            this.onPlatform = true;
            this.recentPlatform = event.other.owner;
        }
        // Normal.y = -1 means collision from below (player hitting ceiling)
        else if (normal.y < -0.5) {
            console.log('Hit from below - hitting ceiling');
        }
        // Normal.x indicates side collision (left or right wall)
        else if (Math.abs(normal.x) > 0.5) {
            console.log('Hit from side - wall collision');
            // Don't set grounded for wall collisions
            // Allow sliding down
        }
    }



    collisionEnd(event) {
        if (event.other.owner instanceof ControlPlatform) {
            this.onPlatform = false;
        }
    }

    activateGrapple(hookPoint) {
        if (this.grappleCooldown <= 0 && !this.grappling) {
            this.grappling = true;
            this.grapplePoint = hookPoint.pos.clone();
            console.log(`Grappling to: ${this.grapplePoint.toString()}`);
            this.vel = new Vector(0, 0);
        }
    }

    updateGrapple() {
        if (this.grappling && this.grapplePoint) {
            // Bereken richting en afstand naar grapple point
            const direction = this.grapplePoint.sub(this.pos);
            const distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            // Als we dichtbij zijn, stop met grappelen
            if (distance < 20) {
                this.grappling = false;
                this.grappleCooldown = this.grappleMaxCooldown;
                this.vel = new Vector(0, 0);

                // Pas de eindpositie aan om iets boven het hookpoint te zijn
                this.pos = new Vector(
                    this.grapplePoint.x,
                    this.grapplePoint.y - 50
                );
                return;
            }


            // Normaliseer de richting (maak lengte 1)
            const normalizedDirection = new Vector(
                direction.x / distance,
                direction.y / distance
            );

            // Pas direct de positie aan voor een directe pull
            const moveDistance = Math.min(this.grappleSpeed, distance);
            this.pos = this.pos.add(normalizedDirection.scale(moveDistance));

            // Zet velocity naar 0 om andere beweging te voorkomen
            this.vel = new Vector(0, 0);
        } else if (this.grappleCooldown > 0) {
            this.grappleCooldown--;
        }
    }

    updateControlller(engine) {
        this.controller = {};
        let con = engine.controllers[0]
        if (engine.controllers[0] === null || engine.controllers[0] === undefined) {
            this.controller.x = 0;
            this.controller.y = 0;
            this.controller.button1 = false;
            this.controller.button2 = false;
            this.controller.button3 = false;
        } else {
            this.controller.x = con.getAxes(Axes.LeftStickX)
            this.controller.y = con.getAxes(Axes.LeftStickY);
            this.controller.button1 = con.wasButtonPressed(Buttons.Face1);
            this.controller.button2 = con.wasButtonPressed(Buttons.Face2);
            this.controller.button3 = con.wasButtonPressed(Buttons.Face3);
        }
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        this.updateGrapple()
        this.updateControlller(engine);

        // Grapple input
        if (engine.input.keyboard.wasPressed(Keys.F) || this.controller.button2) {
            const hookPoints = this.scene.actors.filter(a => a instanceof HookPoint);
            let closestHookPoint = null;
            let minDistance = Infinity;
            hookPoints.forEach(hookPoint => {
                const distance = this.pos.distance(hookPoint.pos);
                if (distance <= hookPoint.grappleRadius && distance < minDistance) {
                    minDistance = distance;
                    closestHookPoint = hookPoint;
                }
            });
            if (closestHookPoint) {
                if (closestHookPoint.pos.y < this.pos.y) {
                    this.activateGrapple(closestHookPoint);
                    console.log(`Grappling to point at ${closestHookPoint.pos.toString()}, distance: ${minDistance}`);
                }
                else {
                    console.log("Grapple point is below player");
                }
            }
        }
        let xspeed = 0;

        // Alleen horizontale beweging als je niet aan het grappelen bent
        if (!this.grappling) {
            if (engine.input.keyboard.isHeld(Keys.Left) || this.controller.x < -0.5) {
                xspeed = -100;
                this.sprite.flipHorizontal = true;
            }
            if (engine.input.keyboard.isHeld(Keys.Right) || this.controller.x > 0.5) {
                xspeed = 100;
                this.sprite.flipHorizontal = false;
            }
            // Springen met spatiebalk
            if (engine.input.keyboard.wasPressed(Keys.Space) || this.controller.button1) {
                this.Jump();
            }
        }

        // check of het platform op de clamp border is
        if (this.recentPlatform && this.onPlatform && this.recentPlatform.pos.x <= this.recentPlatform.minX) {
            xspeed -= this.recentPlatform.vel.x;
        }
        if (this.recentPlatform && this.onPlatform && this.recentPlatform.pos.x >= this.recentPlatform.maxX) {
            xspeed -= this.recentPlatform.vel.x;
        }

        // Gravity toepassen als je niet aan het grappelen bent
        if (!this.grappling) {
            this.vel.y += this.gravity * (delta / 1000);
        }

        // Zet alleen xspeed als je niet aan het grappelen bent
        if (!this.grappling) {
            this.vel.x = xspeed;
        }

        // Schieten
        if (engine.input.keyboard.wasPressed(Keys.Q) || this.controller.button3) {
            this.#Shoot();
        }

        // if (this.onPlatform && !engine.input.keyboard.wasPressed(Keys.Space)) {
        //     this.vel.y = 0
        // }


        let platformVel = 0;
        if (this.recentPlatform) {
            platformVel = this.recentPlatform.vel.clone()
        }
        if (this.onPlatform) {
            if (!engine.input.keyboard.wasPressed(Keys.Space) && !this.controller.button1) {
                this.vel.y = 0
            }
            if (!engine.input.keyboard.isHeld(Keys.Left) && !engine.input.keyboard.isHeld(Keys.Right) && this.controller.x === 0) {
                // this.vel.x = this.recentPlatform.vel.x;
                const relativeVelocity = this.recentPlatform.vel.clone().add(this.vel.clone());
                this.vel = relativeVelocity;
            }
        }
    }
}