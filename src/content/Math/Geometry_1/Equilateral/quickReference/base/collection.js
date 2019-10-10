// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementCollection,
  DiagramObjectLine,
  DiagramObjectPolyLine,
  DiagramObjectAngle,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  isosceles: number;
  _triangle: {
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: { _label: DiagramElementCollection } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection } & DiagramObjectLine;
  } & DiagramObjectPolyLine;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this.isosceles = 0;
  }

  pulseAngles(done: ?() => void = null) {
    this._triangle._angle0.pulseScaleNow(1, 1.3);
    this._triangle._angle1.pulseScaleNow(1, 1.3);
    this._triangle._angle2.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseSides() {
    this._triangle._side01._label.pulseScaleNow(1, 2.3);
    this._triangle._side12._label.pulseScaleNow(1, 2.3);
    this._triangle._side20._label.pulseScaleNow(1, 2.3);
    this.diagram.animateNextFrame();
  }
}
