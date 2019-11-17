// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
  // Point,
} = Fig;

// const {
//   getBoundingRect
// } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _eqnTot: {
    _box: CommonDiagramPrimitive;
  } & Equation;

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
    let trigger = () => {};
    let triggerDuration = 0;
    this._tot._af.hide();
    this._tot._bf.hide();
    this._tot._cf.hide();
    this._eqnTot._box.hide();
    angle.showAll();
    angle.setOpacity(0.01);
    if (eqnElementsToPulse != null && eqnElementsToPulse.length > 0) {
      trigger = () => {
        this._eqnTot._box.show();
        this.accentEqn(this._eqnTot, eqnElementsToPulse, 'box', [0.02, 0.05]);
      };
      triggerDuration = 1;
    };
    if (pulse) {
      angle.animations.new()
        .trigger({ callback: trigger, duration: triggerDuration })
        .trigger({ callback: () => { angle.setOpacity(1); }, duration: 0 })
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
        .trigger({ callback: trigger, duration: triggerDuration })
        .trigger({ callback: () => { angle.setOpacity(1); }, duration: 0 })
        .custom({
          callback: (p) => {
            angle.setAngle({ angle: fromAngle + p * delta });
          },
          duration: 1,
        })
        .start();
    }
    // if (eqnElementsToPulse != null) {
    //   this._eqnTot._box.show();
    //   this.accentEqn(this._eqnTot, eqnElementsToPulse, 'box', [0.02, 0.05]);
    //   // this._eqnTot._box.custom.setSize(this._eqnTot, eqnElementsToPulse, 0.1);
    //   // this.accent(this._eqnTot._box);
    //   // this._highlighter.show();
    //   // const bound = this._eqnTot.getDiagramBoundingRect(eqnElementsToPulse);
    //   // // const points = []
    //   // // eqnElementsToPulse.forEach((element) => {
    //   // //   const e = this._eqnTot.getElement(element);
    //   // //   const bound = e.getDiagramBoundingRect();
    //   // //   console.log(bound)
    //   // //   points.push(new Point(bound.left, bound.bottom));
    //   // //   points.push(new Point(bound.right, bound.top));
    //   // // });
    //   // // const bound = getBoundingRect(points);
    //   // // console.log(bound)
    //   // this._highlighter.setScale(bound.width, bound.height);
    //   // this._highlighter.setPosition(
    //   //    bound.left + bound.width / 2,
    //   //   bound.bottom + bound.height / 2,
    //   // );
    //   // this.accent(this._highlighter);
    //   // this.accent({
    //   //   element: this._eqnTot,
    //   //   children: eqnElementsToPulse,
    //   //   style: 'highlight',
    //   // });
    // }
    this.diagram.animateNextFrame();
  }
}
