// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle,
  DiagramObjectLine,
  DiagramObjectPolyLine,
  // DiagramElementCollection,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  Line,
} = Fig;

const { rand } = Fig.tools.math;

const { getPoint } = Fig.tools.g2;

export default class CommonCollectionASA extends CommonDiagramCollection {
  _fig: {
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _pad3: DiagramElementPrimitive;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  leftAngle: number;
  rightAngle: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsASA);
    this.hasTouchableElements = true;
    this.resetTri();
    this._fig._pad0.color = this.layout.colors.diagram.background;
    this._fig._pad3.color = this.layout.colors.diagram.background;
  }

  initialTri() {
    const fig = this._fig;
    fig._pad0.isTouchable = false;
    fig._pad3.isTouchable = false;
    const points = this.layout.asa.options.points.map(p => getPoint(p));
    const line10 = new Line(points[1], points[0]);
    fig._pad0.move.limitLine = null;
    fig._pad0.setPosition(line10.pointAtPercent(0.25));
    const line23 = new Line(points[2], points[3]);
    fig._pad3.move.limitLine = null;
    fig._pad3.setPosition(line23.pointAtPercent(0.15));
  }

  resetTri() {
    const fig = this._fig;
    fig._pad0.makeTouchable();
    fig._pad3.makeTouchable();
    const points = this.layout.asa.options.points.map(p => getPoint(p));
    const line10 = new Line(points[1], points[0]);
    const moveLine01 = new Line(line10.pointAtPercent(0.4), 1.7, line10.angle());
    fig._pad0.move.limitLine = moveLine01;
    const line23 = new Line(points[2], points[3]);
    const moveLine23 = new Line(line23.midPoint(), 2.7, line23.angle());
    fig._pad3.move.limitLine = moveLine23;
  }

  randLength(sideId: '01' | '23') {
    const fig = this._fig;
    const side = fig[`_side${sideId}`];
    const { points } = this.layout.asa.options;
    const line10 = new Line(getPoint(points[1]), getPoint(points[0]));
    const line23 = new Line(getPoint(points[2]), getPoint(points[3]));
    let line = line10;
    let pad = fig._pad0;
    if (sideId === '23') {
      line = line23;
      pad = fig._pad3;
    }
    let delta = rand(0.7, 1.2) + Math.abs(line.length() - side.length);
    if (side.length > line.length()) {
      delta = -delta;
    }
    const currentLength = side.length;
    const angle = line.angle();
    const customMove = (percent) => {
      pad.setPosition(
        line.p1.x + (currentLength + delta * percent) * Math.cos(angle),
        line.p1.y + (currentLength + delta * percent) * Math.sin(angle),
      );
    };
    pad.animations.cancelAll();
    pad.animations.new()
      .custom({ callback: customMove, duration: 0.5 })
      .start();
    this.diagram.animateNextFrame();
  }

  goToTri(callback: ?() => void = null, setInitial: boolean) {
    const target = getPoint(this.layout.asa.options.points[0]);
    this._fig.animations.cancelAll();
    if (setInitial) {
      this.initialTri();
    }
    this._fig.animations.new()
      .inParallel([
        this._fig._pad0.anim.position({ target, velocity: 1 }),
        this._fig._pad3.anim.position({ target, velocity: 1.9 }),
      ])
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }
}
