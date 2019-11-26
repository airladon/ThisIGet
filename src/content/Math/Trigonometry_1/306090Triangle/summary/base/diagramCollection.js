// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
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

export default class DiagramCollection extends CommonDiagramCollection {
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
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
  }
}
