// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramObjectPolyLine,
  // DiagramElementCollection,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  Point,
  Line,
} = Fig;

const { round, rand } = Fig.tools.math;

const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollectionSSA extends CommonDiagramCollection {
  _angle: DiagramObjectAngle;
  _adjacent: DiagramObjectLine;
  _unknown: DiagramObjectLine;
  _opposite: DiagramObjectLine;
  _constructionLine: { _line: DiagramElementPrimitive } & DiagramObjectLine;
  _adjacentMovePad: {
    // move: {
    //   limitLine: Line;
    // };
  } & DiagramElementPrimitive;

  _constructionCircle: DiagramElementPrimitive;

  toggleIndex: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElementsSSA, this);
    this.hasTouchableElements = true;
    this.scenarios = this.layout.ssaScenarios;
    this._adjacentMovePad.makeTouchable();
    this._constructionLine.makeTouchable();
    // this._adjacentMovePad.move.limitLine = new Line(new Point(-2.5, 0), 1.8, 0);
    this._adjacentMovePad.move.bounds.updateTranslation(new Line(new Point(-2.5, 0), 1.8, 0));
    this._adjacentMovePad.setTransformCallback = this.updatePosition.bind(this);
    this._constructionLine.setTransformCallback = this.updateRotation.bind(this);
    this._constructionLine.move.bounds.updateRotation({
      min: Math.PI / 10,
      max: Math.PI * 3 / 4,
    });
    // this._constructionLine.move.maxTransform.updateRotation(Math.PI * 3 / 4);
    // this._constructionLine.move.minTransform.updateRotation(Math.PI / 10);
    this._opposite.makeTouchable();
    this._opposite.setTransformCallback = this.tryToShowTriangle.bind(this);
    this.toggleIndex = 0;
  }

  setInitialPosition() {
    this._adjacentMovePad.setPosition(-2, 0);
    this._unknown.setRotation(Math.PI / 6);
    this._opposite.setRotation(Math.PI / 3);
    this._constructionLine.hide();
    this._constructionCircle.hide();
  }

  makeFullyInteractive() {
    this.hasTouchableElements = true;
    this._constructionLine.isTouchable = true;
    this._constructionLine.isMovable = true;
    this._constructionLine._line.isMovable = true;
    this._constructionLine._line.isTouchable = true;
    this._adjacentMovePad.isTouchable = true;
    this._adjacentMovePad.isMovable = true;
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
      this._constructionCircle.angleToDraw = 1 * Math.PI * 2;
      this.animations.new()
        .custom({ callback: growLine.bind(this), duration: 1 })
        .whenFinished(callback)
        .start();
    } else {
      this._constructionLine.setLength(1.7 / Math.sin(r) * 1);
      this.animations.new()
        .custom({ callback: createCircle.bind(this), duration: 2 })
        .whenFinished(callback)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  calcInterceptAngles(
    b: number = this._constructionLine.getRotation(),
    A: number = this._adjacent.length,
    B: number = this._opposite.length,
  ) {
    // b: angle of known angle
    // A: Adjacent side length
    // B: Opposite side length
    // a: Unknown-Opposite angle
    // c: Angle of side B relative to 0 (external angle of Adjacent-Opposite)
    // const b = this._constructionLine.getRotation();
    // const A = this._adjacent.length;
    // const B = this._opposite.length;
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

  goToAngleAndLength(angle: number, length: number, done: ?() => void = null) {
    let intercept = this.calcInterceptAngles(angle, length - 0.2)[0];
    if (intercept == null) {
      intercept = this._opposite.getRotation();
    }
    this.animations.cancelAll();
    this._unknown.hide();
    this.animations.new()
      .inParallel([
        this._constructionLine.anim.rotation({ target: angle, duration: 0.8 }),
        this._adjacentMovePad.anim.position({
          target: new Point(-length, 0),
          duration: 0.8,
        }),
        this._opposite.anim.rotation({ target: intercept, duration: 0.8 }),
      ])
      .whenFinished(() => {
        this._unknown.show();
        this.updateRotation();
        if (done != null) {
          done();
        }
      })
      .start();
    this.diagram.animateNextFrame();
  }

  setDefault(includingOpposite: boolean = true) {
    this._constructionLine.setRotation(Math.PI / 6);
    this._adjacentMovePad.setPosition(-2.2, 0);
    if (includingOpposite) {
      this._opposite.setRotation(Math.PI / 3);
    }
    this.diagram.animateNextFrame();
  }

  adjacentShorterDefault(done: ?() => void = null) {
    const adjacentLength = this.layout.ssaRadius * 0.8;
    const angle = Math.PI / 3;
    this.goToAngleAndLength(angle, adjacentLength, done);
  }

  adjacentShorter(done: ?() => void = null) {
    const adjacentLength = rand(
      Math.abs(this._adjacentMovePad.move.bounds.getTranslation().boundary.p2.x),
      this.layout.ssaRadius * 0.9,
    );
    const angle = rand(
      this._constructionLine.move.bounds.getRotation().boundary.min || 0,
      this._constructionLine.move.bounds.getRotation().boundary.max || 0,
      // this._constructionLine.move.minTransform.r() || 0,
      // this._constructionLine.move.maxTransform.r() || 0,
    );
    this.goToAngleAndLength(angle, adjacentLength, done);
  }

  adjacentTwoDefault(done: ?() => void = null) {
    const adjacentLength = this.layout.ssaRadius + 0.7;

    const angle = Math.PI / 6;
    this.goToAngleAndLength(angle, adjacentLength, done);
  }

  adjacentTwo(done: ?() => void = null) {
    if (this.toggleIndex > 0) {
      this.animations.new()
        .trigger({ callback: this.toggleInterceptAngles.bind(this) })
        .start();
      this.toggleInterceptAngles();
      this.toggleIndex -= 1;
      if (done != null) {
        done();
      }
      return;
    }
    this.toggleIndex = 1;
    const adjacentLength = rand(
      this.layout.ssaRadius + 0.3,
      Math.abs(this._adjacentMovePad.move.bounds.getTranslation().boundary.p1.x),
    );
    const maxAngle = Math.asin(this.layout.ssaRadius / (adjacentLength - 0.2));

    const angle = rand(
      // this._constructionLine.move.minTransform.r() || 0,
      this._constructionLine.move.bounds.getRotation().boundary.min || 0,
      maxAngle * 0.9,
    );
    this.goToAngleAndLength(angle, adjacentLength, done);
  }

  adjacentOne(done: ?() => void = null) {
    const adjacentLength = rand(
      this.layout.ssaRadius + 0.3,
      Math.abs(this._adjacentMovePad.move.bounds.getTranslation().boundary.p1.x),
    );
    const angle = Math.asin(this.layout.ssaRadius / (adjacentLength - 0.2));

    this.goToAngleAndLength(angle, adjacentLength, done);
  }

  adjacentZero(done: ?() => void = null) {
    const adjacentLength = rand(
      this.layout.ssaRadius + 0.3,
      Math.abs(this._adjacentMovePad.move.bounds.getTranslation().boundary.p1.x),
    );
    const minAngle = Math.asin(this.layout.ssaRadius / (adjacentLength - 0.2));

    const angle = rand(
      minAngle * 1.1,
      this._constructionLine.move.bounds.getRotation().boundary.max || 0,
    );
    this.goToAngleAndLength(angle, adjacentLength, done);
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
