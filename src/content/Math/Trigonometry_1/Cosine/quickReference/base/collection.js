// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    // this.hasTouchableElements = true;
  }
}
