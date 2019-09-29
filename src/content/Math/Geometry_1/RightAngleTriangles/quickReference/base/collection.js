// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
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
  _tri: TypeFullPolyLine;
  _eqn: Equation;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }

  pulseEquation() {
    this._eqn.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseOpposite() {
    this._tri._side20.pulseWidth({ label: 2 });
    this.diagram.animateNextFrame();
  }

  pulsePerpendicularSides() {
    this._tri._side01.pulseWidth({ label: 2 });
    this._tri._side12.pulseWidth({ label: 2 });
    this.diagram.animateNextFrame();
  }

  pulseRightAngle() {
    this._tri._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }
}
