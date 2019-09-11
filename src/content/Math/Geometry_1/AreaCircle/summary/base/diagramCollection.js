// @flow
import Fig from 'figureone';

import lessonLayout from '../../explanation/base/layout';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonCollection from '../../explanation/base/diagramCollectionCommon';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: CommonCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
