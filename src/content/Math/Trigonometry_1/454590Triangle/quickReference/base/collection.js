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
    _A1: { _label: Equation } & DiagramObjectLine;
    _A2: { _label: Equation } & DiagramObjectLine;
    _Ar2: { _label: Equation } & DiagramObjectLine;
    _1: { _label: Equation } & DiagramObjectLine;
    _2: { _label: Equation } & DiagramObjectLine;
    _r2: { _label: Equation } & DiagramObjectLine;
    _451: DiagramObjectAngle;
    _452: DiagramObjectAngle;
    _right: DiagramObjectAngle;
    _line: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
  }
}
