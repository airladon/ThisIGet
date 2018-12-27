// @flow
import Fig from 'figureone';

import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class CommonLessonDiagramCollection extends CommonDiagramCollection {
  diagram: CommonLessonDiagram;
  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
  }
}
