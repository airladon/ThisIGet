// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
// import {
//   Transform, Point,
// } from '../../../../../js/diagram/tools/g2';
// import {
//   DiagramElementPrimative,
// } from '../../../../../js/diagram/Element';
// import {
//   removeRandElement, rand,
// } from '../../../../../js/diagram/tools/mathtools';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

import makeTriangle from '../../../../LessonsCommon/tools/triangle';
import type { TypeTriangle, TypeTriangleAngle } from '../../../../LessonsCommon/tools/triangle';

const { Transform, Point, DiagramElementPrimative } = Fig;
const { removeRandElement, rand } = Fig.tools.math;

export default class CustomTriangleCollection extends CommonDiagramCollection {
  _triangle: {
    _point1: DiagramElementPrimative;
    _point2: DiagramElementPrimative;
    _point3: DiagramElementPrimative;
  } & TypeTriangle & TypeTriangleAngle;

  makeTri() {
    const layout = this.layout.custom;
    const p = layout.pointPositions;
    const triangle = makeTriangle(
      this.diagram,
      p.p1,
      p.p2,
      p.p3,
      layout.lineWidth,
      this.layout.colors.line,
    );

    const { boundary } = layout;
    const pointColor = this.layout.colors.point;
    triangle.addPoint(1, layout.pointRadius, pointColor, true, boundary);
    triangle.addPoint(2, layout.pointRadius, pointColor, true, boundary);
    triangle.addPoint(3, layout.pointRadius, pointColor, true, boundary);
    triangle.hasTouchableElements = true;
    return triangle;
  }

  updatePoints() {
    const p1 = this._triangle._point1.transform.t();
    const p2 = this._triangle._point2.transform.t();
    const p3 = this._triangle._point3.transform.t();
    if (p1 != null && p2 != null && p3 != null) {
      this._triangle.updatePoints(p1, p2, p3);
    }
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('triangle', this.makeTri());
    this.hasTouchableElements = true;
  }

  calculateFuturePositions() {
    this.futurePositions = [];
    const layout = this.layout.custom;
    const quadrants = [0, 1, 2, 3];
    const points = [this._triangle._point1, this._triangle._point2, this._triangle._point3];
    points.forEach((p) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(layout.randomBoundary.left, layout.randomBoundary.right);
      let y = rand(layout.randomBoundary.bottom, layout.randomBoundary.top);
      if (quadrant === 1 || quadrant === 2) {
        x *= -1;
      }
      if (quadrant === 2 || quadrant === 3) {
        y *= -1;
      }
      this.futurePositions.push({
        element: p,
        scenario: {
          position: new Point(x, y),
          rotation: 0,
        },
      });
    });
  }

  newTriangle() {
    this.calculateFuturePositions();
    this.moveToFuturePositions(1.5);
    this.diagram.animateNextFrame();
  }
}
