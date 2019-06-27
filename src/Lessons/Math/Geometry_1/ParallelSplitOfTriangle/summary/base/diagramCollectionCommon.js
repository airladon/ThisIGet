// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri: DiagramObjectPolyLine;
    _topTri: DiagramObjectPolyLine;
    _split: DiagramObjectLine;
    _labelM: DiagramObjectLine;
    _labelN: DiagramObjectLine;
    _labelB: DiagramObjectLine;
    _labelm: DiagramObjectLine;
    _labeln: DiagramObjectLine;
    _labelb: DiagramObjectLine;
  } & DiagramElementCollection;

  // _fig3: {
  //   _topLine: DiagramObjectLine;
  //   _bottomLine: DiagramObjectLine;
  //   _line1: DiagramObjectLine;
  //   _line2: DiagramObjectLine;
  //   _line3: DiagramObjectLine;
  //   _split: DiagramObjectLine;
  //   _tri1: DiagramObjectPolyLine;
  //   _tri2: DiagramObjectPolyLine;
  //   _tri3: DiagramObjectPolyLine;
  //   _right1: DiagramObjectAngle;
  //   _right2: DiagramObjectAngle;
  //   _right3: DiagramObjectAngle;
  //   _height1: DiagramObjectLine;
  //   _height2: DiagramObjectLine;
  //   _height3: DiagramObjectLine;
  // } & DiagramElementCollection

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    // this._1Eqn.eqn.formRestart = { pulse: { element: this._0Eqn, duration: 1, scale: 1.1 } };
    // this._2Eqn.eqn.formRestart = { pulse: { element: this._1Eqn, duration: 1, scale: 1.1 } };
  }

  pulseSplit() {
    this._fig._split.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseTriangle() {
    this._fig._tri.pulseThickNow(1, 1.05, 7);
    this.diagram.animateNextFrame();
  }

  pulseSmallerTriangle() {
    this._fig._labelm._label.pulseScaleNow(1, 2);
    this._fig._labeln._label.pulseScaleNow(1, 2);
    this._fig._labelb._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseEqn() {
    this._eqn.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }
}
