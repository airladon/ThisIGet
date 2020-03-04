// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;


export default class CommonCollection extends CommonDiagramCollection {
  _tri: {
    _1A: { _label: Equation } & DiagramObjectLine;
    _2A: { _label: Equation } & DiagramObjectLine;
    _r3A: { _label: Equation } & DiagramObjectLine;
    _1: { _label: Equation } & DiagramObjectLine;
    _2: { _label: Equation } & DiagramObjectLine;
    _r3: { _label: Equation } & DiagramObjectLine;
    _a30: DiagramObjectAngle;
    _a60: DiagramObjectAngle;
    _a90: DiagramObjectAngle;
    _line: DiagramObjectPolyLine;
  } & DiagramElementCollection;

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
