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
