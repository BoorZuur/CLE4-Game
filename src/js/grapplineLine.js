import { Line,Actor,Vector } from "excalibur"
const lineActor = new ex.Actor({
  pos: ex.vec(100, 0),
})
lineActor.graphics.anchor = ex.Vector.Zero
lineActor.graphics.use(
  new ex.Line({
    start: ex.vec(0, 0),
    end: ex.vec(200, 200),
    color: ex.Color.Green,
    thickness: 10,
  })
)