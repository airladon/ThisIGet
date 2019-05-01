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

type TypeFullPolyLine = {
  _angle0: DiagramObjectAngle;
  _angle1: DiagramObjectAngle;
  _angle2: DiagramObjectAngle;
  _side01: { _label: DiagramElementPrimative } & DiagramObjectLine;
  _side12: { _label: DiagramElementPrimative } & DiagramObjectLine;
  _side20: { _label: DiagramElementPrimative } & DiagramObjectLine;
} & DiagramObjectPolyLine;

export default class CommonCollection extends CommonDiagramCollection {
  _shortestExample: TypeFullPolyLine;
  _longestExample: TypeFullPolyLine;

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

  pulseSmallestAngle() {
    this._shortestExample._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseShortestSide() {
    this._shortestExample._side01._label.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseLargestAngle() {
    this._longestExample._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseLongestSide() {
    this._longestExample._side20._label.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }
}
