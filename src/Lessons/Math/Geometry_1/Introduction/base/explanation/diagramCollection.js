// @flow
import Fig from 'figureone';

import lessonLayout from '../common/layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollection from '../common/diagramCollectionCommon';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _circles: CommonCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('circles', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
