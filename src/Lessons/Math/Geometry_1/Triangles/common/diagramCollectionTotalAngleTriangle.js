// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
// import {
//   Transform, Point,
// } from '../../../../../js/diagram/tools/g2';
// import {
//   DiagramElementPrimative, DiagramElementCollection,
// } from '../../../../../js/diagram/Element';
// import {
//   removeRandElement, rand,
// } from '../../../../../js/diagram/tools/mathtools';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

import makeTriangle from '../../../../LessonsCommon/tools/triangle';
import type { TypeTriangle, TypeTriangleAngle } from '../../../../LessonsCommon/tools/triangle';
// import type { TypeLine } from '../../../../../js/diagram/DiagramObjects/Line';
// import { makeLine } from '../../../../LessonsCommon/tools/line';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, Point, DiagramElementPrimative, DiagramElementCollection,
  DiagramObjectLine, EquationLegacy,
} = Fig;
const { removeRandElement, rand } = Fig.tools.math;

export default class TotalAngleTriangleCollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _angleA: TypeAngle;
  _angleB: TypeAngle;
  // _angleC: TypeAngle;
  eqn: EquationLegacy;
  _eqn: DiagramElementCollection;
  _triangle: {
    _point1: DiagramElementPrimative;
    _point2: DiagramElementPrimative;
    _point3: DiagramElementPrimative;
  } & TypeTriangleAngle & TypeTriangle;

  makeTri() {
    const layout = this.layout.totalAngle;
    const p = layout.pointPositions;
    const triangle = makeTriangle(
      this.diagram,
      p.p1,
      p.p2,
      p.p3,
      layout.lineWidth,
      this.layout.colors.line,
    );
    triangle.angleRadiusToInnerBorder = false;
    const a = layout.angle;
    const aColor = this.layout.colors.angleA;
    const bColor = this.layout.colors.angleB;
    const cColor = this.layout.colors.angleC;
    triangle.addAngle(1, a.radius, a.lineWidth, a.sides, aColor, 'a');
    triangle.addAngle(2, a.radius, a.lineWidth, a.sides, bColor, 'b');
    triangle.addAngle(3, a.radius, a.lineWidth, a.sides, cColor, 'c');
    const { boundary } = layout;
    const pointColor = this.layout.colors.diagram.background;
    // const pointColor = this.layout.colors.point;
    triangle.addPoint(1, layout.pointRadius, pointColor, true, boundary);
    triangle.addPoint(2, layout.pointRadius, pointColor, true, boundary);
    triangle.addPoint(3, layout.pointRadius, pointColor, true, boundary);
    // triangle.hasTouchableElements = true;
    // triangle.updatePointsCallback = this.updatePositions.bind(this);
    return triangle;
  }

  addEquation(
  ) {
    const eqn = this.diagram.equation.makeEqn();
    eqn.createElements(
      {
        a: 'a',
        b: 'b',
        c: 'c',
        equals: ' = ',
        plus: ' + ',
        plus2: ' + ',
        _180: '180º',
      },
      this.layout.colors.diagram.text.base,
    );
    eqn.formAlignment.scale = this.layout.totalAngle.equation.scale;
    eqn.addForm('base', ['a', 'plus', 'b', 'plus2', 'c', 'equals', '_180']);
    eqn.setElem('a', this.colors.angleA, false);
    eqn.setElem('b', this.colors.angleB, false);
    eqn.setElem('c', this.colors.angleC, false);
    eqn.collection.setPosition(this.layout.totalAngle.equation.position);
    this.add('eqn', eqn.collection);
    this.eqn = eqn;
  }

  pulseAlternateA() {
    this._angleA.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAlternateB() {
    this._angleB.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  // pulseAlternateC() {
  //   this._angleC.pulseScaleNow(1, 1.5);
  //   this.diagram.animateNextFrame();
  // }

  resetColors() {
    this._angleA.setColor(this.layout.colors.angleA);
    this._angleB.setColor(this.layout.colors.angleB);
    this._triangle._angle1.setColor(this.layout.colors.angleA);
    this._triangle._angle2.setColor(this.layout.colors.angleB);
    this._triangle._angle3.setColor(this.layout.colors.angleC);
    this._triangle._line.setColor(this.layout.colors.line);
  }

  addParallelLines() {
    const layout = this.layout.totalAngle.parallelLine;
    const line1 = this.diagram.objects.line({
      vertexSpaceStart: 'start',
      length: layout.length,
      width: layout.width,
      color: this.layout.colors.parallelLines,
    });
    const line2 = this.diagram.objects.line({
      vertexSpaceStart: 'start',
      length: layout.length,
      width: layout.width,
      color: this.layout.colors.parallelLines,
    });
    this.add('line1', line1);
    this.add('line2', line2);
  }

  addAlternateAngles() {
    const layout = this.layout.totalAngle.angle;
    const angleA = makeAngle(
      this.diagram, layout.radius, layout.lineWidth, layout.sides,
      this.layout.colors.angleA,
    );
    angleA.addLabel('a', layout.labelRadius);
    const angleB = makeAngle(
      this.diagram, layout.radius, layout.lineWidth, layout.sides,
      this.layout.colors.angleB,
    );
    angleB.addLabel('b', layout.labelRadius);
    this.add('angleA', angleA);
    this.add('angleB', angleB);
  }

  updatePositions() {
    this._line1.setPosition(-2.5, this._triangle.p1.y);
    this._line2.setPosition(-2.5, this._triangle.p3.y);

    const angle13 = this._triangle.p3.sub(this._triangle.p1).toPolar().angle;
    const angle23 = this._triangle.p3.sub(this._triangle.p2).toPolar().angle;
    const angleC = Math.PI - (angle13 + Math.PI - angle23);
    this._angleA.updateAngle(Math.PI, angle13);
    this._angleB.updateAngle(Math.PI + angle13 + angleC, Math.PI - angle23);
    const t = this._triangle.transform.t() || new Point(0, 0);
    const p3Position = this._triangle.p3.add(t);
    this._angleA.setPosition(p3Position);
    this._angleB.setPosition(p3Position);
  }

  updatePoints() {
    const p1 = this._triangle._point1.transform.t();
    const p2 = this._triangle._point2.transform.t();
    const p3 = this._triangle._point3.transform.t();
    if (p1 != null && p2 != null && p3 != null) {
      this._triangle.updatePoints(p1, p2, p3);
    }
  }

  resetTrianglePoints() {
    this._triangle.setTriangleCollectionPositionTo(new Point(0, 0));
    this._triangle.setTriangleCollectionRotationTo(0);
    const tri = this._triangle;
    const points = [tri.p1, tri.p2, tri.p3];
    const maxY = points.reduce((maxYp, p) => (p.y > maxYp.y ? p : maxYp));
    const minX = points.reduce((minXp, p) => (p.x < minXp.x && p !== maxY ? p : minXp));
    const maxX = points.reduce((maxXp, p) => (p.x > maxXp.x && p !== maxY ? p : maxXp));
    tri.updatePoints(minX, maxX, maxY);
    this.updatePositions();
    this.diagram.animateNextFrame();
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('triangle', this.makeTri());
    this.addParallelLines();
    this.addAlternateAngles();
    this.addEquation();
    this.updatePositions();
    this.hasTouchableElements = true;
  }

  calculateParallelLineFuturePositions() {
    this.futurePositions = [];
    this.futurePositions.push({
      element: this._line1,
      scenario: { position: new Point(-2.5, this._triangle.p1.y) },
    });
    this.futurePositions.push({
      element: this._line2,
      scenario: { position: new Point(-2.5, this._triangle.p3.y) },
    });
  }

  calculateTriangleFuturePositions() {
    const tri = this._triangle;
    const center = tri.getCenter();
    const longestLine = tri.getLongestSide();
    // $FlowFixMe
    const line = tri.getSideLine(...longestLine);
    const width = line.length();
    const rotation = tri.getRotationToSide(...longestLine);
    tri.setTriangleCollectionPositionTo(center);
    tri.setTriangleCollectionRotationTo(rotation);

    const points = [tri.p1.x, tri.p2.x, tri.p3.x];
    const minX = Math.min(...points);
    const offset = -width / 2 - minX;

    this.futurePositions = [];
    this.futurePositions.push({
      element: this._triangle,
      scenario: {
        position: new Point(offset, -0.5),
        rotation: 0,
      },
    });
  }

  randomize(hideAngles: boolean = false) {
    this.calculateFuturePositions();
    let done = null;
    if (hideAngles) {
      this._triangle._angle1.hideAll();
      this._triangle._angle2.hideAll();
      this._triangle._angle3.hideAll();
      done = () => {
        this._triangle._angle1.showAll();
        this._triangle._angle2.showAll();
        this._triangle._angle3.showAll();
      };
    }
    this.moveToFuturePositions(1, done);
    this.diagram.animateNextFrame();
  }

  calculateFuturePositions() {
    this.futurePositions = [];
    const layout = this.layout.totalAngle;
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
