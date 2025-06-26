// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys, Actor, Vector, Timer, TextAlign, Buttons } from 'excalibur';
import { Resources } from './resources.js';


export class MainMenuScene extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // Create background
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        const sprite = Resources.MenuBackground.toSprite();
        sprite.scale = new Vector(
            engine.drawWidth / sprite.width,
            engine.drawHeight / sprite.height
        );
        background.graphics.use(sprite);
        this.add(background);

        // Create start button
        const startButton = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight + 140,
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        });
        const StartButtonsprite = Resources.StartButtonControl.toSprite();
        StartButtonsprite.scale = new Vector(0.25, 0.25);
        startButton.graphics.use(StartButtonsprite);
        this.add(startButton);


        // Add keyboard listener for starting the game
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Space) {
                engine.goToScene('level1');
            }
        });
    }

    onPreUpdate(engine) {
        let interact1 = false;
        let interact2 = false;

        if (engine.controllers[0]) {
            interact1 = engine.controllers[0].wasButtonPressed(Buttons.Face1);
        } else if (engine.controllers[1]) {
            interact2 = engine.controllers[1].wasButtonPressed(Buttons.Face1);
        }

        if (interact1 || interact2) {
            engine.goToScene('level1');
        }
    }

    onDeactivate() {  // Remove ctx if you're not using it
        console.log('Deactivating Main Menu');

        // Remove all actors from the scene
        this.actors.forEach(actor => {
            actor.kill();
        });

        // Remove keyboard listener
        this.engine.input.keyboard.off('press');
    }
}