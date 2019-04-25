// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _rectangle: {
    _left: DiagramObjectLine;
    _right: DiagramObjectLine;
    _top: DiagramObjectLine;
    _bottom: DiagramObjectLine;
    _diagonal: DiagramObjectLine;
  } & DiagramElementCollection;

  _intro: {
    _grid: DiagramElementPrimative;
    _triangle: DiagramElementPrimative;
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
}
