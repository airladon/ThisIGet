// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonCollectionTri from './tri';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _tri: CommonCollectionTri;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('tri', new CommonCollectionTri(diagram, layout));
    this.hasTouchableElements = true;
  }
}
