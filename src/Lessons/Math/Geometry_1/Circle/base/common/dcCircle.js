// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectAngle,
  Transform, Point,
} = Fig;

const { spaceToSpaceTransform } = Fig.tools.g2;

export default class CommonCollectionCircle extends CommonDiagramCollection {
  percentStraight: number;
  straightening: boolean;
  _locationText: DiagramElementPrimative;
  _grid: DiagramElementPrimative;
  _circle: {
    _anchor: DiagramElementPrimative;
    _line: DiagramElementPrimative;
    _arc: DiagramElementPrimative;
    _diameter: DiagramObjectLine;
    _radius: DiagramObjectLine;
    _circumference: {
      _leftArc: DiagramElementPrimative;
      _rightArc: DiagramElementPrimative;
      _leftLine: DiagramObjectLine;
      _rightLine: DiagramObjectLine;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

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

  updateCircleLocation() {
    if (this._locationText.isShown) {
      const l = this.getCircleLocation().round(1);
      this._locationText.drawingObject.setText(`Location:  x: ${l.x.toFixed(1)}  y: ${l.y.toFixed(1)}`);
    }
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

  pulseAnchor() {
    this._circle._anchor.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._radius.pulseWidth();
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
    const radius = this.layout.radius.options.length;
    let arcWidth = radius;
    if (percent > 0.5) {
      arcWidth = Math.sin(percent * Math.PI) * radius;
    }
    const scale = this._circle.transform.s();
    if (scale) {
      const width = (percent * radius * Math.PI + arcWidth) * scale.x;
      return width;
    }
    return radius;
  }

  bend(percent: number) {
    this.straighten(1 - percent);
  }

  // updateBoundaries(minWidth: number = 0) {
  //   const circle = this._circle;
  //   const s = circle.getScale();
  //   const percent = s.x;
  //   circle.move.minTransform.updateTranslation(
  //     layout.grid.position.x
  //       + Math.max(layout.circle.radius * percent, minWidth),
  //     layout.grid.position.y + layout.circle.radius * percent,
  //   );
  //   circle.move.maxTransform.updateTranslation(
  //     layout.grid.position.x + layout.grid.width
  //       - Math.max(layout.circle.radius * percent, minWidth),
  //     layout.grid.position.y + layout.grid.height
  //       - layout.circle.radius * percent,
  //   );
  // };

  setCircleMoveLimits(minWidth: number = 0) {
    const { width, height, location } = this.layout.grid.options;
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
}
