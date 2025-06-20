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
import { HookPoint } from './hook-point.js';
import { Button } from './button.js';
import { LevelUI } from './LevelUI.js'
import { CrackedWall } from './crackedWall.js';
import { SecretWallHole } from './secretWallHole.js';
import { SecretWall } from './secretWall.js';
import { Elevator } from './elevator.js';
import { Artifact } from './Artifact.js'

export class Level2 extends Scene {
    constructor() {
        super();

    }

    onActivate() {
        this.showLevelUI();
    }

    showLevelUI() {
        const levelUI = new LevelUI(this);
        this.levelUI = levelUI;
        this.add(this.levelUI)
        console.log('level2 showLevelUI')
        this.levelUI.updateLevelName('Level 2');
        console.log('level2 updateLevelName')
        this.levelUI.updateCollectibles(0);
        this.levelUI.updateKeyStatus(false);
    }

    onInitialize(engine) {
        let background = new Background()
        background.z = -20
        let ramp = new Ramp(870, 673)

        this.add(background)
        this.add(ramp)

        ramp = new Ramp(985, 300)
        this.add(ramp)

        let terminal = new Terminal(90, 438, 0.045, 240, 325, false, 130, 490, 60, 200)
        this.add(terminal)

        let hookpoint = new HookPoint(493, 490, 1.5 * Math.PI)
        this.add(hookpoint)

        hookpoint = new HookPoint(223, 200, 1.5 * Math.PI)
        this.add(hookpoint)

        this.addWall(983, 673, 0.5 * Math.PI, 0.125)
        this.addWall(1093, 673, 0.5 * Math.PI, 0.125)
        this.addWall(1183, 673, 0.5 * Math.PI, 0.125)
        this.addWall(1194, 484, 0.5 * Math.PI, 0.1)
        this.addWall(967, 484, 0.5 * Math.PI, 0.1)
        this.addWall(879, 484, 0.5 * Math.PI, 0.1)
        this.addWall(791, 484, 0.5 * Math.PI, 0.1)
        this.addWall(725, 461, 0, 0.1)
        this.addWall(725, 373, 0, 0.1)
        this.addWall(912, 348, 0.5 * Math.PI, 0.1)
        this.addWall(1000, 348, 0.5 * Math.PI, 0.1)
        this.addWall(1100, 300, 0.5 * Math.PI, 0.125)
        this.addWall(1183, 300, 0.5 * Math.PI, 0.125)
        this.addWall(77, 490, 0.5 * Math.PI, 0.1)
        this.addWall(77, 200, 0.5 * Math.PI, 0.1)
        this.addWall(165, 200, 0.5 * Math.PI, 0.1)
        this.addWall(470, 67, 0, 0.1)
        this.addWall(470, 117, 0, 0.1)
        this.addWall(890, 180, 0.5 * Math.PI, 0.1)
        this.addWall(802, 180, 0.5 * Math.PI, 0.1)
        this.addWall(714, 180, 0.5 * Math.PI, 0.1)

        this.addPlatform(360, 490)
        this.addPlatform(410, 490)
        this.addPlatform(360, 320)
        this.addPlatform(410, 320)
        this.addPlatform(84, 340)

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
    addWall(x, y, rotation, scale) {
        const wall = new Wall(x, y, rotation, scale);
        this.add(wall);
    }
    addSpikes(x, y, scale, width, height) {
        const spikes = new Spikes(x, y, scale, width, height);
        this.add(spikes);
    }
    addCrate(x, y) {
        const crate = new Crate(x, y);
        this.add(crate);
    }
    addPlatform(x, y) {
        const platform = new Platform(x, y);
        this.add(platform);
    }
    addDoor(x, y) {
        const door = new Door(x, y);
        this.add(door);
        return door;
    }
    addPlate(x, y, door) {
        const plate = new PressurePlate(x, y, door, this);
        this.add(plate);
        return plate;
    }
    addButton(x, y, door) {
        const button = new Button(x, y, door, this);
        this.add(button);
    }
    addElevator(x, y, platformX, platformY, minY, maxY, inverted) {
        const elevator = new Elevator(x, y, platformX, platformY, minY, maxY, inverted);
        this.add(elevator);
        return elevator;
    }
    addSecretWall(x, y) {
        const secretWall = new SecretWall(x, y)
        this.add(secretWall)
    }
    addCrackedWall(x, y) {
        const crackedWall = new CrackedWall(x, y)
        this.add(crackedWall)
    }
    addSecretWallHole(x, y) {
        const secretWallHole = new SecretWallHole(x, y)
        this.add(secretWallHole)
    }
    addHookpoint(x, y) {
        const hook = new HookPoint(x, y)
        this.add(hook)
    }
}