// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimative;
    _marks12: DiagramElementPrimative;
    _marks20: DiagramElementPrimative;
    _marks50: DiagramElementPrimative;
    _marks100: DiagramElementPrimative;
    _marks12Long: DiagramElementPrimative;
    _degrees: {
      _marks36: DiagramElementPrimative;
      _marks360: DiagramElementPrimative;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimative;
      _value: DiagramElementPrimative;
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

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    if (this._circle._angle.isShown) {
      this._circle._angle.setAngle({ angle: r });
    }
    if (this._circle._arc.isShown) {
      this._circle._arc.setAngleToDraw(r + 0.01);
    }
    if (this._circle._angleText.isShown) {
      const text = `${round(r * this.marks / Math.PI / 2, this.decimals).toFixed(this.decimals)} ${this.units}`;
      this._circle._angleText._value.drawingObject.setText(text);
    }
  }

  setAngleTextProperties(marks: number, decimals: number, units: string) {
    this.marks = marks;
    this.decimals = decimals;
    this.units = units;
  }

  setAngleMarks(
    marks: 12 | 20 | 50 | 100 | '12Long' | 'degrees' = 'degrees',
    pulseIfSame: boolean = false,
  ) {
    if (pulseIfSame && marks === this.marks) {
      this._circle[`_marks${marks}`].pulseScaleNow(1, 1.2);
      this.diagram.animateNextFrame();
      return;
    }
    this._circle._marks12.hide();
    this._circle._marks12Long.hide();
    this._circle._marks20.hide();
    this._circle._marks50.hide();
    this._circle._marks100.hide();
    this._circle._degrees.hide();
    if (marks === 'degrees') {
      this.setAngleTextProperties(360, 0, 'º');
      this._circle._degrees.showAll();
    } else if (marks === '12Long') {
      this.setAngleTextProperties(12, 1, 'portions');
      this._circle._marks12Long.showAll();
    } else {
      this.setAngleTextProperties(marks, 1, 'portions');
      this._circle[`_marks${marks}`].showAll();
    }
    this.updateAngle();
    this.diagram.animateNextFrame();
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

  pulseRadius() {
    this._circle._line1.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseArc() {
    this._circle._arc.pulseThickNow(1, 1.03, 5);
    this.diagram.animateNextFrame();
  }

  pulseMarks(id: number) {
    const element = this._circle[`_marks${id}`];
    element.pulseScaleNow(1, 1.1);
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

  setLineRotation(
    r: ?number = null,
    animate: boolean = true,
    whenFinished: ?() => void = null,
  ) {
    let target = r;
    let direction = 0;
    if (target == null) {
      const currentRotation = this._circle._line1.getRotation('0to360');
      if (currentRotation < 0.5) {
        target = 1.3;
        direction = 1;
      } else if (currentRotation > Math.PI * 1.75) {
        target = Math.PI * 2 - 1;
        direction = -1;
      } else {
        if (whenFinished != null) {
          whenFinished();
        }
        this.updateAngle();
        return;
      }
    }
    if (animate) {
      this.pushLine(target, direction, 2, whenFinished);
    } else {
      this._circle._line1.setRotation(target);
      if (whenFinished != null) {
        whenFinished();
      }
    }
  }

  showCircle() {
    this._circle._line1.stop(true, false);
    this._circle._line1.setRotation(0);
    this.pushLine(Math.PI * 1.999, 1, 2);
  }
}
