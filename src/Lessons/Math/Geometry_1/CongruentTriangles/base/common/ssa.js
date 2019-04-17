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

const { randInt } = Fig.tools.math;

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
    this._basePad.move.limitLine = new Line(new Point(-2.5, 0), 1.8, 0);
    this._basePad.setTransformCallback = this.updatePosition.bind(this);
    this._line.setTransformCallback = this.updateRotation.bind(this);
    this._line.move.maxTransform.updateRotation(Math.PI * 2 / 3);
    this._line.move.minTransform.updateRotation(Math.PI / 10);
    this._right.makeTouchable();
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
    this._angle.setAngle({ angle: r, position: this._basePad.getPosition().add(0.2, 0) });
    this._left.setRotation(r);
    this._line.setLength(1.7 / Math.sin(r));
  }

  createConstructionLines(callback: ?() => void = null) {
    const r = this._line.getRotation();
    this._line.setLength(1.7 / Math.sin(r));
    // this._line.grow(0, 1);
    const rr = this._right.getRotation();
    this._circle.setRotation(rr);
    const growLine = (percent) => {
      this._line.setLength(1.7 / Math.sin(r) * percent);
    };
    const createCircle = (percent) => {
      this._circle.angleToDraw = percent * Math.PI * 1.999;
    };
    this.animations.cancelAll();
    this._line.setLength(0);
    this.animations.new()
      .custom({ callback: createCircle.bind(this), duration: 2 })
      .custom({ callback: growLine.bind(this), duration: 1 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  calcInterceptAngles() {
    const b = this._line.getRotation();
    const A = this._base.length;
    const B = this._right.length;
    const a = Math.asin(A * Math.sin(b) / B);
    const c = a + b;
    const thresholdAngle = Math.asin(B / A);
    const intercepts = [];
    if (A <= B) {
      intercepts.push(c);
    } else if (b < thresholdAngle) {
      intercepts.push(c);
      intercepts.push(b + (Math.PI - a));
    } else if (b === thresholdAngle) {
      intercepts.push(c);
    }
    this._right.setRotation(intercepts[randInt(intercepts.length)]);
    this.diagram.animateNextFrame();
  }
}
