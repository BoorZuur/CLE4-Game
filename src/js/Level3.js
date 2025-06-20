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
// import { LevelUI } from './LevelUI.js'
// import { Artifact } from './Artifact.js'

export class Level3 extends Scene {

    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;

    constructor() {
        super();

    }

    onActivate() {
        this.showLevelUI();
    }
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
    showLevelUI() {
        const levelUI = new LevelUI(this);
        this.levelUI = levelUI;
        this.add(this.levelUI)
        console.log('level3 showLevelUI')
        this.levelUI.updateLevelName('Level 2');
        console.log('level3 updateLevelName')
        this.levelUI.updateCollectibles(0);
        this.levelUI.updateKeyStatus(false);
    }
    onDeactivate() {
        this.actors.forEach(actor => {
            this.remove(actor);
            actor.kill();
        });

        // Remove keyboard listener
        this.engine.input.keyboard.off('press');
    }

    onInitialize(engine) {
        let background = new Background()
        background.z = -20
        this.add(background)

        let ramp = new Ramp(1055, 673)
        this.add(ramp)

        this.addHookpoint(946, 477, 1.5 * Math.PI)
        this.addCrate(915, 390)

        this.addWall(1169, 673, 0.5 * Math.PI, 0.125)
        this.addWall(1184, 673, 0.5 * Math.PI, 0.125)
        this.addWall(1159, 533, 0.5 * Math.PI, 0.1)
        this.addWall(1196, 533, 0.5 * Math.PI, 0.1)
        this.addWall(1159, 383, 0.5 * Math.PI, 0.1)
        this.addWall(1196, 383, 0.5 * Math.PI, 0.1)
        this.addWall(890, 595, 0.5 * Math.PI, 0.1)
        this.addWall(802, 595, 0.5 * Math.PI, 0.1)
        this.addWall(714, 595, 0.5 * Math.PI, 0.1)
        this.addWall(626, 595, 0.5 * Math.PI, 0.1)
        this.addWall(538, 595, 0.5 * Math.PI, 0.1)
        this.addWall(494, 595, 0.5 * Math.PI, 0.1)
        this.addWall(75, 480, 0.5 * Math.PI, 0.1)
        this.addWall(180, 530, 0, 0.125)
        this.addWall(913, 530, 0, 0.1)
        this.addWall(890, 480, 0.5 * Math.PI, 0.1)
        this.addWall(270, 393, 0.5 * Math.PI, 0.1)
        this.addWall(230, 415, 0, 0.1)

        let x = 710
        for (let i = 0; i < 8; i++) {
            this.addWall(x, 480, 0.5 * Math.PI, 0.1)
            x -= 88
        }

        let y = 0
        x = 0

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
    addHookpoint(x, y, rotation) {
        const hookpoint = new HookPoint(x, y, rotation);
        this.add(hookpoint)
    }
}