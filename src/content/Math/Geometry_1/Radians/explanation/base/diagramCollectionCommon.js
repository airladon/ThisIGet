// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, Equation,
  Transform,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimative;
    _radians: DiagramElementPrimative;
    _degrees: {
      _marks36: DiagramElementPrimative;
      _marks360: DiagramElementPrimative;
    } & DiagramElementCollection;
    _bendLine: {
      _line: DiagramObjectLine;
      _arc: DiagramElementPrimative;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimative;
      _value: DiagramElementPrimative;
    } & DiagramElementCollection;
    _radianLines: {
      _line0: DiagramElementPrimative;
      _line1: DiagramElementPrimative;
      _line2: DiagramElementPrimative;
      _line3: DiagramElementPrimative;
      _line4: DiagramElementPrimative;
      _line5: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _equation: {
    _arc: DiagramElementPrimative;
    __arc: DiagramElementPrimative;
    _radius: DiagramElementPrimative;
    __radius: DiagramElementPrimative;
    _angle: DiagramElementPrimative;
    __angle: DiagramElementPrimative;
    _radiusLength1: DiagramElementPrimative;
    _radiusLengths2: DiagramElementPrimative;
    _radiusLengths3: DiagramElementPrimative;
  } & Equation;

  _radDegEqn: Equation;

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

    this._equation.__arc.onClick = this.goToArcForm.bind(this);
    this._equation.__radius.onClick = this.goToRadiusForm.bind(this);
    this._equation.__angle.onClick = this.goToAngleForm.bind(this);
    this._equation.__arc.makeTouchable();
    this._equation.__radius.makeTouchable();
    this._equation.__angle.makeTouchable();

    this._equation._arc.makeTouchable();
    this._equation._arc.onClick = this.pulseArc.bind(this);
    this._equation._radius.makeTouchable();
    this._equation._radius.onClick = this.pulseRadius.bind(this);
    this._equation._angle.makeTouchable();
    this._equation._angle.onClick = this.pulseAngle.bind(this);

    this._equation.__1.makeTouchable();
    this._equation.__1.onClick = this.pushLine.bind(this, 1, 0, 1, null);
    this._equation.__2.makeTouchable();
    this._equation.__2.onClick = this.pushLine.bind(this, 2, 0, 1, null);
    this._equation.__3.makeTouchable();
    this._equation.__3.onClick = this.pushLine.bind(this, 3, 0, 1, null);
    this._equation._radiusLength1.makeTouchable();
    this._equation._radiusLength1.onClick = () => {
      this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
      this.diagram.animateNextFrame();
    };
    this._equation._radiusLengths2.makeTouchable();
    this._equation._radiusLengths2.onClick = () => {
      this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
      this._circle._radianLines._line1.pulseThickNow(1, 1.03, 9);
      this.diagram.animateNextFrame();
    };
    this._equation._radiusLengths3.makeTouchable();
    this._equation._radiusLengths3.onClick = () => {
      this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
      this._circle._radianLines._line1.pulseThickNow(1, 1.03, 9);
      this._circle._radianLines._line2.pulseThickNow(1, 1.03, 9);
      this.diagram.animateNextFrame();
    };

    this.decimals = 1;
    this.marks = 12;
    this._circle._angleText._label.onClick = this.pulseAngle.bind(this);
    this._circle._angleText._label.makeTouchable();

    this._radDegEqn.isTouchable = false;
    this._radDegEqn.hasTouchableElements = false;
  }

  goToRadiusForm() {
    this._equation.goToForm({
      name: 'radius',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
  }

  toggleDegrees() {
    if (this._circle._degrees.isShown) {
      this._circle._degrees.hide();
    } else {
      this._circle._degrees.showAll();
    }
    this.diagram.animateNextFrame();
  }

  toggleRadians() {
    if (this._circle._radianLines.isShown) {
      this._circle._radianLines.hide();
    } else {
      this._circle._radianLines.showAll();
    }
    this.diagram.animateNextFrame();
  }

  goToArcForm() {
    this._equation.goToForm({
      name: 'arc',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
  }

  goToAngleForm() {
    this._equation.goToForm({
      name: 'angle',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
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
    marks: 'degrees' | 'radians' = 'degrees',
  ) {
    this._circle._degrees.hide();
    this._circle._radians.hide();
    if (marks === 'degrees') {
      this.setAngleTextProperties(360, 0, 'º');
      this._circle._degrees.showAll();
    } else if (marks === 'radians') {
      this.setAngleTextProperties(Math.PI * 2, 2, 'radians');
      this._circle._radians.showAll();
    }
    this.updateAngle();
    this.diagram.animateNextFrame();
  }

  bend(percent: number) {
    const line = this._circle._bendLine._line;
    const arc = this._circle._bendLine._arc;
    const { radius } = this.layout;

    line.setLength((1 - percent) * radius);
    arc.transform.updateTranslation(
      (1 - percent) * radius,
      0,
    );
    arc.angleToDraw = (percent * 0.99);
  }

  bendLineToEnd() {
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;
    bendLine.showAll();
    bendLine.stop(true, false);
    this.bend(1);
    bendLine.setPosition(radius + width / 2, 0);
    bendLine.setRotation(Math.PI / 2);
    this.diagram.animateNextFrame();
  }

  bendRadius(finished: ?() => void = null) {
    const line1 = this._circle._line1;
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;
    bendLine.showAll();
    bendLine.stop(true, false);
    this.bend(0);
    bendLine.setPosition(line1.getPosition());
    bendLine.setRotation(line1.getRotation(''));
    const target = bendLine.transform._dup();
    target.updateRotation(Math.PI / 2);
    target.updateTranslation(radius + width / 2, 0);
    bendLine.animations.new()
      .transform({ target, duration: 1 })
      .custom({ callback: this.bend.bind(this), duration: 1 })
      .rotation({
        element: this._circle._line1, target: 1, duration: 1, direction: 2,
      })
      .whenFinished(finished)
      .start();
    this.diagram.animateNextFrame();
  }

  goToOneRadian() {
    const r = this._circle._line1.getRotation('0to360');
    if (r === 1) {
      this._circle._angle.pulseScaleNow(1, 1.3);
    } else {
      this.pushLine(1, 0, 1);
    }
    this.diagram.animateNextFrame();
  }

  appearRadianLines(done: ?() => void = null) {
    const lines = this._circle._radianLines;
    lines._line1.hide();
    lines._line2.hide();
    lines._line3.hide();
    lines._line4.hide();
    lines._line5.hide();
    lines.stop(true, true);
    lines.animations.new()
      .dissolveIn({ element: lines._line1, duration: 0.5 })
      .dissolveIn({ element: lines._line2, duration: 0.5 })
      .dissolveIn({ element: lines._line3, duration: 0.5 })
      .dissolveIn({ element: lines._line4, duration: 0.5 })
      .dissolveIn({ element: lines._line5, duration: 0.5 })
      .whenFinished(done)
      .start();
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
      this._circle._angle.pulseScaleNow(1, 1.3, 0, whenFinished);
      this.diagram.animateNextFrame();
      // if (whenFinished != null) {
      //   whenFinished();
      // }
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

  pushLineRad(toAngle: number) {
    this.setAngleTextProperties(Math.PI * 2, 2, 'radians');
    this.updateAngle();
    this.pushLine(toAngle, 2, 1, null);
    // this.setAngleMarks('radians');
  }

  pushLineDeg(toAngle: number) {
    this.setAngleTextProperties(360, 0, 'º');
    this.updateAngle();
    this.pushLine(toAngle, 2, 1, null);
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

  pulseRadianLines() {
    this._circle._radianLines._line0.pulseThickNow(1, 1.04, 9);
    this._circle._radianLines._line1.pulseThickNow(1, 1.04, 9);
    this._circle._radianLines._line2.pulseThickNow(1, 1.04, 9);
    this._circle._radianLines._line3.pulseThickNow(1, 1.04, 9);
    this._circle._radianLines._line4.pulseThickNow(1, 1.04, 9);
    this._circle._radianLines._line5.pulseThickNow(1, 1.04, 9);
    this.diagram.animateNextFrame();
  }

  pulseMarks(id: number) {
    const element = this._circle[`_marks${id}`];
    element.pulseScaleNow(1, 1.1);
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

  cycleEquation() {
    this._equation.nextForm(2, 0);
    this.diagram.animateNextFrame();
  }

  showCircle() {
    this._circle._line1.stop(true, false);
    this._circle._line1.setRotation(0);
    this.pushLine(Math.PI * 1.999, 1, 2);
  }
}
