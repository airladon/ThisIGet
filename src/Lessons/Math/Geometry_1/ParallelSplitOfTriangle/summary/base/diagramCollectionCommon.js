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
  Equation,
  Transform,
} = Fig;

type TypeLabeledLine = {
  _label: DiagramElementPrimative;
} & DiagramObjectLine;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri: DiagramObjectPolyLine;
    _topTri: DiagramObjectPolyLine;
    _split: DiagramObjectLine;
    _labelM: TypeLabeledLine;
    _labelN: TypeLabeledLine;
    _labelB: TypeLabeledLine;
    _labelm: TypeLabeledLine;
    _labeln: TypeLabeledLine;
    _labelb: TypeLabeledLine;
  } & DiagramElementCollection;

  _eqn: Equation;
  _fig2: {
    _topLine: DiagramObjectLine;
    _bottomLine: DiagramObjectLine;
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _split: DiagramObjectLine;
    _labelM: TypeLabeledLine;
    _labelN: TypeLabeledLine;
    _labelB: TypeLabeledLine;
    _labelm: TypeLabeledLine;
    _labeln: TypeLabeledLine;
    _labelb: TypeLabeledLine;
  } & DiagramElementCollection

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
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

  pulseLines() {
    this._fig2._line1.pulseWidth({ line: 6 });
    this._fig2._line2.pulseWidth({ line: 6 });
    this._fig2._line3.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseFig2ParallelLines() {
    this._fig2._topLine.pulseWidth({ line: 6 });
    this._fig2._bottomLine.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseFig2Split() {
    this._fig2._split.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }
}
