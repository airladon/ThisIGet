// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramElement,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
  // Point,
} = Fig;

// const {
//   getBoundingRect
// } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _eqnTot: {
    _box: DiagramElementPrimitive;
  } & Equation;

  _tot: {
    _af: DiagramObjectAngle;
    _bf: DiagramObjectAngle;
    _cf: DiagramObjectAngle;
    _p4: DiagramElementPrimitive;
    _p5: DiagramElementPrimitive;
    _p6: DiagramElementPrimitive;
    _l4: DiagramObjectLine;
    _l5: DiagramObjectLine;
    _l6: DiagramObjectLine;
    _s41: DiagramObjectLine;
    _s42: DiagramObjectLine;
    _s51: DiagramObjectLine;
    _s51: DiagramObjectLine;
    _s61: DiagramObjectLine;
    _s61: DiagramObjectLine;
    _a: DiagramObjectAngle;
    _b: DiagramObjectAngle;
    _c: DiagramObjectAngle;
    _e: DiagramObjectAngle;
    _n3: DiagramObjectPolyLine;
    _n4: DiagramObjectPolyLine;
    _n5: DiagramObjectPolyLine;
    _n6: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _split: {
    _a0: DiagramObjectAngle;
    _a1: DiagramObjectAngle;
    _a2: DiagramObjectAngle;
    _a3: DiagramObjectAngle;
    _a4: DiagramObjectAngle;
    _i0: DiagramObjectAngle;
    _i1: DiagramObjectAngle;
    _i2: DiagramObjectAngle;
    _i3: DiagramObjectAngle;
    _i4: DiagramObjectAngle;
    _s0: DiagramObjectLine;
    _s1: DiagramObjectLine;
    _s2: DiagramObjectLine;
    _s3: DiagramObjectLine;
    _s4: DiagramObjectLine;
    _m0: DiagramElementPrimitive;
    _m1: DiagramElementPrimitive;
    _m2: DiagramElementPrimitive;
    _m3: DiagramElementPrimitive;
    _m4: DiagramElementPrimitive;
    _r0: DiagramElementPrimitive;
    _r1: DiagramElementPrimitive;
    _r2: DiagramElementPrimitive;
    _r3: DiagramElementPrimitive;
    _r4: DiagramElementPrimitive;
    _line: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _poly0: DiagramObjectPolyLine;
  _poly1: DiagramObjectPolyLine;
  _poly2: DiagramObjectPolyLine;

  _tri: DiagramObjectPolyLine;
  _quad: DiagramObjectPolyLine;
  _pent: DiagramObjectPolyLine;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }

  growSides(sideNum: number, done: ?() => void = null) {
    const tot = this._tot;
    const fromPoly = tot[`_n${sideNum - 1}`];
    const toPoly = tot[`_n${sideNum}`];
    const side1 = tot[`_s${sideNum}1`];
    const side2 = tot[`_s${sideNum}2`];
    const point = tot[`_p${sideNum}`];
    const line = tot[`_l${sideNum}`];
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
    eqnElementsToPulse: ?Array<DiagramElement | string> = null,
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
        this.accentEqn(this._eqnTot, eqnElementsToPulse || [], this._box, [0.02, 0.05]);
      };
      triggerDuration = 1;
    }
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
    this.diagram.animateNextFrame();
  }
}
