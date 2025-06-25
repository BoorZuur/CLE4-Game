import { Line, Actor, Vector, Color } from "excalibur"

export class lineActor extends Actor {

  constructor(start, end) {
    super();
    this.start = start.clone();
    this.end = end.clone();
    this.line = new Line({
      start: this.start,
      end: this.end,
      color: Color.Brown,
      thickness: 10,
    });
    this.graphics.anchor = Vector.Zero,
      this.graphics.use(this.line);
  }

  setStart(newStart) {
    this.start = newStart.clone();
    this.line.start = this.start;
  }

  setEnd(newEnd) {
    this.end = newEnd.clone();
    this.line.end = this.end;
  }
}
