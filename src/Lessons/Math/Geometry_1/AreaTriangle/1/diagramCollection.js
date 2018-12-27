// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import TriangleAreaCollection from '../common/diagramCollectionTri';
import SameAreaCollection from '../common/diagramCollectionSameArea';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _tri: TriangleAreaCollection;
  _same: SameAreaCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('tri', new TriangleAreaCollection(diagram, this.layout));
    this.add('same', new SameAreaCollection(diagram, this.layout));
  }
}
