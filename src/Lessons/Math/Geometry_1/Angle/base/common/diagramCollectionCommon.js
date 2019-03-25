// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { clipAngle } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _angle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _fill: DiagramElementPrimative;
    _arrow: DiagramElementPrimative;
    _anchor: DiagramElementPrimative;
  } & DiagramElementCollection;

  _shapes: {
    _shape1: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      // _moreSharpCorners: DiagramElementCollection;
      _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
    _shape2: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      _moreSharpCorners: DiagramElementCollection;
      // _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
    _shape3: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      _moreSharpCorners: DiagramElementCollection;
      _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  angleIndex: number;

  constructor(
    diagram: CommonLessonDiagram,
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
    const rotation = clipAngle(r, '0to360');
    const extraRotation = clipAngle(r + 0.05, '0to360');
    this._angle._fill.setAngleToDraw(extraRotation);
    if (this._angle._arrow.isShown) {
      const angleToDisappear = 0.35;
      if (rotation > angleToDisappear) {
        this._angle._arrow.color[3] = 0;
        this._angle._arrow.color[3] = 1;
        this._angle._arrow.hide();
      } else {
        this._angle._arrow.color[3] = (angleToDisappear - rotation) / angleToDisappear;
        this._angle._arrow.transform.updateRotation(rotation);
        const x = this.layout.arrowLocation;
        this._angle._arrow.transform.updateTranslation(
          x * Math.cos(rotation), x * Math.sin(rotation),
        );
      }
    }
  }

  push() {
    const r = this._angle._line1.getRotation('0to360');
    this._angle._line1.stop(true, false);
    this._angle._line1.animations.new()
      .rotation({ target: r + 1, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseArrow() {
    this._angle._arrow.pulseScaleNow(0, 1.2, 0.7);
    this.diagram.animateNextFrame();
  }

  pulseAnchor() {
    this._angle._anchor.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseFill() {
    this._angle._fill.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseShapeElement(what: 'lines' | 'corners' | 'moreSharp' | 'lessSharp') {
    const shapes = this._shapes;
    shapes.hideAll();
    shapes._shape1._line.showAll();
    shapes._shape2._line.showAll();
    shapes._shape3._line.showAll();
    if (what === 'lines') {
      shapes._shape1._line.pulseThickNow(1, 1.05, 5);
      shapes._shape2._line.pulseThickNow(1, 1.05, 5);
      shapes._shape3._line.pulseThickNow(1, 1.05, 5);
    } else if (what === 'corners') {
      shapes._shape1._corners.show();
      shapes._shape2._corners.show();
      shapes._shape3._corners.show();
      shapes._shape1._corners.pulseScaleNow(1, 1.1);
      shapes._shape2._corners.pulseScaleNow(1, 1.1);
      shapes._shape3._corners.pulseScaleNow(1, 1.1);
    } else if (what === 'moreSharp') {
      shapes._shape2._moreSharpCorners.showAll();
      shapes._shape3._moreSharpCorners.showAll();
      shapes._shape2._moreSharpCorners.pulseScaleNow(1, 1.1);
      shapes._shape3._moreSharpCorners.pulseScaleNow(1, 1.1);
    } else if (what === 'lessSharp') {
      shapes._shape1._lessSharpCorners.showAll();
      shapes._shape3._lessSharpCorners.showAll();
      shapes._shape1._lessSharpCorners.pulseScaleNow(1, 1.1);
      shapes._shape3._lessSharpCorners.pulseScaleNow(1, 1.1);
    }
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

  toggleAngle(angleIndex: number | null) {
    const indeces = ['a', 'b', 'c', 'd', 'e'];
    if (angleIndex == null) {
      this.angleIndex = (this.angleIndex + 1) % 5;
    } else {
      this.angleIndex = angleIndex;
    }
    for (let i = 0; i < 5; i += 1) {
      // $FlowFixMe
      const angleElement = this._example[`_angle${indeces[i]}`];
      if (i === this.angleIndex) {
        angleElement.showAll();
        angleElement.pulseScaleNow(1, 1.3);
      } else {
        angleElement.stop(true, true);
        angleElement.hide();
      }
    }
    this.diagram.animateNextFrame();
  }

  pulseAngleLine() {
    const indeces = ['a', 'b', 'c', 'd', 'e'];
    // $FlowFixMe
    const angleElement = this._example[`_angle${indeces[this.angleIndex]}`];
    angleElement._curve.pulseThickNow(1, 1.08, 7);
    this.diagram.animateNextFrame();
  }

  pulseAngleLabel() {
    const indeces = ['a', 'b', 'c', 'd', 'e'];
    // $FlowFixMe
    const angleElement = this._example[`_angle${indeces[this.angleIndex]}`];
    angleElement._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }
}
