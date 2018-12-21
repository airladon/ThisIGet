// @flow
import Fig from 'figureone';
import { SinCosCircle } from '../../../../LessonsCommon/SinCosCircle/SinCosCircle';
import type {
  SinCosCircleType, equationType, sineCosineLineType, textEquationType,
  SinCosVarStateType, SinCosCircleAngleAnnotationType,
} from '../../../../LessonsCommon/SinCosCircle/SinCosCircle';
import lessonLayout from './layout';

const {
  Diagram, Transform, Point, Rect, DiagramElementCollection,
  DiagramElementPrimative, EquationForm,
} = Fig;
type bowType = {
    _handle: DiagramElementPrimative;
    _string: DiagramElementPrimative;
  } & DiagramElementCollection;


type baseEquationType = {
  eqn: EquationForm;
  init: () => void;
} & DiagramElementCollection;

type equationFuncThetaType = {
  _func: DiagramElementPrimative;
  _theta: DiagramElementPrimative;
} & baseEquationType;

type equationComplimentType = {
  _pi: DiagramElementPrimative;
  _two: DiagramElementPrimative;
  _minus: DiagramElementPrimative;
  _theta: DiagramElementPrimative;
  _v: DiagramElementPrimative;
} & baseEquationType;

type equationSineComplimentType = {
  _sin: DiagramElementPrimative;
  _pi: DiagramElementPrimative;
  _two: DiagramElementPrimative;
  _minus: DiagramElementPrimative;
  _theta: DiagramElementPrimative;
  _v: DiagramElementPrimative;
} & baseEquationType;

type equationThetaType = equationType;

type angleAnnotationType = {
  _label: equationComplimentType | equationThetaType;
} & SinCosCircleAngleAnnotationType;

type complimentarySineCollectionType = {
  _xAxis: DiagramElementPrimative;
  _yAxis: DiagramElementPrimative;
  _sine: {
    _label: equationFuncThetaType;
  } & sineCosineLineType;
  _cosine: {
    _label: equationFuncThetaType;
  } & sineCosineLineType;
  _radius: DiagramElementPrimative;
  _theta: angleAnnotationType;
  _compAngle: angleAnnotationType;
  updateRotation: (number) => void;
} & DiagramElementCollection;

type extendedCircleType = {
  _bow: bowType;
  _complimentarySineCollection: complimentarySineCollectionType;
  _compShadow: complimentarySineCollectionType;
  _cosineSymmetry: {
    _radius: DiagramElementPrimative;
    _compAngle: angleAnnotationType;
    _cosine: sineCosineLineType;
    _sine: equationSineComplimentType;
    _sineComp: equationSineComplimentType;
  } & DiagramElementCollection;
} & SinCosCircleType;


type varStateExtendedType = {
  complimentaryRotatingTo: 'left' | 'right' | 'done';
} & SinCosVarStateType;

export type SineCollectionType = {
  _circle: extendedCircleType;
  varState: varStateExtendedType;
};

class SineCollection extends SinCosCircle {
  _circle: extendedCircleType;
  varState: varStateExtendedType;
  // _cosineEqn: DiagramElementPrimative;

  makeEquationTheta(color: Array<number> = [1, 1, 1, 1]): textEquationType {
    return this.makeEquationText('θ', color);
  }

  // makeEqn(elementDefinitions: Object, color: Array<number>) {
  //   labelFont.setColor(color);
  //   const collection = this.diagram.equation.elements(
  //     elementDefinitions,
  //     labelFont,
  //   );
  //   collection.transform.index = 0;
  //   collection.transform = collection.transform.rotate(0);

  //   const eqn = this.diagram.equation.make(collection);
  //   collection.eqn = eqn;

  //   collection.init = () => {
  //     collection.setFirstTransform(this.diagram.diagramToGLSpaceTransform);
  //     collection.eqn.arrange(0.6, 'center', 'middle');
  //   };
  //   return collection;
  // }

  makeEquationFuncTheta(color: Array<number> = [1, 1, 1, 1], func: string = 'sin') {
    const collection = this.makeEqn({ func, theta: 'θ' }, color);
    collection.eqn.createEq(['func', 'theta']);
    collection.init();
    return collection;
  }

  makeEquationCompliment(color: Array<number> = [1, 1, 1, 1]) {
    const collection = this.makeEqn({
      pi: 'π',
      two: '2',
      minus: ' \u2212 ',
      theta: 'θ',
      v: this.diagram.equation.vinculum(color),
    }, color);
    const { eqn } = collection;
    eqn.createEq([eqn.sfrac('pi', 'two', 'v', 0.8), 'minus', 'theta']);
    collection.init();
    return collection;
  }

  makeEquationSineCompliment() {
    const color = this.colors.cosine;
    const collection = this.makeEqn({
      sin: '= sin ',
      pi: 'π',
      two: '2',
      minus: ' \u2212 ',
      theta: 'θ',
      v: this.diagram.equation.vinculum(color),
    }, color);
    const { eqn } = collection;
    eqn.createEq(['sin', eqn.sfrac('pi', 'two', 'v', 0.8), 'minus', 'theta']);
    collection.init();
    return collection;
  }

  makeBow() {
    const bow = this.shapes.collection();
    const { angle } = this.layout.bow;
    const handle = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius: this.layout.radius,
      width: this.layout.bow.lineWidth,
      rotation: -angle / 2,
      sidesToDraw: this.layout.anglePoints * angle / Math.PI / 2,
      color: this.layout.colors.bowHandle,
      transform: new Transform()
        .rotate(0)
        .translate(0, 0),
    });
    const offset = this.layout.radius * 0.05;
    const string = this.makeLine(
      new Point(0, 0),
      this.layout.radius * Math.sin(angle / 2) * 2 - offset, this.layout.bow.lineWidth,
      this.colors.bowString, new Transform()
        .rotate(Math.PI / 2)
        .translate(
          this.layout.radius * Math.cos(angle / 2) - this.layout.bow.lineWidth * 0.2,
          -this.layout.radius * Math.sin(angle / 2) + offset / 2,
        ),
    );

    bow.add('string', string);
    bow.add('handle', handle);
    return bow;
  }

  // makeAngleAnnotation(
  //   angleStart: number,
  //   angleSize: number,
  //   angleText: DiagramElementCollection,
  //   color: Array<number> = [0.5, 0.5, 0.5, 1],
  //   layout: Object = this.layout.angleAnnotation,
  // ) {
  //   const angleFraction = angleSize / Math.PI / 2;
  //   const labelPosition = polarToRect(layout.arc.radius +
  //     layout.label.radiusOffset, angleStart + angleSize / 2);
  //   const label = angleText;
  //   label.transform.updateTranslation(labelPosition);

  //   const angleAnnotation = this.shapes.collection(new Transform()
  //     .scale(1, 1).rotate(0));
  //   angleAnnotation.add('arc', arc);
  //   angleAnnotation.add('label', label);
  //   return angleAnnotation;
  // }

  makeThetaAngle(color: Array<number> = [0.5, 0.5, 0.5, 1]) {
    return this.makeAngleAnnotation(
      0, this.layout.compAngle.angle,
      this.makeEquationTheta(color), color, this.layout.thetaAngle,
    );
  }

  makeComplimentAngle(
    color: Array<number> = [0.5, 0.5, 0.5, 1],
    rotation: number = 0,
  ) {
    const complimentAngle = this.makeAngleAnnotation(
      rotation,
      Math.PI / 2 - this.layout.compAngle.angle,
      this.makeEquationCompliment(color),
      color,
      this.layout.complimentAngle,
    );
    return complimentAngle;
  }

  makeComplimentarySineCollection() {
    const collection = this.shapes.collection(new Transform().rotate(0).translate(0, 0));
    const { angle } = this.layout.compAngle;

    const radius = this.makeLine(
      new Point(0, 0), this.layout.radius, this.layout.linewidth,
      this.colors.radius, new Transform()
        .scale(1, 1)
        .rotate(angle)
        .translate(0, 0),
    );

    const theta = this.makeThetaAngle(this.colors.sine);
    const sine = this.makeSineCosineLine(
      this.makeEquationFuncTheta(this.colors.sine, 'sin '),
      true, this.colors.sine,
    );
    const cosine = this.makeSineCosineLine(
      this.makeEquationFuncTheta(this.colors.cosine, 'cos '),
      false, this.colors.cosine,
    );
    sine.textXOffset = -0.13;
    cosine.textYOffset = 0.08;
    sine.updateRotation(this.layout.radius, angle);
    cosine.updateRotation(this.layout.radius, angle);

    const compAngle = this.makeComplimentAngle(this.colors.cosine, angle);

    const xAxis = this.makeLine(
      new Point(0, 0), this.layout.axes.length, this.layout.linewidth / 4,
      this.colors.axes, new Transform().translate(0, 0),
    );
    const yAxis = this.makeLine(
      new Point(0, 0), this.layout.axes.length, this.layout.linewidth / 4,
      this.colors.axes, new Transform().rotate(Math.PI / 2).translate(0, 0),
    );

    collection.updateRotation = (r: number) => {
      const radiusAngle = r - this.layout.compAngle.angle;
      collection.transform.updateRotation(radiusAngle);
      collection._sine.textXOffset = -0.13 + radiusAngle * 0.04;
      collection._sine.updateRotation(this.layout.radius, this.layout.compAngle.angle, true);
      collection._cosine.textYOffset = +0.08 + radiusAngle * 0.04;
      collection._cosine.updateRotation(this.layout.radius, this.layout.compAngle.angle, true);

      collection._theta._label.transform.updateRotation(-radiusAngle);
      collection._compAngle._label.transform.updateRotation(-radiusAngle);
      collection._sine._label.transform.updateRotation(-radiusAngle);
      collection._cosine._label.transform.updateRotation(-radiusAngle);
    };

    collection.add('xAxis', xAxis);
    collection.add('yAxis', yAxis);
    collection.add('sine', sine);
    collection.add('cosine', cosine);
    collection.add('theta', theta);
    collection.add('compAngle', compAngle);
    collection.add('radius', radius);
    return collection;
  }

  makeCosineSymmetry() {
    const symmetry = this.shapes.collection(new Transform().rotate(0));
    const angle = Math.PI / 2 - this.layout.compAngle.angle;
    const radius = this.makeLine(
      new Point(0, 0), this.layout.radius, this.layout.linewidth / 3,
      this.colors.radius, new Transform()
        .scale(1, 1)
        .rotate(angle),
    );

    const compAngle = this.makeComplimentAngle(this.colors.cosine);
    const cosine = this.makeSineLine('cos θ', this.colors.cosine);
    cosine.textXOffset = 0.15;
    cosine.updateRotation(this.layout.radius, angle);

    const sineComp = this.makeEquationSineCompliment();
    symmetry.add('cosine', cosine);
    symmetry.add('compAngle', compAngle);
    symmetry.add('radius', radius);
    symmetry.add('sineComp', sineComp);
    return symmetry;
  }

  // makeCosineEquation() {
  //   const color = this.colors.cosine;
  //   labelFont.setColor(color);
  //   const collection = this.diagram.equation.elements({
  //     cos: 'cos ',
  //     pi: 'π',
  //     two: '2',
  //     minus: ' \u2212 ',
  //     theta: 'θ',
  //     v: this.diagram.equation.vinculum(color),
  //   }, labelFont);
  //   collection.transform.index = 0;
  //   collection.transform = collection.transform.rotate(0);

  //   const eqn = this.diagram.equation.make(collection);
  //   eqn.createEq(['cos', eqn.sfrac('pi', 'two', 'v', 0.8), 'minus', 'theta']);
  //   collection.setFirstTransform(this.diagram.diagramToGLSpaceTransform);
  //   eqn.arrange(0.6, 'center', 'middle');
  //   collection.eqn = eqn;
  //   return collection;
  // }

  addToCircle() {
    this._circle.add('bow', this.makeBow());
    this._circle.add('compShadow', this.makeComplimentarySineCollection());
    this._circle._compShadow.setColor(this.colors.grid);
    this._circle.add('complimentarySineCollection', this.makeComplimentarySineCollection());
    this._circle.add('cosineSymmetry', this.makeCosineSymmetry());
  }

  constructor(diagram: Diagram, transform: Transform = new Transform()) {
    super(lessonLayout(), diagram, transform);
    this.addToCircle();
    // this.add('cosineEqn', this.makeCosineEquation());

    const temp = this.makeEquationCompliment([1, 0, 0, 1]);
    this.add('temp', temp);
    const grid = this.shapes.grid(
      new Rect(-3, -2, 6, 4),
      0.5,
      0.5,
      [0.4, 0.4, 0.4, 1],
      new Transform(),
    );
    this.add('grid', grid);

    this.varState.complimentaryRotatingTo = 'done';
  }

  showBow(done: ?(?mixed) => void = null) {
    const finishTransitionCircle = () => {
      this._circle._bow.show();
      this._circle._bow._handle.disolveIn(1);
      this._circle._bow._string.disolveIn(1, done);
    };
    this._circle._bow.stop(true);
    this._circle._bow.hideAll();
    this.transitionCircle(finishTransitionCircle, 'right', Math.PI / 4, 5);
    this.diagram.animateNextFrame();
  }

  showMinimalComplimentaryAngle() {
    this._circle._complimentarySineCollection.hideAll();
    this._circle._complimentarySineCollection.show();
    this._circle._complimentarySineCollection._radius.show();
    this._circle._complimentarySineCollection._sine.showAll();
    this._circle._complimentarySineCollection._cosine.showAll();
    this._circle._complimentarySineCollection._theta.showAll();
    this._circle._complimentarySineCollection._xAxis.show();
    this._circle._complimentarySineCollection._yAxis.show();
    this._circle._compShadow.hideAll();
    // this._cosineEqn.hide();
    this._circle._cosineSymmetry.hideAll();
    this._circle._radius.show();
  }

  showStep(step: number) {
    this.showMinimalComplimentaryAngle();
    const compAngle = this._circle._complimentarySineCollection._compAngle;
    if (step >= 1) {
      compAngle.setFirstTransform(this._circle.lastDrawTransform);
      compAngle.showAll();
    }
    if (step >= 2) {
      this._circle._compShadow.setFirstTransform(this._circle.lastDrawTransform);
      this._circle._compShadow.showAll();
    }
    if (step >= 3) {
      this._circle._cosineSymmetry.setFirstTransform(this._circle.lastDrawTransform);
      this._circle._cosineSymmetry.show();
      this._circle._cosineSymmetry._compAngle.show();
      this._circle._cosineSymmetry._compAngle._arc.show();
      this._circle._cosineSymmetry._compAngle._label.show();
      this._circle._cosineSymmetry._radius.show();
      this._circle._cosineSymmetry._cosine.show();
      this._circle._cosineSymmetry._cosine._line.show();
      this._circle._cosineSymmetry._cosine._label.show();
    }
    if (step >= 4) {
      this._circle._cosineSymmetry._cosine.showAll();
      this._circle._cosineSymmetry._compAngle.showAll();
      this._circle._complimentarySineCollection.hideAll();
      this._circle._cosineSymmetry._sineComp.showAll();
      this._circle._cosineSymmetry._sineComp._sin.hide();
      this._circle._radius.hide();
      // console.log(this._cosineEqn);
    }
    if (step >= 5) {
      this._circle._cosineSymmetry.showAll();
      // this._cosineEqn.setFirstTransform(this.transform);
      // this._cosineEqn.showAll()();
    }
    this.updateRotation();
  }

  step0() {
    const { angle } = this.layout.compAngle;
    this.rotationLimits = { min: angle, max: angle };
    this._circle._radius.transform.updateRotation(angle);
    this.showStep(0);
  }

  step1() {
    const { angle } = this.layout.compAngle;
    this.rotationLimits = { min: angle, max: angle };
    this._circle._radius.transform.updateRotation(angle);
    this.showStep(1);
    this._circle._complimentarySineCollection._compAngle.pulseScaleNow(1, 1.5);
  }

  step2() {
    const { angle } = this.layout.compAngle;
    this.rotationLimits = { min: angle, max: Math.PI / 2 + angle };
    this._circle._compShadow.updateRotation(this.layout.compAngle.angle);
    this._circle._compShadow.setFirstTransform(this._circle.lastDrawTransform);
    this._circle._radius.transform.updateRotation(this.layout.compAngle.angle);
    this.showStep(2);
    this.rotateComplimentaryAngle(1);
  }

  step3() {
    const angle = this.layout.compAngle.angle + Math.PI / 2;
    this.rotationLimits = { min: angle, max: angle };
    this._circle._radius.transform.updateRotation(angle);
    this._circle._compShadow.updateRotation(angle);
    this._circle._compShadow.setFirstTransform(this._circle.lastDrawTransform);
    this.showStep(3);

    const sineLength = this.layout.radius
      * Math.cos(this.layout.compAngle.angle) / this.layout.radius;
    const cosSym = this._circle._cosineSymmetry;

    const mirror = (percent: number) => {
      const startAngle = angle;
      const stopAngle = angle - this.layout.compAngle.angle * 2;
      const currentAngle = startAngle + (stopAngle - startAngle) * percent;
      const currentScale = Math.sin(startAngle) / Math.sin(currentAngle);

      const s = (1 - percent) * 2 - 1;
      cosSym._radius.transform.updateRotation(currentAngle);
      cosSym._radius.transform.updateScale(currentScale, s);
      cosSym._compAngle.transform.updateScale(-(1 - percent * 2), 1);
      cosSym._cosine._line.transform.updateTranslation(
        currentScale * this.layout.radius * Math.cos(currentAngle),
        0,
      );
      cosSym._cosine._line.transform.updateScale(sineLength, s);
    };

    const done = () => {
      this._circle._radius.hide();
      this._circle._complimentarySineCollection.disolveOutWithDelay(0, 1);
      cosSym._compAngle._label.disolveInWithDelay(0, 1);
      cosSym._cosine._label.disolveInWithDelay(0, 1);
    };

    cosSym.animateCustomTo(mirror, 1.5, 0, done);
  }

  resetSymmetry() {
    const angle = Math.PI / 2 - this.layout.compAngle.angle;
    const sineLength = Math.sin(angle);
    const cosSym = this._circle._cosineSymmetry;
    cosSym._radius.transform.updateRotation(angle);
    cosSym._radius.transform.updateScale(1, 1);
    cosSym._compAngle.transform.updateScale(1, 1);
    cosSym._cosine._line.transform.updateTranslation(
      this.layout.radius * Math.cos(angle),
      0,
    );
    cosSym._cosine._line.transform.updateScale(sineLength, 1);
    cosSym._cosine._label.transform.updateTranslation(0, this.layout.radius);
    cosSym._cosine.updateRotation(this.layout.radius, angle);
    this._circle.setFirstTransform(this.lastDrawTransform);
  }

  step4() {
    const angle = this.layout.compAngle.angle + Math.PI / 2;
    this.rotationLimits = { min: angle, max: angle };
    this._circle._radius.transform.updateRotation(angle);
    this._circle._compShadow.updateRotation(angle);
    this._circle._compShadow.setFirstTransform(this._circle.lastDrawTransform);
    this.resetSymmetry();
    const p = this._circle._cosineSymmetry._cosine._label.transform.t();
    this.showStep(4);
    const cosSym = this._circle._cosineSymmetry;
    cosSym._sineComp.setFirstTransform(this.diagram.diagramToGLSpaceTransform);

    const offset = cosSym._sineComp.eqn.content[0].width / 2;
    const t = cosSym._compAngle._label.transform.t();
    if (t != null) {
      cosSym._sineComp.setPosition(t.add(new Point(-offset, 0)));
    }
    if (p != null) {
      cosSym._sineComp.animateTranslationTo(new Point(p.x + 0.15, p.y - 0.15), 2, () => {
        cosSym._sineComp._sin.disolveIn(1);
      });
    }
  }

  step5() {
    const angle = this.layout.compAngle.angle + Math.PI / 2;
    this.rotationLimits = { min: angle, max: angle };
    this._circle._radius.transform.updateRotation(angle);
    // this._circle._cosineSymmetry._compAngle.updateRotation();
    this.showStep(5);
  }

  // eslint-disable-next-line class-methods-use-this
  goToStep(step: number) {
    super.goToStep(step);
    // need to call stop twice as there is up to two levels of callbacks
    this._circle.stop();
    this._circle.stop();

    const steps = [
      this.step0.bind(this),
      this.step1.bind(this),
      this.step2.bind(this),
      this.step3.bind(this),
      this.step4.bind(this),
      this.step5.bind(this),
    ];
    steps[step]();
    this.diagram.animateNextFrame();
  }

  updateRotation() {
    super.updateRotation();
    const r = this.varState.rotation;
    if (this._circle._complimentarySineCollection.isShown) {
      this._circle._complimentarySineCollection.updateRotation(r);
    }
  }

  rotateComplimentaryAngle(toQuad: number | null) {
    const maxAngle = Math.PI / 2 + this.layout.compAngle.angle;
    const minAngle = this.layout.compAngle.angle;
    let toAngle = minAngle;
    const r = this._circle._radius.transform.r();
    if (r != null && toQuad === null) {
      if (r < (maxAngle - minAngle) / 2 + minAngle) {
        toAngle = maxAngle;
      }
    }

    if (toQuad === 0) {
      toAngle = minAngle;
    }
    if (toQuad === 1) {
      toAngle = maxAngle;
    }

    this._circle._radius.animateRotationTo(toAngle, 2, 2);
    this.diagram.animateNextFrame();
  }
}

export default SineCollection;
