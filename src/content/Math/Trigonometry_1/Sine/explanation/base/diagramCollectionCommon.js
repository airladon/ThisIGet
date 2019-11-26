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

  updateRotation() {
    const theta = this._fig._theta;
    const right = this._fig._right;
    const real = this._fig._real;
    const sineTheta = this._fig._sineTheta;
    const sine = this._fig._sine;
    const h = this._fig._h;
    const v = this._fig._v;
    const hypotenuse = this._fig._hypotenuse;
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
    };
    if (r < 0.12) {
      opacity.right = 0;
      opacity.theta = 0;
      opacity.real = 0;
      opacity.sineTheta = 0;
      opacity.sine = 0;
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
    if (hypotenuse.isShown) {
      hypotenuse.setEndPoints([0, 0], p2);
    }
    this.diagram.animateNextFrame();
  }
}
