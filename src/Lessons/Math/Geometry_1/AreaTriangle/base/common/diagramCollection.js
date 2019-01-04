// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class CommonLessonDiagramCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
  }
}
