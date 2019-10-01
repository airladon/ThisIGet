// @flow
import Fig from 'figureone';

import diagramLayout from '../../explanation/base/layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonCollectionOpposite from '../../explanation/base/diagramCollectionCommonOpposite';
import CommonCollectionThreeLines from '../../explanation/base/diagramCollectionCommonThreeLines';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _opposite: CommonCollectionOpposite;
  _threeLines: CommonCollectionThreeLines;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('opposite', new CommonCollectionOpposite(diagram, this.layout));
    this.add('threeLines', new CommonCollectionThreeLines(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
