// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
// import CommonCollection from './diagramCollectionCommon';
import CommonCollectionSSS from './sss';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  // _collection: CommonCollection;
  _sss: CommonCollectionSSS;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    // this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('sss', new CommonCollectionSSS(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
