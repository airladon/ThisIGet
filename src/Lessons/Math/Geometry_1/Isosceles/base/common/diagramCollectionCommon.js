// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine, DiagramObjectPolyLine,
  Transform,
  // EquationLabel,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _triangle: {
    _side01: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
  } & DiagramObjectPolyLine;

  _left: {
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _sideEqual: DiagramObjectLine;
    _sideSplit: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _right: {
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _sideEqual: DiagramObjectLine;
    _sideSplit: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _split: { _label: DiagramElementCollection; } & DiagramObjectLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._left._angleTop = this._left._angle1;
    this._right._angleTop = this._right._angle2;
    this._left._sideEqual = this._left._side01;
    this._right._sideEqual = this._right._side20;
    this._right._sideSplit = this._right._side12;
    this._left._sideSplit = this._left._side12;
  }

  pulseEqualSides() {
    this._triangle._side01._label.pulseScaleNow(1, 2);
    this._triangle._side12._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  growSplit(done: ?() => void = null) {
    this.animations.cancelAll();
    this._left._angleTop.hide();
    this._right._angleTop.hide();
    this._split._label.hide();
    this.animations.new()
      .trigger({
        callback: () => {
          this._split.grow(0, 0.8);
        },
        duration: 0.8,
      })
      .trigger({
        callback: () => {
          this._left._angleTop.showAll();
          this._right._angleTop.showAll();
          this.pulseTopAngles();
        },
        duration: 0.5,
      })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  splitTriangle(done: ?() => void = null) {
    this.animations.cancelAll();
    this.animations.new()
      .scenarios({ target: 'separate', duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseTopAngles() {
    this._left._angleTop.pulseScaleNow(1, 1.5);
    this._right._angleTop.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseL() {
    this._split._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
