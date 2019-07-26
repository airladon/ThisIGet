// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  // DiagramElementCollection,
  Transform,
  DiagramObjectLine,
  DiagramElementCollection,
} = Fig;

// const { round, rand } = Fig.tools.math;

// const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollectionSSS extends CommonDiagramCollection {
  _left: { _label: DiagramElementCollection } & DiagramObjectLine;
  _base: DiagramObjectLine;
  _right: { _label: DiagramElementCollection } & DiagramObjectLine;;
  _leftCircle: DiagramElementPrimative;
  _rightCircle: DiagramElementPrimative;
  _leftBottom: { _label: DiagramElementCollection } & DiagramObjectLine;
  _rightBottom: { _label: DiagramElementCollection } & DiagramObjectLine;
  _constructionLine: { _label: DiagramElementCollection } & DiagramObjectLine;
  _angleTopLeft: { _label: DiagramElementCollection } & DiagramObjectAngle;
  _angleBottomLeft: { _label: DiagramElementCollection } & DiagramObjectAngle;
  _angleTopRight: { _label: DiagramElementCollection } & DiagramObjectAngle;
  _angleTop: { _label: DiagramElementCollection } & DiagramObjectAngle;
  _angleBottomRight: { _label: DiagramElementCollection } & DiagramObjectAngle;
  _angleBottom: { _label: DiagramElementCollection } & DiagramObjectAngle;
  location: 'top' | 'bottom';

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.sssPosition);
    this.diagram.addElements(this, this.layout.addElementsSSS);
    this.hasTouchableElements = true;
    this._left.makeTouchable();
    this._right.makeTouchable();
    // this._scaleLeft.setMovable(true);
    // this._scaleLeft.setTransformCallback = () => {
    //   this._anyCircleLeft.setScale(this._scaleLeft.getScale());
    // };
    // this._moveLeft.setMovable(true);
    // this._moveLeft.setTransformCallback = () => {
    //   const p = this._moveLeft.getPosition();
    //   this._scaleLeft.transform.updateTranslation(p);
    //   this._anyCircleLeft.setPosition(p);
    // };
    this._circ1._scale.setMovable(true);
    this._circ1._move.setMovable(true);
    this._circ1._scale.setTransformCallback = () => {
      this._circ1._line.setScale(this._circ1._scale.getScale());
    };
    this._circ1._move.move.element = this._circ1;

    this._circ2._scale.setMovable(true);
    this._circ2._move.setMovable(true);
    this._circ2._scale.setTransformCallback = () => {
      this._circ2._line.setScale(this._circ2._scale.getScale());
    };
    this._circ2._move.move.element = this._circ2;
  }

  createConstructionLines(
    callback: ?() => void = null,
  ) {
    const leftRot = this._left.getRotation();
    const rightRot = this._right.getRotation();
    this._leftCircle.setRotation(leftRot);
    this._rightCircle.setRotation(rightRot);
    this._leftCircle.angleToDraw = 0;
    this._rightCircle.angleToDraw = 0;
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
    // };
    // this._anyCircleLeft.setMovable(true);
    // this._anyCircleLeft.makeTouchable();
  }

  toggleIntersects(goTo: ?'top' | 'bottom', done: ?() => void = null) {
    let target = 'top';
    if (this.location === 'top') {
      target = 'bottom';
    }
    if (goTo != null) {
      target = goTo;
    }
    this.location = target;
    this.animations.cancelAll();
    this.animations.new()
      .scenarios({ target, duration: 0.5 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  updateLabels() {
    if (this._left.isShown) {
      this._left.updateLabel();
    }
    if (this._right.isShown) {
      this._right.updateLabel();
    }
    if (this._base.isShown) {
      this._base.updateLabel();
    }
    // if (this._leftBottom.isShown) {
    //   this._leftBottom.updateLabel();
    // }
    // if (this._rightBottom.isShown) {
    //   this._rightBottom.updateLabel();
    // }
    // if (this._angleBottomLeft.isShown) {
    //   this._angleBottomLeft.updateLabel();
    // }
    // if (this._angleTopLeft.isShown) {
    //   this._angleTopLeft.updateLabel();
    // }
    // if (this._angleBottomRight.isShown) {
    //   this._angleBottomRight.updateLabel();
    // }
    // if (this._angleTopRight.isShown) {
    //   this._angleTopRight.updateLabel();
    // }
    // if (this._angleTop.isShown) {
    //   this._angleTop.updateLabel();
    // }
    // if (this._angleBottom.isShown) {
    //   this._angleBottom.updateLabel();
    // }
    this.diagram.animateNextFrame();
  }

  // pulseLeftLabels() {
  //   this._left.showAll();
  //   this._leftBottom.showAll();
  //   this._left._label.pulseScaleNow(1, 2);
  //   this._leftBottom._label.pulseScaleNow(1, 2);
  //   this.diagram.animateNextFrame();
  // }

  // pulseRightLabels() {
  //   this._right.showAll();
  //   this._rightBottom.showAll();
  //   this._right._label.pulseScaleNow(1, 2);
  //   this._rightBottom._label.pulseScaleNow(1, 2);
  //   this.diagram.animateNextFrame();
  // }

  colorCircles(color: Array<number>) {
    this._leftCircle.setColor(color);
    this._rightCircle.setColor(color);
    this.diagram.animateNextFrame();
  }

  setDefaultColors() {
    this._left.setColor(this.layout.colors.sides);
    this._right.setColor(this.layout.colors.sides);
    this._leftBottom.setColor(this.layout.colors.sides);
    this._rightBottom.setColor(this.layout.colors.sides);
    this._constructionLine.setColor(this.layout.colors.sides);
    this._base.setColor(this.layout.colors.sides);
    this._angleTopLeft.setColor(this.layout.colors.angles);
    this._angleBottomLeft.setColor(this.layout.colors.angles);
    this._angleTopRight.setColor(this.layout.colors.angles);
    this._angleBottomRight.setColor(this.layout.colors.angles);
    this.diagram.animateNextFrame();
  }

  colorRightIsosceles() {
    this.setDefaultColors();
    this._left.setColor(this.layout.colors.disabled);
    this._leftBottom.setColor(this.layout.colors.disabled);
    this._base.setColor(this.layout.colors.disabled);
    this._angleTopLeft.setColor(this.layout.colors.disabled);
    this._angleBottomLeft.setColor(this.layout.colors.disabled);
    this.diagram.animateNextFrame();
  }

  colorLeftIsosceles() {
    this.setDefaultColors();
    this._right.setColor(this.layout.colors.disabled);
    this._rightBottom.setColor(this.layout.colors.disabled);
    this._base.setColor(this.layout.colors.disabled);
    this._angleTopRight.setColor(this.layout.colors.disabled);
    this._angleBottomRight.setColor(this.layout.colors.disabled);
    this.diagram.animateNextFrame();
  }

  colorTopBottomTriangles() {
    this.setDefaultColors();
    this._constructionLine.setColor(this.layout.colors.disabled);
    this.diagram.animateNextFrame();
  }

  pulseLeftIsosceles(done: ?() => void = null) {
    this.colorLeftIsosceles();
    this._left.pulseWidth();
    this._leftBottom.pulseWidth();
    this._constructionLine.pulseWidth({ done });
    this.diagram.animateNextFrame();
  }

  pulseRightIsosceles(done: ?() => void = null) {
    this.colorRightIsosceles();
    this._right.pulseWidth();
    this._rightBottom.pulseWidth();
    this._constructionLine.pulseWidth({ done });
    this.diagram.animateNextFrame();
  }

  pulseLeftIsoscelesAngles(done: ?() => void = null) {
    this.colorLeftIsosceles();
    this._angleTopLeft.pulseScaleNow(1, 1.3);
    this._angleBottomLeft.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseRightIsoscelesAngles(done: ?() => void = null) {
    this.colorRightIsosceles();
    this._angleTopRight.pulseScaleNow(1, 1.3);
    this._angleBottomRight.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTopTriangle() {
    this._left.pulseWidth();
    this._right.pulseWidth();
    this._base.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseBottomTriangle() {
    this._leftBottom.pulseWidth();
    this._rightBottom.pulseWidth();
    this._base.pulseWidth();
    this.diagram.animateNextFrame();
  }
}
