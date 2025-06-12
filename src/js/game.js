import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Cryptographer } from './cryptographer.js'
import { Terminal } from './terminal.js'
import { Platform } from './platform.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        let cryptographer = new Cryptographer()
        let terminal = new Terminal()
        let platform = new Platform()

        this.add(terminal)
        this.add(cryptographer)
        this.add(platform)
    }
}

new Game()
