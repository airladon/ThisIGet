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
  // Line,
} = Fig;

const { rand } = Fig.tools.math;
const { getPoint } = Fig.tools.g2;

export default class CommonCollectionSAS extends CommonDiagramCollection {
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
    this.diagram.addElements(this, this.layout.addElementsSAS);
    this.hasTouchableElements = true;
    const fig = this._fig;
    fig.updatePointsCallback = () => {
      const side01 = fig._side01;
      if (side01.length < this.layout.sas.options.angle.curve.radius) {
        fig._angle1.hide();
      } else {
        fig._angle1.showAll();
      }
    };
  }

  setProblemStatement() {
    const fig = this._fig;
    fig.updatePoints(this.layout.sas.options.points.map(p => getPoint(p)));
    fig._pad0.setPosition(fig._pad1.getPosition().add(0, 0));
    fig._pad0.hide();
    fig._angle1.hide();
    fig._side01.hide();
  }

  setMovableLeg() {
    const fig = this._fig;
    fig.updatePoints(this.layout.sas.options.points.map(p => getPoint(p)));
    fig._pad0.makeTouchable();
    fig._pad0.isMovable = true;
  }

  oneLine() {
    const fig = this._fig;
    fig._pad0.setPositionToElement(fig._pad1);
    this.goToTri();
  }

  pulsePad() {
    this._fig._pad0.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  randRotation() {
    let delta = rand(Math.PI / 6, Math.PI / 4);
    const side01 = this._fig._side01;
    const radius = side01.length;
    const angle = side01.line.angle() + Math.PI;
    if (angle > Math.PI / 4 * 3 && angle < Math.PI * 3 / 2) {
      delta = -delta;
    }
    const p1 = this._fig._pad1.getPosition();
    const customMove = (percent) => {
      this._fig._pad0.setPosition(
        p1.x + radius * Math.cos(angle + delta * percent),
        p1.y + radius * Math.sin(angle + delta * percent),
      );
    };
    this._fig._pad0.animations.cancelAll();
    this._fig._pad0.animations.new()
      .custom({ callback: customMove, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  randLength() {
    let delta = rand(0.5, 1);
    const side01 = this._fig._side01;
    if (side01.length > 2) {
      delta = -delta;
    }
    const radius = side01.length;
    const angle = side01.line.angle() + Math.PI;
    const p1 = this._fig._pad1.getPosition();
    const customMove = (percent) => {
      this._fig._pad0.setPosition(
        p1.x + (radius + delta * percent) * Math.cos(angle),
        p1.y + (radius + delta * percent) * Math.sin(angle),
      );
    };
    this._fig._pad0.animations.cancelAll();
    this._fig._pad0.animations.new()
      .custom({ callback: customMove, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  goToTri() {
    this._fig._pad0.animations.cancelAll();
    this._fig._pad0.animations.new()
      .position({ target: this._fig._pad3.getPosition(), velocity: 1 })
      .whenFinished(() => {
        this._fig._side01._label.pulseScaleNow(1, 2);
        this._fig._angle1.pulseScaleNow(1, 1.3);
      })
      .start();
    this.diagram.animateNextFrame();
  }
}
