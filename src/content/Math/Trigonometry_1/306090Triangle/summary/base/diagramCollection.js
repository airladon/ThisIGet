// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
  }
}
