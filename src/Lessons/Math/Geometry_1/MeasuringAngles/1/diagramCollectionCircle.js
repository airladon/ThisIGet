// @flow
import Fig from 'figureone';
import AngleCircle from '../../../../LessonsCommon/AngleCircle/AngleCircle';
import type { circleType, varStateType }
  from '../../../../LessonsCommon/AngleCircle/AngleCircle';
import lessonLayout from './layout';

const {
  Diagram, DiagramElementPrimative, DiagramElementCollection,
  Point, Transform, EquationLegacy, EquationForm,
} = Fig;

type TypeStraightArc = {
  _arc: DiagramElementPrimative;
  _line: DiagramElementPrimative;
} & DiagramElementCollection;

type TypeRadiusToArc = {
  _arc: DiagramElementPrimative;
  _line: DiagramElementPrimative;
  toArc: (number) => void;
} & DiagramElementCollection;

type TypeRadiusOnArc = {
  _r1: DiagramElementPrimative;
  _r2: DiagramElementPrimative;
  _r3: DiagramElementPrimative;
  _r4: DiagramElementPrimative;
  _r5: DiagramElementPrimative;
  _r6: DiagramElementPrimative;
  stepIn: (number) => void;
} & DiagramElementCollection;

type TypeCircumferenceEquationCollection = {
  _circumference: DiagramElementPrimative;
  _radius: DiagramElementPrimative;
  _twoPi: DiagramElementPrimative;
  _times: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _r: DiagramElementPrimative;
  _c: DiagramElementPrimative;
  _arcLength: DiagramElementPrimative;
  _angle: DiagramElementPrimative;
  varState: number;
} & DiagramElementCollection;

type TypeCircumferenceEquation = {
  collection: TypeCircumferenceEquationCollection;
  form: {
    circumference: {
      base: EquationForm;
      name: string;
    };
    c: {
      base: EquationForm;
      name: string;
    };
    arc: {
      base: EquationForm;
      name: string;
    }
  };
} & EquationLegacy;

type TypeArcEquationCollection = {
  _arc: DiagramElementPrimative;
  _radius: DiagramElementPrimative;
  _angle: DiagramElementPrimative;
  _times: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _v: DiagramElementPrimative;
} & DiagramElementCollection;

type TypeArcEquation = {
  collection: TypeArcEquationCollection;
  form: {
    arc: {
      base: EquationForm;
      name: string;
    };
    radius: {
      base: EquationForm;
      name: string;
    };
    angle: {
      base: EquationForm;
      name: string;
    };
  };
  showArc: () => void;
  showRadius: () => void;
  showAngle: () => void;
} & EquationLegacy;

export type TypeCircleCollectionExtended = {
  _angleFill: DiagramElementPrimative;
  _radialLinesA: DiagramElementPrimative;
  _radialLinesB: DiagramElementCollection;
  _straightArc: TypeStraightArc;
  _radiusOnArc: TypeRadiusOnArc;
  _radiusToArc: TypeRadiusToArc;
} & circleType;

type TypeVarStateExtended = {
    percentStraight: number,
    straightening: boolean,
  } & varStateType;

class CircleCollection extends AngleCircle {
  _circle: TypeCircleCollectionExtended;
  _circumferenceEquation: TypeCircumferenceEquationCollection;
  _arcEquation: TypeArcEquationCollection;
  arcEqn: TypeArcEquation;
  circEqn: TypeCircumferenceEquation;
  numSections: Array<number>;
  varState: TypeVarStateExtended;

  makeStraightArc() {
    const straightArc = this.shapes.collection(new Transform().rotate(0).translate(0, 0));
    const arc = this.makeArc(this.layout.radius);
    const line = this.makeLine(
      new Point(0, 0),
      this.layout.radius * 2 * Math.PI, this.layout.linewidth, this.colors.arc,
      new Transform().scale(1, 1).rotate(Math.PI / 2)
        .translate(this.layout.radius - this.layout.linewidth / 2, 0),
    );

    arc.angleToDraw = 0;
    straightArc.add('arc', arc);
    straightArc.add('line', line);

    return straightArc;
  }

  makeCompareText() {
    return this.shapes.htmlText(
      'Compare', 'id_compare_text', '',
      this.layout.compare.textPosition, 'middle', 'left',
    );
  }

  makeAngle() {
    return this.shapes.polygon({
      fill: true,
      sides: this.layout.anglePoints,
      radius: this.layout.angleRadius,
      color: this.colors.angle,
      point: new Point(0, 0),
    });
  }

  makeRadiusToArc() {
    const radiusToArc = this.shapes.collection(new Transform()
      .scale(1, 1)
      .rotate(0)
      .translate(this.layout.radiusArc.radius - this.layout.linewidth / 2, 0));

    const arc = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius: this.layout.radiusArc.radius,
      width: this.layout.linewidth,
      sidesToDraw: Math.floor(this.layout.anglePoints / Math.PI / 2),
      color: this.colors.radiusLight,
      point: new Point(-this.layout.radiusArc.radius + this.layout.linewidth / 2, 0),
    });

    const line = this.makeLine(
      new Point(0, 0),
      this.layout.radiusArc.radius, this.layout.linewidth, this.colors.radiusLight,
      new Transform().scale(1, 1).rotate(Math.PI / 2)
        .translate(0, 0),
    );

    arc.angleToDraw = 0;
    radiusToArc.add('arc', arc);
    radiusToArc.add('line', line);

    radiusToArc.toArc = (percent: number) => {
      radiusToArc._line.transform.updateScale(1 - percent, 1);
      radiusToArc._arc.angleToDraw = percent;
      radiusToArc._arc.transform.updateTranslation(
        -this.layout.radiusArc.radius + this.layout.linewidth / 2,
        (1 - percent) * this.layout.radiusArc.radius,
      );
    };

    return radiusToArc;
  }

  makeRadiusOnArc() {
    const radiusArc = this.shapes.collection(new Transform().translate(0, 0));
    const r1 = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius: this.layout.radiusArc.radius,
      width: this.layout.linewidth,
      sidesToDraw: Math.floor(this.layout.anglePoints / Math.PI / 2),
      color: this.colors.radiusLight,
      transform: new Transform().rotate(0),
    });
    const r2 = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius: this.layout.radiusArc.radius,
      width: this.layout.linewidth,
      sidesToDraw: Math.floor(this.layout.anglePoints / Math.PI / 2) - 1,
      color: this.colors.radiusLight,
      transform: new Transform().rotate(1.02),
    });
    radiusArc.add('r1', r1);
    radiusArc.add('r2', r2);
    radiusArc.add('r3', r2._dup(new Transform().rotate(2.02)));
    radiusArc.add('r4', r2._dup(new Transform().rotate(3.02)));
    radiusArc.add('r5', r2._dup(new Transform().rotate(4.02)));
    radiusArc.add('r6', r2._dup(new Transform().rotate(5.02)));

    radiusArc.stepIn = (time: number) => {
      const timePerSegment = time / 6;
      radiusArc.hideAll();
      radiusArc.show();
      radiusArc._r1.show();
      radiusArc._r2.disolveInWithDelay(timePerSegment * 0.01, timePerSegment);
      radiusArc._r3.disolveInWithDelay(timePerSegment * 1, timePerSegment);
      radiusArc._r4.disolveInWithDelay(timePerSegment * 2, timePerSegment);
      radiusArc._r5.disolveInWithDelay(timePerSegment * 3, timePerSegment);
      radiusArc._r6.disolveInWithDelay(timePerSegment * 4, timePerSegment);
    };

    return radiusArc;
  }

  makeCircumferenceEquation() {
    const equation = this.diagram.equation.makeEqn();
    equation.createElements({
      circumference: 'circumference',
      radius: 'radius',
      twoPi: `2${String.fromCharCode(960)} `,
      times: ` ${String.fromCharCode(215)} `,
      equals: '  =  ',
      r: 'r',
      c: 'c',
      arc: 'arc length',
      angle: 'angle',
    }, this.colors.diagram.text.base);
    equation.setElem('arc', this.colors.arc, true);
    equation.setElem('circumference', this.colors.arc, true);
    equation.setElem('c', this.colors.arc, true, '', 0);
    equation.setElem('r', this.colors.radius, true, '', 0);
    equation.setElem('radius', this.colors.radius, true);
    equation.setElem('twoPi', this.colors.angle, true, '', 0);
    equation.setElem('angle', this.colors.angle, true);
    equation.setElem('equals', null, true);

    const { collection } = equation;
    collection.isTouchable = true;
    collection.touchInBoundingRect = true;
    collection.varState = 0;

    const e = equation;
    e.formAlignment.fixTo = equation.collection._equals;
    e.addForm('circumference', ['circumference', 'equals', 'twoPi', 'times', 'radius']);
    e.addForm('c', ['c', 'equals', 'twoPi', 'r']);
    e.addForm('arc', ['arc', 'equals', 'angle', 'times', 'radius']);

    equation.setCurrentForm('arc');
    return equation;
  }

  makeArcEquation() {
    const equation = this.diagram.equation.makeEqn();
    equation.createElements({
      arc: 'arc length',
      radius: 'radius',
      angle: 'angle',
      times: ` ${String.fromCharCode(215)} `,
      equals: '  =  ',
      v: this.diagram.equation.vinculum(this.colors.diagram.text.base),
    }, this.colors.diagram.text.base);

    equation.setElem('arc', this.colors.arc, true, 'up', 0.25);
    equation.setElem('radius', this.colors.radius, true, 'down', 0.6);
    equation.setElem('angle', this.colors.angle, true, 'down', 0.2);

    const e = equation;
    e.formAlignment.fixTo = equation.collection._equals;
    e.addForm('arc', ['arc', 'equals', 'angle', 'times', 'radius']);
    e.addForm('radius', ['radius', 'equals', e.frac('arc', 'angle', 'v')]);
    e.addForm('angle', ['angle', 'equals', e.frac('arc', 'radius', 'v')]);

    const { collection } = equation;

    collection.hasTouchableElements = true;

    return equation;
  }

  addToCircle(numSections: Array<number>) {
    this._circle.add('angleFill', this.makeAngle());
    this._circle.add('radialLinesA', this.makeRadialMarks(numSections[0]));
    this._circle.add('radialLinesB', this.makeMajorAndMinRadialMarks(10, numSections[1]));
    this._circle.add('straightArc', this.makeStraightArc());
    this._circle.add('compareRadius', this.makeReference());
    this._circle.add('radiusOnArc', this.makeRadiusOnArc());
    this._circle.add('radiusToArc', this.makeRadiusToArc());
  }

  constructor(diagram: Diagram, transform: Transform = new Transform()) {
    super(lessonLayout(), diagram, transform);
    this.diagram = diagram;
    this.varState = {
      radialLines: 4,
      rotation: 0,
      percentStraight: 0,
      straightening: false,
    };
    this.numSections = [12, 100];

    this.add('compareText', this.makeCompareText());
    this.addToCircle(this.numSections);
    this.circEqn = this.makeCircumferenceEquation();
    this.add('circumferenceEquation', this.circEqn.collection);
    this.arcEqn = this.makeArcEquation();
    this.add('arcEquation', this.arcEqn.collection);
  }

  updateRotation() {
    super.updateRotation();
    if (this._circle._straightArc.isShown) {
      this.straighten(this.varState.percentStraight);
    }
  }

  toggleDegreesRadians(show: 'deg' | 'rad') {
    if (show === 'deg') {
      this._circle._radiusOnArc.hideAll();
      this._circle._radiusToArc.hideAll();
      this.showDegrees();
    } else {
      this.hideDegrees();
      this._angleText.showAll();
      this._angleText.setUnits('radius lengths');
      this.varState.radialLines = Math.PI * 2;
      this.arcRadius();
    }
    this.updateNumSectionsText();
    this.diagram.animateNextFrame();
  }

  summaryShowRadiusAsArc() {
    this.hideDegrees();
    this.showRadians();
    this.rotateTo(1, 0, 2);
    this.arcRadius();
    this.diagram.animateNextFrame();
  }

  summaryShowRadians() {
    this.hideDegrees();
    this._circle._radiusToArc.hideAll();
    this._circle._radiusOnArc.hideAll();
    this.showRadians();
  }

  summaryShowDegrees() {
    this._circle._radialLinesRad.hide();
    this._circle._radiusToArc.hideAll();
    this._circle._radiusOnArc.hideAll();
    this.showDegrees();
  }

  summaryRotateToDeg(angle: number) {
    this.summaryShowDegrees();
    this.rotateTo(angle, 2, 2);
  }

  summaryRotateToRad(angle: number) {
    this.summaryShowRadians();
    this.rotateTo(angle, 2, 2);
  }

  // eslint-disable-next-line class-methods-use-this
  summaryAngleToggler(toState: 'deg' | 'rad') {
    const deg = document.getElementById('id_deg_toggle');
    const rad = document.getElementById('id_rad_toggle');

    if (deg == null || rad == null) {
      return;
    }
    if (toState === 'deg') {
      if (rad.classList.contains('portions_selected')) {
        rad.classList.remove('portions_selected');
      }
      if (deg.classList.contains('portions_not_selected')) {
        deg.classList.remove('portions_not_selected');
      }
      deg.classList.add('portions_selected');
      rad.classList.add('portions_not_selected');
      this.summaryShowDegrees();
    } else {
      if (deg.classList.contains('portions_selected')) {
        deg.classList.remove('portions_selected');
      }
      if (rad.classList.contains('portions_not_selected')) {
        rad.classList.remove('portions_not_selected');
      }
      rad.classList.add('portions_selected');
      deg.classList.add('portions_not_selected');
      this.summaryShowRadians();
    }
  }

  toggleCircEquations(
    // scale: number = 1,
    callback: ?(?mixed) => void = null,
  ) {
    const eqn = this.circEqn;

    eqn.stop();
    const callbackToUse = typeof callback === 'function' ? callback : null;

    if (eqn.currentForm != null) {
      if (eqn.currentForm === 'arc') {
        eqn.setCurrentForm('circumference');
        eqn.form.circumference.base.setPositions();
        eqn.form.arc.base.setPositions();
        const t = this._circumferenceEquation._angle.transform.t();
        if (t != null) {
          this._circumferenceEquation._twoPi.transform
            .updateTranslation(t.add(this.layout.circEquation.twoPiOffset));
        }
        eqn.form.circumference.base.hideShow(0.5, 0.5, callbackToUse);
      } else if (eqn.currentForm === 'circumference') {
        eqn.setCurrentForm('c');
        eqn.collection._r.setPositionToElement(eqn.collection._radius);
        eqn.collection._c.setPositionToElement(eqn.collection._circumference);
        eqn.collection._r.show();
        eqn.collection._c.show();
        eqn.form.c.base.animatePositionsTo(0, 0.5, 2, 0.5, callbackToUse);
      } else if (eqn.currentForm === 'c') {
        eqn.setCurrentForm('arc');
        eqn.form.arc.base.setPositions();
        eqn.form.arc.base.hideShow(0.5, 0.5, callbackToUse);
      }
    }
    this.diagram.animateNextFrame();
  }

  stepInRadiusOnArc() {
    this._circle._radiusOnArc.stepIn(3);
    this.diagram.animateNextFrame();
  }

  pulseAngleFill() {
    this._circle._angleFill.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseRadiusOnArc(numToPulse: number = 1) {
    for (let i = 1; i <= numToPulse; i += 1) {
      const key = `_r${i}`;
      this._circle._radiusOnArc[key].pulseThickNow(1, 1.04, 7);
    }
    this.diagram.animateNextFrame();
  }

  pulseRadialLines() {
    this._circle._radialLinesA.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  toggleRadialLines(toPosition: number = -1) {
    if (toPosition > 0) {
      this.varState.radialLines = this.numSections[toPosition - 1];
    } else if (toPosition === 0) {
      // eslint-disable-next-line prefer-destructuring
      this.varState.radialLines = this.numSections[1];
    }
    if (this.varState.radialLines === this.numSections[0]) {
      this._circle._radialLinesA.hide();
      this._circle._radialLinesB.showAll();
      // eslint-disable-next-line prefer-destructuring
      this.varState.radialLines = this.numSections[1];
    } else if (this.varState.radialLines === this.numSections[1]) {
      this._circle._radialLinesB.hideAll();
      this._circle._radialLinesA.show();
      // eslint-disable-next-line prefer-destructuring
      this.varState.radialLines = this.numSections[0];
    } else {
      this._circle._radialLinesA.show();
      // eslint-disable-next-line prefer-destructuring
      this.varState.radialLines = this.numSections[0];
    }
    this.updateNumSectionsText();

    this.diagram.animateNextFrame();
  }

  arcRadius() {
    const r = this._circle._radius.transform.r();
    if (r !== null && r !== undefined) {
      // need two stops here to stop
      this._circle._radiusToArc.stop();
      this._circle._radiusOnArc.stop();
      this._circle._radiusOnArc.hideAll();
      this._circle._radiusToArc.toArc(0);
      this._circle._radiusToArc.showAll();
      this._circle._radiusToArc.transform.updateRotation(Math.PI / 2);
      this._circle._radiusToArc.animateRotationTo(0, 0, 1.5, this.stepInRadiusOnArc.bind(this));
      this.animateCustomTo(this.bendRadius.bind(this), 1, 0);
      this.diagram.animateNextFrame();
    }
  }

  bendRadius(percent: number) {
    this._circle._radiusToArc.toArc(percent);
  }


  straightenArc() {
    const currentPercent = this.varState.percentStraight;
    if (!this.varState.straightening || currentPercent === 0) {
      this.animateCustomTo(this.straighten.bind(this), 1, currentPercent);
      this.varState.straightening = true;
    } else {
      this.animateCustomTo(this.bend.bind(this), 1, 1 - currentPercent);
      this.varState.straightening = false;
    }
    this.diagram.animateNextFrame();
  }

  bend(percent: number) {
    this.straighten(1 - percent);
  }

  straighten(percent: number) {
    const r = this._circle._radius.transform.r();

    const sArc = this._circle._straightArc;
    if (r !== null && r !== undefined) {
      const scale = percent * r / (Math.PI * 2);
      sArc._line.transform.updateScale(scale, 1);
      sArc._arc.angleToDraw = (1 - percent) * r;
      sArc._arc.transform.updateTranslation(
        0,
        scale * this.layout.radius * Math.PI * 2,
      );

      this._circle._compareRadius.transform
        .updateRotation(r + percent * (Math.PI / 2 - r));
      this._circle._compareRadius.transform.updateTranslation(
        percent * (this.layout.radius + this.layout.compare.radiusOffset),
        0,
      );

      sArc.transform.updateTranslation(
        this.layout.compare.arcOffset * percent,
        0,
      );
      this.varState.percentStraight = percent;
    }
    if (percent === 0) {
      this.resetColors();
    } else {
      this._circle._radius.color = this.colors.radiusLight.slice();
      this._circle._arc.color = this.colors.arcLight.slice();
    }
  }

  resetColors() {
    this._circle._radius.color = this.colors.radius.slice();
    this._circle._arc.color = this.colors.arc.slice();
  }

  animateEquation(form: 'arc' | 'radius' | 'angle') {
    this.arcEqn.setCurrentForm(form);
    this.arcEqn.form[form].base.animatePositionsTo(0, 0.5, 1.5, 0.5);
    this.diagram.animateNextFrame();
  }


  toggler(index: number) {
    this.toggleRadialLines(index);
    const elem12 = document.getElementById('id_12p');
    const elem100 = document.getElementById('id_100p');

    if (index && elem12 && elem100) {
      if (elem12.classList.contains('portions_selected')) {
        elem12.classList.remove('portions_selected');
      }

      elem100.classList.add('portions_selected');
    } else {
      if (elem100) {
        if (elem100.classList.contains('portions_selected')) {
          elem100.classList.remove('portions_selected');
        }
      }
      if (elem12) {
        elem12.classList.add('portions_selected');
      }
    }
  }
}

export default CircleCollection;
