// src/js/MainMenuScene.js
import { Scene, Label, Color, Keys, Actor, Vector, Timer, TextAlign, Buttons } from 'excalibur';
import { Resources } from './resources.js';
import { InteractionLabel } from './interactionLabel.js';


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

        //testings
        this.interactions = new InteractionLabel(350, 30, 'Press Space to Start', 15, 2, 'White');
        this.add(this.interactions);
    }

    onPreUpdate(engine) {
        let interact1 = false;
        let interact2 = false;
        //testings
        let allButtons1 = [];
        let allButtons2 = [];
        let joystick1 = [];
        let joystick2 = [];

        if (engine.controllers[0]) {
            interact1 = engine.controllers[0].wasButtonPressed(Buttons.Face1);
            //testings
            allButtons1 = engine.controllers[0]._buttons;
            joystick1 = engine.controllers[0]._axes;
        } else if (engine.controllers[1]) {
            interact2 = engine.controllers[1].wasButtonPressed(Buttons.Face1);
            //testings
            allButtons2 = engine.controllers[1]._buttons;
            joystick2 = engine.controllers[1]._axes;
        }

        if (interact1 || interact2) {
            engine.goToScene('level1');
        }

        //testings
        let keyboardInteraction = engine.input.keyboard.getKeys();
        this.interactions.text = `keyboard: ${keyboardInteraction}\nGamepad pressed buttons: ${allButtons1.join(', ')}\nGamepad joystick axes: ${joystick1.join(', ')}\nGamepad 2 pressed buttons: ${allButtons2.join(', ')}\nGamepad 2 joystick axes: ${joystick2.join(', ')}`;


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