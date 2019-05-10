// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _topLine: DiagramObjectLine;
    _bottomLine: DiagramObjectLine;
    _topLeftAngle: DiagramObjectAngle;
    _bottomLeftAngle: DiagramObjectAngle;
    _topRightAngle: DiagramObjectAngle;
    _bottomRightAngle: DiagramObjectAngle;
    _topRightAngleInside: DiagramObjectAngle;
    _bottomRightAngleInside: DiagramObjectAngle;
    _leftLine: DiagramObjectLine;
    _rightLine: DiagramObjectLine;
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

  resetColors() {
    this._fig._topLine.setColor(this.layout.colors.lines);
    this._fig._bottomLine.setColor(this.layout.colors.lines);
    this._fig._leftLine.setColor(this.layout.colors.distance);
    this._fig._rightLine.setColor(this.layout.colors.distance);
    this._fig._topLeftAngle.setColor(this.layout.colors.angles);
    this._fig._bottomLeftAngle.setColor(this.layout.colors.angles);
    this._fig._topRightAngle.setColor(this.layout.colors.angles);
    this._fig._bottomRightAngle.setColor(this.layout.colors.angles);
    this._fig._topRightAngleInside.setColor(this.layout.colors.angles);
    this._fig._bottomRightAngleInside.setColor(this.layout.colors.angles);
  }
}
