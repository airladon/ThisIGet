// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform, Rect
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._customTriangle._pad0.makeTouchable();
    // this._customTriangle._pad0.setMoveBoundaryToDiagram([-1, -1, 2, 2])
    // console.log(this._customTriangle._pad0.move.maxTransform.t())
    // console.log(this._customTriangle._pad1.move.maxTransform.t())
  }
}
