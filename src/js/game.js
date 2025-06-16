import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Cryptographer } from './cryptographer.js'
import { Terminal } from './terminal.js'
import { Platform } from './platform.js'
import { ContinuousPlatform } from './continuousPlatform.js'
import { Wall } from './wall.js'

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

    startGame() {
        let y = 0
        let x = 0

        let cryptographer = new Cryptographer()
        let terminal = new Terminal()
        
        // this.add(terminal)
        this.add(cryptographer)
        
        y = 50
        for (let i = 0; i < 5; i++){
            let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        x = 110
        for (let i = 0; i < 8; i++){
            let continuousPlatform = new ContinuousPlatform(x, 720, 0)
            this.add(continuousPlatform)
            x += 150
        }

        y = 50
        for (let i = 0; i < 5; i++){
            let continuousPlatform = new ContinuousPlatform(1260, y, 1.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        x = 110
        for (let i= 0; i < 8; i++){
            let continuousPlatform = new ContinuousPlatform(x, 0, Math.PI)
            this.add(continuousPlatform)
            x += 150
        }

        let platform = new Platform(85, 550)
        this.add(platform)

        platform = new Platform(270, 550)
        this.add(platform)

        let wall = new Wall(450, 550, 0.5 * Math.PI)
        this.add(wall)

        wall = new Wall(480, 550, 0.5 * Math.PI)
        this.add(wall)

        wall = new Wall(640, 450, 0)
        this.add(wall)

        wall = new Wall(640, 400, 0)
        this.add(wall)
    }
}

new Game()
