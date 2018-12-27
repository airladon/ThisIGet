// @flow
import Fig from 'figureone';
// import { Transform } from '../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';

import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

// import TriangleCollection from '../common/diagramCollectionTriangle';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import TotalAngleTriangleCollection from '../common/diagramCollectionTotalAngleTriangle';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _triangle: TotalAngleTriangleCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform('1 DiagramCollection'),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('triangle', new TotalAngleTriangleCollection(diagram, this.layout));
  }
}
