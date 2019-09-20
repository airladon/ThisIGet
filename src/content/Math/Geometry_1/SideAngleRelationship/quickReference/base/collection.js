// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

type TypeFullPolyLine = {
  _angle0: DiagramObjectAngle;
  _angle1: DiagramObjectAngle;
  _angle2: DiagramObjectAngle;
  _side01: { _label: DiagramElementPrimative } & DiagramObjectLine;
  _side12: { _label: DiagramElementPrimative } & DiagramObjectLine;
  _side20: { _label: DiagramElementPrimative } & DiagramObjectLine;
  _line: DiagramElementPrimative;
} & DiagramObjectPolyLine;

export default class QRCollection extends CommonDiagramCollection {
  _fig: {
    _tri: TypeFullPolyLine;
  } & DiagramElementCollection;

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

  pulseSideB() {
    this._fig._tri._side12._label.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseSideA() {
    this._fig._tri._side01._label.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseAngleA() {
    this._fig._tri._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAngleB() {
    this._fig._tri._angle0.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }


  pulseLargestSideAngle() {
    this.pulseAngleB();
    this.pulseSideB();
  }

  pulseSmallestSideAngle() {
    this.pulseAngleA();
    this.pulseSideA();
  }
}
