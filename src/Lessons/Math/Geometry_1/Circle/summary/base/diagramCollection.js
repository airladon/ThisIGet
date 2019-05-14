// @flow
import Fig from 'figureone';

import lessonLayout from '../../explanation/base/layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollectionCircle from '../../explanation/base/dcCircle';
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
