import { Actor, Color, Scene } from 'excalibur';
import { LevelUI } from './LevelUI.js';
import { Keys } from 'excalibur';


export class Level2 extends Scene {
    collectibleCount = 0;
    hasKey = false;
    levelCompleted = false;

    onInitialize(engine) {


    }
    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.M)) {
            engine.goToScene('level3');
        }
    }

    onActivate() {
        this.showLevelUI();
        console.log('level2 activated')
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
}