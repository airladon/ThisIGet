// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramObjectPolyLine,
  // DiagramElementCollection,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  Point,
  Line,
} = Fig;

// const { rand } = Fig.tools.math;

// const { getPoint } = Fig.tools.g2;

export default class CommonCollectionSSA extends CommonDiagramCollection {
  _angle: DiagramObjectAngle;
  _base: DiagramObjectLine;
  _left: DiagramObjectLine;
  _right: DiagramObjectLine;
  _line: DiagramObjectLine;
  _circle: DiagramElementPrimative;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsSSA);
    this.hasTouchableElements = true;
    this.scenarios = this.layout.ssaScenarios;
    this._base.makeTouchable();
    this._base.move.maxTransform.updateScale(1.2, 1);
    this._base.move.minTransform.updateScale(0.8, 1);
    // this._base.move.limitLine = new Line(new Point(-2.5, 0), 1.8, 0);
    this._base.setTransformCallback = this.update.bind(this);
  }

  update() {
    const p = this._base.getPosition().x - this._base.length * this._base.getScale().x;
    this._angle.setPosition(p, 0);
    this._left.setPosition(p, 0);
  }
}
