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
        let cryptographer = new Cryptographer(100, 600)
        let player = new Player(100, 500)
        let terminal = new Terminal(820, 640, -1000, -1500, 5, 5, 1000, 1300)
        let spikes = new Spikes(900, 680, 0.1, 200, 600)
        let background = new Background()
        background.z = -1
        
        this.add(terminal)
        this.add(cryptographer)
        this.add(player)
        this.add(background)
        
        let y = 0
        let x = 0
        
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
