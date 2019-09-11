// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
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
    _line: DiagramElementPrimative;
  } & DiagramObjectPolyLine;

  _correction: DiagramObjectPolyLine;

  _left: {
    _side01: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _angle0: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angle1: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angle2: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _angleEqual: DiagramObjectAngle;
    _angleBase: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _sideEqual: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideSplit: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideBase: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _line: DiagramElementPrimative;
  } & DiagramObjectPolyLine;

  _right: {
    _side01: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _angle0: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angle1: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angle2: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _angleEqual: DiagramObjectAngle;
    _angleBase: { _curve: DiagramElementPrimative } & DiagramObjectAngle;
    _sideEqual: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideSplit: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideBase: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _line: DiagramElementPrimative;
  } & DiagramObjectPolyLine;

  _split: {
    _label: DiagramElementCollection;
    _line: DiagramElementPrimative;
  } & DiagramObjectLine;

  lastOpposite: boolean;

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
    this._left._angleEqual = this._left._angle0;
    this._left._angleBase = this._left._angle2;
    this._right._angleTop = this._right._angle2;
    this._right._angleEqual = this._right._angle0;
    this._right._angleBase = this._right._angle1;
    this._left._sideEqual = this._left._side01;
    this._left._sideSplit = this._left._side12;
    this._left._sideBase = this._left._side20;
    this._right._sideEqual = this._right._side20;
    this._right._sideSplit = this._right._side12;
    this._right._sideBase = this._right._side01;
    this._left._angleBase.autoRightAngle = false;
    this._right._angleBase.autoRightAngle = false;
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
    this._triangle._angle1.showAll();
    this.animations.new()
      .trigger({
        callback: () => {
          this._split.grow(0, 0.8);
        },
        duration: 0.8,
      })
      .trigger({
        callback: () => {
          this._triangle._angle1.hide();
          this._left._angleTop.showAll();
          this._right._angleTop.showAll();
          this.pulseTopAngles();
        },
        duration: 1,
      })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  splitTriangle(done: ?() => void = null) {
    this.animations.cancelAll();
    this.setScenarios('combined');
    this.animations.new()
      .scenarios({ target: 'separate', duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  joinTriangles(done: ?() => void = null) {
    this.animations.cancelAll();
    this.setScenarios('separate');
    this._correction.hide();
    this.animations.new()
      .scenarios({ target: 'combined', duration: 1 })
      .whenFinished(() => {
        this._correction.showAll();
        if (done != null) {
          done();
        }
      })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseTopAngles() {
    this._left._angleTop.pulseScaleNow(1, 1.3);
    this._right._angleTop.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseEqualAngles(done: ?() => void = null) {
    this._triangle._angle0.pulseScaleNow(1, 1.3);
    this._triangle._angle2.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseL(done: ?() => void = null) {
    this._split._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseSplit(done: ?() => void = null) {
    this._split.pulseWidth({ done });
    this.diagram.animateNextFrame();
  }

  pulseLeftRightBaseLabel() {
    this._left._sideBase._label.pulseScaleNow(1, 1.7);
    this._right._sideBase._label.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  pulseLeftRightBaseAngles() {
    this._left._angleBase.pulseScaleNow(1, 1.3);
    this._right._angleBase.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseLeftRightEqualAngles() {
    this._left._angleEqual.pulseScaleNow(1, 1.3);
    this._right._angleEqual.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseLeftRightEqualSides(done: ?() => void = null) {
    this._left._sideEqual._label.pulseScaleNow(1, 2);
    this._right._sideEqual._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseRightAngle() {
    this._left._angleBase.autoRightAngle = true;
    this._right._angleBase.autoRightAngle = true;
    this._left._angleBase.update();
    this._right._angleBase.update();
    this.pulseLeftRightBaseAngles();
  }

  pulseRemainingLeftRightProperties(done: ?() => void = null) {
    this._left._angleEqual.pulseScaleNow(1, 1.3);
    this._right._angleEqual.pulseScaleNow(1, 1.3);
    this._left._angleBase.pulseScaleNow(1, 1.3);
    this._right._angleBase.pulseScaleNow(1, 1.3);
    this._left._sideBase._label.pulseScaleNow(1, 1.7);
    this._right._sideBase._label.pulseScaleNow(1, 1.7, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseRemainingLeftRightProperties2() {
    this._left._sideEqual._label.pulseScaleNow(1, 2);
    this._right._sideEqual._label.pulseScaleNow(1, 2);
    this._left._angleBase.pulseScaleNow(1, 1.3);
    this._right._angleBase.pulseScaleNow(1, 1.3);
    this._left._sideBase._label.pulseScaleNow(1, 1.7);
    this._right._sideBase._label.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  pulseOpposites() {
    if (this.lastOpposite) {
      this._triangle._side01._label.pulseScaleNow(1, 2.5);
      this._triangle._angle2.pulseScaleNow(1, 1.3);
    } else {
      this._triangle._side12._label.pulseScaleNow(1, 2.5);
      this._triangle._angle0.pulseScaleNow(1, 1.3);
    }
    this.lastOpposite = !this.lastOpposite;
    this.diagram.animateNextFrame();
  }
}
