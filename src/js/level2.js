// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys, Vector } from 'excalibur';
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
import { Key } from './Key.js';
import { Exit } from './Exit.js';

export class Level2 extends Scene {

    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;

    constructor() {
        super();

    }

    onActivate() {
        this.showLevelUI();
        this.levelUI.ui.showTutorialUI();
    }

    showLevelUI() {
        const levelUI = new LevelUI(this);
        this.levelUI = levelUI;
        this.add(this.levelUI)
        this.levelUI.ui.currentLevel = 2;
        console.log('level2 showLevelUI')
        this.levelUI.updateLevelName('Level 2');
        console.log('level2 updateLevelName')
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
        let cryptographer = new Cryptographer(100, 500)
        let player = new Player(100, 500)
        this.add(cryptographer)
        this.add(player)
        let background = new Background()
        background.z = -20
        let ramp = new Ramp(870, 678)

        this.add(background)
        this.add(ramp)

        ramp = new Ramp(987, 302)
        this.add(ramp)

        let terminal = new Terminal(90, 438, 0.045, 240, 325, false, 130, 490, 60, 200)
        this.add(terminal)

        this.addHookpoint(493, 480, 1.5 * Math.PI)


        this.addHookpoint(223, 140, 1.5 * Math.PI)

        this.addWall(983, 678, 0.5 * Math.PI, 0.125)
        this.addWall(1093, 678, 0.5 * Math.PI, 0.125)
        this.addWall(1183, 678, 0.5 * Math.PI, 0.125)
        this.addWall(1194, 484, 0.5 * Math.PI, 0.1)
        this.addWall(967, 484, 0.5 * Math.PI, 0.1)
        this.addWall(879, 484, 0.5 * Math.PI, 0.1)
        this.addWall(791, 484, 0.5 * Math.PI, 0.1)
        this.addWall(725, 461, 0, 0.1)
        this.addWall(725, 373, 0, 0.1)
        this.addWall(912, 348, 0.5 * Math.PI, 0.1)
        this.addWall(1000, 348, 0.5 * Math.PI, 0.1)
        this.addWall(1100, 303, 0.5 * Math.PI, 0.125)
        this.addWall(1183, 303, 0.5 * Math.PI, 0.125)
        this.addWall(75, 490, 0.5 * Math.PI, 0.1)
        this.addWall(75, 150, 0.5 * Math.PI, 0.1)
        this.addWall(163, 150, 0.5 * Math.PI, 0.1)

        this.addWall(517, 67, 0, 0.1)
        this.addWall(517, 117, 0, 0.1)

        this.addWall(890, 178, 0.5 * Math.PI, 0.1)
        this.addWall(802, 178, 0.5 * Math.PI, 0.1)
        this.addWall(714, 178, 0.5 * Math.PI, 0.1)

        this.addWall(538, 178, 0.5 * Math.PI, 0.1)
        this.addWall(626, 178, 0.5 * Math.PI, 0.1)


        this.addPlatform(360, 490)
        this.addPlatform(410, 490)
        this.addPlatform(360, 320)
        this.addPlatform(410, 320)
        this.addPlatform(84, 340)
        this.addSecretWall(85, 120, 0.5 * Math.PI)
        this.addSecretWall(85, 80, 0.5 * Math.PI)
        this.addSecretWall(85, 40, 0.5 * Math.PI)
        this.addCrackedWall(155, 85)
        this.addSecretWallHole(155, 85)

        let door = this.addDoor(900, 270)
        this.addPlate(75, 315, door, true, 0, 15000)


        //rechtse elevators
        this.addElevator(840, 155, 1085, 600, 125, 100, true)
        this.addElevator(720, 155, 792, 440, 100, 100, true)

        this.addWall(882, 348, 0.5 * Math.PI, 0.1)

        this.addWall(1176, 484, 0.5 * Math.PI, 0.1)
        this.addWall(992, 484, 0.5 * Math.PI, 0.1)


        let door2 = this.addDoor(980, 580)
        this.addButton(1230, 235, door2, true)
        this.addTerminal(1185, 614, 0.06, 900, 90, true)
        this.addTerminal(1185, 424, 0.06, 780, 90, true)
        this.addHookpoint(950, 170, 1.5 * Math.PI)
        this.addPlate(590, 154, door, false, 0, 0, true)
        // this.addHookpoint(590, 140, 1.5 * Math.PI)
        this.exit = new Exit(1100, 225, this)
        this.exit.scale = new Vector(0.12, 0.12)
        this.add(this.exit)
        // this.addHookpoint(680, 210, 0)
        this.key = new Key(900, 425, this)
        this.key.scale = new Vector(0.05, 0.05)
        this.add(this.key)

        this.addArtifact(375, 250)
        this.addArtifact(80, 80)
        this.addArtifact(800, 425)

        let y = 0
        let x = 0

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
            this.add(continuousPlatform)
            continuousPlatform.z = 4
            y += 150
        }
        this.addPlatform(0, 725)
        this.addPlatform(125, 725)
        this.addPlatform(250, 725)
        this.addPlatform(375, 725)
        this.addPlatform(500, 725)
        this.addPlatform(625, 725)
        this.addPlatform(750, 725)
        this.addPlatform(875, 725)
        this.addPlatform(1000, 725)
        this.addPlatform(1125, 725)
        this.addPlatform(1250, 725)

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(1260, y, 1.5 * Math.PI)
            this.add(continuousPlatform)
            continuousPlatform.z = 4
            y += 150
        }

        x = 110
        for (let i = 0; i < 8; i++) {
            let continuousPlatform = new ContinuousPlatform(x, 0, Math.PI)
            this.add(continuousPlatform)
            continuousPlatform.z = 4
            x += 150
        }
        this.addElevator(390, 466, 168, 650, 175, 100, false)
    }
    addArtifact(x, y) {
        const artifact = new Artifact(x, y, this)
        this.add(artifact)
        artifact.z = -6
    }
    addTerminal(posX, posY, scale, objectX, objectY, doorMode, minX, maxX, minY, maxY) {
        let terminal = new Terminal(posX, posY, scale, objectX, objectY, doorMode, minX, maxX, minY, maxY)
        this.add(terminal)
    }
    addWall(x, y, rotation, scale) {
        const wall = new Wall(x, y, rotation, scale);
        this.add(wall);
        wall.z = 4
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
        platform.z = 2
    }
    addDoor(x, y) {
        const door = new Door(x, y);
        this.add(door);
        return door;
    }
    addPlate(x, y, door, type = false, rotation = 0, time = 0, deletetype) {
        const plate = new PressurePlate(x, y, door, this, rotation, type, time, deletetype);
        this.add(plate);
        return plate;
    }
    addButton(x, y, door, flipped) {
        const button = new Button(x, y, door, this, flipped);
        this.add(button);
        button.scale = new Vector(0.07, 0.07)
    }
    addElevator(x, y, platformX, platformY, minY, maxY, inverted) {
        const elevator = new Elevator(x, y, platformX, platformY, minY, maxY, inverted);
        this.add(elevator);
        elevator.z = 1
    }
    addSecretWall(x, y) {
        const secretWall = new SecretWall(x, y)
        this.add(secretWall)
        secretWall.z = 2
    }
    addCrackedWall(x, y) {
        const crackedWall = new CrackedWall(x, y)
        this.add(crackedWall)
        crackedWall.z = 2
    }
    addSecretWallHole(x, y) {
        const secretWallHole = new SecretWallHole(x, y)
        secretWallHole.scale.x = 0.1;
        this.add(secretWallHole)
        secretWallHole.z = 1
    }
    addHookpoint(x, y, rotation) {
        const hook = new HookPoint(x, y, rotation)
        this.add(hook)
    }
}