// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonCollection from './diagramCollectionCommon';
import CommonCollectionTwoProp from './twoProperties';
import CommonCollectionSAS from './sas';
import CommonCollectionSSA from './ssa';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: CommonCollection;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('twoProp', new CommonCollectionTwoProp(diagram));
    this.add('sas', new CommonCollectionSAS(diagram));
    this.add('ssa', new CommonCollectionSSA(diagram));
    this.hasTouchableElements = true;
  }
}
