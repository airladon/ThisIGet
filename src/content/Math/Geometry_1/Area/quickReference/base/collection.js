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
  Equation,
  Transform,
} = Fig;

// type TypeFullPolyLine = {
//   _angle0: DiagramObjectAngle;
//   _angle1: DiagramObjectAngle;
//   _angle2: DiagramObjectAngle;
//   _side01: { _label: DiagramElementPrimitive } & DiagramObjectLine;
//   _side12: { _label: DiagramElementPrimitive } & DiagramObjectLine;
//   _side20: { _label: DiagramElementPrimitive } & DiagramObjectLine;
//   _line: DiagramElementPrimitive;
// } & DiagramObjectPolyLine;

export default class QRCollection extends CommonDiagramCollection {
  _measure: {
    _length: {
      _line: DiagramObjectLine;
      _measureLine: DiagramObjectLine;
      _label: DiagramElementPrimitive;
      _grid: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _unitShape: {
    _circle: DiagramElementPrimitive;
    _grid: DiagramElementPrimitive;
    _genericGrid: DiagramElementPrimitive;
    _circleGrid: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _shapes: {
    _circleLabel: DiagramElementPrimitive;
    _squareLabel: DiagramElementPrimitive;
    _triangleLabel: DiagramElementPrimitive;
    _square: DiagramElementPrimitive;
    _circle: DiagramElementPrimitive;
    _triangle: DiagramElementPrimitive;
    _triangleHtmlLabel: DiagramElementPrimitive;
    _squareHtmlLabel: DiagramElementPrimitive;
    _circleHtmlLabel: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _rectangle: {
    _row: DiagramElementPrimitive;
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimitive;
    _labelB: DiagramElementPrimitive;
    _labelA: DiagramElementPrimitive;
    _labelHeight: DiagramElementPrimitive;
    _labelWidth: DiagramElementPrimitive;
    _label6: DiagramElementPrimitive;
    _label10: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _square: {
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimitive;
    _labelB1: DiagramElementPrimitive;
    _labelB2: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _areaSquare: Equation;
  _areaCircle: Equation;
  _areaTriangle: Equation;

  _eqn: Equation;

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
