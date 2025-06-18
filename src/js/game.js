import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level2 } from './level2.js'

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
        this.add('level2', level2)

        this.goToScene('level2');

        // Load resources
        this.start(ResourceLoader).then(() => {
            console.log('Resources loaded');
        });
    }

    startGame() {
    }
}

new Game()
