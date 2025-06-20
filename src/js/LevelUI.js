import { Actor, Label, Color, Keys, Vector, Timer, TextAlign, Font, FontUnit, vec } from 'excalibur';
import { Resources } from './resources.js';
import { UIManager } from './UIManager.js';


export class LevelUI extends Actor {
    constructor(levelInstance) {
        super();
        this.z = 1000;
        this.levelName = '';
        this.collectibles = 1;
        this.ui = new UIManager(levelInstance);
    }

    onInitialize(engine) {
        this.ui.show();
        this.setupPixelConversion(engine)
    }

    onPreUpdate(engine) {
        // if (engine.input.keyboard.isHeld(Keys.P)) {
        //     this.ui.show();
        // }
        // else {
        //     this.ui.hide();
        // }
    }

    setupPixelConversion(engine) {
        const calculateExPixelConversion = (screen) => {
            const origin = screen.worldToPageCoordinates(Vector.Zero);
            const singlePixel = screen.worldToPageCoordinates(vec(1, 0)).sub(origin);
            const pixelConversion = singlePixel.x;
            document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());
        };

        // Update pixel conversion on resize
        engine.screen.events.on('resize', () => calculateExPixelConversion(engine.screen));

        // Set initial conversion
        engine.start().then(() => {
            calculateExPixelConversion(engine.screen);
        });
    }

    updateLevelName(levelName) {
        this.levelName = levelName;
        this.ui.updateLevel(this.levelName);
    }

    updateCollectibles(collectibles) {
        this.collectibles = collectibles;
        this.ui.updateCollectibles(this.collectibles);
    }

    updateKeyStatus(hasKey) {
        this.hasKey = hasKey;
        this.ui.updateKeyStatus(this.hasKey);
    }

    FinishLevel() {
        this.ui.hideLevelUI();
        this.ui.showLevelCompletedUI();
    }

    onDeinitialize(engine) {
        this.ui.hide();
    }



}
