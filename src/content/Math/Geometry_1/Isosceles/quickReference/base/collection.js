// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
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
    _line: DiagramElementPrimitive;
  } & DiagramObjectPolyLine;

  _correction: DiagramObjectPolyLine;

  _left: {
    _side01: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _angle0: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle1: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle2: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _angleEqual: DiagramObjectAngle;
    _angleBase: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _sideEqual: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideSplit: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideBase: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _line: DiagramElementPrimitive;
  } & DiagramObjectPolyLine;

  _right: {
    _side01: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side12: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _side20: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _angle0: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle1: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle2: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _angleTop: DiagramObjectAngle;
    _angleEqual: DiagramObjectAngle;
    _angleBase: { _curve: DiagramElementPrimitive } & DiagramObjectAngle;
    _sideEqual: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideSplit: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _sideBase: { _label: DiagramElementCollection; } & DiagramObjectLine;
    _line: DiagramElementPrimitive;
  } & DiagramObjectPolyLine;

  _split: {
    _label: DiagramElementCollection;
    _line: DiagramElementPrimitive;
  } & DiagramObjectLine;

  lastOpposite: boolean;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
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
