// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './twoPropertiesLayout';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  // Line,
  // parsePoint,
} = Fig;

const { rand } = Fig.tools.math;

// const { getPoint } = Fig.tools.g2;

export default class CommonCollectionTwoProp extends CommonDiagramCollection {
  _tri: {
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _side01: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _side12: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _side20: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _angle0: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle1: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle2: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
  } & DiagramObjectPolyLine;

  lastAuto: 'sideside' | 'angleangle' | 'adjacentAngleSide' | 'oppositeAngleSide';
  lastValue: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._tri._pad0.makeTouchable();
    this.lastAuto = 'sideside';
    this.lastValue = 1;
  }

  sideSide() {
    this._tri._pad2.scenarios.next = { position: [0, -1] };
    this._tri._pad1.scenarios.next = { position: [2, -1] };
    let r = rand(0.5, 1);
    if (this.lastAuto === 'sideside') {
      if (this.lastValue < 1.57) {
        r += this.lastValue;
      } else {
        r = this.lastValue - r;
      }
    }
    this.lastValue = r;
    this.lastAuto = 'sideside';
    this._tri._pad0.scenarios.next = {
      position: [
        1.5 * Math.cos(r),
        1.5 * Math.sin(r) - 1,
      ],
    };
    this._tri.cancel('noComplete');
    this._tri.animations.new()
      .scenarios({ target: 'next', duration: 0.8 })
      .whenFinished(() => {
        this._tri._side12._label.pulseScaleNow(1, 2);
        this._tri._side20._label.pulseScaleNow(1, 2);
      })
      .start();
    this.diagram.animateNextFrame();
  }

  angleAngle() {
    const a1 = Math.PI / 5;
    const a2 = Math.PI / 4;
    const ratio = Math.tan(a2) / Math.tan(a1);
    let d = rand(0.5, 1.5);
    if (this.lastAuto === 'angleangle') {
      if (this.lastValue < 3) {
        d = this.lastValue + d;
      } else {
        d = this.lastValue - d;
      }
    } else {
      d = 1 + d;
    }
    const d2 = d / (1 + ratio);
    const d1 = d - d2;
    const h = d2 * Math.tan(a2);
    this.lastValue = d;
    this.lastAuto = 'angleangle';
    this._tri._pad2.scenarios.next = { position: [-d1, -1] };
    this._tri._pad1.scenarios.next = { position: [d2, -1] };
    this._tri._pad0.scenarios.next = { position: [0, h - 1] };
    this._tri.cancel('noComplete');
    this._tri.animations.new()
      .scenarios({ target: 'next', duration: 0.8 })
      .whenFinished(() => {
        this._tri._angle1._label.pulseScaleNow(1, 2);
        this._tri._angle2._label.pulseScaleNow(1, 2);
      })
      .start();
    this.diagram.animateNextFrame();
  }

  adjacentAngleSide() {
    this._tri._pad2.scenarios.next = { position: [-2, -1.3] };
    this._tri._pad1.scenarios.next = { position: [2, -1.3] };
    let side = rand(0.5, 1);
    const angle = Math.PI / 4;
    if (this.lastAuto === 'adjacentAngleSide') {
      if (this.lastValue < 2.2) {
        side += this.lastValue;
      } else {
        side = this.lastValue - side;
      }
    } else {
      side += 1;
    }

    this._tri._pad0.scenarios.next = {
      position: [side * Math.cos(angle) - 2, side * Math.sin(angle) - 1.3],
    };
    this.lastValue = side;
    this.lastAuto = 'adjacentAngleSide';
    this._tri.cancel('noComplete');
    this._tri.animations.new()
      .scenarios({ target: 'next', duration: 0.8 })
      .whenFinished(() => {
        this._tri._side12._label.pulseScaleNow(1, 2);
        this._tri._angle2._label.pulseScaleNow(1, 2);
      })
      .start();
    this.diagram.animateNextFrame();
  }

  oppositeAngleSide() {
    const base = 3;
    const topAngle = 80 * Math.PI / 180;

    let left = rand(0.3, 0.8);
    if (this.lastAuto === 'oppositeAngleSide') {
      if (this.lastValue < 1.8) {
        left += 2;
      } else {
        left = 2 - left;
      }
    } else {
      left += 2;
    }

    const rightAngle = Math.asin(left / base * Math.sin(topAngle));
    const leftAngle = Math.PI - topAngle - rightAngle;
    this._tri._pad2.scenarios.next = { position: [-base / 2, -1.3] };
    this._tri._pad1.scenarios.next = { position: [base / 2, -1.3] };
    this._tri._pad0.scenarios.next = {
      position: [
        left * Math.cos(leftAngle) - base / 2, left * Math.sin(leftAngle) - 1.3,
      ],
    };
    this.lastValue = left;
    this.lastAuto = 'oppositeAngleSide';
    this._tri.cancel('noComplete');
    this._tri.animations.new()
      .scenarios({ target: 'next', duration: 0.8 })
      .whenFinished(() => {
        this._tri._side12._label.pulseScaleNow(1, 2);
        this._tri._angle0._label.pulseScaleNow(1, 2);
      })
      .start();
    this.diagram.animateNextFrame();
  }
}
