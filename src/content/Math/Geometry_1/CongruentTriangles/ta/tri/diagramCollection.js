// @flow
import Fig from 'figureone';

import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollectionTri from './tri';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _tri: CommonCollectionTri;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('tri', new CommonCollectionTri(diagram, layout));
    this.hasTouchableElements = true;
  }
}
