// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

const { rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line: { _line: DiagramElementPrimitive } & DiagramObjectLine;
    _h: DiagramObjectLine;
    _v: DiagramObjectLine;
    _hypotenuse: { _label: Equation } & DiagramObjectLine;
    _theta: DiagramObjectAngle;
    _right: DiagramObjectAngle;
    _real: DiagramObjectAngle;
    _sine: DiagramObjectLine;
    _sineTheta: { _label: Equation } & DiagramObjectLine;
    _opposite: { _label: Equation } & DiagramObjectLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._fig._line.setMovable(true);
    this._fig._line._line.increaseBorderSize();
    this._fig._line.setTransformCallback = this.updateRotation.bind(this);
    // this._fig.hasTouchableElements = true;
  }

  labelForm(form: string) {
    if (this._fig._sineTheta.isShown) {
      this._fig._sineTheta._label.showForm(form);
    }
    if (this._fig._hypotenuse.isShown) {
      this._fig._hypotenuse._label.showForm(form);
    }
  }

  gotoSmallAngle() {
    this.gotoRotation(rand(0.1, 0.3), 0.8, null);
  }

  gotoLargeAngle() {
    this.gotoRotation(rand(Math.PI / 2 - 0.3, Math.PI / 2 - 0.1), 0.8, null);
  }

  rotateFrom0To90() {
    this._fig._line.stop();
    this._fig._line.animations.new()
      .rotation({ target: 1 * Math.PI / 180, velocity: 0.5 })
      .rotation({ target: 89 * Math.PI / 180, duration: 10 })
      .delay(0.5)
      .rotation({ target: Math.PI / 3, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  gotoRotation(angle: ?number = null, duration: number = 0, done: ?() => void = null) {
    let r = 0;
    if (angle != null) {
      r = angle;
    } else {
      const currentR = this._fig._line.getRotation();
      let direction = 1;
      if (currentR > Math.PI / 4) {
        direction = -1;
      }
      r = currentR + direction * rand(Math.PI / 8, Math.PI / 4 * 0.9);
    }
    if (duration === 0) {
      this._fig._line.setRotation(r);
      if (done != null) {
        done();
      }
    } else {
      this._fig._line.stop();
      this._fig._line.animations.new()
        .rotation({ target: r, duration })
        .whenFinished(done)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  resetRotation(done: ?() => void = null, duration: number = 0) {
    if (duration === 0) {
      this._fig._line.setRotation(Math.PI / 4);
      if (done != null) {
        done();
      }
    } else {
      const r = this._fig._line.getRotation();
      if (r < 0.3 || r > Math.PI / 2 - 0.3) {
        this.gotoRotation(Math.PI / 4, 0.8, done);
      } else if (done != null) {
        done();
      }
    }
  }

  updateRotation() {
    const theta = this._fig._theta;
    const right = this._fig._right;
    const real = this._fig._real;
    const sineTheta = this._fig._sineTheta;
    const sine = this._fig._sine;
    const h = this._fig._h;
    const v = this._fig._v;
    const hypotenuse = this._fig._hypotenuse;
    const opposite = this._fig._opposite;
    const r = this._fig._line.getRotation();
    const p2 = this._fig._line.getP2();

    if (h.isShown) {
      h.setEndPoints([0, 0], [p2.x, 0]);
    }
    if (v.isShown) {
      v.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    }

    const opacity = {
      right: 1,
      theta: 1,
      real: 1,
      sine: 1,
      sineTheta: 1,
      opposite: 1,
    };
    if (r < 0.12) {
      opacity.right = 0;
      opacity.theta = 0;
      opacity.real = 0;
      opacity.sineTheta = 0;
      opacity.sine = 0;
      opacity.opposite = 0;
    } else if (r > Math.PI / 2 * 0.8) {
      opacity.right = 0;
    }
    if (right.isShown) {
      right.setAngle({
        p1: [p2.x, p2.y],
        p2: [p2.x, 0],
        p3: [0, 0],
      });
      right.setOpacity(opacity.right);
    }
    if (theta.isShown) {
      theta.setAngle({
        p1: [p2.x, 0],
        p2: [0, 0],
        p3: p2,
      });
      theta.setOpacity(opacity.theta);
    }
    if (real.isShown) {
      real.setAngle({
        p1: [p2.x, 0],
        p2: [0, 0],
        p3: p2,
      });
      real.setOpacity(opacity.real);
    }
    if (sineTheta.isShown) {
      sineTheta.setEndPoints([p2.x, 0], [p2.x, p2.y]);
      sineTheta.setOpacity(opacity.sineTheta);
    }
    if (sine.isShown) {
      sine.setEndPoints([p2.x, 0], [p2.x, p2.y]);
      sine.setOpacity(opacity.sine);
    }
    if (opposite.isShown) {
      opposite.setEndPoints([p2.x, 0], [p2.x, p2.y]);
      opposite.setOpacity(opacity.opposite);
    }
    if (hypotenuse.isShown) {
      hypotenuse.setEndPoints([0, 0], p2);
    }
    this.diagram.animateNextFrame();
  }
}
