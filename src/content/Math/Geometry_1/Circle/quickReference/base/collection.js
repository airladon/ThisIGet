// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectLine,
  DiagramElementCollection,
  Equation,
  // DiagramObjectAngle,
  Transform,
} = Fig;

// const { spaceToSpaceTransform } = Fig.tools.g2;
// const { round } = Fig.tools.math;

type TypeEquationElements = {
  _diameter: DiagramElementPrimitive;
  _equals: DiagramElementPrimitive;
  __2: DiagramElementPrimitive;
  _radius: DiagramElementPrimitive;
  _pi: DiagramElementPrimitive;
  _circumference: DiagramElementPrimitive;
  _v: DiagramElementPrimitive;
  _equals: DiagramElementPrimitive;
} & Equation;

export default class CommonCollectionCircle extends CommonDiagramCollection {
  percentStraight: number;
  straightening: boolean;
  containToGrid: boolean;
  _locationText: DiagramElementPrimitive;
  _circumferenceText: DiagramElementPrimitive;
  _diameterText: DiagramElementPrimitive;
  _radiusText: DiagramElementPrimitive;
  _grid: DiagramElementPrimitive;
  _circle: {
    _center: DiagramElementPrimitive;
    _line: DiagramElementPrimitive;
    _arc: DiagramElementPrimitive;
    _diameter: DiagramObjectLine;
    _radius: DiagramObjectLine;
    _scale: DiagramElementPrimitive;
    _translate: DiagramElementPrimitive;
    _circumference: {
      _leftArc: DiagramElementPrimitive;
      _rightArc: DiagramElementPrimitive;
      _leftLine: DiagramObjectLine;
      _rightLine: DiagramObjectLine;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _eqnDiameterRadius: TypeEquationElements;
  _eqnCircumferenceDiameter: TypeEquationElements;
  _eqnCircumferenceRadius: TypeEquationElements;
  _eqnDiameterCircumference: TypeEquationElements;
  _eqnRadiusDiameter: TypeEquationElements;
  _eqnRadiusCircumference: TypeEquationElements;

  _diameterLines: {
    _line0: DiagramObjectLine;
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Collection').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addCircleElements);
    this.hasTouchableElements = true;
    this.scenarios = layout.circleScenarios;
    this.setScenario('center');
  }

  pushRadiusRandom() {
    const r = Math.random() * Math.PI + Math.PI / 2;
    this.pushRadius(this._circle._radius.getRotation() + r);
  }

  pushRadius(toAngle: ?number) {
    const r = this._circle._radius.getRotation();
    let target = r + 1;
    if (toAngle != null) {
      target = toAngle;
    }
    this.stop(true, false);
    this._circle._radius.animations.new()
      .rotation({ target, duration: 1, direction: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pushDiameterRandom() {
    const r = Math.random() * Math.PI / 2 + Math.PI / 4;
    this.pushDiameter(this._circle._diameter.getRotation() + r);
  }

  pushDiameter(toAngle: ?number) {
    const r = this._circle._diameter.getRotation();
    let target = r + 1;
    if (toAngle != null) {
      target = toAngle;
    }
    this.stop(true, false);
    this._circle._diameter.animations.new()
      .rotation({ target, duration: 1, direction: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseCenter() {
    this._circle._center.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._radius.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseDiameter() {
    this._circle._diameter.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseCircle() {
    this._circle._line.pulseThickNow(1, 1.04, 5);
    this.diagram.animateNextFrame();
  }

  resetDiameterAndRadius() {
    this._circle._radius.setRotation(0.5);
    this._circle._diameter.setRotation(0);
    this._circle._diameter.setPosition(0, 0);
    this.diagram.animateNextFrame();
  }
}
