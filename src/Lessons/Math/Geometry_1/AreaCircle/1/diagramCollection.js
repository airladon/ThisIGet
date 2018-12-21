// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import CircleAreaCollection from '../common/diagramCollectionCircleArea';
import CommonLessonDiagramCollection from '../common/diagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  circ: CircleAreaCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('circ', new CircleAreaCollection(diagram, this.layout));
  }
}
