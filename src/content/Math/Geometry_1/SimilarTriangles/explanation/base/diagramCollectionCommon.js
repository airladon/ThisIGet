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
    _tri: DiagramObjectPolyLine;
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

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._fig._tri.setMovable();
    // this._fig._ball.setMovable();
    this._fig._tri.setTransformCallback = this.scaleTri.bind(this);
    this._fig._tri.move.maxTransform.updateScale(1.5, 1.5);
    this._fig._tri.move.minTransform.updateScale(0.5, 0.5);
    this.similarCounter = 0;
    console.log(this)
  }

  scaleTri() {
    const tri = this._fig._tri;
    const s = tri.getScale().x;
    const roundScale = s.toFixed(1);
    tri._side01._label.setScale(1 / s);
    tri._side12._label.setScale(1 / s);
    tri._side20._label.setScale(1 / s);

    tri._side01.label.offset = 0.2 - s * 0.12;
    tri._side12.label.offset = 0.2 - s * 0.12;
    tri._side20.label.offset = 0.2 - s * 0.12;
    tri._side01.setLabel(`${roundScale}A`);
    tri._side12.setLabel(`${roundScale}C`);
    tri._side20.setLabel(`${roundScale}B`);
    tri.updateLabels();
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

  // unscaleTri() {
  //   const tri = this._fig._tri;
  //   tri._side01.label.setScale(1);
  //   tri._side12.label.setScale(1);
  //   tri._side20.label.setScale(1);
  //   tri.setScale(1);
  //   tri.updateLabels();
  // }
}
