// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  DiagramElementPrimative,
  DiagramElementCollection,
  DiagramObjectLine,
  Transform, Equation,
  Point,
} = Fig;

type TypeCircumference = {
  _line: DiagramElementPrimative,
  _arrow: DiagramElementPrimative,
} & DiagramElementCollection;

type TypeDimensions = {
  _circumference: TypeCircumference,
  _diameter: DiagramObjectLine,
  _c: DiagramElementPrimative,
  _d: DiagramElementPrimative,
  _darkCircle: DiagramElementPrimative,
  _eqn: {
    _c: DiagramElementPrimative;
    _d: DiagramElementPrimative;
    _equals: DiagramElementPrimative;
    _pi: DiagramElementPrimative;
  } & Equation;
} & DiagramElementCollection;

// const textureFile = `/static/dist/${textureMap}`;
export default class Collection extends CommonDiagramCollection {
  _fig1: {
    _circle: DiagramElementPrimative;
    _wheel: DiagramElementPrimative;
  } & DiagramElementCollection;

  _properties: {
    _circumference: {
      _line: DiagramElementPrimative;
      _arrow: DiagramElementPrimative;
    } & DiagramElementCollection;
    _diameter: DiagramObjectLine;
    _d: DiagramElementPrimative;
    _c: DiagramElementPrimative;
    _darkCircle: DiagramElementPrimative;
    _eqn: {
      _c: DiagramElementPrimative;
      _d: DiagramElementPrimative;
      _equals: DiagramElementPrimative;
      _pi: DiagramElementPrimative;
    } & Equation;
  } & DiagramElementCollection;

  propertiesPosition: number;

  appearCircleAndMoveWheel() {
    this._fig1._circle.animations.cancelAll();
    this._fig1._wheel.animations.cancelAll();

    this._fig1._circle.hide();
    this._fig1._circle.setScenario('centerLeft');
    this._fig1._wheel.setScenario('centerLeft');

    this._fig1._circle.animations.new()
      .dissolveIn(0.3)
      .pulse({ scale: 1.02, duration: 1, numLines: 5 })
      .scenario({ target: 'centerRight', duration: 1.5 })
      .start();

    this.diagram.animateNextFrame();
  }

  circumferenceAtAngle(
    circumference: TypeCircumference,
    angle: number,
  ) {
    const radius = this.layout.circumferenceRadius - this.layout.circumferenceLineWidth / 2;
    const height = this.layout.circumferenceArrowDimension;
    const arrowHeightAngle = height / radius;

    if (angle < 0.05) {
      circumference._arrow.hide();
      circumference._line.angleToDraw = angle;
    } else {
      circumference._arrow.show();
      circumference._line.angleToDraw = angle - arrowHeightAngle / 2;
      circumference._arrow.setPosition(new Point(
        radius * Math.cos(-angle),
        radius * Math.sin(-angle),
      ));

      circumference._arrow.setRotation(-angle + arrowHeightAngle + Math.PI);
    }
  }

  growCircumference(circumference: TypeCircumference, time: number = 1) {
    const grow = (percent: number) => {
      this.circumferenceAtAngle(circumference, percent * Math.PI * 2);
    };
    circumference.animations.cancelAll();
    circumference.animations.new('Circumference Growth')
      .custom({ callback: grow, duration: time })
      .start();
    this.diagram.animateNextFrame();
  }

  growDiameter(diameter: DiagramObjectLine, time: number = 1) {
    diameter.showAll();
    diameter.grow(0.2, time, true);
    this.diagram.animateNextFrame();
  }

  growDimensions(
    dimensions: TypeDimensions,
    time: number = 4,
    done: (cancelled: boolean) => void,
  ) {
    dimensions.animations.cancelAll('complete');
    const c = dimensions._c;
    const d = dimensions._d;
    const darkCircle = dimensions._darkCircle;
    const diameter = dimensions._diameter;
    const circumference = dimensions._circumference;
    diameter.hide();
    c.hide();
    d.hide();
    darkCircle.hide();
    dimensions.animations.new()
      .trigger({
        callback: this.growCircumference.bind(this, circumference, time / 4),
        duration: time / 4,
      })
      .dissolveIn({ element: c, duration: time / 4 })
      .trigger(this.growDiameter.bind(this, diameter, time / 4))
      .dissolveIn({ element: darkCircle, duration: time / 4 })
      .then(d.anim.dissolveIn(time / 4))
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  // pulseCircle() {
  //   this._circle.pulseThickNow(1, 1.1, 5);
  //   this.diagram.animateNextFrame();
  // }

  pulseProperties(dimensions: TypeDimensions) {
    dimensions._c.pulseScaleNow(1, 1.7);
    dimensions._d.pulseScaleNow(1, 1.7);
    this.diagram.animateNextFrame();
  }

  // pulseEquation() {
  //   this._properties._eqn.pulseScaleNow(1, 1.7);
  //   this.diagram.animateNextFrame();
  // }

  makeEqnFromProperties(dimensions: TypeDimensions) {
    const prop = dimensions;
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
      .start();
    this.diagram.animateNextFrame();
  }

  // toggleProperties() {
  //   let goToScenario = 'moreLeft';
  //   if (this.propertiesPosition === 0) {
  //     goToScenario = 'center';
  //   } else if (this.propertiesPosition === 1) {
  //     goToScenario = 'moreRight';
  //   }
  //   this.propertiesPosition = (this.propertiesPosition + 1) % 3;
  //   this._properties.setScenario(goToScenario);
  //   this.growDimensions(null, 2);
  //   this.diagram.animateNextFrame();
  // }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Circle').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.propertiesPosition = 0;
    // const circles = this.diagram.shapes.collection(new Transform('circles').scale(1, 1).translate(0, 0));
    // this.diagram.elements.add('circles', circles);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }
}
