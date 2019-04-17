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
  _basePad: DiagramElementPrimative;
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
    this._basePad.makeTouchable();
    this._line.makeTouchable();
    // this._basePad.move.maxTransform.updateScale(1.2, 1);
    // this._basePad.move.minTransform.updateScale(0.8, 1);
    this._basePad.move.limitLine = new Line(new Point(-2.5, 0), 1.8, 0);
    this._basePad.setTransformCallback = this.updatePosition.bind(this);
    this._line.setTransformCallback = this.updateRotation.bind(this);
  }

  updatePosition() {
    const p = this._basePad.getPosition().x + 0.2;
    this._angle.setPosition(p, 0);
    this._left.setPosition(p, 0);
    this._base.setLength(-p);
    this._line.transform.updateTranslation(p, 0);
  }

  updateRotation() {
    const r = this._line.getRotation();
    this._angle.setAngle({ angle: r });
    this._left.setRotation(r);
  }
}
