// @flow
import Fig from 'figureone';

import lessonLayout from '../common/layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollectionCircle from '../common/dcCircle';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _circle: CommonCollectionCircle;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('circle', new CommonCollectionCircle(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
