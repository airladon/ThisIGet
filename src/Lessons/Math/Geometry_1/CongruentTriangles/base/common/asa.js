// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle,
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
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _pad3: DiagramElementPrimative;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  leftAngle: number;
  rightAngle: number;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsASA);
    this.hasTouchableElements = true;
    this.resetTri();
  }

  resetTri() {
    const fig = this._fig;
    fig._pad0.makeTouchable();
    fig._pad3.makeTouchable();
    const line10 = new Line(fig.points[1], fig.points[0]);
    const moveLine01 = new Line(line10.pointAtPercent(0.4), 2.2, line10.angle());
    fig._pad0.move.limitLine = moveLine01;
    const line23 = new Line(fig.points[2], fig.points[3]);
    const moveLine23 = new Line(line23.midPoint(), 3, line23.angle());
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
    let delta = rand(0.7, 1.3) + Math.abs(line.length() - side.length);
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
      .custom({ callback: customMove, duration: 0.3 })
      .start();
    this.diagram.animateNextFrame();
  }

  goToTri() {
    const target = getPoint(this.layout.asa.options.points[0]);
    this._fig._pad0.animations.cancelAll();
    this._fig._pad0.animations.new()
      .position({ target, velocity: 1 })
      .start();
    this._fig._pad3.animations.cancelAll();
    this._fig._pad3.animations.new()
      .position({ target, velocity: 1 })
      .start();
    this.diagram.animateNextFrame();
  }
}
