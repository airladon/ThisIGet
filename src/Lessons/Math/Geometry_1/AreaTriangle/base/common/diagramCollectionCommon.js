// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramObjectPolyLine,
  DiagramElementCollection,
  Transform,
  Point,
  DiagramEquation,
} = Fig;

const { round, rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _rectangle: {
    _left: DiagramObjectLine;
    _right: DiagramObjectLine;
    _top: DiagramObjectLine;
    _bottom: DiagramObjectLine;
    _diagonal: DiagramObjectLine;
  } & DiagramElementCollection;

  _area1: {
    _leftFill: DiagramElementPrimative;
    _rightFill: DiagramElementPrimative;
    _tri: DiagramObjectPolyLine;
    _rect: DiagramObjectPolyLine;
    _base: DiagramObjectLine;
    _height: DiagramObjectLine;
  } & DiagramElementCollection;

  _area2: {
    _leftFill: DiagramElementPrimative;
    _rightFill: DiagramElementPrimative;
    _triFill: DiagramElementPrimative;
    _tri: DiagramObjectPolyLine;
    _rect: DiagramObjectPolyLine;
    _base: DiagramObjectLine;
    _height: DiagramObjectLine;
  } & DiagramElementCollection;

  _intro: {
    _grid: DiagramElementPrimative;
    _triangle: DiagramElementPrimative;
  } & DiagramElementCollection;

  _implications: {
    _base: DiagramObjectLine;
    _height: DiagramObjectLine;
    _grid: DiagramElementPrimative;
    _tri: {
      _line: DiagramElementPrimative;
    } & DiagramObjectPolyLine;
    _text: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
  } & DiagramElementCollection;

  _eqn: DiagramEquation;
  base: number;
  height: number;
  area: number;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._implications._pad0.setMovable(true);
    this._implications._pad1.setMovable(true);
    this._implications._pad2.setMovable(true);
    this._implications._pad0.setTransformCallback = this.update.bind(this);
    this._implications._pad1.setTransformCallback = this.update.bind(this);
    this._implications._pad2.setTransformCallback = this.update.bind(this);
  }

  update() {
    const { gridSpacing, minSeparation } = this.layout;
    const bottomLeftPad = this._implications._pad0;
    const topPad = this._implications._pad1;
    const bottomRightPad = this._implications._pad2;

    // const lay = this.layout.same;
    const p = topPad.getPosition();
    const left = bottomLeftPad.getPosition();
    const right = bottomRightPad.getPosition();
    const top = topPad.getPosition();
    const separation = right.x - left.x;

    // If left pad is moving, adjust top and right accordingly
    if (bottomLeftPad.state.isBeingMoved
      || (bottomLeftPad.state.isMovingFreely
        && !bottomRightPad.state.isBeingMoved
        && !topPad.state.isBeingMoved)
    ) {
      if (bottomLeftPad.state.isBeingMoved) {
        bottomRightPad.stopMovingFreely();
        topPad.stopMovingFreely();
      }
      let rightX = right.x;
      if (separation < minSeparation) {
        rightX += minSeparation - separation;
      }
      bottomRightPad.transform.updateTranslation(rightX, left.y);
      const height = top.y - left.y;
      let topY = top.y;
      if (height < minSeparation) {
        topY += minSeparation - height;
      }
      topPad.transform.updateTranslation(top.x, topY);
    }

    // If right pad is moving, adjust top and left accordingly
    if (bottomRightPad.state.isBeingMoved
      || (bottomRightPad.state.isMovingFreely
        && !bottomLeftPad.state.isBeingMoved
        && !topPad.state.isBeingMoved)
    ) {
      if (bottomRightPad.state.isBeingMoved) {
        bottomLeftPad.stopMovingFreely();
        topPad.stopMovingFreely();
      }
      let leftX = left.x;
      if (separation < minSeparation) {
        leftX -= minSeparation - separation;
      }
      bottomLeftPad.transform.updateTranslation(leftX, right.y);
      const height = top.y - right.y;
      let topY = top.y;
      if (height < minSeparation) {
        topY += minSeparation - height;
      }
      topPad.transform.updateTranslation(top.x, topY);
    }

    // If top pad is moving, adjust left and right accordingly
    if (topPad.state.isBeingMoved
      || (topPad.state.isMovingFreely
        && !bottomLeftPad.state.isBeingMoved
        && !bottomRightPad.state.isBeingMoved)
    ) {
      if (topPad.state.isBeingMoved) {
        bottomRightPad.stopMovingFreely();
        bottomLeftPad.stopMovingFreely();
      }
      const height = top.y - left.y;
      let baseY = left.y;
      if (height < minSeparation) {
        baseY -= minSeparation - height;
      }
      bottomLeftPad.transform.updateTranslation(left.x, baseY);
      bottomRightPad.transform.updateTranslation(right.x, baseY);
    }

    // New triangle points
    const points = [
      left,
      right,
      p,
    ];

    // Calculate and store the current base, height and area
    this.base = round((right.x - left.x) / gridSpacing, 1);
    this.height = round((p.y - left.y) / gridSpacing, 1);
    this.area = round(this.height * this.base * 0.5, 1);

    const areaLabel = this._implications._text;
    const baseLine = this._implications._base;
    const heightLine = this._implications._height;
    const tri = this._implications._tri;
    const { baseY, heightX } = this.layout;
    // Update the area, base and height labels
    areaLabel.drawingObject.setText(
      `Area = ${round(this.area, 1).toFixed(1).toString()} squares`,
    );
    // areaLabel.drawingObject.change(
    //   `Area = ${round(this.area, 1).toString()} squares`,
    //   areaLabel.lastDrawTransform.m(),
    // );
    tri.updatePoints(points);
    baseLine.setEndPoints(
      new Point(left.x, baseY),
      new Point(right.x, baseY),
    );
    if (baseLine.label != null) {
      baseLine.label.setText(this.base.toString());
    }
    heightLine.setEndPoints(
      new Point(heightX, right.y),
      new Point(heightX, p.y),
    );
    if (heightLine.label != null) {
      heightLine.label.setText(this.height.toString());
    }

    this.diagram.animateNextFrame();
  }

  updateLimits() {
    const { bounds, minSeparation } = this.layout;
    const bottomLeft = this._implications._pad0;
    const top = this._implications._pad1;
    const bottomRight = this._implications._pad2;
    bottomLeft.move.minTransform.updateTranslation(
      bounds.left,
      bounds.bottom,
    );
    bottomLeft.move.maxTransform.updateTranslation(
      bounds.right - minSeparation,
      bounds.top - minSeparation,
    );
    bottomRight.move.minTransform.updateTranslation(
      bounds.left + minSeparation,
      bounds.bottom,
    );
    bottomRight.move.maxTransform.updateTranslation(
      bounds.right,
      bounds.top - minSeparation,
    );
    top.move.minTransform.updateTranslation(
      bounds.left,
      bounds.bottom + minSeparation,
    );
    top.move.maxTransform.updateTranslation(
      bounds.right,
      bounds.top,
    );
  }

  moveTopPad() {
    const top = this._implications._pad1;
    const pos = top.getPosition();
    let newX = rand(this.layout.bounds.width / 3, this.layout.bounds.width / 2);
    if (pos.x > 0) {
      newX *= -1;
    }
    top.animations.cancelAll();
    top.animations.new()
      .position({ target: new Point(newX, pos.y), velocity: 2 })
      .start();
    this.diagram.animateNextFrame();
  }

  showTriFill() {
    if (this._area2._triFill.isShown) {
      this._area2._triFill.hide();
    } else {
      this._area2._triFill.show();
    }
    this._area2._leftFill.hide();
    this._area2._rightFill.hide();
    this.diagram.animateNextFrame();
  }

  showLeftFill() {
    this._area2._triFill.hide();
    if (this._area2._leftFill.isShown) {
      this._area2._leftFill.hide();
    } else {
      this._area2._leftFill.show();
    }
    this._area2._rightFill.hide();
    this.diagram.animateNextFrame();
  }

  showRightFill() {
    this._area2._triFill.hide();
    this._area2._leftFill.hide();
    if (this._area2._rightFill.isShown) {
      this._area2._rightFill.hide();
    } else {
      this._area2._rightFill.show();
    }
    this.diagram.animateNextFrame();
  }
}
