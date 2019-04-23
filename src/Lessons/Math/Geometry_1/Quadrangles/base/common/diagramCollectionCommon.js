// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _line3: DiagramObjectLine;

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

  drawLines(done: ?() => void) {
    this._line1.grow(0, 0.8, false, null);
    this._line2.grow(0, 0.8, false, null);
    this._line3.grow(0, 0.8, false, done);
    this.diagram.animateNextFrame();
  }
}
