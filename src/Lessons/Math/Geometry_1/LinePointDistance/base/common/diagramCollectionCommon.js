// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
  Line,
  Point,
} = Fig;

const { rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line: DiagramObjectLine;
    _point: DiagramElementPrimative;
    _distance: {
      _line: DiagramObjectLine;
      _pad: DiagramElementPrimative;
    } & DiagramElementCollection;
    _rightAngle: DiagramObjectAngle;
    _perpendicular: { _label: DiagramElementPrimative } & DiagramObjectLine;
    _hypot: DiagramObjectLine;
    _base: DiagramObjectLine;
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
    this._fig._distance._pad.setTransformCallback = this.padUpdated.bind(this);
    this._fig._distance._pad.makeTouchable();
    this.padUpdated();
  }

  padUpdated() {
    const p = this._fig._distance._pad.getPosition();
    this._fig._distance._line.setEndPoints(this._fig._point.getPosition(), p);
    this.diagram.animateNextFrame();
  }

  pulsePoint() {
    this._fig._point.pulseScaleNow(1, 4);
    this.diagram.animateNextFrame();
  }

  pulseLine() {
    this._fig._line.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseRightAngle() {
    this._fig._rightAngle.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulsePerpendicularLabel(done: ?() => void = null) {
    this._fig._perpendicular._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  moveMeasurement(xTarget: ?number, done: ?() => void = null) {
    const x = rand(
      this._fig._line.getLength() / 3,
      this._fig._line.getLength() / 2,
    );
    const currentPoint = this._fig._distance._pad.getPosition();

    let newPadPoint = currentPoint.sub(x, 0);
    if (currentPoint.x < this.layout.mid.x) {
      newPadPoint = currentPoint.add(x, 0);
    }
    if (xTarget != null) {
      newPadPoint = new Point(xTarget, this.layout.mid.y);
    }

    this._fig._distance._pad.animations.cancelAll();
    if (newPadPoint.x === currentPoint.x) {
      this._fig._distance._line.pulseWidth({ line: 6, done });
    } else {
      this._fig._distance._pad.animations.new()
        .position({ target: newPadPoint, velocity: 2 })
        .whenFinished(done)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  drawPerpendicular(done: ?() => void) {
    const callback = () => {
      this._fig._rightAngle.showAll();
      this._fig._rightAngle.pulseScaleNow(1, 1.5, 0, done);
    };
    this._fig._perpendicular.grow(0, 0.7, true, callback);
    this._fig._rightAngle.hide();
    this.diagram.animateNextFrame();
  }
}
