// @flow
import Fig from 'figureone';

import lessonLayout from '../common/layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollection from '../common/diagramCollectionCommon';
import CommonCollectionAAA from '../common/aaa';
import CommonCollectionSAS from '../common/sas';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: CommonCollection;
  _aaa: CommonCollectionAAA;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('aaa', new CommonCollectionAAA(diagram, this.layout));
    this.add('sas', new CommonCollectionSAS(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
