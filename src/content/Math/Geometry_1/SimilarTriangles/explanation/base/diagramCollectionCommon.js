// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
    _triScaler: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _examples: {
    _circ1: DiagramElementPrimitive;
    _circ2: DiagramElementPrimitive;
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
    _quad1: DiagramObjectPolyLine;
    _quad2: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  similarCounter: number;
  angleCounter: number;

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
    console.log(this)
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
    small[index].pulseScaleNow(1, 1.2);
    large[index].pulseScaleNow(1, 1.2);
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

  setAngles(toType: string = 'general') {
    const tri1 = this._fig._tri1;
    const trir = this._fig._trir;
    if (toType === 'general') {
      tri1._angle0.setLabel('a');
      tri1._angle1.setLabel('c');
      tri1._angle2.setLabel('b');
      trir._angle0.setLabel('a\'');
      trir._angle1.setLabel('c\'');
      trir._angle2.setLabel('b\'');
    } else if (toType === 'initial') {
      tri1._angle0.setLabelToRealAngle();
      tri1._angle1.setLabelToRealAngle();
      trir._angle0.setLabelToRealAngle();
      trir._angle1.setLabelToRealAngle();
      trir._angle2.setLabelToRealAngle();
      tri1._angle2.setLabelToRealAngle();
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
          newBase._label.pulseScaleNow(1, 1.5);
          trir._side20._label.pulseScaleNow(1, 1.5);
        },
        duration: 1,
      })
      .position({ target: targetPosition, duration: 1 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }
}
