// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  Transform,
  DiagramObjectLine,
  DiagramElementCollection,
  Point,
} = Fig;

const { rand, randElement } = Fig.tools.math;

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

  _circ1: {
    _scale: DiagramElementPrimative;
    _line: DiagramElementPrimative;
  } & DiagramElementCollection;

  _circ2: {
    _scale: DiagramElementPrimative;
    _line: DiagramElementPrimative;
  } & DiagramElementCollection;

  _pad1: DiagramElementPrimative;
  _pad2: DiagramElementPrimative;
  _rad1: DiagramObjectLine;
  _rad2: DiagramObjectLine;
  _baseLine: DiagramObjectLine;
  _flipTri: DiagramObjectPolyLine;
  _fixedTri: DiagramObjectPolyLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.sssPosition);
    this.diagram.addElements(this, this.layout.addElementsSSS);
    this.hasTouchableElements = true;
    // this._left.makeTouchable();
    // this._right.makeTouchable();

    this._circ1._scale.setMovable(true);
    this._pad1.setMovable(true);
    this._circ1._scale.setTransformCallback = () => {
      this._circ1._line.setScale(this._circ1._scale.getScale());
      this._rad1.setLength(this._circ1._scale.getScale().x * this.layout.defaultLen);
      this._rad1.interactiveLocation = new Point(this._rad1.length * 0.8, 0);
    };
    this._pad1.setTransformCallback = () => {
      this._circ1.setPositionToElement(this._pad1);
      this._rad1.setPositionToElement(this._pad1);
      this._baseLine.setEndPoints(this._pad1.getPosition(), this._pad2.getPosition());
    };

    this._circ2._scale.setMovable(true);
    this._pad2.setMovable(true);
    this._circ2._scale.setTransformCallback = () => {
      this._circ2._line.setScale(this._circ2._scale.getScale());
      this._rad2.setLength(this._circ2._scale.getScale().x * this.layout.defaultLen);
      this._rad2.interactiveLocation = new Point(this._rad2.length * 0.8, 0);
    };
    this._pad2.setTransformCallback = () => {
      this._circ2.setPositionToElement(this._pad2);
      this._rad2.setPositionToElement(this._pad2);
      this._baseLine.setEndPoints(this._pad1.getPosition(), this._pad2.getPosition());
    };
  }

  // createConstructionLines(
  //   callback: ?() => void = null,
  // ) {
  //   const leftRot = this._left.getRotation();
  //   const rightRot = this._right.getRotation();
  //   this._leftCircle.setRotation(leftRot);
  //   this._rightCircle.setRotation(rightRot);
  //   this._leftCircle.angleToDraw = 0;
  //   this._rightCircle.angleToDraw = 0;
  //   const createLeftCircle = (percent) => {
  //     this._leftCircle.angleToDraw = percent * Math.PI * 2;
  //     this._left.setRotation(percent * Math.PI * 2 + leftRot);
  //   };
  //   const createRightCircle = (percent) => {
  //     this._rightCircle.angleToDraw = percent * Math.PI * 2;
  //     this._right.setRotation(percent * Math.PI * 2 + rightRot);
  //   };
  //   this.animations.cancelAll();
  //   this.animations.new()
  //     .custom({ callback: createLeftCircle.bind(this), duration: 1 })
  //     .custom({ callback: createRightCircle.bind(this), duration: 1 })
  //     .whenFinished(callback)
  //     .start();
  //   this.diagram.animateNextFrame();
  //   // };
  //   // this._anyCircleLeft.setMovable(true);
  //   // this._anyCircleLeft.makeTouchable();
  // }

  goToSamePosition(done: ?() => void = null) {
    let position = rand(0, 1);
    if (this._pad1.getPosition().x > 0) {
      position *= -1;
    }
    this.goToPositionAndScale(
      position, position, rand(0.3, 1), rand(0.3, 1), done,
    );
  }

  goToPositionAndScale(
    p1: number,
    p2: number,
    s1: number,
    s2: number,
    done: ?() => void = null,
    duration: ?number = 1,
    angle1: number = this._rad1.getRotation(),
    angle2: number = this._rad2.getRotation(),
  ) {
    this._pad1.stop(true, 'noComplete');
    this._pad2.stop(true, 'noComplete');
    this._circ1.stop(true, 'noComplete');
    this._circ2.stop(true, 'noComplete');

    this._pad1.animations.new()
      .position({ target: [p1, 0], duration })
      .start();
    this._pad2.animations.new()
      .position({ target: [p2, 0], duration })
      .start();
    this._circ1._scale.animations.new()
      .scale({ target: [s1, s1], duration })
      .start();
    this._circ2._scale.animations.new()
      .scale({ target: [s2, s2], duration })
      .start();
    this._rad1.animations.new()
      .rotation({ target: angle1, duration })
      .start();
    this._rad2.animations.new()
      .rotation({ target: angle2, duration })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  goToNoOverlap(done: ?() => void = null) {
    const scenario = randElement(['separate', 'within']);
    let s1;
    let s2;
    let p1;
    let p2;
    const len = s => s * this.layout.defaultLen;

    if (scenario === 'separate') {
      s1 = rand(0.3, 0.8);
      s2 = rand(0.3, 0.8);
      p1 = rand(0.5, 1, true);
      if (p1 > 0) {
        p2 = p1 - (len(s1) + len(s2) + rand(0.05, 0.5));
      } else {
        p2 = p1 + (len(s1) + len(s2) + rand(0.05, 0.5));
      }
    } else {
      s1 = rand(0.3, 1);
      if (s1 < 0.6) {
        s2 = rand(s1 + 0.1, 1);
      } else {
        s2 = rand(0.3, s1 - 0.1);
      }
      p1 = rand(0, 1, true);
      p2 = rand(0.1, Math.abs(len(s2) - len(s1)) * 0.8, true) + p1;
    }
    this.goToPositionAndScale(p1, p2, s1, s2, done);
  }


  getIntersectAngles(
    p1: number = this._pad1.getPosition().x,
    p2: number = this._pad2.getPosition().x,
    s1: number = this._circ1._scale.getScale().x,
    s2: number = this._circ2._scale.getScale().x,
  ) {
    // const p1 = ;
    // const p2 = ;
    // const s1 = this._circ1._scale.getScale().x;
    // const s2 = this._circ2._scale.getScale().x;
    const len = s => s * this.layout.defaultLen;
    const r2 = len(s2);
    const r1 = len(s1);
    const x = (r2 ** 2 - r1 ** 2 - p2 ** 2 + p1 ** 2) / (2 * p1 - 2 * p2);
    const y = Math.sqrt(r1 ** 2 - (x - p1) ** 2);
    const topAngle1 = Math.atan2(y, x - p1);
    const topAngle2 = Math.atan2(y, x - p2);
    const bottomAngle1 = Math.atan2(-y, x - p1);
    const bottomAngle2 = Math.atan2(-y, x - p2);
    return [topAngle1, topAngle2, bottomAngle1, bottomAngle2];
  }


  goToOverlapIntersect(done: ?() => void = null) {
    // const len = s => s * this.layout.defaultLen;
    // const r2 = len(s2);
    // const r1 = len(s1);
    // const x = (r2 ** 2 - r1 ** 2 - p2 ** 2 + p1 ** 2) / (2 * p1 - 2 * p2);
    // let y = Math.sqrt(r1 ** 2 - (x - p1) ** 2);
    const [top1, top2, bottom1, bottom2] = this.getIntersectAngles();
    // const [x, y]
    let angle1 = top1;
    let angle2 = top2;
    this._rad1.updateLineGeometry();
    this._rad2.updateLineGeometry();
    if (this._rad1.line.p2.y > 0 && this._rad2.line.p2.y > 0) {
      // y *= -1;
      angle1 = bottom1;
      angle2 = bottom2;
    }
    // const angle1 = Math.atan2(y, x - p1);
    // const angle2 = Math.atan2(y, x - p2);
    if (!Number.isNaN(angle1) && !Number.isNaN(angle2)) {
      const p1 = this._pad1.getPosition().x;
      const p2 = this._pad2.getPosition().x;
      const s1 = this._circ1._scale.getScale().x;
      const s2 = this._circ2._scale.getScale().x;
      this.goToPositionAndScale(p1, p2, s1, s2, done, 0.8, angle1, angle2);
    } else {
      this.goToOverlap(done);
    }
  }

  goToOverlap(done: ?() => void = null) {
    const p1 = rand(0.4, 1, true);
    const s1 = rand(0.3, 1);
    const s2 = rand(0.3, 1);
    const len = s => s * this.layout.defaultLen;
    let p2;
    if (p1 > 0) {
      p2 = p1 - (len(s1) + len(s2) - rand(0.05, Math.min(len(s1), len(s2)) * 2 * 0.8));
    } else {
      p2 = p1 + (len(s1) + len(s2) - rand(0.05, Math.min(len(s1), len(s2)) * 2 * 0.8));
    }
    const r2 = len(s2);
    const r1 = len(s1);
    const x = (r2 ** 2 - r1 ** 2 - p2 ** 2 + p1 ** 2) / (2 * p1 - 2 * p2);
    const y = Math.sqrt(r1 ** 2 - (x - p1) ** 2);
    const angle1 = Math.atan2(y, x - p1);
    const angle2 = Math.atan2(y, x - p2);
    this.goToPositionAndScale(p1, p2, s1, s2, done, 0.8, angle1, angle2);
  }

  // toggleIntersects(goTo: ?'top' | 'bottom', done: ?() => void = null) {
  //   let target = 'top';

  //   const left = this._left.getRotation();
  //   const right = this._right.getRotation();
  //   if (this.animations.state === 'idle') {
  //     if (left > 0 && left < Math.PI && right > Math.PI / 2 && right < Math.PI / 2 * 3) {
  //       target = 'bottom';
  //     } else {
  //       target = 'top';
  //     }
  //   } else if (this.location === 'top') {
  //     target = 'bottom';
  //   }

  //   if (goTo != null) {
  //     target = goTo;
  //   }
  //   this.location = target;
  //   this.animations.cancelAll();
  //   this.animations.new()
  //     .scenarios({ target, duration: 0.5 })
  //     .whenFinished(done)
  //     .start();
  //   this.diagram.animateNextFrame();
  // }

  // updateLabels() {
  //   if (this._left.isShown) {
  //     this._left.updateLabel();
  //   }
  //   if (this._right.isShown) {
  //     this._right.updateLabel();
  //   }
  //   if (this._base.isShown) {
  //     this._base.updateLabel();
  //   }
  //   this.diagram.animateNextFrame();
  // }

  // flipTriangle(duration: number) {
  //   const flipTri = this._flipTri;
  //   flipTri.setScale(1, -1);
  //   flipTri.animations.new()
  //     .scale({ target: [1, 1], duration })
  //     .start();
  //   this.diagram.animateNextFrame();
  // }

  // flipAll(duration: number) {
  //   let s = -1;
  //   let scenario = 'flip';
  //   let currentScenario = 'center';
  //   if (this._fixedTri.getScale().x < 1) {
  //     s = 1;
  //     scenario = 'center';
  //     currentScenario = 'flip';
  //   }
  //   this._flipTri.setScale(s * -1, 1);
  //   this._flipTri.animations.new()
  //     .scale({ target: [s, 1], duration })
  //     .start();
  //   this._fixedTri.setScale(s * -1, 1);
  //   this._fixedTri.animations.new()
  //     .scale({ target: [s, 1], duration })
  //     .start();
  //   this._leftCircle.setScenario(currentScenario);
  //   this._leftCircle.animations.new()
  //     .scenario({ target: scenario, duration })
  //     .start();
  //   this._rightCircle.setScenario(currentScenario);
  //   this._rightCircle.animations.new()
  //     .scenario({ target: scenario, duration })
  //     .start();
  //   this.diagram.animateNextFrame();
  // }

  // // pulseLeftLabels() {
  // //   this._left.showAll();
  // //   this._leftBottom.showAll();
  // //   this._left._label.pulseScaleNow(1, 2);
  // //   this._leftBottom._label.pulseScaleNow(1, 2);
  // //   this.diagram.animateNextFrame();
  // // }

  // // pulseRightLabels() {
  // //   this._right.showAll();
  // //   this._rightBottom.showAll();
  // //   this._right._label.pulseScaleNow(1, 2);
  // //   this._rightBottom._label.pulseScaleNow(1, 2);
  // //   this.diagram.animateNextFrame();
  // // }

  // colorCircles(color: Array<number>) {
  //   this._leftCircle.setColor(color);
  //   this._rightCircle.setColor(color);
  //   this.diagram.animateNextFrame();
  // }

  // setDefaultColors() {
  //   this._left.setColor(this.layout.colors.sides);
  //   this._right.setColor(this.layout.colors.sides);
  //   this._leftBottom.setColor(this.layout.colors.sides);
  //   this._rightBottom.setColor(this.layout.colors.sides);
  //   this._constructionLine.setColor(this.layout.colors.sides);
  //   this._base.setColor(this.layout.colors.sides);
  //   this._angleTopLeft.setColor(this.layout.colors.angles);
  //   this._angleBottomLeft.setColor(this.layout.colors.angles);
  //   this._angleTopRight.setColor(this.layout.colors.angles);
  //   this._angleBottomRight.setColor(this.layout.colors.angles);
  //   this.diagram.animateNextFrame();
  // }

  // colorRightIsosceles() {
  //   this.setDefaultColors();
  //   this._left.setColor(this.layout.colors.disabled);
  //   this._leftBottom.setColor(this.layout.colors.disabled);
  //   this._base.setColor(this.layout.colors.disabled);
  //   this._angleTopLeft.setColor(this.layout.colors.disabled);
  //   this._angleBottomLeft.setColor(this.layout.colors.disabled);
  //   this.diagram.animateNextFrame();
  // }

  // colorLeftIsosceles() {
  //   this.setDefaultColors();
  //   this._right.setColor(this.layout.colors.disabled);
  //   this._rightBottom.setColor(this.layout.colors.disabled);
  //   this._base.setColor(this.layout.colors.disabled);
  //   this._angleTopRight.setColor(this.layout.colors.disabled);
  //   this._angleBottomRight.setColor(this.layout.colors.disabled);
  //   this.diagram.animateNextFrame();
  // }

  // colorTopBottomTriangles() {
  //   this.setDefaultColors();
  //   this._constructionLine.setColor(this.layout.colors.disabled);
  //   this.diagram.animateNextFrame();
  // }

  // pulseLeftIsosceles(done: ?() => void = null) {
  //   this.colorLeftIsosceles();
  //   this._left.pulseWidth();
  //   this._leftBottom.pulseWidth();
  //   this._constructionLine.pulseWidth({ done });
  //   this.diagram.animateNextFrame();
  // }

  // pulseRightIsosceles(done: ?() => void = null) {
  //   this.colorRightIsosceles();
  //   this._right.pulseWidth();
  //   this._rightBottom.pulseWidth();
  //   this._constructionLine.pulseWidth({ done });
  //   this.diagram.animateNextFrame();
  // }

  // pulseLeftIsoscelesAngles(done: ?() => void = null) {
  //   this.colorLeftIsosceles();
  //   this._angleTopLeft.pulseScaleNow(1, 1.3);
  //   this._angleBottomLeft.pulseScaleNow(1, 1.3, 0, done);
  //   this.diagram.animateNextFrame();
  // }

  // pulseRightIsoscelesAngles(done: ?() => void = null) {
  //   this.colorRightIsosceles();
  //   this._angleTopRight.pulseScaleNow(1, 1.3);
  //   this._angleBottomRight.pulseScaleNow(1, 1.3, 0, done);
  //   this.diagram.animateNextFrame();
  // }

  // pulseTopTriangle() {
  //   this._left.pulseWidth();
  //   this._right.pulseWidth();
  //   this._base.pulseWidth();
  //   this.diagram.animateNextFrame();
  // }

  // pulseBottomTriangle() {
  //   this._leftBottom.pulseWidth();
  //   this._rightBottom.pulseWidth();
  //   this._base.pulseWidth();
  //   this.diagram.animateNextFrame();
  // }
}
