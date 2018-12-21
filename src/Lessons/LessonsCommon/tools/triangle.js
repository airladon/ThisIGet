// @flow
import Fig from 'figureone';
import type {
  TypeLineLabelLocation, TypeLineLabelSubLocation,
  TypeLineLabelOrientation,
} from 'figureone';

import { makeAngle } from './angle';
import type { TypeAngle } from './angle';

const {
  Diagram, DiagramElementCollection, DiagramElementPrimative, EquationLegacy,
  DiagramObjectLine,
} = Fig;
const {
  Transform, Point, Line, Rect, normAngle, minAngleDiff, threePointAngle,
} = Fig.tools.g2;

export type TypeTriangle = {
  p1: Point;
  p2: Point;
  p3: Point;
  b1: Point;      // outer border at point 1
  b2: Point;      // outer border at point 1
  b3: Point;      // outer border at point 1
  ib1: Point;     // inner border at point 1
  ib2: Point;     // inner border at point 2
  ib3: Point;     // inner border at point 3
  b12: Line;
  b23: Line;
  b31: Line;
  point1: DiagramElementPrimative;
  point2: DiagramElementPrimative;
  point3: DiagramElementPrimative;
  hasAngles: boolean;
  hasDimensions: boolean;
  hasLabels: boolean;
  labelOffset: number;
  labelsAlignedWithLines: boolean;
  labelsAlwaysOutside: boolean;
  clockwise: boolean;
  updatePoints: (Point, Point, Point) => void;
  updateAngles: () => void;
  addAngle: (number, number, number, number, Array<string>, string, number) => void;
  autoShowAngles: boolean;
  _line: DiagramElementPrimative;
  dimensionList: Array<Array<number>>;
  updatePointsCallback: () => void | null;
  angleRadiusToInnerBorder: boolean;
  getCenter: () => Point;
  getLongestSide: () => [number, number];
  getSideLine: (number, number) => void;
  getPoint: (number) => void;
  setTriangleCollectionPositionTo: (Point) => void;
  setTriangleCollectionRotationTo: (number) => void;
  setTriangleCollectionScaleTo: (Point) => void;
  getRotationToSide: (number, number) => number;
  getHeight: (number, number) => void;
  hideAngles: () => void;
  showAngles: (?boolean) => void;
  hideDimensions: () => void;
  showDimensions: (?boolean) => void;
  showRealDimensions: boolean;
  update: () => void;
  addPoint: (number, number, ?Array<number>, ?boolean, ?Rect) => void;
} & DiagramElementCollection;

export type TypeTriangleAngle = {
  _angle1: TypeAngle;
  _angle2: TypeAngle;
  _angle3: TypeAngle;
};

export type TypeTriangleLabel = {
  _dimension12: DiagramObjectLine;
  _dimension23: DiagramObjectLine;
  _dimension31: DiagramObjectLine;
  labelEqn12: EquationLegacy;
  labelEqn23: EquationLegacy;
  labelEqn31: EquationLegacy;
};

export type TypeTrianglePoints = {
  _point1: DiagramElementPrimative;
  _point2: DiagramElementPrimative;
  _point3: DiagramElementPrimative;
};

export default function makeTriangle(
  diagram: Diagram,
  p1: Point,
  p2: Point,
  p3: Point,
  lineWidth: number,
  color: Array<number>,
) {
  const triangle = diagram.shapes.collection(new Transform('Triangle')
    .scale(1, 1)
    .rotate(0)
    .translate(0, 0));

  // triangle.p1 = p1._dup();
  // triangle.p2 = p2._dup();
  // triangle.p3 = p3._dup();
  triangle.hasAngles = false;
  triangle.hasDimensions = false;
  triangle.hasLabels = false;
  triangle.labelsAlignedWithLines = true;
  triangle.clockwise = true;
  triangle.labelsAlwaysOutside = true;
  triangle.autoShowAngles = false;
  triangle.dimensionList = [];
  triangle.updatePointsCallback = null;
  triangle.angleRadiusToInnerBorder = true;
  triangle.showRealDimensions = false;

  triangle.updatePoints = (newP1: Point, newP2: Point, newP3: Point) => {
    triangle.p1 = newP1._dup();
    triangle.p2 = newP2._dup();
    triangle.p3 = newP3._dup();
    triangle.point1.transform.updateTranslation(newP1._dup());
    triangle.point2.transform.updateTranslation(newP2._dup());
    triangle.point3.transform.updateTranslation(newP3._dup());
    triangle._line.drawingObject.change([newP1, newP2, newP3]);
    const [b1, b2, b3] = triangle._line.drawingObject.border[0];
    triangle.b1 = b1;
    triangle.b2 = b2;
    triangle.b3 = b3;
    const [ib1, ib2, ib3] = triangle._line.drawingObject.holeBorder[0];
    triangle.ib1 = ib1;
    triangle.ib2 = ib2;
    triangle.ib3 = ib3;
    triangle.b12 = new Line(triangle.b2, triangle.b1);
    triangle.b23 = new Line(triangle.b3, triangle.b2);
    triangle.b31 = new Line(triangle.b1, triangle.b3);

    const a13 = normAngle(triangle.b31.angle() + Math.PI);
    const a12 = normAngle(triangle.b12.angle());
    if (minAngleDiff(a12, a13) > 0) {
      triangle.clockwise = true;
    } else {
      triangle.clockwise = false;
    }

    triangle.updateAngles();
    triangle.dimensionList.forEach((dim) => {
      const element = triangle[`_dimension${dim[0]}${dim[1]}`];
      element.stop();
    });
    triangle.updateDimensions();
    if (triangle.updatePointsCallback != null) {
      triangle.updatePointsCallback();
    }
  };

  triangle.makePoint = (index: number) => {
    const point = diagram.shapes.polygon({
      fill: true,
      sides: 100,
      radius: 1,
      color: [1, 0, 0, 1],
      transform: new Transform().scale(1, 1).translate(0, 0),
    });
    const update = () => {
      const t1 = triangle.point1.transform.t();
      const t2 = triangle.point2.transform.t();
      const t3 = triangle.point3.transform.t();
      if (t1 != null && t2 != null && t3 != null) {
        triangle.updatePoints(t1, t2, t3);
      }
    };
    point.setTransformCallback = update.bind(triangle);
    triangle[`point${index}`] = point;
  };

  triangle.makePoint(1);
  triangle.makePoint(2);
  triangle.makePoint(3);

  triangle.addPoint = function addPoint(
    index: number,
    radius: number,
    pointColor: Array<number> = [0, 0, 0, 0.001],
    movable: boolean = false,
    moveBoundary: Rect = diagram.limits,
  ) {
    const point = triangle[`point${index}`];
    point.setColor(pointColor);
    point.transform.updateScale(radius, radius);
    if (movable) {
      point.isTouchable = true;
      point.isMovable = true;
      point.move.canBeMovedAfterLoosingTouch = true;
      point.move.maxTransform = point.transform._dup();
      point.move.maxTransform.updateTranslation(
        moveBoundary.right,
        moveBoundary.top,
      );
      point.move.minTransform = point.transform._dup();
      point.move.minTransform.updateTranslation(
        moveBoundary.left,
        moveBoundary.bottom,
      );
    }
    triangle.add(`point${index}`, point, 0);
  };

  const line = diagram.shapes.polyLineLegacy(
    [p1, p2, p3], true, lineWidth,
    color, 'onSharpAnglesOnly',
  );
  triangle.add('line', line);

  triangle.addSideDimension = function addDimension(
    index1: number,
    index2: number,
    // dimensionText: string,
    dimensionColor: Array<number> = [0.5, 0.5, 0.5, 0.5],
    offset: number = 0,
    showLine: boolean = false,
    dimensionLineWidth: number = 0.01,
  ) {
    const point1 = triangle[`p${index1}`];
    const point2 = triangle[`p${index2}`];
    const dimension = diagram.objects.line({
      vertexSpaceStart: 'center',
      p1: point1,
      p2: point2,
      width: dimensionLineWidth,
      color: dimensionColor,
      showLine,
      offset,
    });

    triangle.add(`dimension${index1}${index2}`, dimension);
    triangle.dimensionList.push([index1, index2]);
    return dimension;
  };

  triangle.addSideLabel = function addSideLabel(
    index1: number, index2: number,
    labelColor: Array<number>,
    labelText: string,
    offset: number,
    location: TypeLineLabelLocation = 'outside',
    subLocation: TypeLineLabelSubLocation = 'left',
    orientation: TypeLineLabelOrientation = 'baseUpright',
    linePosition: number = 0.5,     // number where 0 is end1, and 1 is end2
  ) {
    const dimension = triangle.addSideDimension(index1, index2, labelColor, 0, false);
    dimension.addLabel(labelText, offset, location, subLocation, orientation, linePosition);
  };

  triangle.updateDimensions = () => {
    const updateDimension = (index1: number, index2: number) => {
      const dimension = triangle[`_dimension${index1}${index2}`];
      if (dimension) {
        let point1 = triangle[`p${index1}`];
        let point2 = triangle[`p${index2}`];
        if ((!triangle.clockwise)) {
          point2 = triangle[`p${index1}`];
          point1 = triangle[`p${index2}`];
        }
        dimension.setEndPoints(point1, point2, dimension.offset);
        const r = triangle.transform.r();
        if (r != null) {
          dimension.updateLabel(r);
        }
      }
    };
    triangle.dimensionList.forEach((dim) => {
      updateDimension(dim[0], dim[1]);
    });
  };

  triangle.addAngle = function addAngle(
    index: number,
    radius: number,
    width: number,
    sides: number,
    angleColor: Array<number>,
    labelText: string | EquationLegacy = '',
    labelRadius: number = radius,
  ) {
    const ang = makeAngle(diagram, radius, width, sides, angleColor);

    ang.addLabel(labelText, labelRadius);
    triangle.add(`angle${index}`, ang);
    triangle.drawOrder = [
      ...triangle.drawOrder.slice(-1),
      ...triangle.drawOrder.slice(0, -1),
    ];
    triangle.hasAngles = true;
    triangle.updateAngles();
  };

  triangle.updateAngles = () => {
    if (triangle.hasAngles) {
      const updateAngle = (ind: number) => {
        const angleElement = triangle[`_angle${ind}`];
        if (angleElement) {
          const index = ind - 1;
          const q = triangle[`p${index + 1}`];
          const r = triangle[`p${(index + 1) % 3 + 1}`];
          const p = triangle[`p${(index + 2) % 3 + 1}`];
          const qp = p.sub(q).toPolar().angle;
          const qr = r.sub(q).toPolar().angle;
          let start = qp;
          let delta = qr - qp;
          if (qp > qr) {
            if (delta < 0) {
              start = qr;
              delta *= -1;
            }
            if (delta > Math.PI) {
              start = qp;
              delta = Math.PI * 2 - delta;
            }
          } else {
            if (delta < 0) {
              start = qp;
              delta *= -1;
            }
            if (delta > Math.PI) {
              start = qr;
              delta = Math.PI * 2 - delta;
            }
          }
          // delta += lineWidthAngle;
          let triangleRotation = triangle.transform.r();
          if (triangleRotation == null) {
            triangleRotation = 0;
          }
          if (triangle.angleRadiusToInnerBorder) {
            const lineWidthAngle = lineWidth / angleElement.radius * 0.9;
            const innerBorderQ = triangle[`ib${index + 1}`];
            angleElement.setPosition(innerBorderQ);
            angleElement.updateAngle(start, delta + lineWidthAngle, triangleRotation, delta);
          } else {
            angleElement.setPosition(triangle[`p${index + 1}`]);
            angleElement.updateAngle(start, delta, triangleRotation, delta);
          }

          if (triangle.autoShowAngles) {
            const rp = q.sub(p).toPolar();
            const rq = r.sub(p).toPolar();
            const angle = minAngleDiff(rp.angle, rq.angle);
            const height = rp.mag * Math.sin(angle);
            if (Math.abs(height) < angleElement.radius) {
              angleElement.hide();
            } else {
              angleElement.show();
            }
          }
        }
      };
      updateAngle(1);
      updateAngle(2);
      updateAngle(3);
    }
  };

  triangle.showDimensions = (includeLabels: boolean = false) => {
    triangle.dimensionList.forEach((dim) => {
      const element = triangle[`_dimension${dim[0]}${dim[1]}`];
      element.showAll();
      if (!includeLabels) {
        if (element.label) {
          element._label.hide();
        }
      }
    });
    triangle.updateDimensions();
  };
  triangle.hideDimensions = () => {
    triangle.dimensionList.forEach((dim) => {
      const element = triangle[`_dimension${dim[0]}${dim[1]}`];
      element.hide();
    });
  };

  triangle.showAngles = (includeLabels: boolean = false) => {
    const elements = [triangle._angle1, triangle._angle2, triangle._angle3];
    elements.forEach((element) => {
      element.showAll();
      if (!includeLabels) {
        if (element.label) {
          element._label.hide();
        }
      }
    });
  };

  triangle.hideAngles = () => {
    const elements = [triangle._angle1, triangle._angle2, triangle._angle3];
    elements.forEach((element) => {
      element.hide();
    });
  };

  triangle.getCenter = () => {
    const mid12 = triangle.b12.midpoint();
    const mid13 = triangle.b31.midpoint();
    const lineMid12To3 = new Line(mid12, triangle.p3);
    const lineMid13To2 = new Line(mid13, triangle.p2);
    return lineMid12To3.intersectsWith(lineMid13To2).intersect;
  };

  triangle.getLongestSide = () => {
    const max = Math.max(
      triangle.b12.length(),
      triangle.b31.length(),
      triangle.b23.length(),
    );
    let q = 1;
    let r = 2;
    if (triangle.b31.length() === max) {
      q = 3;
      r = 1;
    } else if (triangle.b23.length() === max) {
      q = 2;
      r = 3;
    }
    return [q, r];
  };

  triangle.getSideLine = (q: number, r: number) => triangle[`b${q}${r}`];

  triangle.getPoint = (q: number) => triangle[`p${q}`];

  triangle.getHeight = (q: number, r: number) => {
    const pointIndeces = [1, 2, 3];
    const topPoint = pointIndeces.reduce(
      (tp, p) => (p === q || p === r ? tp : p),
      1,
    );
    const point1 = triangle.getPoint(q);
    const point2 = triangle.getPoint(r);
    const point3 = triangle.getPoint(topPoint);
    const rAngle = threePointAngle(point1, point2, point3);
    const sideLength = triangle.getSideLine(r, topPoint).length();
    return Math.abs(sideLength * Math.sin(rAngle));
  };

  triangle.getRotationToSide = (q: number, r: number) => {
    const angleQR = triangle[`p${r}`].sub(triangle[`p${q}`]).toPolar().angle;
    let rotation = angleQR;
    if (triangle.clockwise) {
      rotation = Math.PI + angleQR;
    }
    return rotation;
  };

  triangle.setTriangleCollectionPositionTo = (newPosition: Point) => {
    const t = triangle.transform.t();
    if (t != null) {
      const delta = t.sub(newPosition);
      triangle.transform.updateTranslation(newPosition);
      triangle.updatePoints(
        triangle.p1.add(delta),
        triangle.p2.add(delta),
        triangle.p3.add(delta),
      );
    }
  };

  triangle.setTriangleCollectionRotationTo = (newRotation: number) => {
    const r = triangle.transform.r();
    if (r != null) {
      const delta = r - newRotation;
      const deltaMatrix = new Transform().rotate(delta).m();
      triangle.updatePoints(
        triangle.p1.transformBy(deltaMatrix),
        triangle.p2.transformBy(deltaMatrix),
        triangle.p3.transformBy(deltaMatrix),
      );
      triangle.transform.updateRotation(newRotation);
    }
  };

  triangle.setTriangleCollectionScaleTo = (newScale: Point) => {
    const s = triangle.transform.s();
    if (s != null) {
      const delta = new Point(newScale.x / s.x, newScale.y / s.y);
      const newTransform = new Transform().scale(delta);
      triangle.transform.updateScale(newScale);
      triangle.updatePoints(
        triangle.p1.transformBy(newTransform.m()),
        triangle.p2.transformBy(newTransform.m()),
        triangle.p3.transformBy(newTransform.m()),
      );
    }
  };

  triangle.update = () => {
    triangle.updateAngles();
    triangle.updateDimensions();
  };

  triangle.flip = (x: number = -1, y: number = 1) => {
    const flipTransform = new Transform().scale(x, y);
    this.updatePoints(
      p1.transformBy(flipTransform.m()),
      p2.transformBy(flipTransform.m()),
      p3.transformBy(flipTransform.m()),
    );
  };

  triangle.setTransformCallback = triangle.update.bind(triangle);
  triangle.updatePoints(p1, p2, p3);
  return triangle;
}
