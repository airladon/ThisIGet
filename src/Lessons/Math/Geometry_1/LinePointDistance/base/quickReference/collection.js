// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;


export default class QRCollection extends CommonDiagramCollection {
  _fig: {
    _line: DiagramObjectLine;
    _point: DiagramElementPrimative;
    _distance: {
      _line: DiagramObjectLine;
    } & DiagramElementCollection;
    _rightAngle: DiagramObjectAngle;
    _perpendicular: { _label: DiagramElementPrimative } & DiagramObjectLine;
    _end: DiagramElementPrimative;
    _distanceEnd: DiagramObjectLine;
    _pointEnd: DiagramElementPrimative;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }

  pulsePoint() {
    this._fig._point.pulseScaleNow(1, 4);
    this.diagram.animateNextFrame();
  }

  pulsePointEnd() {
    this._fig._pointEnd.pulseScaleNow(1, 4);
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

  pulseEnd() {
    this._fig._end.pulseScaleNow(1, 10);
    this.diagram.animateNextFrame();
  }

  pulseDistanceEnd() {
    this._fig._distanceEnd.pulseWidth({ label: 2, line: 1 });
    this.diagram.animateNextFrame();
  }

  pulsePoints() {
    this.pulsePoint();
    this.pulsePointEnd();
  }
}
