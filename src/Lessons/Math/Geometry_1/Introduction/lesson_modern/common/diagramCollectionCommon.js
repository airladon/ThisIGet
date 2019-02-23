// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle, 
  DiagramElementCollection,
  DiagramObjectLine,
  Transform, Point,
} = Fig;
// const textureFile = `/static/dist/${textureMap}`;
export default class CommonCollection extends CommonDiagramCollection {
  _circle: DiagramElementPrimative;
  _wheel: DiagramElementPrimative;
  _properties: {
    _circumference: {
      _line: DiagramElementPrimative;
      _arrow: DiagramElementPrimative;
    } & DiagramElementCollection;
    _diameter: DiagramObjectLine;
  } & DiagramElementCollection;

  appearCircleAndMoveWheel(done: ?() => {}) {
    this._circle.animations.cancelAll();
    this._wheel.animations.cancelAll();

    this._circle.hide();
    this._circle.setScenario('left');
    this._wheel.setScenario('left');

    this._circle.animations.new()
      .dissolveIn(0.3)
      .pulse({ scale: 1.02, duration: 1, numLines: 5 })
      .scenario({ target: 'right', duration: 1.5 })
      .whenFinished(done)
      .start();

    this.diagram.animateNextFrame();
  }

  circumferenceAtAngle(angle: number) {
    const radius = this.layout.circumferenceRadius - this.layout.circumferenceLineWidth / 2;
    const height = this.layout.circumferenceArrowDimension;
    const arrowHeightAngle = height / radius;

    if (angle < 0.05) {
      this._properties._circumference._arrow.hide();
      this._properties._circumference._line.angleToDraw = angle;
    } else {
      this._properties._circumference._arrow.show();
      this._properties._circumference._line.angleToDraw = angle - arrowHeightAngle / 2;
      this._properties._circumference._arrow.setPosition(new Point(
        radius * Math.cos(-angle),
        radius * Math.sin(-angle),
      ));

      this._properties._circumference._arrow.setRotation(-angle + arrowHeightAngle + Math.PI);
    }
  }

  growCircumference(done: ?() => void = null) {
    const grow = (percent: number) => {
      this.circumferenceAtAngle(percent * Math.PI * 2);
    };
    this._properties._circumference.animations.cancelAll();
    this._properties._circumference.animations.new('Circumference Growth')
      .custom({ callback: grow, duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  growDiameter(done: ?() => void = null) {
    this._properties._diameter.grow(0.2, 1, true, done);
    this.diagram.animateNextFrame();
  }

  growDimensions(done: ?() => void = null) {
    this.growCircumference(done);
    this.growDiameter();
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
