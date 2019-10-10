// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import {
  makeAnglesClose, checkElementsForParallel,
} from './tools';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  DiagramElementCollection,
  DiagramObjectLine,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _markings: {
    _l1: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _l2: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _l3: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
      _mark2: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _l4: {
      _line: DiagramObjectLine;
      _mark: DiagramElementPrimitive;
      _mark2: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);

    this._line1.makeTouchable();
    this._line2.makeTouchable();
    this._line1.setScenario('center');
    this._line2.setScenario('center');

    this._line1.setTransformCallback = (t: Transform) => {
      this._line1.updateMoveTransform(t);
      this.normalizeAngle(this._line1);
      this.checkForParallel();
    };
    // this._line1.setMultiMovable(0.5, new Rect(-3, -1.6, 6, 2.8));
    // this._line2.setMultiMovable(0.5, new Rect(-3, -1.6, 6, 2.8));
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

  scaleLine(length: number) {
    this._line1.stop(true, 'noComplete');
    this._line2.stop(true, 'noComplete');
    const l1 = this._line1.length;
    const l2 = this._line1.length;
    this.hasTouchableElements = false;
    const setLength1 = (percent) => {
      this._line1.setLength(percent * (length - l1) + l1);
      this._line1.updateMoveTransform();
      this._line1.setTransform(this._line1.transform._dup());
    };
    const setLength2 = (percent) => {
      this._line2.setLength(percent * (length - l2) + l2);
      this._line2.updateMoveTransform();
      this._line2.setTransform(this._line2.transform._dup());
    };
    this._line1.animations.new()
      .custom({ callback: setLength1, duration: 1 })
      .start();
    this._line2.animations.new()
      .custom({ callback: setLength2, duration: 1 })
      .whenFinished(() => { this.hasTouchableElements = true; })
      .start();
    this.diagram.animateNextFrame();
  }

  rotateLine1ToParallel() {
    this._line1.stop();
    this._line2.stop();
    makeAnglesClose(this._line1, this._line2);

    // const r1 = this._line1.getRotation();
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
