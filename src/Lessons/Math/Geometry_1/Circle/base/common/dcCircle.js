// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectAngle,
  Transform,
} = Fig;

export default class CommonCollectionCircle extends CommonDiagramCollection {
  _anchor: DiagramElementPrimative;
  _circle: DiagramElementPrimative;
  _arc: DiagramElementPrimative;
  _diameter: DiagramObjectLine;
  _radius: DiagramObjectLine;

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
    this._radius.setTransformCallback = this.updateArc.bind(this);
  }

  updateArc() {
    if (this._arc.isShown) {
      let r = this._radius.getRotation();
      while (r > Math.PI * 2) {
        r -= Math.PI * 2;
      }
      while (r < 0) {
        r += Math.PI * 2;
      }
      this._arc.setAngleToDraw(r);
      this.diagram.animateNextFrame();
    }
  }

  setCircleMoveLimits() {
    const { width, height, location } = this.layout.grid.options;
    const { radius } = this.layout.circ.options;

    this._circle.move.maxTransform.updateTranslation(
      location.x + width - radius,
      location.y + height - radius,
    );
    this._circle.move.minTransform.updateTranslation(
      location.x + radius,
      location.y + radius,
    );
  }

  pushRadius(toAngle: ?number) {
    const r = this._radius.getRotation();
    let target = r + 1;
    if (toAngle != null) {
      target = toAngle;
    }
    this.stop(true, false);
    this._radius.animations.new()
      .rotation({ target, duration: 1, direction: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAnchor() {
    this._anchor.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._radius.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseDiameter() {
    this._diameter.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseCircle() {
    this._circle.pulseThickNow(1, 1.04, 5);
    this.diagram.animateNextFrame();
  }
}
