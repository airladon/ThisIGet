// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectAngle,
  Transform,
} = Fig;

const { spaceToSpaceTransform } = Fig.tools.g2;

export default class CommonCollectionCircle extends CommonDiagramCollection {
  _locationText: DiagramElementPrimative;
  _grid: DiagramElementPrimative;
  _circle: {
    _anchor: DiagramElementPrimative;
    _line: DiagramElementPrimative;
    _arc: DiagramElementPrimative;
    _diameter: DiagramObjectLine;
    _radius: DiagramObjectLine;
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

  setCircleMoveLimits() {
    const { width, height, location } = this.layout.grid.options;
    const { radius } = this.layout.circleLine.options;

    this._circle.move.maxTransform.updateTranslation(
      location.x + width - radius,
      location.y + height - radius,
    );
    this._circle.move.minTransform.updateTranslation(
      location.x + radius,
      location.y + radius,
    );
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
}
