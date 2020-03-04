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
    _adjacent: DiagramObjectLine;
    _externalLine: DiagramObjectLine;
    _externalAngle: DiagramObjectAngle;
    _tri: {
      _line: DiagramElementPrimitive;
      _angle0: DiagramObjectAngle;
      _angle1: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
    } & DiagramObjectPolyLine;
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

  pulseAdjacent() {
    this._fig._adjacent.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseExternalLine() {
    this._fig._externalLine.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseExternalAngle(done: ?() => void = null) {
    this._fig._externalAngle.pulseScaleNow(1, 1.5, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseInternalAngles() {
    this._fig._tri._angle0.pulseScaleNow(1, 1.5);
    this._fig._tri._angle1.pulseScaleNow(1, 1.5);
    this._fig._tri._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseOppositeAngles() {
    this._fig._tri._angle0.pulseScaleNow(1, 1.5);
    this._fig._tri._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAngleC(done: ?() => void = null) {
    this._fig._tri._angle2.pulseScaleNow(1, 1.5, 0, done);
    this.diagram.animateNextFrame();
  }
}
