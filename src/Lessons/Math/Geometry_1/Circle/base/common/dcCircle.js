// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElement,
  DiagramElementPrimative,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramEquation,
  // DiagramObjectAngle,
  Transform, Point,
} = Fig;

const { spaceToSpaceTransform } = Fig.tools.g2;
const { round } = Fig.tools.math;

export default class CommonCollectionCircle extends CommonDiagramCollection {
  percentStraight: number;
  straightening: boolean;
  containToGrid: boolean;
  _locationText: DiagramElementPrimative;
  _circumferenceText: DiagramElementPrimative;
  _diameterText: DiagramElementPrimative;
  _radiusText: DiagramElementPrimative;
  _grid: DiagramElementPrimative;
  _circle: {
    _center: DiagramElementPrimative;
    _line: DiagramElementPrimative;
    _arc: DiagramElementPrimative;
    _diameter: DiagramObjectLine;
    _radius: DiagramObjectLine;
    _scale: DiagramElementPrimative;
    _translate: DiagramElementPrimative;
    _circumference: {
      _leftArc: DiagramElementPrimative;
      _rightArc: DiagramElementPrimative;
      _leftLine: DiagramObjectLine;
      _rightLine: DiagramObjectLine;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _dEquation: {
    _diameter: DiagramElementPrimative;
    _equals: DiagramElementPrimative;
    __2: DiagramElementPrimative;
    _radius: DiagramElementPrimative;
  } & DiagramEquation;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Collection').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addCircleElements);
    this.hasTouchableElements = true;
    this.scenarios = layout.circleScenarios;
    this.setScenario('center');
    this._circle._radius.setTransformCallback = this.updateArc.bind(this);
    this._circle.setTransformCallback = this.updateCircleLocation.bind(this);
    this.percentStraight = 0;
    this.straightening = true;
    this._circle._scale.move.element = this._circle;
    this._circle._translate.move.element = this._circle;
    this._circumferenceText.onClick = this.straightenCircumference.bind(this);
    this._locationText.onClick = this.pulseCenter.bind(this);
    this._radiusText.onClick = this.pulseRadius.bind(this);
    this._diameterText.onClick = this.pulseDiameter.bind(this);
    this.containToGrid = false;
  }

  updateArc() {
    if (this._circle._arc.isShown) {
      let r = this._circle._radius.getRotation();
      while (r > Math.PI * 2) {
        r -= Math.PI * 2;
      }
      while (r < 0) {
        r += Math.PI * 2;
      }
      this._circle._arc.setAngleToDraw(r);
      this.diagram.animateNextFrame();
    }
  }

  // showOnlyAndPulse(element: DiagramElement) {
  //   this.stop(true, true);
  //   this._circle._radius.hide();
  //   this._circle._diameter.hide();
  //   this._circle._center.hide();

  //   if (element === this._circle._center) {
  //     element.show();
  //     this.pulseCenter();
  //   } else if (element === this._circle._radius) {
  //     element.showAll();
  //     this._circle._center.show();
  //     this.pulseRadius();
  //   } else if (element === this._circle._diameter) {
  //     element.showAll();
  //     this._circle._center.show();
  //     this.pulseDiameter();
  //   } else if (element === this._circle._line) {
  //     element.show();
  //     this.pulseCircle();
  //   }
  // }

  updateCircleLocation() {
    if (this._locationText.isShown) {
      const l = this.getCircleLocation().round(1);
      this._locationText.drawingObject.setText(`Location:  x: ${l.x.toFixed(1)}  y: ${l.y.toFixed(1)}`);
    }

    const { radius } = this.layout.circleLine.options;
    const gridLimits = this.layout.grid.options.limits;
    const gridWidth = this.layout.grid.options.width;
    const gridSpaceScale = gridLimits.width / gridWidth;
    // console.log(gridLimits.width)
    const scaledRadius = radius * this._circle.getScale().x * gridSpaceScale;

    if (this._circumferenceText.isShown) {
      const circumference = round(scaledRadius * 2 * Math.PI, 1);
      this._circumferenceText.drawingObject.setText(
        `Circumference: ${circumference.toFixed(1)}`,
      );
    }

    if (this._diameterText.isShown) {
      this._diameterText.drawingObject.setText(
        `Diameter: ${round(scaledRadius * 2, 1).toFixed(1)}`,
      );
    }

    if (this._radiusText.isShown) {
      this._radiusText.drawingObject.setText(
        `Radius: ${round(scaledRadius, 1).toFixed(1)}`,
      );
    }

    const width = this.widthOfCircumference();
    this.setCircleMoveLimits(width);

    this._circle.setTransformCallback = null;
    this._circle.setTransform(this._circle.transform);
    this._circle.setTransformCallback = this.updateCircleLocation.bind(this);
  }

  getCircleLocation() {
    const {
      width, height, location, limits,
    } = this.layout.grid.options;
    const p = this._circle.getPosition();
    const gridSpace = {
      x: { bottomLeft: limits.left, width: limits.width },
      y: { bottomLeft: limits.bottom, height: limits.height },
    };
    const diagramSpace = {
      x: { bottomLeft: location.x, width },
      y: { bottomLeft: location.y, height },
    };

    const diagramToGrid = spaceToSpaceTransform(diagramSpace, gridSpace);
    return p.transformBy(diagramToGrid.matrix());
  }

  pushRadiusRandom() {
    const r = Math.random() * Math.PI + Math.PI / 2;
    this.pushRadius(this._circle._radius.getRotation() + r);
  }

  pushRadius(toAngle: ?number) {
    const r = this._circle._radius.getRotation();
    let target = r + 1;
    if (toAngle != null) {
      target = toAngle;
    }
    this.stop(true, false);
    this._circle._radius.animations.new()
      .rotation({ target, duration: 1, direction: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pushDiameterRandom() {
    const r = Math.random() * Math.PI / 2 + Math.PI / 4;
    this.pushDiameter(this._circle._diameter.getRotation() + r);
  }

  pushDiameter(toAngle: ?number) {
    const r = this._circle._diameter.getRotation();
    let target = r + 1;
    if (toAngle != null) {
      target = toAngle;
    }
    this.stop(true, false);
    this._circle._diameter.animations.new()
      .rotation({ target, duration: 1, direction: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseCenter() {
    this._circle._center.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._radius.pulseWidth();
    this.diagram.animateNextFrame();
  }

  growRadius() {
    this._circle._radius.grow(0, 1.5);
    this.diagram.animateNextFrame();
  }

  growDiameter() {
    this._circle._diameter.grow(0, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseDiameter() {
    this._circle._diameter.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseCircle() {
    this._circle._line.pulseThickNow(1, 1.04, 5);
    this.diagram.animateNextFrame();
  }

  pushCircle() {
    let t = this._circle.transform.t();
    if (t === null || t === undefined) {
      t = new Point(0.001, 0.001);
    }
    if (t.x === 0) {
      t.x = 0.001;
    }
    if (t.y === 0) {
      t.y = 0.001;
    }

    this._circle.state.movement.velocity.updateTranslation(
      Math.random() * 10 * t.x / Math.abs(t.x) * -1,
      Math.random() * 10 * t.y / Math.abs(t.y) * -1,
    );

    this._circle.startMovingFreely();
    this.diagram.animateNextFrame();
  }

  diameterEquationSimplify() {
    const eqn = this._dEquation;
    eqn.showForm('diameter');
    eqn._d.show();
    eqn._r.show();
    eqn._d.setPosition(eqn._diameter.getPosition());
    eqn._r.setPosition(eqn._radius.getPosition());
    eqn.stop(true, true);
    eqn.animateToForm('d');
    this.diagram.animateNextFrame();
  }

  diameterEquationOriginal() {
    const eqn = this._dEquation;
    eqn.showForm('d');
    eqn.stop(true, true);
    eqn.animateToForm('diameter');
    this.diagram.animateNextFrame();
  }

  diameterEquationToggle() {
    const eqn = this._dEquation;
    const form = eqn.getCurrentForm().name;
    if (form === 'diameter') {
      this.diameterEquationSimplify();
    } else {
      this.diameterEquationOriginal();
    }
  }

  straighten(percent: number) {
    const rightLine = this._circle._circumference._rightLine;
    const leftLine = this._circle._circumference._leftLine;
    const rightArc = this._circle._circumference._rightArc;
    const leftArc = this._circle._circumference._leftArc;
    const centerY = 0;
    const radius = this.layout.radius.options.length;

    rightLine.setLength(percent * Math.PI * radius);
    leftLine.setLength(percent * Math.PI * radius);

    rightArc.transform.updateTranslation(
      percent * radius * Math.PI,
      centerY,
    );
    rightArc.angleToDraw = (1 - percent) * Math.PI;
    if (rightArc.angleToDraw === Math.PI) {
      rightArc.angleToDraw = -1;
    }

    leftArc.transform.updateTranslation(
      -percent * radius * Math.PI,
      centerY,
    );
    leftArc.angleToDraw = (1 - percent) * Math.PI;
    if (leftArc.angleToDraw === Math.PI) {
      leftArc.angleToDraw = -1;
    }

    this.percentStraight = percent;

    const width = this.widthOfCircumference();
    this.setCircleMoveLimits(width);
    this._circle.setTransform(this._circle.transform);
  }

  widthOfCircumference() {
    const percent = this.percentStraight;
    const scale = this._circle.getScale();
    const radius = this.layout.radius.options.length;

    let arcWidth = radius;
    if (percent > 0.5) {
      arcWidth = Math.sin(percent * Math.PI) * radius;
    }
    if (scale) {
      const width = (percent * radius * Math.PI + arcWidth) * scale.x;
      return width * 2;
    }
    return radius * 2 * scale.x;
  }

  bend(percent: number) {
    this.straighten(1 - percent);
  }

  setCircleMoveLimits(minWidth: number = 0) {
    let width;
    let height;
    let location;
    if (this.containToGrid) {
      ({ width, height, location } = this.layout.grid.options);
    } else {
      ({ width } = this.diagram.limits);
      ({ height } = this.diagram.limits);
      location = new Point(this.diagram.limits.left, this.diagram.limits.bottom);
    }
    const { radius } = this.layout.circleLine.options;
    const scale = this._circle.getScale().x;
    this._circle.move.maxTransform.updateTranslation(
      location.x + width - Math.max(radius * scale, minWidth / 2),
      location.y + height - radius * scale,
    );
    this._circle.move.minTransform.updateTranslation(
      location.x + Math.max(radius * scale, minWidth / 2),
      location.y + radius * scale,
    );
  }

  straightenCircumference() {
    this._circle._circumference.stop(true, false);
    if (this.straightening || this.percentStraight === 1) {
      this.straightening = false;
      this._circle._circumference.animations.new()
        .custom({
          callback: this.bend.bind(this),
          duration: 4,
          startPercent: 1 - this.percentStraight,
        })
        .start();
    } else {
      this.straightening = true;
      this._circle._circumference.animations.new()
        .custom({
          callback: this.straighten.bind(this),
          duration: 4,
          startPercent: this.percentStraight,
        })
        .start();
    }
    this.diagram.animateNextFrame();
  }

  setDiameterAndRadiusRotation(
    animate: boolean = false,
    whenFinished: ?() => void = null,
  ) {
    const r = this._circle._radius.getRotation('0to360');
    const d = this._circle._diameter.getRotation('0to360');
    if (
      (r < 0.1 || r > Math.PI * 1.9)
      && (d < 0.1 || d > Math.PI * 1.9)
    ) {
      if (animate) {
        this._circle._radius.stop(true, false);
        this._circle._radius.animations.new()
          .rotation({ target: 0.5, duration: 1 })
          .whenFinished(whenFinished)
          .start();
        this._circle._diameter.stop(true, false);
        this._circle._diameter.animations.new()
          .rotation({ target: -0.5, duration: 1 })
          .start();
      } else {
        this._circle._radius.stop(true, false);
        this._circle._diameter.stop(true, false);
        this._circle._radius.setRotation(0.5);
        this._circle._diameter.setRotation(-0.5);
        if (whenFinished != null) {
          whenFinished();
        }
      }
    } else if (whenFinished != null) {
      whenFinished();
    }
    this.diagram.animateNextFrame();
  }
}
