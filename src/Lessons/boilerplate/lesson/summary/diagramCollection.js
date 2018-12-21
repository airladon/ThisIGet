// @flow
import { Transform } from '../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';

// import ParallelCollection from '../common/diagramCollectionParallel';
import CommonLessonDiagramCollection from '../common/diagramCollection';

export default class DiagramCollection extends CommonLessonDiagramCollection {
  // _parallel: ParallelCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    // this.add('parallel', new ParallelCollection(diagram, this.layout));
  }
}
