// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
  Point,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  // _fig: {
  //   _line: { _line: DiagramElementPrimitive } & DiagramObjectLine;
  //   _h: DiagramObjectLine;
  //   _v: DiagramObjectLine;
  //   _mirrorLine: DiagramObjectLine;
  //   _hypotenuse: { _label: { _value: DiagramElementPrimitive } & Equation } & DiagramObjectLine;
  //   _theta: { _label: { _value: DiagramElementPrimitive } & Equation } & DiagramObjectAngle;
  //   _right: DiagramObjectAngle;
  //   _complement: DiagramObjectAngle;
  //   _opp: DiagramObjectLine;
  //   _oppLabel: { _label: { _value: DiagramElementPrimitive } & Equation } & DiagramObjectLine;
  //   _mirrorV: DiagramObjectLine;
  //   _mirrorArc: DiagramElementPrimitive;
  //   // _real: DiagramObjectAngle;
  //   // _sine: DiagramObjectLine;
  //   // _sineTheta: { _label: Equation } & DiagramObjectLine;
  //   _opposite: { _label: Equation } & DiagramObjectLine;
  //   _arc: DiagramElementPrimitive;
  // } & DiagramElementCollection;

  // _table: {
  //   _sineHeading: Equation;
  //   _angleHeading: Equation;
  // } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this.custom.counter = 0;
    this.custom.constantCounter = 2;
    this._rotator._line.move.maxTransform.updateRotation(60 * Math.PI / 180);
    this._rotator._line.move.minTransform.updateRotation(10 * Math.PI / 180);
    this._rotator._line.setTransformCallback = this.updateRotation.bind(this, null);
  }

  toggleSides() {
    const options = [
      ['AonB', 'side12', 'side20'],
      ['AonC', 'side12', 'side01'],
      ['BonC', 'side20', 'side01'],
      ['BonA', 'side12', 'side20'],
      ['ConA', 'side12', 'side01'],
      ['ConB', 'side20', 'side01'],
    ];
    this.custom.counter = (this.custom.counter + 1) % 6;
    const option = options[this.custom.counter];
    this._eqn.showForm(option[0]);
    this.accent(this._similar._tri2, [option[1], option[2]]);
    // this._eqn.pulseScaleNow(1, 1.2);
    this._eqn.exec(
      ['pulse', { centerOn: this._eqn._equals, time: 1, scale: 1.5 }],
      [
        's_11', 'times_11', 's_12', 'times_12',
        'equals', 'v_11',
        'v_12',
        'A_11', 'B_11', 'C_11',
        'A_12', 'B_12', 'C_12',
      ],
    );
    this.diagram.animateNextFrame();
  }

  toggleConstant() {
    this.custom.constantCounter = (this.custom.constantCounter + 1) % 3;
    const options = [
      ['eqnSin', 'tri.opp', 'tri.hyp'],
      ['eqnCos', 'tri.adj', 'tri.hyp'],
      ['eqnTan', 'tri.opp', 'tri.adj'],
    ];
    const option = options[this.custom.constantCounter];
    // console.log(option)
    // this.accent(this, [option]);
    this.exec(
      ['pulse', { time: 1, scale: 1.4 }],
      [...option],
    );
    this.diagram.animateNextFrame();
  }

  pulseConstant() {
    this._eqn.exec(
      ['pulse', { centerOn: this._eqn._v_12, time: 1, scale: 2 }],
      [
        'v_12',
        'A_12', 'B_12', 'C_12',
      ],
    );
    this.diagram.animateNextFrame();
  }

  goToRotation(angle: ?number = null) {
    let r = angle;
    if (r == null) {
      const delta = rand(10, 25) * Math.PI / 180;
      const currentR = this._rotator._line.getRotation();
      if (currentR > 35 * Math.PI / 180) {
        r = currentR - delta;
      } else {
        r = currentR + delta;
      }
    }
    this._rotator._line.animations.new()
      .rotation({ target: r, velocity: 0.3 })
      .start();
    this.diagram.animateNextFrame();
  }

  updateRotation(setAngle: ?number = null) {
    let r = this._rotator._line.getRotation();
    if (setAngle != null) {
      r = setAngle;
    }
    const len = this._rotator._line.getLength();
    const points = [
      new Point(0, 0),
      new Point(len * Math.cos(r), 0),
      new Point(len * Math.cos(r), len * Math.sin(r)),
    ];
    this._tri._line.updatePoints(points);
    this._tri._theta.setAngle({
      p1: points[1],
      p2: points[0],
      p3: points[2],
    });
    const theta = parseFloat(this._tri._theta.getLabel()) * Math.PI / 180;
    this._tri._right.setAngle({
      p1: points[2],
      p2: points[1],
      p3: points[0],
    });
    this._tri._hyp.setEndPoints(points[0], points[2]);
    this._tri._opp.setEndPoints(points[2], points[1]);
    this._tri._adj.setEndPoints(points[0], points[1]);
    const adj = round(Math.cos(theta), 2);
    const opp = round(Math.sin(theta), 2);
    // const hyp = round(r * Math.tan(theta), 2);
    const hyp = 1;
    this._tri._hyp.setLabel(`${1}`);
    this._tri._opp.setLabel(`${opp}`);
    this._tri._adj.setLabel(`${adj}`);
    this._eqnSin._const.drawingObject.setText(`${round(opp / hyp, 2)}`);
    this._eqnCos._const.drawingObject.setText(`${round(adj / hyp, 2)}`);
    this._eqnTan._const.drawingObject.setText(`${round(opp / adj, 2)}`);
    this.diagram.animateNextFrame();
  }

  // makeAOnB() {
  //   const eqn = this._eqn;
  //   eqn.showForm('AonB1');
  //   const s1Position = eqn._s_1.getPosition();
  //   const times1Position = eqn._times1.getPosition();
  //   const APosition = eqn._A_1.getPosition();
  //   eqn._s_1.setDiagramPositionToElement(this._similar._tri2._side12._label._s)
  //   eqn._times1.setDiagramPositionToElement(this._similar._tri2._side12._label._times);
  //   eqn._A_1.setDiagramPositionToElement(this._similar._tri2._side12._label._value);

  //   const s2Position = eqn._s_2.getPosition();
  //   const times2Position = eqn._times2.getPosition();
  //   const BPosition = eqn._B_1.getPosition();
  //   eqn._s_2.setDiagramPositionToElement(this._similar._tri2._side20._label._s)
  //   eqn._times2.setDiagramPositionToElement(this._similar._tri2._side20._label._times);
  //   eqn._B_1.setDiagramPositionToElement(this._similar._tri2._side20._label._value);
  //   eqn.hideAll();
  //   this._similar.stop();
  //   this._eqn.stop();
  //   this._similar.animations.new()
  //     .trigger({
  //       duration: 1,
  //       callback: () => { this.accent(this._similar, ['tri2.side20.label', 'tri2.side12.label']); },
  //     })
  //     .trigger({
  //       duration: 0,
  //       callback: () => {
  //         eqn._s_1.show();
  //         eqn._times1.show();
  //         eqn._A_1.show();
  //         eqn._s_2.show();
  //         eqn._times2.show();
  //         eqn._B_1.show();
  //       },
  //     })
  //     .inParallel([
  //       eqn._s_1.anim.position({ target: s1Position, duration: 1 }),
  //       eqn._times1.anim.position({ target: times1Position, duration: 1 }),
  //       eqn._A_1.anim.position({ target: APosition, duration: 1 }),
  //       eqn._s_2.anim.position({ target: s2Position, duration: 1 }),
  //       eqn._times2.anim.position({ target: times2Position, duration: 1 }),
  //       eqn._B_1.anim.position({ target: BPosition, duration: 1 }),
  //     ])
  //     .inParallel([
  //       eqn._v1.anim.dissolveIn(0.8),
  //     ])
  //     .trigger({
  //       duration: 1.5,
  //       callback: () => {
  //         eqn.goToForm({ name: 'AonB2', animate: 'move', duration: 1 });
  //       },
  //     })
  //     .trigger({
  //       duration: 1.5,
  //       callback: () => {
  //         eqn.goToForm({ name: 'AonB3', animate: 'move', duration: 1 });
  //       },
  //     })
  //     .trigger({
  //       duration: 1.5,
  //       callback: () => {
  //         eqn.goToForm({ name: 'AonB4', animate: 'move', duration: 1 });
  //       },
  //     })
  //     .trigger({
  //       duration: 1.5,
  //       callback: () => {
  //         eqn.goToForm({ name: 'AonB5', animate: 'move', duration: 1 });
  //       },
  //     })
  //     .trigger({
  //       duration: 1.5,
  //       callback: () => {
  //         eqn.goToForm({ name: 'AonB6', animate: 'move', duration: 1 });
  //       },
  //     })
  //     // .inParallel([
  //     //   eqn._equals.anim.dissolveIn(0.8),
  //     //   eqn._s_3.anim.dissolveIn(0.8),
  //     //   eqn._v2.anim.dissolveIn(0.8),
  //     //   eqn._s_4.anim.dissolveIn(0.8),
  //     //   eqn._strike.anim.dissolveIn(0.8),
  //     //   eqn._1.anim.dissolveIn(0.8),
  //     //   eqn._times3.anim.dissolveIn(0.8),
  //     //   eqn._A_2.anim.dissolveIn(0.8),
  //     //   eqn._v3.anim.dissolveIn(0.8),
  //     //   eqn._B_2.anim.dissolveIn(0.8),
  //     // ])
  //     // .inParallel([
  //     //   eqn._equals2.anim.dissolveIn(0.8),
  //     //   eqn._A_3.anim.dissolveIn(0.8),
  //     //   eqn._v4.anim.dissolveIn(0.8),
  //     //   eqn._B_3.anim.dissolveIn(0.8),
  //     // ])
  //     .trigger({
  //       duration: 1,
  //       callback: () => {
  //         // eqn._A_2.pulse({ centerOn: eqn._v4, times: 1 });
  //         // eqn._B_2.pulse({ centerOn: eqn._v4, times: 1 });
  //         // eqn._v3.pulse({ centerOn: eqn._v4, times: 1 });
  //         // eqn._A_1.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._B_1.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._v1.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._s_1.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._s_2.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._times1.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn._times2.pulse({ centerOn: eqn._v1, times: 1 });
  //         // eqn.pulse
  //         eqn.pulse({ centerOn: eqn._equals, time: 1 });
  //         this.accent(this._similar, [
  //           'tri1.side12', 'tri1.side20',
  //           'tri2.side12', 'tri2.side20',
  //         ]);
  //         // this._similar._tri1._side12._label.pulse({ centerOn: eqn._equals, time: 1 });
  //       },
  //     })
  //     // .pulse({ element: eqn, duration: 1 })
  //     .start();
  //   this.diagram.animateNextFrame();
  // }
}
