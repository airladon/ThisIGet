// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import ParallelCollection from '../common/diagramCollectionParallel';
import CommonLessonDiagramCollection from '../common/diagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _parallel: ParallelCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('parallel', new ParallelCollection(diagram, this.layout));
  }
}
