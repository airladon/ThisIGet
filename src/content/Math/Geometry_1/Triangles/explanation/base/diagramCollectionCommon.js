// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Transform,
  Line, Point,
} = Fig;

const { removeRandElement, rand } = Fig.tools.math;
const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _customTriangle: {
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _totalAngle: {
    _triangle: {
      _pad0: DiagramElementPrimitive;
      _pad1: DiagramElementPrimitive;
      _pad2: DiagramElementPrimitive;
      _side01: DiagramObjectLine;
      _side12: DiagramObjectLine;
      _side20: DiagramObjectLine;
    } & DiagramObjectPolyLine;
    _fixedTriangle: {
      _line: DiagramElementPrimitive;
    } & DiagramObjectPolyLine;
    _angleA: DiagramObjectAngle;
    _angleB: DiagramObjectAngle;
    _angleC: DiagramObjectAngle;
    _angleATop: DiagramObjectAngle;
    _angleBTop: DiagramObjectAngle;
    _topParallel: DiagramObjectLine;
    _bottomParallel: DiagramObjectLine;
  } & DiagramElementCollection;

  _triangleType: {
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
  } & DiagramObjectPolyLine;;

  _definition: {
    element: HTMLElement;
  } & DiagramElementPrimitive;

  constructor(
    diagram: CommonTopicDiagram,
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
      // eslint-disable-next-line no-param-reassign, $FlowFixMe
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

  dupFixedTriangle() {
    this._totalAngle._triangle.updatePoints(
      this._totalAngle._fixedTriangle.points.map(p => p._dup()),
    );
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
        fixedTri.anim.rotation({ target: -angle, velocity: 1 }),
        fixedTri.anim.position({ target: new Point(0, 0), velocity: 1 }),
      ])
      .whenFinished(() => {
        fixedTri.setPositionWithoutMoving(new Point(0, 0));
        fixedTri.setRotationWithoutMoving(0);
        this.updateTotalAngles();
        this.dupFixedTriangle();
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
      if (p.y > arr[yMax].y) {
        return i;
      }
      if (p.y === arr[yMax].y) {
        if (p.x > arr[yMax].x) {
          return i;
        }
      }
      return yMax;
    }, 0);
    let remainingPoints = [0, 1, 2];
    const top = points[maxIndex];
    remainingPoints = remainingPoints.filter((val, i) => i !== maxIndex);
    let left = points[remainingPoints[0]];
    let right = points[remainingPoints[1]];
    if (left.x > right.x) {
      left = points[remainingPoints[1]];
      right = points[remainingPoints[0]];
    }

    const angleA = this._totalAngle._angleA;
    const angleB = this._totalAngle._angleB;
    const angleC = this._totalAngle._angleC;
    const angleATop = this._totalAngle._angleATop;
    const angleBTop = this._totalAngle._angleBTop;

    angleA.setAngle({ p1: right, p2: left, p3: top });
    angleB.setAngle({ p1: top, p2: right, p3: left });
    angleC.setAngle({ p1: left, p2: top, p3: right });
    angleATop.setAngle({ p1: new Point(top.x - 1, top.y), p2: top, p3: left });
    angleBTop.setAngle({ p1: right, p2: top, p3: new Point(top.x + 1, top.y) });
    angleA.hide();
    angleB.hide();
    angleC.hide();
    angleATop.hide();
    angleBTop.hide();

    this._totalAngle._bottomParallel.scenarios.parallel = {
      position: [0, left.y - this.layout.width / 2],
    };
    this._totalAngle._topParallel.scenarios.parallel = {
      position: [0, top.y + this.layout.width / 4],
    };
  }

  totalPulseAngles(angles: Array<string> = [], done: ?() => void = null) {
    let callback = done;
    angles.forEach((angle) => {
      const a = this._totalAngle[`_angle${angle}`];
      a.pulseScaleNow(1, 1.5, 0, callback);
      callback = null;
    });
    this.diagram.animateNextFrame();
  }

  drawParallelLines(callback: ?() => void = null) {
    this._totalAngle.setScenarios('offscreen');
    this._totalAngle.stop(true, 'noComplete');
    this._totalAngle.animations.new()
      .scenarios({ target: 'parallel', duration: 1.5 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  isInPosition() {
    const pad0 = this._triangleType._pad0.getPosition();
    const pad1 = this._triangleType._pad1.getPosition();
    const pad2 = this._triangleType._pad2.getPosition();
    const next0 = this._triangleType._pad0.scenarios.next.position;
    const next1 = this._triangleType._pad1.scenarios.next.position;
    const next2 = this._triangleType._pad2.scenarios.next.position;

    // $FlowFixMe
    if (pad0.x !== next0[0] || pad0.y !== next0[1]) {
      return false;
    }
    // $FlowFixMe
    if (pad1.x !== next1[0] || pad1.y !== next1[1]) {
      return false;
    }
    // $FlowFixMe
    if (pad2.x !== next2[0] || pad2.y !== next2[1]) {
      return false;
    }
    return true;
  }

  goToType(
    type: 'acute' | 'right' | 'obtuse' | 'equilateral' | 'isosceles' | 'scalene',
    duration: number = 1,
    callback: ?() => void = null,
    pulseIfSame: boolean = false,
  ) {
    let points = [];
    if (type === 'acute') {
      points = [
        [-1, -1],
        [0.5, 1],
        [1.5, -1],
      ];
      this._triangleType.hideSides();
      this._triangleType.showAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'An Acute Triangle has all angles less than 90º.';
    } else if (type === 'right') {
      points = [
        [-1, -1],
        [1.3, 0.8],
        [1.3, -1],
      ];
      this._triangleType.hideSides();
      this._triangleType.showAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'A Right Angle Triangle has one angle equal to 90º.';
    } else if (type === 'obtuse') {
      points = [
        [-1.5, -1],
        [0.5, 0.4],
        [2, -1],
      ];
      this._triangleType.hideSides();
      this._triangleType.showAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'An Obtuse Triangle has one angle greater than 90º.';
    } else if (type === 'equilateral') {
      points = [
        [-1, -1],
        [0, 0.73],
        [1, -1],
      ];
      this._triangleType.showSides();
      this._triangleType.hideAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'An Equilateral Triangle has all equal sides.';
    } else if (type === 'isosceles') {
      points = [
        [-0.7, -1],
        [0, 1.1],
        [0.7, -1],
      ];
      this._triangleType.showSides();
      this._triangleType.hideAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'An Isosceles Triangle has two equal sides.';
    } else if (type === 'scalene') {
      points = [
        [-1.5, -1],
        [1, 0.7],
        [2, -1],
      ];
      this._triangleType.showSides();
      this._triangleType.hideAngles();
      // $FlowFixMe
      this._definition.drawingObject.element.innerHTML = 'An Scalene Triangle has all sides of different length.';
    }

    this._triangleType._pad0.scenarios.next = { position: points[0] };
    this._triangleType._pad1.scenarios.next = { position: points[1] };
    this._triangleType._pad2.scenarios.next = { position: points[2] };

    if (this.isInPosition()) {
      if (pulseIfSame) {
        this._triangleType.pulseScaleNow(1, 1.2, 0, callback);
      } else if (callback != null) {
        callback();
      }
    } else {
      this._triangleType.stop(true, 'noComplete');
      this._triangleType.animations.new()
        .scenarios({ target: 'next', duration })
        .whenFinished(callback)
        .start();
    }
    this.diagram.animateNextFrame();
    // const { boundary, radius } = layout.options.pad;
    // const boundaryTop = boundary[1] + boundary[3] - radius;
    // const boundaryRight = boundary[0] + boundary[2] - radius;
    // const quadrants = [1, 2, 3, 4];
    // const pads = [0, 1, 2];
    // pads.forEach((pad) => {
    //   const quadrant = removeRandElement(quadrants);
    //   let x = rand(0.5, boundaryRight);
    //   let y = rand(0.5, boundaryTop);
    //   if (quadrant === 2 || quadrant === 3) {
    //     x *= -1;
    //   }
    //   if (quadrant === 3 || quadrant === 4) {
    //     y *= -1;
    //   }
    //   // eslint-disable-next-line no-param-reassign, $FlowFixMe
    //   triangle[`_pad${pad}`].scenarios.next = {
    //     position: [x, y],
    //     rotation: 0,
    //   };
    // });
  }
}
