// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys } from 'excalibur';
import { Resources } from './resources.js';
import { Cryptographer } from './cryptographer.js'
import { Terminal } from './terminal.js'
import { Spikes } from './spikes.js'
import { ContinuousPlatform } from './continuousPlatform.js'
import { Platform } from './platform.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { Wall } from './wall.js'
import { Door } from './door.js'
import { PressurePlate } from './pressure-plate.js'
import { Crate } from './crate.js'
import { Ramp } from './ramp.js'
// import { LevelUI } from './LevelUI.js'
// import { Artifact } from './Artifact.js'

export class Level2 extends Scene {
    constructor() {
        super();

    }

    onInitialize(engine) {
        let background = new Background()
        let ramp = new Ramp(870, 671)

        this.add(background)
        this.add(ramp)

        ramp = new Ramp(985, 300)
        this.add(ramp)

        let wall = new Wall(983, 671, 0.5 * Math.PI, 0.125, 0.125)
        this.add(wall)

        wall = new Wall(1093, 671, 0.5 * Math.PI, 0.125, 0.125)
        this.add(wall)

        wall = new Wall(1183, 671, 0.5 * Math.PI, 0.125, 0.125)
        this.add(wall)

        wall = new Wall(1194, 484, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(967, 484, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(879, 484, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(791, 484, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(725, 461, 0, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(725, 373, 0, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(912, 348, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(1000, 348, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(1100, 300, 0.5 * Math.PI, 0.125, 0.125)
        this.add(wall)

        wall = new Wall(1183, 300, 0.5 * Math.PI, 0.125, 0.125)
        this.add(wall)

        wall = new Wall(77, 490, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(77, 200, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(165, 200, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(470, 67, 0, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(470, 117, 0, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(890, 180, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(802, 180, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        wall = new Wall(714, 180, 0.5 * Math.PI, 0.1, 0.1)
        this.add(wall)

        let platform = new Platform(360, 490)
        this.add(platform)

        platform = new Platform(410, 490)
        this.add(platform)

        platform = new Platform(360, 320)
        this.add(platform)

        platform = new Platform(410, 320)
        this.add(platform)

        platform = new Platform(84, 340)
        this.add(platform)

        let y = 0
        let x = 0

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        x = 110
        for (let i = 0; i < 8; i++) {
            let continuousPlatform = new ContinuousPlatform(x, 720, 0)
            this.add(continuousPlatform)
            x += 150
        }

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(1260, y, 1.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        x = 110
        for (let i = 0; i < 8; i++) {
            let continuousPlatform = new ContinuousPlatform(x, 0, Math.PI)
            this.add(continuousPlatform)
            x += 150
        }
    }
}