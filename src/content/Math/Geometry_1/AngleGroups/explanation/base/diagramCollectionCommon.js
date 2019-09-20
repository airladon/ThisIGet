// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, Equation,
  Transform,
} = Fig;

const { rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _angleA: DiagramObjectAngle;
    _angleB: DiagramObjectAngle;
    _angleC: DiagramObjectAngle;
    _vertex: DiagramElementPrimative;
  } & DiagramElementCollection;

  _eqns: {
    _adjacent: {
      _a: DiagramElementPrimative;
      _b: DiagramElementPrimative;
      _c: DiagramElementPrimative;
    } & Equation;
    _complementary: {
      _a: DiagramElementPrimative;
      _b: DiagramElementPrimative;
      _c: DiagramElementPrimative;
    } & Equation;
    _supplementary: {
      _a: DiagramElementPrimative;
      _b: DiagramElementPrimative;
      _c: DiagramElementPrimative;
    } & Equation;
    _explementary: {
      _a: DiagramElementPrimative;
      _b: DiagramElementPrimative;
      _c: DiagramElementPrimative;
    } & Equation;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);

    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line3.makeTouchable();
    this._fig.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line2.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line3.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line1.move.element = this._fig;

    const setFormOnClick = ((eqn, formName, elements: Array<string> = []) => {
      let elems = elements;
      if (elements.length === 0) {
        elems = [formName];
      }
      elems.forEach((elem) => {
        const element = eqn[`_${elem}`];
        element.makeTouchable();
        element.onClick = () => {
          if (eqn.getCurrentForm().name !== formName) {
            eqn.goToForm({
              name: formName,
              duration: 1,
              animate: 'move',
              ifAnimating: { cancelGoTo: false, skipToTarget: false },
            });
          } else {
            eqn.pulseScaleNow(1, 1.2);
          }
          this.diagram.animateNextFrame();
        };
      });
    });

    setFormOnClick(this._eqns._adjacent, 'a');
    setFormOnClick(this._eqns._adjacent, 'b');
    setFormOnClick(this._eqns._adjacent, 'c');
    setFormOnClick(this._eqns._complementary, 'a');
    setFormOnClick(this._eqns._complementary, 'b');
    setFormOnClick(this._eqns._complementary, 'c', ['_90']);
    setFormOnClick(this._eqns._supplementary, 'a');
    setFormOnClick(this._eqns._supplementary, 'b');
    setFormOnClick(this._eqns._supplementary, 'c', ['_180']);
    setFormOnClick(this._eqns._explementary, 'a');
    setFormOnClick(this._eqns._explementary, 'b');
    setFormOnClick(this._eqns._explementary, 'c', ['_360']);
  }

  updateAngles() {
    let r1 = this._fig.getRotation();
    let r2 = this._fig._line2.getRotation();
    let r3 = this._fig._line3.getRotation();
    if (r3 > Math.PI * 2) {
      r3 = Math.PI * 2;
    }
    if (r2 > r3 - 0.3) {
      r2 = r3 - 0.3;
    }
    if (r2 < 0 + 0.3) {
      r2 = 0 + 0.3;
    }
    if (r3 < 0 + 0.6) {
      r3 = 0 + 0.6;
    }
    if (r1 > Math.PI * 2) {
      r1 -= Math.PI * 2;
    }
    if (r1 < 0) {
      r1 += Math.PI * 2;
    }
    this._fig.transform.updateRotation(r1);
    this._fig._line2.transform.updateRotation(r2);
    this._fig._line3.transform.updateRotation(r3);
    this._fig._angleA.setAngle({ angle: r2, rotationOffset: r1 });
    this._fig._angleB.setAngle({ rotation: r2, angle: r3 - r2, rotationOffset: r1 });
    if (this._fig._angleC.isShown) {
      this._fig._angleC.setAngle({ angle: r3, rotationOffset: r1 });
    }
  }

  goToAngles(
    a: number,
    b: number,
    rotation: number = 0,
    duration: number = 1,
    callback: ?() => void = null,
  ) {
    const fig = this._fig;
    const line2 = this._fig._line2;
    const line3 = this._fig._line3;
    if (duration === 0) {
      fig.setRotation(rotation);
      line2.setRotation(a);
      line3.setRotation(b);
      this.diagram.animateNextFrame();
      return;
    }

    if (fig.getRotation() === rotation
      && line2.getRotation() === a
      && line3.getRotation() === b) {
      if (callback != null) {
        callback();
      }
      return;
    }

    fig.stop(true, false);
    fig.animations.new()
      .rotation({ target: rotation, duration, direction: 2 })
      .whenFinished(callback)
      .start();
    line2.animations.new()
      .rotation({ target: a, duration, direction: 2 })
      .start();
    line3.animations.new()
      .rotation({ target: b, duration, direction: 2 })
      .start();
    this.diagram.animateNextFrame();
  }

  goToRandomAngle(
    bRange: number | [number, number],
    rotationRange: number | [number, number],
    duration: number = 1,
    callback: ?() => void = null,
  ) {
    let b = 0;
    if (typeof bRange === 'number') {
      b = bRange;
    } else {
      b = rand(bRange[0], bRange[1]);
    }
    let rotation = 0;
    if (typeof rotationRange === 'number') {
      rotation = rotationRange;
    } else {
      rotation = rand(rotationRange[0], rotationRange[1]);
    }
    // const a = rand(b * 0.1, b * 0.9);
    const delta = rand(b / 6, b / 2.5);
    const currentA = this._fig._line2.getRotation();
    let a = b / 2 + delta;
    if (currentA > b / 2) {
      a = b / 2 - delta;
    }
    this.goToAngles(a, b, rotation, duration, callback);
  }

  goToRandomAngleThenPulse(
    bRange: number | [number, number],
    rotationRange: number | [number, number],
    duration: number = 1,
    callback: ?() => void = null,
  ) {
    const end = () => {
      if (callback != null) {
        callback();
      }
      this._fig._angleA.pulseScaleNow(1, 1.2);
      this._fig._angleB.pulseScaleNow(1, 1.2);
    };
    this.goToRandomAngle(bRange, rotationRange, duration, end);
  }

  stepEqn() {
    this._eqns._adjacent.goToForm({
      duration: 1,
      animate: 'move',
      ifAnimating: { cancelGoTo: false, skipToTarget: false },
    });
    this.diagram.animateNextFrame();
  }

  pulseAngleGroups() {
    this._fig._angleA.pulseScaleNow(1, 1.2);
    this._fig._angleB.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseLine2() {
    this._fig._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseStraightLine() {
    this._fig._line1.pulseWidth();
    this._fig._line3.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseAngleC() {
    this._fig._angleC.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  toggleAngleC() {
    if (this._fig._angleC.isShown) {
      this._fig._angleC.hide();
    } else {
      this._fig._angleC.showAll();
      this.updateAngles();
      this._fig._angleC.pulseScaleNow(1, 1.2);
    }
    this.diagram.animateNextFrame();
  }

  pulseVertex() {
    // this._fig._vertex.show();
    this._fig._vertex.pulseScaleNow(1, 10, 0, () => {
      // this._fig._vertex.hideAll();
      this.diagram.animateNextFrame();
    });
    this.diagram.animateNextFrame();
  }
}
