// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class QRCollection extends CommonDiagramCollection {
  _markings: {
    _l1: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _l2: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
  }
}
