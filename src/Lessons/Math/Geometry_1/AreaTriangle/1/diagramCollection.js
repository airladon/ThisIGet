// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import TriangleAreaCollection from '../common/diagramCollectionTri';
import SameAreaCollection from '../common/diagramCollectionSameArea';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _tri: TriangleAreaCollection;
  _same: SameAreaCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('tri', new TriangleAreaCollection(diagram, this.layout));
    this.add('same', new SameAreaCollection(diagram, this.layout));
  }
}
