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