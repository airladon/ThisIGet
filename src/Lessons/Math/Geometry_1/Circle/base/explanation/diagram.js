// @flow
import Fig from 'figureone';
import CircleCollection from './diagramCollectionCircle';
import type { CircleCollectionType } from './diagramCollectionCircle';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const { Point, minAngleDiff, Transform } = Fig.tools.g2;
const layout = lessonLayout();
const { colors } = layout;
const backgroundColor = colors.diagram.background;

// $FlowFixMe
class LessonDiagram extends CommonLessonDiagram {
  elements: CircleCollectionType;

  constructor(id: string) {
    const { limits } = lessonLayout();
    super({
      htmlId: `${id}`,
      limits,
      backgroundColor,
      vertexShader: 'withTexture',
      fragmentShader: 'withTexture',
    }, lessonLayout());
  }

  createDiagramElements() {
    const circleCollection = new CircleCollection(
      this,
      new Transform().translate(0, 0),
    );
    this.elements = circleCollection;
    this.fontScale = 1.2;
  }

  resize() {
    const { limits } = layout;
    this.limits = limits;
    this.elements.updateLimits(limits);
    super.resize();
  }

  touchUpHandler() {
    const rad = this.elements._circle._radius;
    const d = this.elements._circle._diameter;
    if (this.beingMovedElements.indexOf(d) >= 0) {
      this.elements._circle._diameter.stopBeingMoved();
      this.elements._circle._diameter.startMovingFreely();
    }
    if (this.beingMovedElements.indexOf(rad) >= 0) {
      this.elements._circle._radius.stopBeingMoved();
      this.elements._circle._radius.startMovingFreely();
    }

    if (this.beingMovedElements.indexOf(rad) === -1 && this.beingMovedElements.indexOf(d) === -1) {
      super.touchUpHandler();
    }

    this.beingMovedElements = [];
  }

  touchMoveHandler(
    previousClientPoint: Point,
    currentClientPoint: Point,
  ): boolean {
    if (this.beingMovedElements.length === 0) {
      return false;
    }
    const rad = this.elements._circle._radius;
    const d = this.elements._circle._diameter;
    if (rad.state.isBeingMoved
      || d.state.isBeingMoved) {
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

      let transform = this.elements._circle._diameter.transform._dup();
      if (rad.state.isBeingMoved) {
        transform = this.elements._circle._radius.transform._dup();
      }
      const rot = transform.r();
      if (rot != null) {
        transform.updateRotation(rot - diffAngle);
        if (rad.state.isBeingMoved) {
          this.elements._circle._radius.moved(transform._dup());
        } else {
          this.elements._circle._diameter.moved(transform._dup());
        }
      }
    } else {
      return super.touchMoveHandler(previousClientPoint, currentClientPoint);
    }
    this.animateNextFrame();
    return true;
  }
}

export default LessonDiagram;
