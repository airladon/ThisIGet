// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimitive;
    _marks12: DiagramElementPrimitive;
    _marks20: DiagramElementPrimitive;
    _marks50: DiagramElementPrimitive;
    _marks100: DiagramElementPrimitive;
    _marks12Long: DiagramElementPrimitive;
    _degrees: {
      _marks36: DiagramElementPrimitive;
      _marks360: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimitive;
      _value: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  marks: number;
  decimals: number;
  units: string;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);

    this.decimals = 1;
    this.marks = 12;
    this._circle._angleText._label.onClick = this.pulseAngle.bind(this);
    this._circle._angleText._label.makeTouchable();
  }

  setAngleTextProperties(marks: number, decimals: number, units: string) {
    this.marks = marks;
    this.decimals = decimals;
    this.units = units;
  }

  setAngleMarks(
  ) {
    this.setAngleTextProperties(360, 0, 'º');
    this._circle._degrees.showAll();
    this.updateAngle();
    this.diagram.animateNextFrame();
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    if (this._circle._angle.isShown) {
      this._circle._angle.setAngle({ angle: r });
    }
    // if (this._circle._arc.isShown) {
    //   this._circle._arc.setAngleToDraw(r + 0.01);
    // }
    if (this._circle._angleText.isShown) {
      const text = `${round(r * this.marks / Math.PI / 2, this.decimals).toFixed(this.decimals)} ${this.units}`;
      this._circle._angleText._value.drawingObject.setText(text);
    }
  }

  pushLine(
    toAngle: ?number = null,
    direction: number = 0,
    duration: number = 2,
    whenFinished: ?() => void = null,
  ) {
    let r = toAngle;
    if (toAngle != null
      && round(toAngle, 5) === round(this._circle._line1.getRotation('0to360'), 5)
      && this._circle._angle.isShown === true) {
      this._circle._line1.stop(true, false);
      this._circle._angle.pulseScaleNow(1, 1.3);
      this.diagram.animateNextFrame();
      if (whenFinished != null) {
        whenFinished();
      }
      return;
    }
    if (toAngle == null) {
      r = rand(Math.PI / 2) + Math.PI / 2 + this._circle._line1.getRotation('0to360');
    }
    this._circle._line1.stop(true, false);
    this._circle._line1.animations.new()
      .rotation({ target: r, duration, direction })
      .whenFinished(whenFinished)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._circle._angle.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseDegrees() {
    const element = this._circle._degrees;
    element.pulseScaleNow(1, 1.1);
    this.diagram.animateNextFrame();
  }

  pulseLines() {
    this._circle._line1.pulseWidth();
    this._circle._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseAngleText() {
    this._circle._angleText.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }
}
