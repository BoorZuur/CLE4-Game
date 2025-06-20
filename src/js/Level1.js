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
import { LevelUI } from './LevelUI.js'
import { Artifact } from './Artifact.js'
import { Exit } from './Exit.js'
import { Key } from './Key.js'
import { Checkpoint } from './Checkpoint.js'
import { Vector } from 'excalibur';
import { DartShooter } from './DartShooter.js'
import { HookPoint } from './hook-point.js'

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



        let cryptographer = new Cryptographer(100, 670)
        let player = new Player(100, 445)
        let terminal = new Terminal(820, 640, -1000, -1500, 5, 5, 1000, 1300)
        let spikes = new Spikes(500, 680, 0.1, this.currentCheckPointX, this.currentCheckPointY)
        let background = new Background()
        background.z = -2
        let artifact = new Artifact(100, 380, this)
        let artifact2 = new Artifact(150, 380, this)
        let artifact3 = new Artifact(200, 380, this)
        let exit = new Exit(260, 640, this)
        let key = new Key(300, 580, this)
        let checkpoint = new Checkpoint(420, 500, this)
        let checkpoint2 = new Checkpoint(650, 660, this)
        let dartShooter = new DartShooter(300, 580, this, this.currentCheckPointX, this.currentCheckPointY)
        let grapplePoint = new HookPoint(100, 580, this)


        this.add(terminal)
        this.add(cryptographer)
        this.add(player)
        this.add(background)
        this.add(artifact)
        this.add(artifact2)
        this.add(artifact3)
        this.add(exit)
        this.add(key)
        this.add(spikes)
        this.add(checkpoint)
        this.add(checkpoint2)
        this.add(dartShooter)
        this.add(grapplePoint)

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

        wall = new Wall(1030, 450, 0)
        this.add(wall)

        wall = new Wall(1030, 400, 0)
        this.add(wall)

        platform = new Platform(950, 490)
        this.add(platform)

        let door = new Door(1030, 600)
        this.add(door)
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