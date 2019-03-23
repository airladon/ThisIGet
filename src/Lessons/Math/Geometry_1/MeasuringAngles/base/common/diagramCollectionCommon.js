// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimative;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    this._circle._angle.setAngle({ angle: r });
    this._circle._arc.setAngleToDraw(r + 0.01);
  }
}
