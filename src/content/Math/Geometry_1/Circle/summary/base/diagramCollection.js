// @flow
import Fig from 'figureone';

import diagramLayout from '../../explanation/base/layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonCollectionCircle from '../../explanation/base/dcCircle';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _circle: CommonCollectionCircle;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('circle', new CommonCollectionCircle(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
