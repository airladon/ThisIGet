// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { clipAngle } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _angle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _fill: DiagramElementPrimitive;
    _arrow: DiagramElementPrimitive;
    _anchor: DiagramElementPrimitive;
  } & DiagramElementCollection;

  angleIndex: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Angles').scale(1, 1).rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;

    this._angle._line1.makeTouchable();
    this._angle._line1.setTransformCallback = this.updateAngle.bind(this);
    this.angleIndex = 0;
  }

  updateAngle() {
    const r = this._angle._line1.getRotation();
    const extraRotation = clipAngle(r + 0.05, '0to360');
    this._angle._fill.setAngleToDraw(extraRotation);
  }

  pulseFill() {
    this._angle._fill.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  rotateLine(amount: 'small' | 'large' | '' = '') {
    const r = this._angle._line1.getRotation('0to360');
    const delta = Math.max(Math.random() * Math.PI / 5, Math.PI / 8);
    let target = 0;
    if (amount === 'small') {
      if (r < Math.PI / 4) {
        target = Math.PI / 4 + delta;
      } else {
        target = Math.PI / 4 - delta;
      }
    }
    if (amount === 'large') {
      if (r < 3 * Math.PI / 4) {
        target = 3 * Math.PI / 4 + delta;
      } else {
        target = 3 * Math.PI / 4 - delta;
      }
    }
    if (amount === '') {
      if (r < Math.PI / 2) {
        target = r + delta * 3;
      } else {
        target = r - delta * 3;
      }
    }
    // console.log(r, delta * 180 / Math.PI, target * 180 / Math.PI)
    this._angle._line1.stop(true, false);
    this._angle._line1.animations.new()
      .rotation({ target, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseLines() {
    this._angle._line1.pulseWidth();
    this._angle._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }
}
