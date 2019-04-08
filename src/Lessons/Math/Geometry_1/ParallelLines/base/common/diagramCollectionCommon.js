// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import {
  makeAnglesClose, checkElementsForParallel,
} from './tools';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectLine,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);

    this._line1.makeTouchable();
    this._line2.makeTouchable();

    this._line1.setTransformCallback = (t: Transform) => {
      this._line1.updateMoveTransform(t);
      this.normalizeAngle(this._line1);
      this.checkForParallel();
    };
    this._line2.setTransformCallback = (t: Transform) => {
      this._line2.updateMoveTransform(t);
      this.normalizeAngle(this._line2);
      this.checkForParallel();
    };
  }

  checkForParallel(makeRotationEqual: boolean = false) {
    const isParallel = checkElementsForParallel(
      this._line1, this._line2,
      makeRotationEqual, this.layout.width * 1.1,
    );
    if (isParallel) {
      this._line1.setColor(this.layout.colors.lines);
      if (this._line1._midLine) {
        this._line1._midLine.setColor(this.layout.colors.lines);
      }
      this._line2.setColor(this.layout.colors.lines);
    } else {
      this._line1.setColor(this.layout.colors.notParallel);
      this._line2.setColor(this.layout.colors.notParallel);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  normalizeAngle(element: DiagramObjectLine) {
    const angle = element.getRotation('0to360');
    element.transform.updateRotation(angle);
  }

  pulseParallel() {
    this._line1.pulseWidth();
    this._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  rotateLine1ToParallel() {
    this._line1.stop();
    this._line2.stop();
    makeAnglesClose(this._line1, this._line2);

    const r1 = this._line1.getRotation();
    const r2 = this._line2.getRotation();
    if (checkElementsForParallel(this._line1, this._line2, false, this.layout.width * 1.1)) {
      this.pulseParallel();
    } else {
      this._line1.animations.new()
        .rotation({
          target: r2,
          direction: 0,
          velocity: 2 * Math.PI / 6,
          onFinish: this.pulseParallel.bind(this),
        })
        .start();
    }
    this.diagram.animateNextFrame();
  }
}
