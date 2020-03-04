// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _topLine: DiagramObjectLine;
    _bottomLine: DiagramObjectLine;
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

  pulseParallelLines(done: ?() => void = null) {
    this._fig._topLine.pulseWidth({ line: 5 });
    this._fig._bottomLine.pulseWidth({ line: 5, done });
    this.diagram.animateNextFrame();
  }


  pulseMiddleLineAndAngles() {
    this._fig._middleLine.pulseWidth({ line: 5 });
    this._fig._topMiddleAngle.pulseScaleNow(1, 2);
    this._fig._bottomMiddleAngle.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
