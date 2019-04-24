// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
// import {
//   Transform,
// } from '../../../../../../js/diagram/tools/g2';
// import {
//   DiagramElementPrimative,
// } from '../../../../../../js/diagram/Element';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative } = Fig;

export default class ShapesCollection extends CommonDiagramCollection {
  diagram: CommonLessonDiagram;
  _square1: DiagramElementPrimative;
  _square2: DiagramElementPrimative;
  _circle: DiagramElementPrimative;

  addFilledShapes() {
    const square1 = this.diagram.shapes.polygon({
      fill: true,
      sides: 4,
      radius: Math.sqrt(((this.layout.square1.sideLength / 2) ** 2) * 2),
      rotation: Math.PI / 4,
      color: this.layout.colors.square1,
      transform: new Transform('s1').translate(this.layout.square1.position),
    });
    this.add('square1', square1);

    const square2 = this.diagram.shapes.polygon({
      fill: true,
      sides: 4,
      radius: Math.sqrt(((this.layout.square2.sideLength / 2) ** 2) * 2),
      rotation: Math.PI / 4,
      color: this.layout.colors.square2,
      transform: new Transform('s2').translate(this.layout.square2.position),
    });
    this.add('square2', square2);

    const circle = this.diagram.shapes.polygon({
      fill: true,
      sides: this.layout.circle.numSides,
      radius: this.layout.circle.radius,
      color: this.layout.colors.circle,
      transform: new Transform('c').translate(this.layout.circle.position),
    });
    this.add('circle', circle);
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addFilledShapes();
    this.setPosition(this.layout.shapesPosition);
  }
}
