// @flow
import Fig from 'figureone';

import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollection from './diagramCollectionCommon';
import CommonCollectionSAS from './sas';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: CommonCollection;
  _sas: CommonCollectionSAS;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('sas', new CommonCollectionSAS(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
