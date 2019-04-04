// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
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

    this._eqns._adjacent._c.makeTouchable();
    this._eqns._adjacent._c.onClick = () => {
      // this._eqns.stop(true, true);
      this._eqns._adjacent.goToForm1({ name: 'c', duration: 1, blankTime: 0 });
      this.diagram.animateNextFrame();
    };
    this._eqns._adjacent._a.makeTouchable();
    this._eqns._adjacent._a.onClick = () => {
      // this._eqns.stop(true, true);
      this._eqns._adjacent.goToForm1({ name: 'a', duration: 1, blankTime: 0 });
      this.diagram.animateNextFrame();
    };
    this._eqns._adjacent._b.makeTouchable();
    this._eqns._adjacent._b.onClick = () => {
      this._eqns.stop(true, true);
      this._eqns._adjacent.goToForm1({ name: 'b', duration: 1, blankTime: 0 });
      this.diagram.animateNextFrame();
    };
  }

  updateAngles() {
    let r1 = this._fig.getRotation();
    let r2 = this._fig._line2.getRotation();
    let r3 = this._fig._line3.getRotation();
    if (r3 > Math.PI * 2) {
      r3 = Math.PI * 2;
    }
    if (r2 > r3) {
      r2 = r3;
    }
    if (r2 < 0) {
      r2 = 0;
    }
    if (r3 < 0) {
      r3 = 0;
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
    const a = rand(b * 0.1, b * 0.9);
    this.goToAngles(a, b, rotation, duration, callback);
  }

  pulseAdjacentAngles() {
    this._fig._angleA.pulseScaleNow(1, 1.2);
    this._fig._angleB.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseLine2() {
    this._fig._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseAngleC() {
    this._fig._angleC.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }
}
