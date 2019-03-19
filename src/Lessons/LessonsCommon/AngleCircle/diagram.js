// @flow
import Fig from 'figureone';
import type { circleType } from './AngleCircle';
import CommonLessonDiagram from '../CommonLessonDiagram';

const {
  DiagramElementCollection,
} = Fig;
const {
  Point, minAngleDiff, Transform,
} = Fig.tools.g2;

let layout: Object;
let CircleCollectionClass: Function;
type typeElements = {
  _circle: circleType;
} & DiagramElementCollection ;

class AngleCircleDiagram extends CommonLessonDiagram {
  elements: typeElements;
  CircleCollection: typeElements;

  constructor(id: string, lessonLayout: Object, CircleCollection: Function) {
    const { limits } = lessonLayout;
    layout = lessonLayout;
    CircleCollectionClass = CircleCollection;
    super({
      htmlId: `${id}`,
      limits,
    }, lessonLayout);
  }

  createDiagramElements() {
    const circleCollection = new CircleCollectionClass(this, new Transform().translate(0, 0));
    this.elements = circleCollection;

    this.elements.isTouchable = true;
    this.elements.isMovable = true;
    this.fontScale = 1.2;
  }

  resize() {
    const { limits } = layout;
    this.limits = limits;
    this.elements.updateLimits(limits);
    super.resize();
  }

  touchMoveHandler(
    previousClientPoint: Point,
    currentClientPoint: Point,
  ): boolean {
    if (this.beingMovedElements.length === 0) {
      return false;
    }
    if (this.elements._circle._radius.state.isBeingMoved) {
      let center = this.elements._circle.transform.t();
      if (center === null || center === undefined) {
        center = new Point(0, 0);
      }
      const previousPixelPoint = this.clientToPixel(previousClientPoint);
      const currentPixelPoint = this.clientToPixel(currentClientPoint);

      const previousDiagramPoint =
        previousPixelPoint.transformBy(this.spaceTransforms.pixelToDiagram.matrix());
      const currentDiagramPoint =
        currentPixelPoint.transformBy(this.spaceTransforms.pixelToDiagram.matrix());
      const currentAngle = Math.atan2(
        currentDiagramPoint.y - center.y,
        currentDiagramPoint.x - center.x,
      );
      const previousAngle = Math.atan2(
        previousDiagramPoint.y - center.y,
        previousDiagramPoint.x - center.x,
      );
      const diffAngle = minAngleDiff(previousAngle, currentAngle);
      const transform = this.elements._circle._radius.transform._dup();
      const rot = transform.r();
      if (rot != null) {
        transform.updateRotation(rot - diffAngle);
        this.elements._circle._radius.moved(transform);
      }
    } else {
      return super.touchMoveHandler(previousClientPoint, currentClientPoint);
    }

    this.animateNextFrame();
    return true;
  }
}

export default AngleCircleDiagram;
