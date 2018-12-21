// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
// import {
//   Transform,
// } from '../../../../../js/diagram/tools/g2';
// import {
//   DiagramElementPrimative,
// } from '../../../../../js/diagram/Element';

import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

// import type { TypeLine } from '../../../../../js/diagram/DiagramObjects/Line';

import makeTriangle from '../../../../LessonsCommon/tools/triangle';
import type {
  TypeTriangle, TypeTriangleAngle,
} from '../../../../LessonsCommon/tools/triangle';

const { Transform, DiagramElementPrimative, DiagramObjectLine } = Fig;

export default class TrianglePropertiesCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _triangle: {
    _dimension12: DiagramObjectLine;
    _dimension23: DiagramObjectLine;
    _dimension31: DiagramObjectLine;
    _point1: DiagramElementPrimative;
    _point2: DiagramElementPrimative;
    _point3: DiagramElementPrimative;
  } & TypeTriangle & TypeTriangleAngle;

  makeTriangleWithDimensions() {
    const layout = this.layout.properties;

    const triangle = makeTriangle(
      this.diagram,
      layout.triangle.points[0],
      layout.triangle.points[1],
      layout.triangle.points[2],
      layout.lineWidth,
      this.layout.colors.line,
    );
    // triangle.setPosition(layout.triangle.position);

    const a = layout.angle;
    const aColor = this.layout.colors.angle;
    triangle.addAngle(1, a.radius, a.lineWidth, a.sides, aColor);
    triangle.addAngle(2, a.radius, a.lineWidth, a.sides, aColor);
    triangle.addAngle(3, a.radius, a.lineWidth, a.sides, aColor);

    const d = layout.dimension;
    const dColor = this.layout.colors.dimensions;
    const dim12 = triangle.addSideDimension(1, 2, dColor, d.offset, true, d.lineWidth);
    dim12.addLabel('AB', d.labelOffset, 'outside', 'left', 'baseUpright', 0.5);
    dim12.addArrow1(d.arrowWidth, d.arrowHeight);
    dim12.addArrow2(d.arrowWidth, d.arrowHeight);

    const dim23 = triangle.addSideDimension(2, 3, dColor, d.offset, true, d.lineWidth);
    dim23.addLabel('BC', d.labelOffset, 'outside', 'left', 'baseUpright', 0.5);
    dim23.addArrow1(d.arrowWidth, d.arrowHeight);
    dim23.addArrow2(d.arrowWidth, d.arrowHeight);

    const dim31 = triangle.addSideDimension(3, 1, dColor, d.offset, true, d.lineWidth);
    dim31.addLabel('CA', d.labelOffset, 'outside', 'left', 'horizontal', 0.5);
    dim31.addArrow1(d.arrowWidth, d.arrowHeight);
    dim31.addArrow2(d.arrowWidth, d.arrowHeight);

    const { boundary } = layout;
    triangle.addPoint(1, 0.3, this.layout.colors.diagram.background, true, boundary);
    triangle.addPoint(2, 0.3, this.layout.colors.diagram.background, true, boundary);
    triangle.addPoint(3, 0.3, this.layout.colors.diagram.background, true, boundary);

    triangle.hasTouchableElements = true;
    triangle.autoShowAngles = true;
    return triangle;
  }

  growDimensions() {
    this._triangle._dimension12.grow(0.2, 1.5, true);
    this._triangle._dimension23.grow(0.2, 1.5, true);
    this._triangle._dimension31.grow(0.2, 1.5, true);
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    this._triangle._angle1.pulseScaleNow(1, 1.5);
    this._triangle._angle2.pulseScaleNow(1, 1.5);
    this._triangle._angle3.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.add('triangle', this.makeTriangleWithDimensions());
    this.hasTouchableElements = true;
  }

  calculateFuturePositions() {
    this.futurePositions = [];
    const { points } = this.layout.properties.triangle;
    const elements = [
      this._triangle._point1,
      this._triangle._point2,
      this._triangle._point3,
    ];
    points.forEach((p, index) => {
      this.futurePositions.push({
        element: elements[index],
        scenario: {
          position: p,
          rotation: 0,
        },
      });
    });
  }
}
