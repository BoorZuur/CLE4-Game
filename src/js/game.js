import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Cryptographer } from './cryptographer.js'
import { Terminal } from './terminal.js'
import { Platform } from './platform.js'
import { ContinuousPlatform } from './continuousPlatform.js'
import { Spikes } from './spikes.js'

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
        let cryptographer = new Cryptographer(200, 600)
        let terminal = new Terminal(600, 630, -2000, -4000, 5, 5, 1500, 500)
        let spikes = new Spikes(900, 680, 0.1, 200, 600)
        
        // let platform = new Platform()
        
        this.add(terminal)
        this.add(cryptographer)
        this.add(spikes)

        let y = 50
        for (let i = 0; i < 5; i++){
            let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        let x = 110
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
    }
}

new Game()
