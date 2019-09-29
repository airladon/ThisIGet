// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './layout';
// import textureMap from '../../../../../common/images/textureMaps/circles.png';

const {
  DiagramElementPrimitive,
  DiagramElementCollection,
  DiagramObjectLine,
  Transform, Point, Equation,
} = Fig;
// const textureFile = `/static/dist/${textureMap}`;
export default class CommonCollection extends CommonDiagramCollection {
  _circle: DiagramElementPrimitive;
  _wheel: DiagramElementPrimitive;
  _properties: {
    _circumference: {
      _line: DiagramElementPrimitive;
      _arrow: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _diameter: DiagramObjectLine;
    _d: DiagramElementPrimitive;
    _c: DiagramElementPrimitive;
    _darkCircle: DiagramElementPrimitive;
    _eqn: {
      _c: DiagramElementPrimitive;
      _d: DiagramElementPrimitive;
      _equals: DiagramElementPrimitive;
      _pi: DiagramElementPrimitive;
    } & Equation;
  } & DiagramElementCollection;

  propertiesPosition: number;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform('Circle').rotate(0).translate(0, 0),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.propertiesPosition = 0;
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }

  appearCircleAndMoveWheel(done: ?() => {}) {
    this._circle.animations.cancelAll();
    this._wheel.animations.cancelAll();

    this._circle.hide();
    this._circle.setScenario('left');
    this._wheel.setScenario('left');

    this._circle.animations.new()
      .dissolveIn(0.3)
      .pulse({ scale: 1.02, duration: 1, numLines: 5 })
      .scenario({ target: 'right', duration: 1.5 })
      .whenFinished(done)
      .start();

    this.diagram.animateNextFrame();
  }

  circumferenceAtAngle(angle: number) {
    const radius = this.layout.circumferenceRadius - this.layout.circumferenceLineWidth / 2;
    const height = this.layout.circumferenceArrowDimension;
    const arrowHeightAngle = height / radius;

    if (angle < 0.05) {
      this._properties._circumference._arrow.hide();
      this._properties._circumference._line.angleToDraw = angle;
    } else {
      this._properties._circumference._arrow.show();
      this._properties._circumference._line.angleToDraw = angle - arrowHeightAngle / 2;
      this._properties._circumference._arrow.setPosition(new Point(
        radius * Math.cos(-angle),
        radius * Math.sin(-angle),
      ));

      this._properties._circumference._arrow.setRotation(-angle + arrowHeightAngle + Math.PI);
    }
  }

  growCircumference(done: ?() => void = null, time: number = 1) {
    const grow = (percent: number) => {
      this.circumferenceAtAngle(percent * Math.PI * 2);
    };
    this._properties._circumference.animations.cancelAll();
    this._properties._circumference.animations.new('Circumference Growth')
      .custom({ callback: grow, duration: time })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  growDiameter(done: ?() => void = null, time: number = 1) {
    this._properties._diameter.showAll();
    this._properties._diameter.grow(0.2, time, true, done);
    this.diagram.animateNextFrame();
  }

  growDimensions(done: ?() => void = null, time: number = 3) {
    this._properties.animations.cancelAll('complete');
    const c = this._properties._c;
    const d = this._properties._d;
    const darkCircle = this._properties._darkCircle;
    const diameter = this._properties._diameter;
    diameter.hide();
    c.hide();
    d.hide();
    darkCircle.hide();
    this._properties.animations.new()
      .trigger({ callback: this.growCircumference.bind(this, null, time / 4), duration: time / 4 })
      .dissolveIn({ element: c, duration: time / 4 })
      .trigger(this.growDiameter.bind(this, null, time / 4))
      .dissolveIn({ element: darkCircle, duration: time / 4 })
      .then(d.anim.dissolveIn(time / 4))
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseCircle() {
    this._circle.pulseThickNow(1, 1.1, 5);
    this.diagram.animateNextFrame();
  }

  pulseProperties() {
    this._properties._c.pulseScaleNow(1, 1.7);
    this._properties._d.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  pulseEquation() {
    this._properties._eqn.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  makeEqnFromProperties(done: ?() => void = null) {
    const prop = this._properties;
    const eqn = prop._eqn;
    eqn.animations.cancelAll('complete');
    eqn.showForm('base');

    const cPosition = eqn._c.getPosition();
    const dPosition = eqn._d.getPosition();

    eqn.hideAll();
    // need to set first diagram transform again here as
    // setDiagramPositionToElement uses the lastDrawTransformMatrix
    // which has not necessarily been updated for the lastest scenario change
    this.diagram.setFirstTransform();
    eqn._c.setDiagramPositionToElement(prop._c);
    eqn._d.setDiagramPositionToElement(prop._d);
    eqn._c.show();
    eqn._d.show();

    eqn.animations.new()
      .inParallel([
        eqn._c.anim.position({ target: cPosition, duration: 1.5 }),
        eqn._d.anim.position({ target: dPosition, duration: 1.5 }),
      ])
      .inParallel([
        eqn._equals.anim.dissolveIn(1),
        eqn._pi.anim.dissolveIn(1),
      ])
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  toggleProperties() {
    let goToScenario = 'moreLeft';
    if (this.propertiesPosition === 0) {
      goToScenario = 'center';
    } else if (this.propertiesPosition === 1) {
      goToScenario = 'moreRight';
    }
    this.propertiesPosition = (this.propertiesPosition + 1) % 3;
    this._properties.setScenario(goToScenario);
    this.growDimensions(null, 2);
    this.diagram.animateNextFrame();
  }
}
