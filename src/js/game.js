import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
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
import { Button } from './button.js'
import { Crate } from './crate.js'
import { Level2 } from './level2.js'
import { Level3 } from './level3.js'

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
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize() {
        // const mainMenu = new MainMenuScene();
        // this.add('menu', mainMenu);
        // const level1 = new Level1();
        // this.add('level1', level1);
        const level2 = new Level2();
        this.add('level2', level2);
        const level3 = new Level3();
        this.add('level3', level3)

        this.goToScene('level3');

        // Load resources
        this.start(ResourceLoader).then(() => {
            console.log('Resources loaded');
        });
    }

    startGame() {
    //     let cryptographer = new Cryptographer(100, 670)
    //     let player = new Player(100, 430)
    //     let terminal = new Terminal(820, 640, 750, 550, 5, 5, 100, 100)
    //     let background = new Background()
    //     background.z = -1

    //     this.add(terminal)
    //     this.add(cryptographer)
    //     this.add(player)
    //     this.add(background)

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
    //         let continuousPlatform = new ContinuousPlatform(x, 0, Math.PI)
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
    //     this.addCrate(500, 400)

    //     this.addPlatform(80,700)
    //     this.addPlatform(170,700)
    //     this.addPlatform(260,700)
    //     this.addPlatform(350,700)
    //     this.addPlatform(440,700)
    //     this.addPlatform(530,700)
    //     this.addPlatform(680,700)
    //     this.addPlatform(770,700)
    //     this.addPlatform(860,700)
    //     this.addPlatform(950,700)
    //     this.addPlatform(1040,700)
    //     this.addPlatform(1130,700)
    //     this.addPlatform(1220,700)
    //     this.addSpikes(605,720, 0.05, 50, 50)


    //     let door = this.addDoor(1030, 590)
    //     this.addPlate(950, 470, door)
    //     this.addPlate(1200, 685, door)
    // }
    // addWall(x, y, angle) {
    //     const wall = new Wall(x, y, angle);
    //     this.add(wall);
    // }
    // addSpikes(x, y, scale, width, height) {
    //     const spikes = new Spikes(x, y, scale, width, height);
    //     this.add(spikes);
    // }
    // addCrate(x,y){
    //     const crate = new Crate(x, y);
    //     this.add(crate);
    // }
    // addPlatform(x,y){
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
    //     const button = new Button(x, y, door,this);
    //     this.add(button);
    // }
    }
}

new Game()
