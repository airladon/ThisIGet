// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, Equation,
  Transform,
} = Fig;

const { rand, round } = Fig.tools.math;

const { joinObjects } = Fig.tools.misc;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimitive;
    _radians: DiagramElementPrimitive;
    _degrees: {
      _marks36: DiagramElementPrimitive;
      _marks360: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _bendLine: {
      _line: DiagramObjectLine;
      _arc: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimitive;
      _value: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _radianLines: {
      _line0: DiagramElementPrimitive;
      _line1: DiagramElementPrimitive;
      _line2: DiagramElementPrimitive;
      _line3: DiagramElementPrimitive;
      _line4: DiagramElementPrimitive;
      _line5: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _equation: {
    _arc: DiagramElementPrimitive;
    __arc: DiagramElementPrimitive;
    _radius: DiagramElementPrimitive;
    __radius: DiagramElementPrimitive;
    _angle: DiagramElementPrimitive;
    __angle: DiagramElementPrimitive;
    _radiusLength1: DiagramElementPrimitive;
    _radiusLengths2: DiagramElementPrimitive;
    _radiusLengths3: DiagramElementPrimitive;
  } & Equation;

  _radDegEqn: Equation;

  marks: number;
  decimals: number;
  units: string;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    this.add('cursor', this.diagram.shapes.cursor());
    // this.hasTouchableElements = true;
    this._circle._line1.makeTouchable();
    this._circle._line1.fnMap.add('updateAngle', this.updateAngle.bind(this));
    this._circle._line1.setTransformCallback = 'updateAngle';
    this._circle._line1.move.canBeMovedAfterLosingTouch = true;
    // this._equation.__arc.onClick = this.goToArcForm.bind(this);
    // this._equation.__radius.onClick = this.goToRadiusForm.bind(this);
    // this._equation.__angle.onClick = this.goToAngleForm.bind(this);
    // this._equation.__arc.makeTouchable();
    // this._equation.__radius.makeTouchable();
    // this._equation.__angle.makeTouchable();

    // this._equation._arc.makeTouchable();
    // this._equation._arc.onClick = this.pulseArc.bind(this);
    // this._equation._radius.makeTouchable();
    // this._equation._radius.onClick = this.pulseRadius.bind(this);
    // this._equation._angle.makeTouchable();
    // this._equation._angle.onClick = this.pulseAngle.bind(this);

    // this._equation.__1.makeTouchable();
    // this._equation.__1.onClick = this.pushLine.bind(this, 1, 0, 1, null);
    // this._equation.__2.makeTouchable();
    // this._equation.__2.onClick = this.pushLine.bind(this, 2, 0, 1, null);
    // this._equation.__3.makeTouchable();
    // this._equation.__3.onClick = this.pushLine.bind(this, 3, 0, 1, null);
    // this._equation._radiusLength1.makeTouchable();
    // this._equation._radiusLength1.onClick = () => {
    //   this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
    //   this.diagram.animateNextFrame();
    // };
    // this._equation._radiusLengths2.makeTouchable();
    // this._equation._radiusLengths2.onClick = () => {
    //   this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
    //   this._circle._radianLines._line1.pulseThickNow(1, 1.03, 9);
    //   this.diagram.animateNextFrame();
    // };
    // this._equation._radiusLengths3.makeTouchable();
    // this._equation._radiusLengths3.onClick = () => {
    //   this._circle._radianLines._line0.pulseThickNow(1, 1.03, 9);
    //   this._circle._radianLines._line1.pulseThickNow(1, 1.03, 9);
    //   this._circle._radianLines._line2.pulseThickNow(1, 1.03, 9);
    //   this.diagram.animateNextFrame();
    // };

    this._eqn.__arc.onClick = this.goToArcForm.bind(this);
    this._eqn.__radius.onClick = this.goToRadiusForm.bind(this);
    this._eqn.__angle.onClick = this.goToAngleForm.bind(this);
    this._eqn.__arc.makeTouchable();
    this._eqn.__radius.makeTouchable();
    this._eqn.__angle.makeTouchable();

    this.decimals = 1;
    this.marks = 12;
    // this._circle._angleText._label.onClick = this.pulseAngle.bind(this);
    // this._circle._angleText._label.makeTouchable();

    // this._radDegEqn.isTouchable = false;
    // this._radDegEqn.hasTouchableElements = false;

    this.fnMap.global.add('bendRadius', this.bend.bind(this));
    this.fnMap.global.add('setLineRotation', this.setLineRotation.bind(this));
    this.fnMap.global.add('pulseRadius', this.pulseRadius.bind(this));
    // this._circle._line1.redrawElements = [this._circle._angle, this._circle._arc];
    this.fnMap.global.add('showArc', () => {
      this._circle._arc.showAll();
      this.updateAngle();
    });
    this.fnMap.global.add('setAngleTextRadians', this.setAngleTextRadians.bind(this));
    this.fnMap.global.add('setAngleTextDeg', this.setAngleTextDeg.bind(this));
    this.fnMap.global.add('updateAngle', this.updateAngle.bind(this));
    this.fnMap.global.add('goToForm', this._eqn.goToForm.bind(this._eqn));
    this.fnMap.global.add('showForm', this._eqn.showForm.bind(this._eqn));
    this.fnMap.global.add('degShowForm', this._degEqn.showForm.bind(this._degEqn));
    // this.fnMap.global.add('arcToRadius', this.arcToRadius.bind(this));
    // this._eqn._radius.onClick = this.goToRadiusForm1.bind(this);
    // this._eqn._angle.onClick = this.goToAngleForm1.bind(this);
    // this._eqn._arc.onClick = this.goToArcForm1.bind(this);
    this.diagram.setStateCallback = 'updateAngle';
    this.fnMap.global.add('showFormOfEqn', this.showForm.bind(this));
    this._lim._radius.setMovable();
    this._lim._radius.setTransformCallback = 'updateLimAngle';
    this.fnMap.global.add('updateLimAngle', this.updateLimAngle.bind(this));
    this._lim._radius.move.bounds.updateRotation({ min: 0.1, max: 1 });
    this._lim._radius.move.canBeMovedAfterLosingTouch = true;
  }

  showForm(options: { element: 'string', form: 'string' }) {
    const e = this.getElement(options.element);
    if (e == null || e.showForm == null) {
      return;
    }
    e.showForm(options.form);
  }

  updateLimAngle() {
    const r = this._lim._radius.getRotation();
    this._lim._angle.setAngle({ angle: r });
    this._lim._x.setAngle({ angle: r });
    // this._lim._arc.setAngle({ angle: r });
    this._lim._arc.setAngleToDraw(r + 0.005);
    this._lim._sin.setEndPoints(
      [this.layout.limRad * Math.cos(r) - 0.01, 0],
      [this.layout.limRad * Math.cos(r) - 0.01, this.layout.limRad * Math.sin(r)],
    );
    this._lim._radius.updateLabel();
    // this._lim._sin.updatePoints()
  }

  goToRadiusForm() {
    // $FlowFixMe
    if (this._eqn.getCurrentForm().name === 'radius') {
      this.accent(this._equation.__radius);
    } else {
      this._eqn.goToForm({
        name: 'radius',
        duration: 2,
        animate: 'move',
        ifAnimating: {
          cancelGoTo: false,
          skipToTarget: false,
        },
      });
    }
    this.diagram.animateNextFrame();
  }

  goToArcForm() {
    // $FlowFixMe
    if (this._eqn.getCurrentForm().name === 'arc') {
      this.accent(this._eqn.__arc);
    } else {
      this._eqn.goToForm({
        name: 'arc',
        duration: 2,
        animate: 'move',
        ifAnimating: {
          cancelGoTo: false,
          skipToTarget: false,
        },
      });
    }
    this.diagram.animateNextFrame();
  }

  goToAngleForm() {
    // $FlowFixMe
    if (this._eqn.getCurrentForm().name === 'angle') {
      this.accent(this._eqn.__angle);
    } else {
      this._eqn.goToForm({
        name: 'angle',
        duration: 2,
        animate: 'move',
        ifAnimating: {
          cancelGoTo: false,
          skipToTarget: false,
        },
      });
    }
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
    if (this._circle._degreesHighlight.isShown) {
      // const pointsToDraw = r / Math.PI / 2 * 6 + 2;
      const angle = parseInt(this._circle._angleText._value.drawingObject.text[0].text, 10);
      this._circle._degreesHighlight._marks360.pointsToDraw = Math.min(angle * 6 + 6, 360 * 6);
      this._circle._degreesHighlight._marks36.pointsToDraw = Math.min(Math.floor(angle / 10) * 6 + 6, 36 * 6);
    }

    if (this._circle._corner.isShown) {
      const p1 = [this.layout.radius, 0];
      const p2 = [0, 0];
      const p3 = this._circle._line1.getP2();
      this._circle._corner.updatePoints([p1, p2, p3]);
      // console.log('updated corner', p1, p2, p3)
    }
    if (this._eqn._value.isShown) {
      const text = `${round(r * this.marks / Math.PI / 2, this.decimals).toFixed(this.decimals)}`;
      this._eqn._value.drawingObject.setText(text);
      if (round(r, 2) === 1) {
        this._eqn._radiusLengths.drawingObject.setText('radius length');
      } else {
        this._eqn._radiusLengths.drawingObject.setText('radius lengths');
      }
    }
  }

  setAngleTextProperties(marks: number, decimals: number, units: string) {
    this.marks = marks;
    this.decimals = decimals;
    this.units = units;
  }

  setAngleTextRadians() {
    this.setAngleTextProperties(Math.PI * 2, 2, 'rad');
    this.updateAngle();
  }

  setAngleTextDeg() {
    this.setAngleTextProperties(360, 0, 'º');
    this.updateAngle();
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
      this.setAngleTextProperties(Math.PI * 2, 2, 'rad');
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

  // bendLineToEnd() {
  //   const bendLine = this._circle._bendLine;
  //   const { radius, width } = this.layout;
  //   bendLine.showAll();
  //   bendLine.stop('cancel');
  //   this.bend(1);
  //   bendLine.setPosition(radius + width / 2, 0);
  //   bendLine.setRotation(Math.PI / 2);
  //   this.diagram.animateNextFrame();
  // }

  bendRadius(finished: ?(string | (() => void)) = null) {
    const line1 = this._circle._line1;
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;
    bendLine.showAll();
    bendLine.stop('cancel');
    this.bend(0);
    bendLine.setPosition(line1.getPosition());
    bendLine.setRotation(line1.getRotation(''));
    const target = bendLine.transform._dup();
    target.updateRotation(Math.PI / 2);
    target.updateTranslation(radius + width / 2, 0);
    bendLine.animations.new()
      .trigger({ callback: 'pulseRadius', duration: 1 })
      .transform({ target, velocity: 1 })
      .custom({ callback: 'bendRadius', duration: 1.5 })
      .rotation({
        element: this._circle._line1, target: 1, velocity: 0.5, maxDuration: 1, direction: 2,
      })
      .dissolveOut({ duration: 0.8 })
      .whenFinished(finished)
      .start();
    this.diagram.animateNextFrame();
  }

  goToOneRadian() {
    const r = this._circle._line1.getRotation('0to360');
    if (r === 1) {
      this._circle._angle.pulseScaleNow(1, 1.5);
    } else {
      this.pushLine(1, 0, 1);
    }
    this.diagram.animateNextFrame();
  }

  appearRadianLines(done: ?(string | (() => void)) = null) {
    const lines = this._circle._radianLines;
    lines._line1.hide();
    lines._line2.hide();
    lines._line3.hide();
    lines._line4.hide();
    lines._line5.hide();
    lines.stop('complete');
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
    whenFinished: ?(string | (() => void)) = null,
  ) {
    let r = toAngle;
    if (toAngle != null
      && round(toAngle, 5) === round(this._circle._line1.getRotation('0to360'), 5)
      && this._circle._angle.isShown === true) {
      this._circle._line1.stop('cancel');
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
    this._circle._line1.stop('cancel');
    this._circle._line1.animations.new()
      .rotation({ target: r, duration, direction })
      .whenFinished(whenFinished)
      .start();
    this.diagram.animateNextFrame();
  }

  pushLineRad(toAngle: number) {
    this.setAngleTextProperties(Math.PI * 2, 2, 'rad');
    this.updateAngle();
    this.pushLine(toAngle, 2, 1, null);
    // this._circle._degrees.hide();
    // this._circle._radians.showAll();
    // this.setAngleMarks('radians');
  }

  pushLineDeg(toAngle: number) {
    this.setAngleTextProperties(360, 0, 'º');
    // this._circle._degrees.showAll();
    // this._circle._radians.hide();
    this.updateAngle();
    this.pushLine(toAngle, 2, 1, null);
  }

  pulseAngle() {
    this._circle._angle.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._line1.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseLines() {
    this._circle._line1.pulseWidth({ line: 5 });
    this._circle._line2.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseSine() {
    this._lim._sin.pulseWidth({ line: 5 });
    this.accent({ element: this._lim._sin._label, x: 'right' });
    this.diagram.animateNextFrame();
  }

  pulseUnitR() {
    this._lim._radius.pulseWidth({ line: 5 });
    this.accent({ element: this._lim._radius._label, x: 'right' });
    this.diagram.animateNextFrame();
  }

  pulseArc() {
    this._circle._arc.pulseThickNow(1, 1.05, 8);
    this.diagram.animateNextFrame();
  }

  pulseLimArc() {
    this._lim._arc.pulseThickNow(1, 1.015, 8);
    // this._lim._x._label.pulseScaleNow(1, 1.5);
    this.accent({ element: this._lim._x._label, x: 'left' });
    this.diagram.animateNextFrame();
  }

  pulseCircle() {
    this._circle._circle.pulseThickNow(1, 1.03, 12);
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

  showDegrees() {
    this._circle._degrees.show();
    this._circle._degreesHighlight.show();
    this._circle.animations.new()
      .inParallel([
        this._circle._degrees.anim.dissolveIn({ duration: 0.5 }),
        this._circle._degreesHighlight.anim.dissolveIn({ duration: 0.5 }),
        this._circle._angleText.anim.dissolveIn(0.5),
        this._circle.anim.trigger({ callback: 'setAngleTextDeg' }),
      ])
      .start();
    this.diagram.animateNextFrame();
  }

  setLineRotation(
    r: ?number = null,
    animate: boolean = true,
    whenFinished: ?() => void | string = null,
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
          this.fnMap.exec(whenFinished);
          // whenFinished();
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
        // whenFinished();
        this.fnMap.exec(whenFinished);
      }
    }
  }
}
