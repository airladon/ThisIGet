// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle,
  DiagramObjectLine,
  DiagramObjectPolyLine,
  DiagramElementCollection,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  // Line,
  // EquationLabel,
} = Fig;

const { rand } = Fig.tools.math;
const { getPoint } = Fig.tools.g2;

type TypeConfig = {
  _base: DiagramObjectLine;
  _angle: {
    _side1: DiagramObjectLine;
    _side2: DiagramObjectLine;
  } & DiagramObjectAngle;
  _line: DiagramObjectLine;
  _angle2: {
    _side1: DiagramObjectLine;
    _side2: DiagramObjectLine;
  } & DiagramObjectAngle;
  _line3: DiagramObjectLine;
} & DiagramElementCollection;

export default class CommonCollectionSAS extends CommonDiagramCollection {
  _fig: {
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _pad3: DiagramElementPrimitive;
    _side01: { _label: DiagramElementCollection } & DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _angle: DiagramObjectAngle;
  _base: DiagramObjectLine;
  _line: DiagramObjectLine;
  _config1: TypeConfig;
  _config2: TypeConfig;
  _config3: TypeConfig;
  _config4: TypeConfig;

  leftAngle: number;
  rightAngle: number;
  anglePosition: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElementsSAS, this);
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
    this._angle.setTransformCallback = () => {
      this._angle.update();
    };
  }

  toggleAngles() {
    this.animations.cancelAll();
    let target = (this.anglePosition + 1) % 5;
    if (target === 0) {
      target = 1;
    }
    this.animations.new()
      .scenarios({ target: `center${target}`, duration: 1 })
      .whenFinished(() => {
        this.anglePosition = target;
      })
      .start();
    this.diagram.animateNextFrame();
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

  setMovableLegReady() {
    const fig = this._fig;
    fig.updatePoints(this.layout.sas.options.points.map(p => getPoint(p)));
    fig._pad0.makeTouchable();
    fig._pad0.isMovable = true;
    fig._pad0.setPosition(1.5, 0.5);
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
    if (angle > Math.PI / 3 * 2 && angle < Math.PI * 3 / 2) {
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

  goToTri(callback: ?() => void = null) {
    this._fig._pad0.animations.cancelAll();
    this._fig._pad0.animations.new()
      .position({ target: this._fig._pad3.getPosition(), velocity: 1 })
      .trigger({
        duration: 1,
        callback: () => {
          this._fig._side01._label.pulseScaleNow(1, 2);
          this._fig._angle1.pulseScaleNow(1, 1.3);
        },
      })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  hideLabels(element: Object) {
    element._line3._label.hide();
    element._angle2.hide();
    element._angle.hide();
    element._line._label.hide();
    element._base._label.hide();
  }

  // eslint-disable-next-line class-methods-use-this
  showLabels(element: Object) {
    element._line3._label.showAll();
    element._angle2.showAll();
    element._angle.showAll();
    element._line._label.showAll();
    element._base._label.showAll();
  }

  createCongruentTriangles(callback: ?() => void = null, stop: boolean = false) {
    if (stop) {
      this.stop('complete');
    }
    this.configColors(this.layout.colors.sides, this.layout.colors.angles);
    this._config2.showAll();
    this._config3.showAll();
    this._config4.hideAll();
    this.hideLabels(this._config2);
    this.hideLabels(this._config3);
    const s = this._config1.getScale();
    const p = this._config1.getPosition();
    this._config2.setScale(s.x, -s.y);
    this._config2.setPosition(p.x, p.y - 1 - 0.2);
    this._config3.setScale(-s.x, s.y);
    this._config3.setPosition(p.x, p.y);
    this._config4.setScale(s.x, -s.y);        // $FlowFixMe - scenario exists
    const p3 = getPoint(this._config3.scenarios.showAll.position);
    this._config4.setPosition(p3.x, p3.y - 1 - 0.2);

    this.animations.new()
      .then(this._config2.anim.scenario({ target: 'showAll', duration: 1 }))
      .trigger({ callback: this.showLabels.bind(this, this._config2) })
      .then(this._config3.anim.scenario({ target: 'showAll', duration: 1 }))
      .trigger({ callback: this.showLabels.bind(this, this._config3) })
      .trigger({
        callback: () => {
          this._config4.showAll();
          this.hideLabels(this._config4);
        },
      })
      .then(this._config4.anim.scenario({ target: 'showAll', duration: 1 }))
      .trigger({ callback: this.showLabels.bind(this, this._config4) })
      .trigger({
        callback: this.configColors.bind(
          this, this.layout.colors.disabled, this.layout.colors.disabled,
        ),
      })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  configColors(color: Array<number>, color2: Array<number>) {
    this._config1._line3.setColor(color);
    this._config2._line3.setColor(color);
    this._config3._line3.setColor(color);
    this._config4._line3.setColor(color);
    this._config1._angle2.setColor(color2);
    this._config1._angle2._side1.setColor(color);
    this._config1._angle2._side2.setColor(color);
    this._config2._angle2.setColor(color2);
    this._config2._angle2._side1.setColor(color);
    this._config2._angle2._side2.setColor(color);
    this._config3._angle2.setColor(color2);
    this._config3._angle2._side1.setColor(color);
    this._config3._angle2._side2.setColor(color);
    this._config4._angle2.setColor(color2);
    this._config4._angle2._side1.setColor(color);
    this._config4._angle2._side2.setColor(color);
    this.diagram.animateNextFrame();
  }

  toggleConfig(showIn: ?boolean = null) {
    let show = !this._config1._line3.isShown;
    if (showIn != null) {
      show = showIn;
    }
    const showConfig = (config) => {
      if (show) {
        config._line3.showAll();
        config._angle2.showAll();
      } else {
        config._line3.hide();
        config._angle2.hide();
      }
    };
    showConfig(this._config1);
    showConfig(this._config2);
    showConfig(this._config3);
    showConfig(this._config4);
    this.diagram.animateNextFrame();
  }
}
