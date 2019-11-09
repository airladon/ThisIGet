// @flow
import Fig from 'figureone';
import type { TypeLabelledAngle, TypeLabelledLine } from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './layout';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  toggleIndex: number;
  _pgram: {
    _line: DiagramObjectPolyLine;
    _a1: TypeLabelledAngle;
    _a2: TypeLabelledAngle;
    _b1: { _curve1: DiagramElementPrimitive } & TypeLabelledAngle;
    _b2: { _curve1: DiagramElementPrimitive } & TypeLabelledAngle;
    _labelA1: TypeLabelledLine;
    _labelA2: TypeLabelledLine;
    _labelB1: TypeLabelledLine;
    _labelB2: TypeLabelledLine;
    _pMarkLeft: DiagramElementPrimitive;
    _pMarkTop: DiagramElementPrimitive;
    _pMarkRight: DiagramElementPrimitive;
    _pMarkBottom: DiagramElementPrimitive;
    _lMarkUp1: DiagramElementPrimitive;
    _lMarkUp2: DiagramElementPrimitive;
    _lMark21: DiagramElementPrimitive;
    _lMark22: DiagramElementPrimitive;
    _diag1: TypeLabelledLine;
    _diag2: TypeLabelledLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }
}
