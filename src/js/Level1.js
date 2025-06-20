// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys } from 'excalibur';
import { Cryptographer } from './cryptographer.js'
import { Terminal } from './terminal.js'
import { Spikes } from './spikes.js'
import { Platform } from './platform.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { Wall } from './wall.js'
import { Door } from './door.js'
import { PressurePlate } from './pressure-plate.js'
import { Crate } from './crate.js'
import { LevelUI } from './LevelUI.js'
import { DartShooter } from './DartShooter.js'
import { HookPoint } from './hook-point.js'
import { Elevator } from './elevator.js'
import { SecretWall } from './secretWall.js'
import { CrackedWall } from './crackedWall.js'
import { SecretWallHole } from './secretWallHole.js'
import { ContinuousPlatform } from './continuousPlatform.js'
import { Ramp } from './ramp.js'
import { Button } from './button.js'



export class Level1 extends Scene {


    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;
    currentCheckPointX = 110
    currentCheckPointY = 445

    constructor() {
        super();

    }

    onPreUpdate(engine, delta) {

    }

    onActivate() {
        this.showLevelUI();
        this.onStartLevel();
    }


    updateCheckPoint(currentCheckPointX, currentCheckPointY) {
        this.currentCheckPointX = currentCheckPointX
        this.currentCheckPointY = currentCheckPointY
        console.log(this.currentCheckPointX + ' ' + this.currentCheckPointY);
        this.actors.forEach(actor => {
            if (actor instanceof Spikes) {
                actor.respawnX = this.currentCheckPointX
                actor.respawnY = this.currentCheckPointY
            }
            if (actor instanceof DartShooter) {
                actor.respawnX = this.currentCheckPointX
                actor.respawnY = this.currentCheckPointY
            }
        });

    }

    onStartLevel() {

        console.log('onStartLevel')
        let cryptographer = new Cryptographer(100, 650)
        let player = new Player(100, 430)
        let terminal = new Terminal(820, 640, 0.08, 750, 550, false, 5, 5, 100, 100)
        let background = new Background()

        this.add(terminal)
        this.add(cryptographer)
        this.add(player)
        this.add(background)

        let y = 0
        let x = 0

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(10, y, 0.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        y = 50
        for (let i = 0; i < 5; i++) {
            let continuousPlatform = new ContinuousPlatform(1260, y, 1.5 * Math.PI)
            this.add(continuousPlatform)
            y += 150
        }

        x = 110
        for (let i = 0; i < 8; i++) {
            let continuousPlatform = new ContinuousPlatform(x, 325, Math.PI)
            this.add(continuousPlatform)
            x += 150
        }

        this.addPlatform(85, 550)

        this.addPlatform(270, 550)

        this.addWall(450, 550, 0.5 * Math.PI, 0.125)

        this.addWall(480, 550, 0.5 * Math.PI, 0.125)

        this.addWall(640, 450, 0, 0.125)

        this.addWall(640, 400, 0, 0.125)

        this.addWall(1030, 450, 0, 0.125)

        this.addWall(1030, 400, 0, 0.125)

        this.addPlatform(950, 490)
        this.addCrate(500, 480)

        this.addPlatform(80, 700)
        this.addPlatform(170, 700)
        this.addPlatform(260, 700)
        this.addPlatform(350, 700)
        this.addPlatform(440, 700)
        this.addPlatform(530, 700)
        this.addPlatform(680, 700)
        this.addPlatform(770, 700)
        this.addPlatform(860, 700)
        this.addPlatform(950, 700)
        this.addPlatform(1040, 700)
        this.addPlatform(1130, 700)
        this.addPlatform(1220, 700)
        this.addSpikes(605, 720, 0.05, 100, 650)

        this.addHookpoint(550, 535, 1.5 * Math.PI)


        let door = this.addDoor(1030, 590)
        this.addPlate(950, 470, door)
        this.addPlate(1200, 685, door)
    }
    onInitialize(engine) {

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
    addHookpoint(x, y, rotation) {
        const hook = new HookPoint(x, y, rotation)
        this.add(hook)
    }

    showLevelUI() {
        console.log('showLevelUI')
        const levelUI = new LevelUI(this);
        this.levelUI = levelUI;
        this.add(levelUI)
        // this.collectibleCount = 0;

        levelUI.updateLevelName('Level 1');

        levelUI.updateCollectibles(0);
    }

    onDeactivate() {
        this.actors.forEach(actor => {
            this.remove(actor);
            actor.kill();
        });

        // Remove keyboard listener
        this.engine.input.keyboard.off('press');
    }
}   