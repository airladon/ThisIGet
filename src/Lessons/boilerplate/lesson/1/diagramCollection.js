// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';

import XCollection from '../common/diagramCollectionX';
import CommonLessonDiagramCollection from '../common/diagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _x: XCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('x', new XCollection(diagram, this.layout));
  }
}
