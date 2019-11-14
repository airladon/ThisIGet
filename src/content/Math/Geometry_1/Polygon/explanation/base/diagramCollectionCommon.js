// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
  }

  growSides(sideNum: number, done: ?() => void = null) {
    const tot = this._tot;
    const fromPoly = tot[`_n${sideNum - 1}`];
    const toPoly = tot[`_n${sideNum}`];
    const side1 = tot[`_s${sideNum}1`];
    const side2 = tot[`_s${sideNum}2`];
    const point = tot[`_p${sideNum}`];
    const line = tot[`_l${sideNum}`];
    // tot.hideAll();
    toPoly.hideAll();
    line.hideAll();
    fromPoly.showAll();
    side1.showAll();
    side2.showAll();
    point.showAll();
    const growDone = () => {
      fromPoly.hideAll();
      toPoly.showAll();
      line.showAll();
      this.diagram.animateNextFrame();
      if (done != null) {
        done();
      }
    };
    side1.grow(0, 1, true, growDone);
    side2.grow(0, 1, true);
    this.diagram.animateNextFrame();
  }

  shrinkAngle(
    angle: DiagramObjectAngle,
    fromAngle: number,
    toAngle: number,
    pulse: boolean = true,
    eqnElementsToPulse: ?Array<DiagramElement> = null,
  ) {
    angle.stop();
    angle.setAngle({ angle: fromAngle });
    const delta = toAngle - fromAngle;
    if (pulse) {
      angle.animations.new()
        .pulse(1)
        .custom({
          callback: (p) => {
            angle.setAngle({ angle: fromAngle + p * delta });
          },
          duration: 1,
        })
        .start();
    } else {
      angle.animations.new()
        .custom({
          callback: (p) => {
            angle.setAngle({ angle: fromAngle + p * delta });
          },
          duration: 1,
        })
        .start();
    }
    if (eqnElementsToPulse != null) {
      this.accent({
        element: this._eqnTot,
        children: eqnElementsToPulse,
        style: 'highlight',
      });
    }
    this.diagram.animateNextFrame();
  }
}
