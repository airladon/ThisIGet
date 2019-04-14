// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection, DiagramObjectPolyLine,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  // Line,
} = Fig;

// const { rand, randElement } = Fig.tools.math;

// const { getPoint } = Fig.tools.g2;

export default class CommonCollectionSSS extends CommonDiagramCollection {
  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsSSS);
    this.hasTouchableElements = true;

    this._fig._left.makeTouchable();
  }

  trace() {
    const fig = this._fig;
    const leftCircle = fig._leftCircle;
    const rightCircle = fig._rightCircle;
    leftCircle.setRotation(fig._left.getRotation('0to360'));
    rightCircle.setRotation(fig._right.getRotation('0to360'));
    fig._left.setTransformCallback = () => {
      leftCircle.angleToDraw = left.getRotation('0to360')
    }
  }
}
