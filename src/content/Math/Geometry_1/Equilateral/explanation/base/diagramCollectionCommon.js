// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectLine,
  DiagramObjectPolyLine,
  DiagramObjectAngle,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  isosceles: number;
  _angle: DiagramObjectPolyLine;
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

  toggleIsoscelesSides() {
    this._angle.showAll();
    this.isosceles = (this.isosceles + 1) % 3;
    this._angle.setRotation(this.isosceles * Math.PI / 3 * 2);
    this.diagram.animateNextFrame();
  }

  toggleIsoscelesSidesAndAngles() {
    this._angle.showAll();
    this.isosceles = (this.isosceles + 1) % 3;
    this._angle.setRotation(this.isosceles * Math.PI / 3 * 2);
    if (this.isosceles === 0) {
      this._triangle._angle0.showAll();
      this._triangle._angle0.pulseScaleNow(1, 1.3);
      this._triangle._angle2.showAll();
      this._triangle._angle2.pulseScaleNow(1, 1.3);
      this._triangle._angle1.hide();
    } else if (this.isosceles === 1) {
      this._triangle._angle0.hide();
      this._triangle._angle1.showAll();
      this._triangle._angle1.pulseScaleNow(1, 1.3);
      this._triangle._angle2.showAll();
      this._triangle._angle2.pulseScaleNow(1, 1.3);
    } else {
      this._triangle._angle1.showAll();
      this._triangle._angle1.pulseScaleNow(1, 1.3);
      this._triangle._angle0.showAll();
      this._triangle._angle0.pulseScaleNow(1, 1.3);
      this._triangle._angle2.hide();
    }
    this.diagram.animateNextFrame();
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
