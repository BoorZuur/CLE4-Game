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
import { Artifact } from './Artifact.js'
import { Elevator } from './elevator.js';
import { SecretWall } from './secretWall.js';
import { CrackedWall } from './crackedWall.js';
import { SecretWallHole } from './secretWallHole.js';
import { InteractionLabel } from './interactionLabel.js';
import { Exit } from './Exit.js';
import { DartShooter } from './DartShooter.js';
import { Checkpoint } from './Checkpoint.js';
import { Key } from './Key.js';
import { FlatPlatform } from './flatplatform.js';


export class Level3 extends Scene {

    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;
    respawnX = 325;
    respawnY = 650;

    constructor() {
        super();

    }

    onActivate() {
        this.showLevelUI();
        this.levelUI.ui.nextScreen = 'Level3Mechanics'
        this.levelUI.ui.showTutorialUI();
    }
    addElevator(x, y, platformX, platformY, minY, maxY, inverted) {
        const elevator = new Elevator(x, y, platformX, platformY, minY, maxY, inverted);
        this.add(elevator);
        return elevator;
    }
    addSecretWall(x, y) {
        const secretWall = new SecretWall(x, y)
        this.add(secretWall)
        secretWall.scale = 0.1
        secretWall.z = 100
    }
    addCrackedWall(x, y) {
        const crackedWall = new CrackedWall(x, y)
        this.add(crackedWall)
    }
    addSecretWallHole(x, y) {
        const secretWallHole = new SecretWallHole(x, y)
        this.add(secretWallHole)
        secretWallHole.graphics.flipHorizontal = true
        secretWallHole.scale.x = 0.1
    }
    addWall(x, y, angle, scale) {
        const wall = new Wall(x, y, angle, scale);
        this.add(wall);
    }
    addHookpoint(x, y, rotation) {
        const hook = new HookPoint(x, y, rotation)
        this.add(hook)
    }
    addSpikes(x, y, scale) {
        const spikes = new Spikes(x, y, scale, this.respawnX, this.respawnY);
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
        door.scale = new Vector(0.15, 0.15);
        this.add(door);
        return door;
    }
    addPlate(x, y, door, type = false, rotation = 0, time = 0) {
        const plate = new PressurePlate(x, y, door, this, rotation, type, time);
        this.add(plate);
        return plate;
    }
    addButton(x, y, door, flipped) {
        const button = new Button(x, y, door, this, flipped);
        button.scale = new Vector(0.07, 0.07);
        this.add(button);
        button.z = -1
    }
    addElevator(x, y, platformX, platformY, minY, maxY, inverted) {
        const elevator = new Elevator(x, y, platformX, platformY, minY, maxY, inverted);
        this.add(elevator);
        elevator.z = 0
    }
    addDartShooter(x, y, respawnX, respawnY) {
        const dartShooter = new DartShooter(x, y, this, respawnX, respawnY);
        this.add(dartShooter);
    }
    addCheckPoint(x, y) {
        const checkPoint = new Checkpoint(x, y, this);
        this.add(checkPoint);
    }
    addArtifact(x, y) {
        const artifact = new Artifact(x, y, this)
        this.add(artifact)
    }

    showLevelUI() {
        const levelUI = new LevelUI(this);
        this.levelUI = levelUI;
        this.add(this.levelUI)
        this.levelUI.ui.currentLevel = 3;
        console.log('level3 showLevelUI')
        this.levelUI.updateLevelName('Level 3');
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

    onInitialize(engine) {
        console.log('Level3 onInitialize called');

        let background = new Background()
        background.z = -20
        this.add(background)

        let cryptographer = new Cryptographer(300, 650)
        this.add(cryptographer)
        let player = new Player(350, 650)
        // let player = new Player(400, 60)
        this.add(player)

        let ramp = new Ramp(1055, 673)
        this.add(ramp)

        let terminal = new Terminal(1200, 603, 0.06, 1030, 530, false, 130, 140, 270, 50)
        this.add(terminal)

        //pos nog goed zetten
        let terminal2 = new Terminal(490, 663, 0.05, 550, 370, false, 190, 50, 12, 60)
        this.add(terminal2)
        terminal2.setPlatformScale(0.05, 0.1)

        let terminal3 = new Terminal(650, 663, 0.05, 100, 240, false, 50, 70, 180, 180)
        this.add(terminal3)

        let terminal4 = new Terminal(800, 663, 0.05, 780, 200, false, 400, 550, 10, 10)
        this.add(terminal4)

        let dartposX = 400
        for (let i = 0; i < 8; i++) {
            this.addDartShooter(dartposX, 300, this.respawnX, this.respawnY)
            dartposX += 30
        }



        this.key = new Key(1178, 60, this)
        this.add(this.key)
        this.key.rotation = 0.5 * Math.PI

        this.addCheckPoint(260, 352)
        this.addCheckPoint(670, 437)
        this.addCheckPoint(410, 83)
        this.addCheckPoint(1178, 72)

        this.addElevator(250, 243, 340, 240, 125, 0, false)

        // this.addSecretWallHole(1143, 454)
        // this.addSecretWall(1240, 454)


        this.addHookpoint(1102, 525, 0.5 * Math.PI)
        this.addHookpoint(1100, 108, 0.5 * Math.PI)
        this.addHookpoint(437, 587, 0.5 * Math.PI)
        this.addHookpoint(787, 470, 1.5 * Math.PI)
        this.addHookpoint(787, 470, 1.5 * Math.PI)

        // hookpoint na de dartshooters
        // this.addHookpoint(325, 385, 1.5 * Math.PI)

        this.addWall(710, 300, 0, 0.1)
        this.addWall(900, 300, 0, 0.1)
        this.addWall(430, 170, 0.5 * Math.PI, 0.1)

        this.addArtifact(720, 75)
        this.addArtifact(1210, 460)
        this.addArtifact(190, 415)



        // door1 is de deur naar de Exit
        let door1 = new Door(180, 640)
        this.add(door1)
        door1.scale = new Vector(0.135, 0.135)
        this.addPlate(1235, 320, door1, false, 1.5 * Math.PI)

        // door2 is de deur voor area rechtsonder voor de player
        let door2 = new Door(900, 400, new Vector(0.15, 0.15))
        this.add(door2)
        this.addButton(1233, 65, door2, true)

        // door3 is de deur naar de area rechtonder voor de cryptographer
        let door3 = new Door(900, 660, new Vector(0.15, 0.15))
        this.add(door3)
        this.addPlate(730, 455, door3, false, 0)

        //door4 is voor de middelste terminal
        let door4 = new Door(580, 660, new Vector(0.15, 0.15))
        this.add(door4)
        this.addButton(685, 325, door4, true)

        //door5 is voor de terminal rechtsonder
        let door5 = new Door(1135, 600, new Vector(0.15, 0.15))
        this.add(door5)
        this.addButton(250, 435, door5, false)

        //door6 is voor de deur boven/midden
        let door6 = new Door(900, 100, new Vector(0.15, 0.15))
        this.add(door6)
        this.addButton(580, 75, door6, false)

        //door7 is voor de deur bij de sleutel
        let door7 = new Door(1140, 60, new Vector(0.13, 0.13))
        this.add(door7)
        this.addButton(530, 75, door7, true)


        // this.addButton(250, 435, 0.5 * Math.PI)
        this.addCrate(221, 30)

        // this.addPlatform(720, 130)
        let flatPlatform = new FlatPlatform(720, 115)
        this.add(flatPlatform)


        // this.addDoor(180, 650)
        // this.addDoor(580, 660)


        let smallDoor = new Door(300, 435, new Vector(0.1, 0.1))
        this.add(smallDoor)
        this.addPlate(1235, 200, smallDoor, false, 1.5 * Math.PI)

        let exit = new Exit(90, 650, this)
        exit.scale = new Vector(0.12, 0.12)
        this.add(exit)

        let spikesX = 464
        for (let i = 0; i < 12; i++) {
            this.addSpikes(spikesX, 233, 0.05)
            spikesX += 59
        }
        spikesX = 61
        for (let i = 0; i < 3; i++) {
            this.addSpikes(spikesX, 447, 0.05)
            spikesX += 59
        }



        this.addWall(900, 156, 0.5 * Math.PI, 0.1)
        this.addWall(900, 38, 0.5 * Math.PI, 0.1)
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


        // this.addWall(777, 350, 0.5 * Math.PI, 0.1)
        // this.addWall(840, 350, 0.5 * Math.PI, 0.1)
        // this.addWall(928, 350, 0.5 * Math.PI, 0.1)
        // this.addWall(840, 310, 0.5 * Math.PI, 0.1)
        // this.addWall(777, 310, 0.5 * Math.PI, 0.1)

        this.addWall(1169, 250, 0.5 * Math.PI, 0.125)
        this.addWall(1184, 250, 0.5 * Math.PI, 0.125)
        this.addWall(221, 266, 0.5 * Math.PI, 0.1)
        this.addWall(1169, 150, 0.5 * Math.PI, 0.125)
        this.addWall(1184, 150, 0.5 * Math.PI, 0.125)
        this.addWall(1169, 120, 0.5 * Math.PI, 0.125)
        this.addWall(1184, 120, 0.5 * Math.PI, 0.125)

        this.addWall(210, 116, 1.5 * Math.PI, 0.07)

        this.addWall(86, 40, 0.5 * Math.PI, 0.125)


        this.addWall(117, 40, 0.5 * Math.PI, 0.125)

        // this.addWall(410, 186, 0.5 * Math.PI, 0.065)

        this.addWall(410, 189, 0, 0.125)
        this.addWall(410, 159, 0, 0.125)
        // let player = new Player(400, 60)
        // this.add(player)
        this.addWall(555, 59, 0, 0.1)

        let x = 710
        for (let i = 0; i < 8; i++) {
            this.addWall(x, 480, 0.5 * Math.PI, 0.1)
            x -= 88
        }

        this.addWall(730, 480, 0.5 * Math.PI, 0.1)

        x = 1069
        for (let i = 0; i < 10; i++) {
            this.addWall(x, 266, 0.5 * Math.PI, 0.1)
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
            let continuousPlatform = new ContinuousPlatform(x, -7, Math.PI)
            this.add(continuousPlatform)
            x += 150
        }
    }
}