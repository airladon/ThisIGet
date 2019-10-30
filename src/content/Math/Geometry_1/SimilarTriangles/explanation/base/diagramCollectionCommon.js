// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
  EquationLabel,
} = Fig;

type TypeAngle = {
  label: {
    offset: number;
  } & EquationLabel;
  _label: DiagramElementPrimitive;
  _curve: DiagramElementPrimitive;
} & DiagramObjectAngle;

type TypeSide = {
  label: {
    offset: number;
  } & EquationLabel;
  _label: DiagramElementPrimitive;
} & DiagramObjectLine;

type TypeTri = {
  _angle0: TypeAngle;
  _angle1: TypeAngle;
  _angle2: TypeAngle;
  _side01: TypeSide;
  _side12: TypeSide;
  _side20: TypeSide;
  _line: DiagramObjectLine;
} & DiagramObjectPolyLine;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri1: TypeTri;
    _tri2: TypeTri;
    _tria: TypeTri;
    _trir: TypeTri;
    _triScaler: TypeTri;
    _angleA: TypeAngle;
    _angleB: TypeAngle;
    _newBase: DiagramObjectLine;
    _arrow1: DiagramElementCollection;
    _arrow2: DiagramElementCollection;
  } & DiagramElementCollection;

  _examples: {
    _circ1: DiagramElementPrimitive;
    _circ2: DiagramElementPrimitive;
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
    _quad1: DiagramObjectPolyLine;
    _quad2: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _eqn: Equation;

  similarCounter: number;
  angleCounter: number;
  sideCounter: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    // this._fig._triScaler.setMovable();
    // this._fig._ball.setMovable();
    this._fig._triScaler.setTransformCallback = this.scaleTri.bind(this);
    this._fig._triScaler.move.maxTransform.updateScale(1.5, 1.5);
    this._fig._triScaler.move.minTransform.updateScale(0.5, 0.5);
    this.similarCounter = 0;
    this.angleCounter = 0;
    this.sideCounter = 0;
  }

  scaleTri() {
    const tri = this._fig._triScaler;
    const s = tri.getScale().x;
    const roundScale = s.toFixed(1);
    tri._side01._label.setScale(1 / s);
    tri._side12._label.setScale(1 / s);
    tri._side20._label.setScale(1 / s);

    tri._side01.label.offset = 0.15 + (1 - s) * 0.2;
    tri._side12.label.offset = 0.15 + (1 - s) * 0.2;
    if (s < 1) {
      tri._side01.label.offset = 0.15 + (1 - s) * 0.5;
      tri._side12.label.offset = 0.15 + (1 - s) * 0.4;
    }
    tri._side20.label.offset = 0.15 + (1 - s) * 0.2;
    tri._side01.setLabel(`${roundScale} \u00D7 A`);
    tri._side12.setLabel(`${roundScale} \u00D7 C`);
    tri._side20.setLabel(`${roundScale} \u00D7 B`);
    tri.updateLabels();
  }

  goToOtherBound(done: ?() => void = null) {
    const tri = this._fig._triScaler;
    const s = tri.getScale().x;
    let target = 0.5;
    if (s === 0.5) {
      target = 1.01;
    } else if (s === 1.01) {
      target = 1.5;
    } else if (s === 1.5) {
      target = 0.99;
    } else if (s === 0.99) {
      target = 0.5;
    } else if (s < 1) {
      target = 1.5;
    } else if (s >= 1) {
      target = 0.5;
    }
    tri.stop();
    tri.animations.new()
      .scale({ target, duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseSimilar() {
    const ex = this._examples;
    const small = [ex._circ1, ex._tri1, ex._quad1];
    const large = [ex._circ2, ex._tri2, ex._quad2];
    const index = this.similarCounter;
    this.similarCounter = (this.similarCounter + 1) % 3;
    small[index].pulseScaleNow(1, 1.3);
    large[index].pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  growExamples(done: ?() => void = null) {
    const ex = this._examples;
    ex._circ1.setScenario('small');
    ex._tri1.setScenario('small');
    ex._quad1.setScenario('small');
    ex._circ2.setScenario('large');
    ex._tri2.setScenario('large');
    ex._quad2.setScenario('large');
    ex.stop();
    ex._circ1.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .start();
    ex._tri1.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .start();
    ex._quad1.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  reduceExamples(done: ?() => void = null) {
    const ex = this._examples;
    ex._circ1.setScenario('small');
    ex._tri1.setScenario('small');
    ex._quad1.setScenario('small');
    ex._circ2.setScenario('large');
    ex._tri2.setScenario('large');
    ex._quad2.setScenario('large');
    ex.stop();
    ex._circ2.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .start();
    ex._tri2.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .start();
    ex._quad2.animations.new()
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'small', duration: 1 })
      .delay(0.2)
      .scenario({ target: 'overlay', duration: 1 })
      .scenario({ target: 'large', duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    const tri1 = this._fig._tri1;
    const trir = this._fig._trir;
    const small = [tri1._angle0, tri1._angle1, tri1._angle2];
    const large = [trir._angle0, trir._angle1, trir._angle2];
    const index = this.angleCounter;
    this.angleCounter = (this.angleCounter + 1) % 3;
    small[index].pulseScaleNow(1, 1.5);
    large[index].pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAllAngles(done: ?() => void = null) {
    const tri1 = this._fig._tri1;
    const trir = this._fig._trir;
    tri1._angle0.pulseScaleNow(1, 1.5, 0, done);
    tri1._angle1.pulseScaleNow(1, 1.3);
    tri1._angle2.pulseScaleNow(1, 1.3);
    trir._angle0.pulseScaleNow(1, 1.3);
    trir._angle1.pulseScaleNow(1, 1.3);
    trir._angle2.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  setTriA(toType: string = 'initial') {
    const tri = this._fig._tria;
    if (toType === 'initial') {
      tri._angle0.setLabel('a');
      tri._angle1.setLabel('c');
      tri._angle2.setLabel('b');
      tri._side01.setLabel('A\'');
      tri._side12.setLabel('C\'');
      tri._side20.setLabel('B\'');
      tri._side01.setColor(this.layout.colors.sides2);
      tri._side12.setColor(this.layout.colors.sides2);
      tri._side20.setColor(this.layout.colors.sides2);
      tri._line.setColor(this.layout.colors.sides2);
      // tri._angle1.setColor(this.layout.colors.angles);
      // tri._angle2.setColor(this.layout.colors.angles);
    } else if (toType === 'solved') {
      tri._angle0.setLabel('a');
      tri._angle1.setLabel('c');
      tri._angle2.setLabel('b');
      tri._side01.setLabel('sA');
      tri._side12.setLabel('sC');
      tri._side20.setLabel('sB');
      tri._side01._label.setColor(this.layout.colors.sides2);
      tri._side12._label.setColor(this.layout.colors.sides2);
      tri._side20._label.setColor(this.layout.colors.sides2);
      tri._line.setColor(this.layout.colors.sides2);
      // tri._angle1.setColor(this.layout.colors.angles);
      // tri._angle2.setColor(this.layout.colors.angles);
    } else if (toType === 'inWorking') {
      tri._angle0.setLabel('a');
      tri._angle1.setLabel('');
      tri._angle2.setLabel('b');
      tri._side01.setLabel('A\'');
      tri._side12.setLabel('C\'');
      tri._side20.setLabel('B\'');
      tri._side01.setColor(this.layout.colors.sides2);
      tri._side12.setColor(this.layout.colors.sides2);
      tri._side20.setColor(this.layout.colors.sides2);
      // tri._side01._label.setColor(this.layout.colors.darkGrey);
      // tri._side12._label.setColor(this.layout.colors.darkGrey);
      tri._line.setColor(this.layout.colors.sides2);
      // tri._angle1.setColor(this.layout.colors.darkGrey);
      // tri._angle2.setColor(this.layout.colors.darkGrey);
    }
  }

  setTri1(toType: string = 'initial') {
    const tri = this._fig._tri1;
    if (toType === 'general') {
      tri._angle0.setLabel('a');
      tri._angle1.setLabel('c');
      tri._angle2.setLabel('b');
      // tri._angle1.setColor(this.layout.colors.angles);
      // tri._angle2.setColor(this.layout.colors.angles);
      // tri._side12._label.setColor(this.layout.colors.sides);
    } else if (toType === 'initial') {
      tri._angle0.setLabelToRealAngle();
      tri._angle1.setLabelToRealAngle();
      tri._angle2.setLabelToRealAngle();
      // tri._angle1.setColor(this.layout.colors.angles);
      // tri._angle2.setColor(this.layout.colors.angles);
      // tri._side12._label.setColor(this.layout.colors.sides);
    } else if (toType === 'inWorking') {
      tri._angle0.setLabel('a');
      tri._angle1.setLabel('c');
      tri._angle2.setLabel('b');
      // tri._angle1.setColor(this.layout.colors.darkGrey);
      // tri._angle2.setColor(this.layout.colors.darkGrey);
      // tri._side12._label.setColor(this.layout.colors.darkGrey);
    }
  }

  setAngles(toType: string = 'general') {
    // const tri1 = this._fig._tri1;
    const trir = this._fig._trir;
    // const tri2 = this._fig._tri2;
    // tri2._angle0.setLabel('a');
    // tri2._angle1.setLabel('c');
    // tri2._angle2.setLabel('b');
    // this._fig._angleA.label.setText('a');
    // this._fig._angleB.label.setText('b');
    this.setTri1(toType);
    if (toType === 'general') {
      // tri1._angle0.setLabel('a');
      // tri1._angle1.setLabel('c');
      // tri1._angle2.setLabel('b');
      trir._angle0.setLabel('a\'');
      trir._angle1.setLabel('c\'');
      trir._angle2.setLabel('b\'');
      trir._angle0.setColor(this.layout.colors.angles2);
      trir._angle1.setColor(this.layout.colors.angles2);
      trir._angle2.setColor(this.layout.colors.angles2);
    } else if (toType === 'initial') {
      // tri1._angle0.setLabelToRealAngle();
      // tri1._angle1.setLabelToRealAngle();
      trir._angle0.setLabelToRealAngle();
      trir._angle1.setLabelToRealAngle();
      trir._angle2.setLabelToRealAngle();
      // tri1._angle2.setLabelToRealAngle();
      trir._angle0.setColor(this.layout.colors.angles);
      trir._angle1.setColor(this.layout.colors.angles);
      trir._angle2.setColor(this.layout.colors.angles);
    } else if (toType === 'solved') {
      // tri1._angle0.setLabel('a');
      // tri1._angle1.setLabel('c');
      // tri1._angle2.setLabel('b');
      this.setTri1('general');
      trir._angle0.setLabel('a');
      trir._angle1.setLabel('c');
      trir._angle2.setLabel('b');
      trir._angle0.setColor(this.layout.colors.angles);
      trir._angle1.setColor(this.layout.colors.angles);
      trir._angle2.setColor(this.layout.colors.angles);
    }
  }

  setTri2(toType: string = 'initial') {
    const tri2 = this._fig._tri2;
    if (toType === 'initial') {
      tri2._angle0.setLabel('a');
      tri2._angle1.setLabel('');
      tri2._angle2.setLabel('b');
      tri2._side01.setLabel('');
      tri2._side12.setLabel('');
      tri2._side20.setLabel('sB');
    } else if (toType === 'abc') {
      tri2._angle0.setLabel('a');
      tri2._angle1.setLabel('c');
      tri2._angle2.setLabel('b');
      tri2._side01.setLabel('');
      tri2._side12.setLabel('');
      tri2._side20.setLabel('sB');
    } else if (toType === 'all') {
      tri2._angle0.setLabel('a');
      tri2._angle1.setLabel('c');
      tri2._angle2.setLabel('b');
      tri2._side01.setLabel('sA');
      tri2._side12.setLabel('sC');
      tri2._side20.setLabel('sB');
    }
  }

  moveNewBase(done: ?() => void = null) {
    const trir = this._fig._trir;
    const newBase = this._fig._newBase;
    const targetPosition = this._fig._tri2._side20.getDiagramPosition();
    newBase.showAll();
    newBase.setDiagramPositionToElement(trir._side20);
    newBase.stop();
    newBase.animations.new()
      .trigger({
        callback: () => {
          // newBase._label.pulseScaleNow(1, 1.5);
          trir._side20._label.pulseScaleNow(1, 2);
        },
        duration: 1,
      })
      .position({ target: targetPosition, duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseTri2Base() {
    this._fig._tri2._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseTri2Other() {
    this._fig._tri2._side12._label.pulseScaleNow(1, 2);
    this._fig._tri2._side01._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  moveNewAngles(done: ?() => void = null) {
    const tri1 = this._fig._tri1;
    const angleA = this._fig._angleA;
    const angleB = this._fig._angleB;
    const targetPositionA = this._fig._tri2._angle0.getDiagramPosition();
    const targetPositionB = this._fig._tri2._angle2.getDiagramPosition();
    angleA.showAll();
    angleA.setDiagramPositionToElement(tri1._angle0);
    angleA.stop();
    angleB.showAll();
    angleB.setDiagramPositionToElement(tri1._angle2);
    angleA.animations.new()
      .trigger({
        callback: () => {
          angleA._curve.pulseScaleNow(1, 1.3);
          tri1._angle0.pulseScaleNow(1, 1.3);
          angleB._curve.pulseScaleNow(1, 1.3);
          tri1._angle2.pulseScaleNow(1, 1.3);
        },
        duration: 1,
      })
      .inParallel([
        angleA.anim.position({ target: targetPositionA, duration: 1 }),
        angleB.anim.position({ target: targetPositionB, duration: 1 }),
      ])
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  createTriangle(done: ?() => void = null) {
    this._fig.stop();
    this._fig._tri2.hideAll();
    this._fig._angleA.hideAll();
    this._fig._angleB.hideAll();
    this._fig._newBase.hideAll();
    this._fig.animations.new()
      .trigger({ callback: this.moveNewBase.bind(this), duration: 2 })
      .trigger({ callback: this.moveNewAngles.bind(this), duration: 2 })
      .inSerial([
        this._fig._tri2.anim.dissolveIn(1),
      ])
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseNewBase() {
    this._fig._trir._side20._label.pulseScaleNow(1, 2);
    this._fig._tri2._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseNewAngles() {
    this._fig._tri1._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri1._angle2.pulseScaleNow(1, 1.3);
    this._fig._tri2._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri2._angle2.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseNewAnglesOnly() {
    this._fig._tri2._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri2._angle2.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseUnknownAngle() {
    this._fig._tri2._angle1.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseA() {
    this._fig._tri1._angle0.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseB() {
    this._fig._tri1._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseC() {
    this._fig._tri1._angle1.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseNewC(done: ?() => void = null) {
    this._fig._tri2._angle1.pulseScaleNow(1, 1.5, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTri1() {
    this._fig._tri1.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseTri2() {
    this._fig._tri2.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseTrir() {
    this._fig._trir.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseNewSides(done: ?() => void = null) {
    this._fig._tri2._side01._label.pulseScaleNow(1, 2, 0, done);
    this._fig._tri2._side12._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseTri2rAngles(done: ?() => void = null) {
    this._fig._tri2._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri2._angle1.pulseScaleNow(1, 1.3);
    this._fig._tri2._angle2.pulseScaleNow(1, 1.3);
    this._fig._trir._angle0.pulseScaleNow(1, 1.3);
    this._fig._trir._angle1.pulseScaleNow(1, 1.3);
    this._fig._trir._angle2.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTri1Angles() {
    this._fig._tri1._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri1._angle1.pulseScaleNow(1, 1.3);
    this._fig._tri1._angle2.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseTriAAngles() {
    this._fig._tria._angle0.pulseScaleNow(1, 1.3);
    this._fig._tria._angle1.pulseScaleNow(1, 1.3);
    this._fig._tria._angle2.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseTri1Sides() {
    this._fig._tri1._side01._label.pulseScaleNow(1, 2);
    this._fig._tri1._side12._label.pulseScaleNow(1, 2);
    this._fig._tri1._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseTriASides(done: ?() => void = null) {
    this._fig._tria._side01._label.pulseScaleNow(1, 2);
    this._fig._tria._side12._label.pulseScaleNow(1, 2);
    this._fig._tria._side20._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTri1ASides() {
    this.pulseTri1Sides();
    this.pulseTriASides();
  }

  pulseTri1AAngles() {
    this.pulseTri1Angles();
    this.pulseTriAAngles();
  }

  triAtoTri1(done: ?() => void = null) {
    const tria = this._fig._tria;
    tria.stop();
    tria.setScenario('right');
    tria.animations.new()
      .scenario({ target: 'on', duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAnglesA1a() {
    this._fig._tria._angle0.pulseScaleNow(1, 1.3);
    this._fig._tri1._angle0.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseSideA() {
    this._fig._tri1._side01._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseSideB() {
    this._fig._tri1._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseSideBa() {
    this._fig._tria._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseParallelLines() {
    this.pulseSideBa();
    this.pulseSideB();
  }

  pulseArrows(done: ?() => void = null) {
    this._fig._arrow1.pulseScaleNow(1, 2);
    this._fig._arrow2.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseEqn(done: ?() => void = null) {
    this._eqn.pulseScaleNow(1, 1.2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTriASide() {
    const tria = this._fig._tria;
    const tri1 = this._fig._tri1;
    const sidea = [tria._side01, tria._side12, tria._side20];
    const side1 = [tri1._side01, tri1._side12, tri1._side20];
    const index = this.sideCounter;
    this.sideCounter = (this.sideCounter + 1) % 3;
    sidea[index]._label.pulseScaleNow(1, 2);
    side1[index]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseTriRSide() {
    const trir = this._fig._trir;
    const tri1 = this._fig._tri1;
    const sider = [trir._side01, trir._side12, trir._side20];
    const side1 = [tri1._side01, tri1._side12, tri1._side20];
    const index = this.sideCounter;
    this.sideCounter = (this.sideCounter + 1) % 3;
    sider[index]._label.pulseScaleNow(1, 2);
    side1[index]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
