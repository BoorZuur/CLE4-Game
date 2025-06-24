import { Actor, Label, Color, Keys, Vector, Timer, TextAlign, Font, FontUnit, vec, Buttons } from 'excalibur';
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
        let interact1 = false;
        let interact2 = false;

        if (engine.controllers[0]) {
            interact1 = engine.controllers[0].wasButtonPressed(Buttons.LeftBumper)
            // interact1 = con1.wasButtonPressed(Buttons.LeftBumper)
        } else if (engine.controllers[1]) {
            interact2 = engine.controllers[1][wasButtonPressed(Buttons.LeftBumper)];
        }

        // if (engine.input.keyboard.isHeld(Keys.P)) {
        //     this.ui.show();
        // }
        // else {
        //     this.ui.hide();
        // }

        if (interact1 || interact2) {
            this.ui.nextLevelButtonPressed();
        }
        if (engine.input.keyboard.isHeld(Keys.P)) {
            this.ui.show();
        }
        else {
            this.ui.hide();
        }
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
