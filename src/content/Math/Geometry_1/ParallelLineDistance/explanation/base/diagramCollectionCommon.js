// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _topLine: DiagramObjectLine;
    _bottomLine: DiagramObjectLine;
    _topLeftAngle: DiagramObjectAngle;
    _bottomLeftAngle: DiagramObjectAngle;
    _topRightAngle: DiagramObjectAngle;
    _bottomRightAngle: DiagramObjectAngle;
    _topRightAngleInside: DiagramObjectAngle;
    _bottomRightAngleInside: DiagramObjectAngle;
    _leftLine: DiagramObjectLine;
    _rightLine: DiagramObjectLine;
    _point: DiagramElementPrimitive;
    _rectangle: DiagramObjectPolyLine;
    _middleLine: DiagramObjectLine;
    _topMiddleAngle: DiagramObjectAngle;
    _bottomMiddleAngle: DiagramObjectAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    this.hasTouchableElements = true;
  }

  resetColors() {
    this._fig._topLine.setColor(this.layout.colors.lines);
    this._fig._bottomLine.setColor(this.layout.colors.lines);
    this._fig._leftLine.setColor(this.layout.colors.distance);
    this._fig._rightLine.setColor(this.layout.colors.distance);
    this._fig._topLeftAngle.setColor(this.layout.colors.angles);
    this._fig._bottomLeftAngle.setColor(this.layout.colors.angles);
    this._fig._topRightAngle.setColor(this.layout.colors.angles);
    this._fig._bottomRightAngle.setColor(this.layout.colors.angles);
    this._fig._topRightAngleInside.setColor(this.layout.colors.angles);
    this._fig._bottomRightAngleInside.setColor(this.layout.colors.angles);
  }

  pulsePoint(done: ?() => void = null) {
    this._fig._point.pulseScaleNow(1, 4, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseLeft(done: ?() => void = null) {
    this._fig._leftLine.pulseWidth({ line: 5 });
    this._fig._bottomLeftAngle.pulseScaleNow(1, 1.5, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseParallelLines(done: ?() => void = null) {
    this._fig._topLine.pulseWidth({ line: 5 });
    this._fig._bottomLine.pulseWidth({ line: 5, done });
    this.diagram.animateNextFrame();
  }

  pulsePerpendicularLines(done: ?() => void = null) {
    this._fig._leftLine.pulseWidth({ line: 10 });
    this._fig._rightLine.pulseWidth({ line: 10, done });
    this.diagram.animateNextFrame();
  }

  pulseTopLeftAngle(done: ?() => void = null) {
    this._fig._topLeftAngle.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseRightLineAndAngles() {
    this._fig._rightLine.showAll();
    this._fig._topRightAngle.showAll();
    this._fig._bottomRightAngle.showAll();
    this._fig._rightLine.pulseWidth({ line: 5 });
    this._fig._topRightAngle.pulseScaleNow(1, 2);
    this._fig._bottomRightAngle.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseInsideAngles(done: ?() => void = null) {
    this._fig._topRightAngleInside.pulseScaleNow(1, 2, 0, done);
    this._fig._bottomRightAngleInside.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRectangle(done: ?() => void = null) {
    this._fig._rectangle.showAll();
    this._fig._rectangle.pulseThickNow(1, 1.05, 12, done);
    this.diagram.animateNextFrame();
  }

  pulseMiddleLineAndAngles() {
    this._fig._middleLine.pulseWidth({ line: 5 });
    this._fig._topMiddleAngle.pulseScaleNow(1, 2);
    this._fig._bottomMiddleAngle.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
