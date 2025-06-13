import { Label, Font, FontUnit, Color, TextAlign, Vector } from 'excalibur'

export class InteractionLabel extends Label {
    constructor(posX, posY, text, size, color) {
        super({
            text: text,
            font: new Font({
                family: 'Arial',
                bold: true,
                size: size,
                scale: new Vector(5, 5),
                unit: FontUnit.Px,
                color: Color[color],
                textAlign: TextAlign.Center,
                shadow: {
                    color: Color.Black,
                    blur: 5,
                    offset: new Vector(10, 10)
                }
            })
        });
        this.pos.x = posX
        this.pos.y = posY
    }
}