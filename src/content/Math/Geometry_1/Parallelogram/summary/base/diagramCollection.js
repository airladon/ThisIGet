// @flow
import Fig from 'figureone';
import type { TypeLabelledAngle, TypeLabelledLine } from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './layout';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
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
    _b21: { _curve1: DiagramElementPrimitive } & TypeLabelledAngle;
    _b21: { _curve1: DiagramElementPrimitive } & TypeLabelledAngle;
    _c1: TypeLabelledAngle;
    _c2: TypeLabelledAngle;
    _d1: TypeLabelledAngle;
    _d2: TypeLabelledAngle;
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
    _v1: DiagramObjectLine;
    _v2: DiagramObjectLine;
    _right1: DiagramObjectAngle;
    _right2: DiagramObjectAngle;
    _rect: DiagramElementPrimitive;
    _tri1: DiagramElementPrimitive;
    _tri2: DiagramElementPrimitive;
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
