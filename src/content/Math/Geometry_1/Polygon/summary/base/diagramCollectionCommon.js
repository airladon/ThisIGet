// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
  // Point,
} = Fig;

// const {
//   getBoundingRect
// } = Fig.tools.g2;

type TypeRegularPoly = {
  poly: DiagramObjectPolyLine;
  sides: DiagramElementPrimitive;
  sidesLabel: DiagramElementPrimitive;
  angle: DiagramElementPrimitive;
  angleLabel: DiagramElementPrimitive;
  angle: DiagramElementPrimitive;
  angleLabel: DiagramElementPrimitive;
  tot: DiagramElementPrimitive;
  totAngleLabel: DiagramElementPrimitive;
} & DiagramElementCollection;

export default class CommonCollection extends CommonDiagramCollection {
  _eqnTot: Equation;
  _p3: TypeRegularPoly;
  _p4: TypeRegularPoly;
  _p5: TypeRegularPoly;
  _p6: TypeRegularPoly;
  _p7: TypeRegularPoly;
  _p8: TypeRegularPoly;
  _p9: TypeRegularPoly;
  _p10: TypeRegularPoly;
  _poly0: DiagramObjectPolyLine;
  _poly1: DiagramObjectPolyLine;
  _poly2: DiagramObjectPolyLine;

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
