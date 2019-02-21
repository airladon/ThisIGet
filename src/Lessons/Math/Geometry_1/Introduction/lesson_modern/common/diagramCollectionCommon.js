// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform, Point,
} = Fig;
// const textureFile = `/static/dist/${textureMap}`;
export default class CommonCollection extends CommonDiagramCollection {
  _circle: DiagramElementPrimative;
  _wheel: DiagramElementPrimative;

  appearCircleAndMoveWheel(done: () => {}) {
    this._circle.animations.cancelAll();
    this._wheel.animations.cancelAll();

    this._circle.hide();
    this._circle.setScenario('center');
    this._wheel.setScenario('center');

    this._circle.animations.new()
      .dissolveIn(1)
      .moveTo({ target: new Point(2, 0), duration: 1 })
      .start();

    this._wheel.animations.new()
      .delay(1)
      .moveTo({ target: new Point(-2, 0), duration: 1 })
      .start();

    // this._circle.disolveIn(1, move);
    this.diagram.animateNextFrame();
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Circle').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }
}
