import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, FadeInOut } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Cryptographer } from './cryptographer.js'
import { Player } from './player.js'
import { Terminal } from './terminal.js'
import { Platform } from './platform.js'
import { ContinuousPlatform } from './continuousPlatform.js'
import { Wall } from './wall.js'
import { Spikes } from './spikes.js'
import { Background } from './background.js'
import { Door } from './door.js'
import { PressurePlate } from './pressure-plate.js'
import { MainMenuScene } from './MainMenuScene.js'
import { Level1 } from './Level1.js'
import { Level2 } from './level2.js'
import { Level3 } from './Level3.js'
import { Color } from 'excalibur'
import { Button } from './button.js'
import { Crate } from './crate.js'
import { Ramp } from './ramp.js'
import { Elevator } from './elevator.js'
import { HookPoint } from './hook-point.js'
import { CrackedWall } from './crackedWall.js'
import { SecretWallHole } from './secretWallHole.js'
import { SecretWall } from './secretWall.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 500)
            }
        })
        // this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())

        window.game = this;
        this.controllers = [];

        const transitions = {
            in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
        };

        this.add('menu', { scene: new MainMenuScene(), transitions });
        this.add('level1', { scene: new Level1(), transitions });
        this.add('level2', { scene: new Level2(), transitions });
        this.add('level3', { scene: new Level3(), transitions });
    }

    onInitialize() {

        this.start(ResourceLoader).then(() => {
            console.log('Resources loaded');
        });
    }

    startGame() {
        this.initGamepads();
        this.goToScene('menu');
        this.goToScene('level1');

        //     let cryptographer = new Cryptographer(100, 650)
        //     let player = new Player(100, 430)
        //     let terminal = new Terminal(820, 640, 0.08, 750, 550, false, 5, 5, 100, 100)
        //     let background = new Background()
        //     // let ramp = new Ramp(300, 660)

        //     this.add(terminal)
        //     this.add(cryptographer)
        //     this.add(player)
        //     this.add(background)
        //     // this.add(ramp)

        //     let y = 0
        //     let x = 0

        //     y = 50
        //     for (let i = 0; i < 5; i++) {
        //         let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
        //         this.add(continuousPlatform)
        //         y += 150
        //     }

        //     y = 50
        //     for (let i = 0; i < 5; i++) {
        //         let continuousPlatform = new ContinuousPlatform(1260, y, 1.5 * Math.PI)
        //         this.add(continuousPlatform)
        //         y += 150
        //     }

        //     x = 110
        //     for (let i = 0; i < 8; i++) {
        //         let continuousPlatform = new ContinuousPlatform(x, 1260, Math.PI)
        //         this.add(continuousPlatform)
        //         x += 150
        //     }

        //     this.addPlatform(85, 550)

        //     this.addPlatform(270, 550)

        //     this.addWall(450, 550, 0.5 * Math.PI)

        //     this.addWall(480, 550, 0.5 * Math.PI)

        //     this.addWall(640, 450, 0)

        //     this.addWall(640, 400, 0)

        //     this.addWall(1030, 450, 0)

        //     this.addWall(1030, 400, 0)

        //     this.addPlatform(950, 490)
        //     this.addCrate(500, 300)

        //     this.addPlatform(80, 700)
        //     this.addPlatform(170, 700)
        //     this.addPlatform(260, 700)
        //     this.addPlatform(350, 700)
        //     this.addPlatform(440, 700)
        //     this.addPlatform(530, 700)
        //     this.addPlatform(680, 700)
        //     this.addPlatform(770, 700)
        //     this.addPlatform(860, 700)
        //     this.addPlatform(950, 700)
        //     this.addPlatform(1040, 700)
        //     this.addPlatform(1130, 700)
        //     this.addPlatform(1220, 700)
        //     this.addCrackedWall(900, 600)
        //     this.addSecretWallHole(900, 600)
        //     this.addSecretWall(950, 600)
        //     this.addElevator(300, 694, 400, 300, 100, 100, false)
        //     this.addSpikes(605, 720, 0.05, 100, 650)
        //     this.addPlatform(860, 490)
        //     this.addCrate(500, 400)

        //     this.addHookpoint(150, 550)


        //     let door = this.addDoor(1030, 590)
        //     this.addPlate(700, 450, door)
        //     this.addPlate(800, 500, door)
        //     this.addPlate(950, 470, door)
        //     this.addPlate(1200, 685, door)
        // }
        // addElevator(x, y, platformX, platformY, minY, maxY, inverted) {
        //     const elevator = new Elevator(x, y, platformX, platformY, minY, maxY, inverted);
        //     this.add(elevator);
        //     return elevator;
        // }
        // addSecretWall(x, y) {
        //     const secretWall = new SecretWall(x, y)
        //     this.add(secretWall)
        // }
        // addCrackedWall(x, y) {
        //     const crackedWall = new CrackedWall(x, y)
        //     this.add(crackedWall)
        // }
        // addSecretWallHole(x, y) {
        //     const secretWallHole = new SecretWallHole(x, y)
        //     this.add(secretWallHole)
        // }
        // addWall(x, y, angle) {
        //     const wall = new Wall(x, y, angle);
        //     this.add(wall);
        // }
        // addHookpoint(x, y) {
        //     const hook = new HookPoint(x, y)
        //     this.add(hook)
        // }
        // addSpikes(x, y, scale, respawnX, respawnY) {
        //     const spikes = new Spikes(x, y, scale, respawnX, respawnY);
        //     this.add(spikes);
        // }
        // addCrate(x, y) {
        //     const crate = new Crate(x, y);
        //     this.add(crate);
        // }
        // addPlatform(x, y) {
        //     const platform = new Platform(x, y);
        //     this.add(platform);
        // }
        // addDoor(x, y) {
        //     const door = new Door(x, y);
        //     this.add(door);
        //     return door;
        // }
        // addPlate(x, y, door) {
        //     const plate = new PressurePlate(x, y, door, this);
        //     this.add(plate);
        //     return plate;
        // }
        // addButton(x, y, door) {
        //     const button = new Button(x, y, door, this);
        //     this.add(button);
        // }
    }

    initGamepads() {
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            this.controllers.push(connectevent.gamepad)
            console.log("gamepad connected", this.controllers)
        })
    }
}

new Game()
