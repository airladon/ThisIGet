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
  _measure: {
    _length: {
      _line: DiagramObjectLine;
      _measureLine: DiagramObjectLine;
      _label: DiagramElementPrimative;
      _grid: DiagramElementPrimative;
    } & DiagramElementCollection;
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

  pulseMeasureLine() {
    this._measure._length._line.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }
}
