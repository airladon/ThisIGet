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
    let base;
    if (side01 >= side12 && side01 >= side20) {
      mid = triangle._side01.line.midPoint();
      shaddow = triangle.points[2].getShaddowOnLine(triangle._side01.line);
      line = new Line(shaddow, triangle.points[2]);
      base = triangle._side01.line;
    } else if (side12 >= side01 && side12 >= side20) {
      mid = triangle._side12.line.midPoint();
      shaddow = triangle.points[0].getShaddowOnLine(triangle._side12.line);
      line = new Line(shaddow, triangle.points[0]);
      base = triangle._side12.line;
    } else {
      mid = triangle._side20.line.midPoint();
      shaddow = triangle.points[1].getShaddowOnLine(triangle._side20.line);
      line = new Line(shaddow, triangle.points[1]);
      base = triangle._side20.line;
    }
    const height = line.distance;
    const angle = minAngleDiff(line.angle(), Math.PI / 2);
    const newCenter = (new Line(mid, height / 2, angle + Math.PI / 2)).p2;
    const delta = newCenter.sub(this.layout.fixedTriangleCenter);
    // const fitWindow = this.layout.fixedTriangleWindow;
    // const heightScale = fitWindow.height / height;
    // const widthScale = fitWindow.width / base.distance;
    // const scale = Math.min(heightScale, widthScale);
    // console.log(scale, heightScale, widthScale)
    fixedTri.setPosition(0, 0);
    fixedTri.setRotation(0);
    // fixedTri.setScale(1, 1);
    fixedTri.updatePoints(triangle.points.map(p => p._dup()));
    fixedTri.setPositionWithoutMoving(delta);
    // fixedTri.setScaleWithoutMoving(new Point(1/scale, 1/scale));
    fixedTri.stop(true, 'noComplete');
    fixedTri.animations.new()
      .inParallel([
        fixedTri.anim.rotation({ target: -angle, duration: 1 }),
        fixedTri.anim.position({ target: new Point(0, 0), duration: 1 }),
        // fixedTri.anim.scale({ target: new Point(scale, scale), duration: 1 }),
      ])
      .whenFinished(() => {
        fixedTri.setPositionWithoutMoving(new Point(0, 0));
        fixedTri.setRotationWithoutMoving(0);
        // fixedTri.setScaleWithoutMoving(new Point(1, 1));
        if (callback != null) {
          callback();
        }
      })
      .start();
    this.diagram.animateNextFrame();
  }

  updateTotalAngles() {

  }
}
