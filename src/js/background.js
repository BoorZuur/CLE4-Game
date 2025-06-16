import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Background extends Actor {
    #sprite
    constructor() {
        super({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0),
            width: 1280,
            height: 720
        })
        this.#sprite = Resources.Background.toSprite()
        this.graphics.use(this.#sprite);
        this.scale = new Vector(1, 1)
    }
}