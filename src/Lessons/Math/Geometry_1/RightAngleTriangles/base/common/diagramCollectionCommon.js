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
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _main: {
      _tri: {
        _side01: DiagramObjectLine;
        _side12: DiagramObjectLine;
        _side20: DiagramObjectLine;
        _angle0: DiagramObjectAngle;
        _angle1: DiagramObjectAngle;
        _angle2: DiagramObjectAngle;
        _line: DiagramElementPrimative;
      } & DiagramObjectPolyLine;
      _height: {
        _angle: DiagramObjectAngle;
        _line: DiagramObjectLine;
      } & DiagramElementCollection;
      _heightB: DiagramObjectLine;
      _baseA: DiagramObjectLine;
      _base: DiagramObjectLine;
    } & DiagramElementCollection;
    _pythagorusSquare: {
      _bottomLeft: DiagramObjectPolyLine;
      _bottomRight: DiagramObjectPolyLine;
      _topLeft: DiagramObjectPolyLine;
      _topRight: DiagramObjectPolyLine;
    } & DiagramElementCollection
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._1.eqn.formRestartPosition = this._0Eqn;
    this._2.eqn.formRestartPosition = this._1Eqn;
    this._3.eqn.formRestartPosition = this._2Eqn;
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
}
