import { Label, Font, FontUnit, Color, TextAlign } from 'excalibur'

export class InteractionLabel extends Label {
    constructor(text) {
        super({
            text: text,
            font: new Font({
                family: 'Arial',
                bold: true,
                size: 100,
                unit: FontUnit.Px,
                color: Color.Red,
                textAlign: TextAlign.Center,
            })
        });
        this.pos.y = -800
    }
}