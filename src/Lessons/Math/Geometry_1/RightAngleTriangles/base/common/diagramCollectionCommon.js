// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  EqnNavigator,
  Transform,
} = Fig;

type fullTriangle = {
        _side01: { _label: DiagramElementPrimative } & DiagramObjectLine;
        _side12: { _label: DiagramElementPrimative } & DiagramObjectLine;
        _side20: { _label: DiagramElementPrimative } & DiagramObjectLine;
        _angle0: DiagramObjectAngle;
        _angle1: DiagramObjectAngle;
        _angle2: DiagramObjectAngle;
        _line: DiagramElementPrimative;
} & DiagramObjectPolyLine;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _main: {
      _tri: fullTriangle;
      _height: {
        _angle: DiagramObjectAngle;
        _line: DiagramObjectLine;
      } & DiagramElementCollection;
      _heightB: DiagramObjectLine;
      _baseA: DiagramObjectLine;
      _base: DiagramObjectLine;
      _opposite: DiagramObjectLine;
      _vertex: DiagramElementPrimative;
      _leftSide: DiagramObjectLine;
      _rightSide: DiagramObjectLine;
    } & DiagramElementCollection;
    _pythagorusSquare: {
      _bottomLeft: fullTriangle;
      _bottomRight: fullTriangle;
      _topLeft: fullTriangle;
      _topRight: fullTriangle;
      _largeSquare: DiagramElementPrimative;
      _smallSquare: DiagramElementPrimative;
      _vertex1: DiagramElementPrimative;
      _vertex2: DiagramElementPrimative;
      _vertex3: DiagramElementPrimative;
      _vertex4: DiagramElementPrimative;
      _largeSquareArea: DiagramElementPrimative;
      _smallSquareArea: DiagramElementPrimative;
      _bottomLeftArea: DiagramElementPrimative;
      _bottomRightArea: DiagramElementPrimative;
      _topLeftArea: DiagramElementPrimative;
      _topRightArea: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _0Eqn: Equation;
  _1Eqn: Equation;
  _2Eqn: Equation;
  _3Eqn: Equation;
  _0: EqnNavigator;
  _1: EqnNavigator;
  _2: EqnNavigator;
  _3: EqnNavigator;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._1Eqn.eqn.formRestart = { pulse: { element: this._0Eqn, duration: 1, scale: 1.1 } };
    this._2Eqn.eqn.formRestart = { pulse: { element: this._1Eqn, duration: 1, scale: 1.1 } };
    this._3Eqn.eqn.formRestart = { pulse: { element: this._2Eqn, duration: 1, scale: 1.1 } };
  }

  updateMainLabels() {
    const r = this._fig._main.getRotation();
    this._fig._main._tri.updateLabels();
    this._fig._main._height._line.updateLabel(r);
    this._fig._main._heightB.updateLabel(r);
    this._fig._main._base.updateLabel(r);
    this._fig._main._baseA.updateLabel(r);
  }

  updatePythagorusSquareLabels() {
    this._fig._pythagorusSquare._bottomLeft.updateLabels();
    this._fig._pythagorusSquare._bottomRight.updateLabels();
    this._fig._pythagorusSquare._topLeft.updateLabels();
    this._fig._pythagorusSquare._topRight.updateLabels();
  }

  pulseRightAngle() {
    this._fig._main._tri._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseBottomLeftRightAngle() {
    this._fig._pythagorusSquare._bottomLeft._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseNonRightAngles() {
    this._fig._main._tri._angle0.pulseScaleNow(1, 1.5);
    this._fig._main._tri._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseOpposite() {
    this._fig._main._opposite.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseBottomLeftOpposite() {
    this._fig._pythagorusSquare._bottomLeft._side20.pulseWidth({ label: 2 });
    this.diagram.animateNextFrame();
  }

  pulseBase() {
    this._fig._main._base.pulseWidth({ line: 8, label: 2 });
    this.diagram.animateNextFrame();
  }

  pulsePerpendicularSides(done: ?() => void = null) {
    this._fig._main._leftSide.pulseWidth({ line: 6, done });
    this._fig._main._rightSide.pulseWidth({ line: 6 });
    this.diagram.animateNextFrame();
  }

  pulseHeight() {
    this._fig._main._height._line.pulseWidth({ line: 6, label: 2 });
    this.diagram.animateNextFrame();
  }

  pulseVertex() {
    this._fig._main._vertex.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseSideLengths() {
    this._fig._pythagorusSquare._topLeft._side01._label.pulseScaleNow(1, 1.7);
    this._fig._pythagorusSquare._topLeft._side12._label.pulseScaleNow(1, 1.7);
    this._fig._pythagorusSquare._topLeft._side20._label.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  pulseLargeSquare(done: ?() => void = null) {
    this._fig._pythagorusSquare._largeSquare.pulseThickNow(1, 1.03, 11, done);
    this.diagram.animateNextFrame();
  }

  pulseSmallSquare() {
    this._fig._pythagorusSquare._smallSquare.pulseThickNow(1, 1.03, 11);
    this.diagram.animateNextFrame();
  }

  pulseTriangleAngles(done: ?() => void = null) {
    this._fig._pythagorusSquare._topLeft._angle0.pulseScaleNow(1, 2, 0, done);
    this._fig._pythagorusSquare._topLeft._angle2.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._topRight._angle0.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._topRight._angle2.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._bottomLeft._angle0.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._bottomLeft._angle2.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._bottomRight._angle0.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._bottomRight._angle2.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseVertices() {
    this._fig._pythagorusSquare._vertex1.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._vertex2.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._vertex3.pulseScaleNow(1, 2);
    this._fig._pythagorusSquare._vertex4.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  hideAreas() {
    this._fig._pythagorusSquare._largeSquareArea.hide();
    this._fig._pythagorusSquare._smallSquareArea.hide();
    this._fig._pythagorusSquare._bottomLeftArea.hide();
    this._fig._pythagorusSquare._bottomRightArea.hide();
    this._fig._pythagorusSquare._topLeftArea.hide();
    this._fig._pythagorusSquare._topRightArea.hide();
  }

  showLargeSquareArea() {
    this.hideAreas();
    this._fig._pythagorusSquare._largeSquareArea.show();
    this.diagram.animateNextFrame();
  }

  showSmallSquareArea() {
    this.hideAreas();
    this._fig._pythagorusSquare._smallSquareArea.show();
    this.diagram.animateNextFrame();
  }

  showTriangleAreas() {
    this.hideAreas();
    this._fig._pythagorusSquare._bottomLeftArea.show();
    this._fig._pythagorusSquare._bottomRightArea.show();
    this._fig._pythagorusSquare._topLeftArea.show();
    this._fig._pythagorusSquare._topRightArea.show();
    this.diagram.animateNextFrame();
  }

  pulseEquation3() {
    this._3Eqn.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }
}
