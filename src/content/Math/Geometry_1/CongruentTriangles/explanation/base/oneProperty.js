// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './onePropertyLayout';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  Line,
  parsePoint,
} = Fig;

const { rand } = Fig.tools.math;

// const { getPoint } = Fig.tools.g2;

export default class CommonCollectionOneProp extends CommonDiagramCollection {
  // _fig: {
  //   _tri: {
  //     _angle0: DiagramObjectAngle;
  //     _angle1: DiagramObjectAngle;
  //     _angle2: DiagramObjectAngle;
  //     _pad0: DiagramElementPrimitive;
  //     _pad1: DiagramElementPrimitive;
  //     _pad2: DiagramElementPrimitive;
  //   } & DiagramObjectPolyLine;
  // } & DiagramElementCollection;
  _sideTri: {
    _pad0: DiagramElementPrimitive;
    _side12: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _angleTri: {
    _pad0: { move: { limitLine: Line } } & DiagramElementPrimitive;
    _pad1: { move: { limitLine: Line } } & DiagramElementPrimitive;
    _angle2: DiagramObjectAngle;
  } & DiagramObjectPolyLine;

  leftAngle: number;
  rightAngle: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElementsOnePro, this);
    this.hasTouchableElements = true;
    this.resetTri();
  }

  randomSide() {
    const p = this._sideTri._pad0.getPosition();
    const x = rand(0, 2);
    const y = rand(0, 0.6);
    const target = [p.x + x, p.y + y];
    if (p.x > 0) {
      target[0] = p.x - x;
    }
    if (p.y > 0.6) {
      target[1] = p.y - y;
    }
    this._sideTri._pad0.stop('freeze');
    this._sideTri._pad0.animations.new()
      .position({ target, duration: 0.8 })
      .start();

    this.diagram.animateNextFrame();
  }

  pulseSide() {
    this._sideTri._side12._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._angleTri._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulsePad() {
    this._sideTri._pad0.pulseScaleNow(1, 3);
    this.diagram.animateNextFrame();
  }

  randomAngle() {
    // const pad = randElement([this._angleTri._pad0, this._angleTri._pad1]);
    const target0 = this._angleTri._pad0.move.bounds.getTranslation().boundary.pointAtPercent(rand(0, 1));
    const target1 = this._angleTri._pad1.move.bounds.getTranslation().boundary.pointAtPercent(rand(0, 1));
    this._angleTri._pad0.stop('freeze');
    this._angleTri._pad1.stop('freeze');
    this._angleTri._pad0.animations.new()
      .position({ target: target0, duration: 0.8 })
      .start();
    this._angleTri._pad1.animations.new()
      .position({ target: target1, duration: 0.8 })
      .start();
    this.diagram.animateNextFrame();
  }

  resetTri() {
    this._sideTri._pad0.move.bounds.updateTranslation({
      left: -2.5,
      bottom: 0,
      right: 2.5,
      top: 1.2,
    });
    this._sideTri._pad0.makeTouchable();
    const leftPoint = parsePoint(this.layout.angleTri.options.points[2]);
    const leftLine = new Line(leftPoint, 4.5, Math.PI / 6);
    const bottomLine = new Line(leftPoint, 4.5, 0);
    this._angleTri._pad0.move.bounds.updateTranslation(
      new Line(leftLine.pointAtPercent(0.4), leftLine.p2),
    );
    this._angleTri._pad1.move.bounds.updateTranslation(
      new Line(bottomLine.pointAtPercent(0.4), bottomLine.p2),
    );
    this._angleTri._pad0.makeTouchable();
  }
}
