// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys, Actor, Vector, Timer, TextAlign } from 'excalibur';
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
            y: engine.halfDrawHeight + 160,
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        });
        const StartButtonsprite = Resources.StartButton.toSprite();
        StartButtonsprite.scale = new Vector(0.35, 0.35);
        startButton.graphics.use(StartButtonsprite);
        this.add(startButton);



        // Add keyboard listener for starting the game
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Space) {
                engine.goToScene('level1');
            }
        });
    }

    onpreupdate(engine) {

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