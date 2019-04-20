// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine, DiagramObjectPolyLine,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _triangle: {
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
  } & DiagramObjectPolyLine;

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

  pulseEqualSides() {
    this._triangle._side01._label.pulseScaleNow(1, 2);
    this._triangle._side12._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
