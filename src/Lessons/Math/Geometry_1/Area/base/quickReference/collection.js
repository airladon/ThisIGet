// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
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
//   _side01: { _label: DiagramElementPrimative } & DiagramObjectLine;
//   _side12: { _label: DiagramElementPrimative } & DiagramObjectLine;
//   _side20: { _label: DiagramElementPrimative } & DiagramObjectLine;
//   _line: DiagramElementPrimative;
// } & DiagramObjectPolyLine;

export default class QRCollection extends CommonDiagramCollection {
  _measure: {
    _length: {
      _line: DiagramObjectLine;
      _measureLine: DiagramObjectLine;
      _label: DiagramElementPrimative;
      _grid: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _unitShape: {
    _circle: DiagramElementPrimative;
    _grid: DiagramElementPrimative;
    _genericGrid: DiagramElementPrimative;
    _circleGrid: DiagramElementPrimative;
  } & DiagramElementCollection;

  _shapes: {
    _circleLabel: DiagramElementPrimative;
    _squareLabel: DiagramElementPrimative;
    _triangleLabel: DiagramElementPrimative;
    _square: DiagramElementPrimative;
    _circle: DiagramElementPrimative;
    _triangle: DiagramElementPrimative;
    _triangleHtmlLabel: DiagramElementPrimative;
    _squareHtmlLabel: DiagramElementPrimative;
    _circleHtmlLabel: DiagramElementPrimative;
  } & DiagramElementCollection;

  _rectangle: {
    _row: DiagramElementPrimative;
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimative;
    _labelB: DiagramElementPrimative;
    _labelA: DiagramElementPrimative;
    _labelHeight: DiagramElementPrimative;
    _labelWidth: DiagramElementPrimative;
    _label6: DiagramElementPrimative;
    _label10: DiagramElementPrimative;
  } & DiagramElementCollection;

  _square: {
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimative;
    _labelB1: DiagramElementPrimative;
    _labelB2: DiagramElementPrimative;
  } & DiagramElementCollection;

  _eqn: Equation;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }
}
