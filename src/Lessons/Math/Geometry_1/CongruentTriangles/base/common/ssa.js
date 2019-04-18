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

const { round } = Fig.tools.math;

const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollectionSSA extends CommonDiagramCollection {
  _angle: DiagramObjectAngle;
  _adjacent: DiagramObjectLine;
  _unknown: DiagramObjectLine;
  _opposite: DiagramObjectLine;
  _constructionLine: DiagramObjectLine;
  _adjacentMovePad: DiagramElementPrimative;
  _constructionCircle: DiagramElementPrimative;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsSSA);
    this.hasTouchableElements = true;
    this.scenarios = this.layout.ssaScenarios;
    this._adjacentMovePad.makeTouchable();
    this._constructionLine.makeTouchable();
    this._adjacentMovePad.move.limitLine = new Line(new Point(-2.5, 0), 1.8, 0);
    this._adjacentMovePad.setTransformCallback = this.updatePosition.bind(this);
    this._constructionLine.setTransformCallback = this.updateRotation.bind(this);
    this._constructionLine.move.maxTransform.updateRotation(Math.PI * 2 / 3);
    this._constructionLine.move.minTransform.updateRotation(Math.PI / 10);
    this._opposite.makeTouchable();
    this._opposite.setTransformCallback = this.tryToShowTriangle.bind(this);
  }

  setInitialPosition() {
    this._adjacentMovePad.setPosition(-2, 0);
    this._unknown.setRotation(Math.PI / 6);
    this._opposite.setRotation(Math.PI / 3);
    this._constructionLine.hide();
    this._constructionCircle.hide();
  }

  updatePosition() {
    const p = this._adjacentMovePad.getPosition().x + 0.2;
    this._angle.setPosition(p, 0);
    this._unknown.setPosition(p, 0);
    this._adjacent.setLength(-p);
    this._constructionLine.transform.updateTranslation(p, 0);
    this.tryToShowTriangle();
  }

  updateRotation() {
    const r = this._constructionLine.getRotation();
    this._angle.setAngle({
      angle: r,
      position: this._adjacentMovePad.getPosition().add(0.2, 0),
    });
    this._unknown.setRotation(r);
    this._constructionLine.setLength(1.7 / Math.sin(r));
    this.tryToShowTriangle();
  }

  tryToShowTriangle() {
    const c = this._opposite.getRotation();
    const intercepts = this.calcInterceptAngles();
    let isTri = false;
    intercepts.forEach((i) => {
      if (round(c, 2) === round(i, 2)) {
        isTri = true;
      }
    });
    if (isTri) {
      this._opposite.updateLineGeometry();
      this._unknown.setEndPoints(
        this._angle.getPosition(),
        this._opposite.p2,
      );
    } else {
      this._unknown.setLength(0.5);
    }
  }

  createConstructionLines(
    callback: ?() => void = null,
    which: 'line' | 'circle' | 'both' = 'both',
  ) {
    const r = this._constructionLine.getRotation();
    this._constructionLine.setLength(1.7 / Math.sin(r));
    // this._line.grow(0, 1);
    const rr = this._opposite.getRotation();
    this._constructionCircle.setRotation(rr);
    const growLine = (percent) => {
      this._constructionLine.setLength(1.7 / Math.sin(r) * percent);
    };
    const createCircle = (percent) => {
      this._constructionCircle.angleToDraw = percent * Math.PI * 2;
      this._opposite.setRotation(percent * Math.PI * 2 + rr);
    };
    this.animations.cancelAll();
    this._constructionLine.setLength(0);
    if (which === 'both') {
      this.animations.new()
        .custom({ callback: growLine.bind(this), duration: 1 })
        .custom({ callback: createCircle.bind(this), duration: 2 })
        .whenFinished(callback)
        .start();
    } else if (which === 'line') {
      this.animations.new()
        .custom({ callback: growLine.bind(this), duration: 1 })
        .whenFinished(callback)
        .start();
    } else {
      this.animations.new()
        .custom({ callback: createCircle.bind(this), duration: 2 })
        .whenFinished(callback)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  calcInterceptAngles() {
    // b: angle of known angle
    // A: Adjacent side length
    // B: Opposite side length
    // a: Unknown-Opposite angle
    // c: Angle of side B relative to 0 (external angle of Adjacent-Opposite)
    const b = this._constructionLine.getRotation();
    const A = this._adjacent.length;
    const B = this._opposite.length;
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
    return intercepts;
  }

  toggleInterceptAngles() {
    const interceptAngles = this.calcInterceptAngles();
    if (interceptAngles.length === 0) {
      return;
    }
    let target = interceptAngles[0];
    if (interceptAngles.length === 2) {
      const c = this._opposite.getRotation('0to360');
      const c0 = Math.abs(minAngleDiff(c, interceptAngles[0]));
      const c1 = Math.abs(minAngleDiff(c, interceptAngles[1]));
      if (
        (c1 < c0 && round(interceptAngles[1], 2) !== round(c, 2))
        || round(interceptAngles[0], 2) === round(c, 2)
      ) {
        [, target] = interceptAngles;
      }
    }
    this.animations.cancelAll();
    this.animations.new()
      .rotation({
        element: this._opposite,
        target,
        velocity: 1,
        maxDuration: 1,
        direction: 0,
      })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseOpposite() {
    this._opposite.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseAdjacent() {
    this._adjacent.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }
}
