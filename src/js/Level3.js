import { Actor, Color, Scene } from 'excalibur';
import { LevelUI } from './LevelUI.js';


export class Level3 extends Scene {
    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;

    onInitialize(engine) {


    }

    onActivate() {
        this.showLevelUI();
        console.log('level3 activated')
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
        console.log('level2 showLevelUI')
        this.levelUI.updateLevelName('Level 3');
        console.log('level2 updateLevelName')
        this.levelUI.updateCollectibles(0);
        this.levelUI.updateKeyStatus(false);
    }
}