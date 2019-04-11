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
export default class TriangleExamplesCollection extends CommonDiagramCollection {
  _tri1: DiagramElementPrimative;
  _tri2: DiagramElementPrimative;
  _tri3: DiagramElementPrimative;

  makeTriangle(name: string) {
    const tri = this.layout.examples[name];

    const line = this.diagram.shapes.polyLineLegacy(
      tri.points, true,
      this.layout.examples.lineWidth, this.layout.colors.line,
      'onSharpAnglesOnly',
      new Transform().rotate(0).translate(0),
    );
    return line;
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.add('tri1', this.makeTriangle('tri1'));
    this.add('tri2', this.makeTriangle('tri2'));
    this.add('tri3', this.makeTriangle('tri3'));

    this.hasTouchableElements = true;
  }
}
