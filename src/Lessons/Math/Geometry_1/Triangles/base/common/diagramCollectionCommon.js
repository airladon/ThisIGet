// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  Transform,
  Line, Point,
} = Fig;

const { removeRandElement, rand } = Fig.tools.math;
const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _customTriangle: DiagramObjectPolyLine;
  _totalAngle: DiagramObjectPolyLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._customTriangle._pad0.makeTouchable();
    this._totalAngle._triangle._pad0.makeTouchable();
  }

  // eslint-disable-next-line class-methods-use-this
  randomCustomTriangle(triangle: DiagramObjectPolyLine, layout: Object) {
    const { boundary, radius } = layout.options.pad;
    const boundaryTop = boundary[1] + boundary[3] - radius;
    const boundaryRight = boundary[0] + boundary[2] - radius;
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.5, boundaryRight);
      let y = rand(0.5, boundaryTop);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      // eslint-disable-next-line no-param-reassign
      triangle[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  newCustomTriangle(callback: ?() => void = null) {
    this.randomCustomTriangle(this._customTriangle, this.layout.customTriangle);
    this._customTriangle.stop(true, 'noComplete');
    this._customTriangle.animations.new()
      .scenarios({ target: 'next', duration: 1.5 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  newTotalTriangle(callback: ?() => void = null) {
    this.randomCustomTriangle(this._totalAngle._triangle, this.layout.triangle);
    this._totalAngle.stop(true, 'noComplete');
    this._totalAngle.animations.new()
      .scenarios({ target: 'next', duration: 1.5 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    this._customTriangle._angle0.pulseScaleNow(1, 1.5);
    this._customTriangle._angle1.pulseScaleNow(1, 1.5);
    this._customTriangle._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  growSides() {
    this._customTriangle._side01.grow(0, 1.5);
    this._customTriangle._side12.grow(0, 1.5);
    this._customTriangle._side20.grow(0, 1.5);
    this.diagram.animateNextFrame();
  }

  makeBaseHorizontal(callback: ?() => void = null) {
    const triangle = this._totalAngle._triangle;
    const fixedTri = this._totalAngle._fixedTriangle;
    const side01 = triangle._side01.length;
    const side12 = triangle._side12.length;
    const side20 = triangle._side20.length;
    let line;
    let mid;
    let shaddow;
    if (side01 >= side12 && side01 >= side20) {
      mid = triangle._side01.line.midPoint();
      shaddow = triangle.points[2].getShaddowOnLine(triangle._side01.line);
      line = new Line(shaddow, triangle.points[2]);
    } else if (side12 >= side01 && side12 >= side20) {
      mid = triangle._side12.line.midPoint();
      shaddow = triangle.points[0].getShaddowOnLine(triangle._side12.line);
      line = new Line(shaddow, triangle.points[0]);
    } else {
      mid = triangle._side20.line.midPoint();
      shaddow = triangle.points[1].getShaddowOnLine(triangle._side20.line);
      line = new Line(shaddow, triangle.points[1]);
    }
    const height = line.distance;
    const angle = minAngleDiff(line.angle(), Math.PI / 2);
    const newCenter = (new Line(mid, height / 2, angle + Math.PI / 2)).p2;
    const delta = newCenter.sub(this.layout.fixedTriangleCenter);
    fixedTri.setPosition(0, 0);
    fixedTri.setRotation(0);
    fixedTri.updatePoints(triangle.points.map(p => p._dup()));
    fixedTri.setPositionWithoutMoving(delta);
    fixedTri.stop(true, 'noComplete');
    fixedTri.animations.new()
      .inParallel([
        fixedTri.anim.rotation({ target: -angle, duration: 1 }),
        fixedTri.anim.position({ target: new Point(0, 0), duration: 1 }),
      ])
      .whenFinished(() => {
        fixedTri.setPositionWithoutMoving(new Point(0, 0));
        fixedTri.setRotationWithoutMoving(0);
        this.updateTotalAngles();
        if (callback != null) {
          callback();
        }
      })
      .start();
    this.diagram.animateNextFrame();
  }

  updateTotalAngles() {
    const { points } = this._totalAngle._fixedTriangle;
    const maxIndex = points.reduce((yMax, p, i, arr) => {
      console.log(yMax, p, i, arr, p.y, arr[yMax].y)
      if (p.y > arr[yMax].y) {
        return i;
      }
      return yMax;
    }, 0);
    console.log(maxIndex, points)
    let remainingPoints = [0, 1, 2];
    const top = points[maxIndex];
    remainingPoints = remainingPoints.filter((val, i) => i !== maxIndex);
    console.log(remainingPoints)
    let left = points[remainingPoints[0]];
    let right = points[remainingPoints[1]];
    if (left.x > right.x) {
      left = points[remainingPoints[1]];
      right = points[remainingPoints[0]];
    }
    console.log(left, right, top)

    const angleA = this._totalAngle._angleA;
    const angleB = this._totalAngle._angleB;
    const angleC = this._totalAngle._angleC;
    const angleATop = this._totalAngle._angleATop;
    const angleBTop = this._totalAngle._angleBTop;

    angleA.setAngle({ p1: right, p2: left, p3: top });
    angleB.setAngle({ p1: top, p2: right, p3: left });
    angleC.setAngle({ p1: left, p2: top, p3: right });
    angleATop.setAngle({ p1: new Point(top.x - 1, top.y), p2: top, p3: left });
    // console.log(angleATop)
    angleBTop.setAngle({ p1: right, p2: top, p3: new Point(top.x + 1, top.y) });
    angleA.showAll();
    angleB.showAll();
    angleC.showAll();
    angleATop.showAll();
    angleBTop.showAll();
  }
}
