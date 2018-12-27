// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import TriangleAreaCollection from '../common/diagramCollectionTri';
import CommonLessonDiagramCollection from '../common/diagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _tri: TriangleAreaCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('tri', new TriangleAreaCollection(diagram, this.layout));
  }
}
