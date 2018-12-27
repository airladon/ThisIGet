// @flow
import Fig from 'figureone';
import ShapesCollection from './diagramCollectionShapes';
import CircleCollection from './diagramCollectionCircle';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const { DiagramElementCollection } = Fig;
const {
  Point, Transform, minAngleDiff,
} = Fig.tools.g2;

const layout = lessonLayout();
const { colors } = layout;
const backgroundColor = colors.diagram.background;
type typeElements = {
  _circle: CircleCollection;
  _shapes: ShapesCollection;
} & DiagramElementCollection ;

// $FlowFixMe
class LessonDiagram extends CommonLessonDiagram {
  elements: typeElements;

  constructor(id: string) {
    const { limits } = lessonLayout();
    // console.log(limits);
    super({
      htmlId: `${id}`,
      limits,
      backgroundColor,
    }, lessonLayout());
  }

  createDiagramElements() {
    const { shapes } = this;
    this.elements = shapes.collection();

    const shapesCollection = new ShapesCollection(this, layout);
    this.add('shapes', shapesCollection);

    const circleCollection = new CircleCollection(
      this,
      new Transform().translate(layout.circle.center.x, layout.circle.center.y),
    );
    this.add('circle', circleCollection);

    this.elements.isTouchable = true;
    this.elements.isMovable = true;
    this.fontScale = 1.2;
  }

  resize() {
    const { limits } = layout;
    this.limits = limits;
    this.elements.updateLimits(limits);
    this.elements._shapes.resize(layout);
    this.elements._circle.resize(layout);
    super.resize();
  }

  draw(now: number): void {
    super.draw(now);
  }

  touchMoveHandler(
    previousClientPoint: Point,
    currentClientPoint: Point,
  ): boolean {
    if (this.beingMovedElements.length === 0) {
      return false;
    }
    if (!this.elements._circle.isShown) {
      return super.touchMoveHandler(previousClientPoint, currentClientPoint);
    }

    let center = this.elements._circle.transform.t();
    if (center === null || center === undefined) {
      center = new Point(0, 0);
    }
    const previousPixelPoint = this.clientToPixel(previousClientPoint);
    const currentPixelPoint = this.clientToPixel(currentClientPoint);

    const previousDiagramPoint =
      previousPixelPoint.transformBy(this.pixelToDiagramSpaceTransform.matrix());
    const currentDiagramPoint =
      currentPixelPoint.transformBy(this.pixelToDiagramSpaceTransform.matrix());
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

    this.animateNextFrame();
    return true;
  }
}

export default LessonDiagram;
