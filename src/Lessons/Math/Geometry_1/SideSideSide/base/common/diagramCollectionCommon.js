// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  // DiagramElementCollection,
  Transform,
  DiagramObjectLine,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _left: DiagramObjectLine;
  _base: DiagramObjectLine;
  _right: DiagramObjectLine;
  _leftCircle: DiagramElementPrimative;
  _rightCircle: DiagramElementPrimative;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._left.makeTouchable();
    this._right.makeTouchable();
  }

  createConstructionLines(
    callback: ?() => void = null,
  ) {
    const leftRot = this._left.getRotation();
    const rightRot = this._right.getRotation();
    this._leftCircle.setRotation(leftRot);
    this._rightCircle.setRotation(rightRot);
    const createLeftCircle = (percent) => {
      this._leftCircle.angleToDraw = percent * Math.PI * 2;
      this._left.setRotation(percent * Math.PI * 2 + leftRot);
    };
    const createRightCircle = (percent) => {
      this._rightCircle.angleToDraw = percent * Math.PI * 2;
      this._right.setRotation(percent * Math.PI * 2 + rightRot);
    };
    this.animations.cancelAll();
    this.animations.new()
      .custom({ callback: createLeftCircle.bind(this), duration: 1 })
      .custom({ callback: createRightCircle.bind(this), duration: 1 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }
}
