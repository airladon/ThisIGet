// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle,
  // DiagramObjectLine,
  DiagramElementCollection, DiagramObjectPolyLine,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  Point,
  Line,
} = Fig;

const { rand, randElement } = Fig.tools.math;

const { getPoint } = Fig.tools.g2;

export default class CommonCollectionAAA extends CommonDiagramCollection {
  _fig: {
    _tri: {
      _angle0: DiagramObjectAngle;
      _angle1: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
      _pad0: DiagramElementPrimative;
      _pad1: DiagramElementPrimative;
      _pad2: DiagramElementPrimative;
    } & DiagramObjectPolyLine;
  } & DiagramElementCollection;

  leftAngle: number;
  rightAngle: number;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsAAA);
    this.hasTouchableElements = true;
    this.resetTri();
  }

  resetTri() {
    this.leftAngle = Math.PI / 6;
    this.rightAngle = Math.PI / 3 * 2;
    const tri = this._fig._tri;
    tri.updatePoints(this.layout.aaaTri.options.points.map(p => getPoint(p)));
    tri._pad2.move.limitLine = new Line(new Point(-2.2, -1), new Point(-1, -1));
    tri._pad1.move.limitLine = new Line(new Point(2.2, -1), new Point(1, -1));
    tri._pad1.makeTouchable();
    tri._pad2.setTransformCallback = this.updateTri.bind(this);
    tri._pad1.setTransformCallback = this.updateTri.bind(this);
    tri._pad0.setTransformCallback = this.updateTop.bind(this);
  }

  randomSize() {
    const right = this._fig._tri._pad1;
    const left = this._fig._tri._pad2;
    const pad = randElement([right, left]);
    const { limitLine } = pad.move;
    const midPoint = limitLine.midPoint();
    let delta = rand(limitLine.length() / 3, limitLine.length() / 2);
    const padPosition = pad.getPosition();
    if (padPosition.x > midPoint.x) {
      delta = -delta;
    }
    pad.animations.cancelAll();
    pad.animations.new()
      .position({ target: padPosition.add(delta), duration: 0.5 })
      .start();
    this.diagram.animateNextFrame();
  }

  updateTop() {
    const tri = this._fig._tri;
    const top = tri._pad0.getPosition();
    const left = tri._pad2.getPosition();
    const right = tri._pad1.getPosition();
    this.leftAngle = new Line(left, top).angle();
    this.rightAngle = new Line(right, top).angle();
    this.updateTri();
  }

  updateTri() {
    const tri = this._fig._tri;
    const left = tri._pad2.getPosition();
    const right = tri._pad1.getPosition();
    const leftRight = new Line(left, right);
    const leftTop = new Line(left, 5, this.leftAngle);
    const rightTop = new Line(right, 5, this.rightAngle);
    const top = leftTop.intersectsWith(rightTop).intersect;
    tri.updatePoints([top, right, left]);

    tri._pad0.move.maxTransform.updateTranslation(
      Math.max(1, top.x),
      Math.max(Math.min(leftRight.length() / 2 + left.y, 1.1), top.y),
    );
    tri._pad0.move.minTransform.updateTranslation(
      Math.min(-1, top.x),
      Math.min(0, top.y),
    );
  }
}
