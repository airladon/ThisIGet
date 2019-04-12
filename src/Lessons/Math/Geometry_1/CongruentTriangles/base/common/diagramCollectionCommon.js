// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, DiagramObjectPolyLine,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _congruentTriangles: {
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }

  congruentRotate() {
    const { tri2 } = this._congruentTriangles.elements;
    tri2.hideAll();
    tri2._line.show();

    tri2.stop(true, 'noComplete');
    tri2.animations.new()
      .scenario({ target: 'rotate', duration: 3 })
      .whenFinished(() => {
        tri2.showAll();
        tri2.updateRotation();
      })
      .start();
  }

  congruentFlip() {
    const { tri2 } = this._congruentTriangles.elements;
    tri2.hideAll();
    tri2._line.show();
    tri2.stop(true, 'noComplete');
    tri2.animations.new()
      .scenario({ target: 'mirror', duration: 3 })
      .whenFinished(() => {
        tri2.setScaleWithoutMoving(1, 1);
        tri2.showAll();
        tri2.updatePoints([tri2.points[2], tri2.points[1], tri2.points[0]]);
        tri2._angle0.label.setText('a');
        tri2._angle2.label.setText('c');
        tri2._side01.label.setText('B');
        tri2._side12.label.setText('A');
      })
      .start();
  }
}
