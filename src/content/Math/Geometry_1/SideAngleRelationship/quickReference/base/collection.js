// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
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
  _side01: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  _side12: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  _side20: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  _line: DiagramElementPrimitive;
} & DiagramObjectPolyLine;

export default class QRCollection extends CommonDiagramCollection {
  _fig: {
    _tri: TypeFullPolyLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
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
