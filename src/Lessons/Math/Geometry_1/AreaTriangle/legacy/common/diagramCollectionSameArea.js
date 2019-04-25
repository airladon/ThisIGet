// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  Transform, Rect, Point, DiagramElementPrimative, DiagramObjectLine,
} = Fig;
const {
  rand, round,
} = Fig.tools.math;

const increaseBorderSize = (element: DiagramElementPrimative, multiplier: number) => {
  for (let i = 0; i < element.drawingObject.border[0].length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    element.drawingObject.border[0][i].x *= multiplier;
    // eslint-disable-next-line no-param-reassign
    element.drawingObject.border[0][i].y *= multiplier;
  }
};

export default class SameAreaCollection extends CommonDiagramCollection {
  _tri: DiagramElementPrimative;
  _grid: DiagramElementPrimative;
  _topPad: DiagramElementPrimative;
  _leftBasePad: DiagramElementPrimative;
  _rightBasePad: DiagramElementPrimative;
  _label: DiagramElementPrimative;
  _base: DiagramObjectLine;
  _height: DiagramObjectLine;
  base: number;
  height: number;
  area: number;

  addLines() {
    const lay = this.layout.same;
    const tri = this.diagram.shapes.polyLineLegacy(
      lay.points, true, lay.width, this.layout.colors.line, 'alwaysOn',
    );
    this.add('tri', tri);
  }

  makePad(position: Point) {
    const lay = this.layout.same.pad;
    const pad = this.diagram.shapes.polygon({
      fill: true,
      sides: lay.sides,
      radius: lay.radius,
      color: this.layout.colors.construction,
      transform: new Transform().translate(position),
    });
    pad.isTouchable = true;
    pad.isMovable = true;
    increaseBorderSize(pad, 2);
    pad.setTransformCallback = this.updateTriangle.bind(this);
    pad.move.canBeMovedAfterLoosingTouch = true;
    return pad;
  }

  // updateLimits() {
  //   const lay = this.layout.same;
  //   const { length, height } = lay.grid;
  //   const minSeparation = lay.basePadMinSeparation;
  //   this._leftBasePad.move.minTransform.updateTranslation(
  //     -length / 2,
  //     -height / 2,
  //   );
  //   this._leftBasePad.move.maxTransform.updateTranslation(
  //     length / 2 - minSeparation,
  //     0,
  //   );
  //   this._rightBasePad.move.minTransform.updateTranslation(
  //     -length / 2 + minSeparation,
  //     -height / 2,
  //   );
  //   this._rightBasePad.move.maxTransform.updateTranslation(
  //     length / 2,
  //     0,
  //   );
  //   this._topPad.move.minTransform.updateTranslation(
  //     -length / 2,
  //     this.layout.same.points[2].y,
  //   );
  //   this._topPad.move.maxTransform.updateTranslation(
  //     length / 2,
  //     this.layout.same.points[2].y,
  //   );
  // }
  updateLimits() {
    const lay = this.layout.same;
    const { length, height } = lay.grid;
    const minSeparation = lay.basePadMinSeparation;
    this._leftBasePad.move.minTransform.updateTranslation(
      -length / 2,
      -height / 2,
    );
    this._leftBasePad.move.maxTransform.updateTranslation(
      length / 2 - minSeparation,
      height / 2 - minSeparation,
    );
    this._rightBasePad.move.minTransform.updateTranslation(
      -length / 2 + minSeparation,
      -height / 2,
    );
    this._rightBasePad.move.maxTransform.updateTranslation(
      length / 2,
      height / 2 - minSeparation,
    );
    this._topPad.move.minTransform.updateTranslation(
      -length / 2,
      -height / 2 + minSeparation,
    );
    this._topPad.move.maxTransform.updateTranslation(
      length / 2,
      height / 2,
    );
  }

  addTopPad() {
    const topPad = this.makePad(this.layout.same.points[2]);
    this.add('topPad', topPad);
  }

  addLeftBasePad() {
    const lay = this.layout.same;
    const leftBasePad = this.makePad(
      lay.points[0],
    );
    this.add('leftBasePad', leftBasePad);
  }

  addRightBasePad() {
    const lay = this.layout.same;
    const rightBasePad = this.makePad(
      lay.points[1],
    );
    this.add('rightBasePad', rightBasePad);
  }

  updateTriangle() {
    const lay = this.layout.same;
    const p = this._topPad.getPosition();
    const left = this._leftBasePad.getPosition();
    const right = this._rightBasePad.getPosition();
    const top = this._topPad.getPosition();
    const separation = right.x - left.x;

    // If left pad is moving, adjust top and right accordingly
    if (this._leftBasePad.state.isBeingMoved
      || (this._leftBasePad.state.isMovingFreely
        && !this._rightBasePad.state.isBeingMoved
        && !this._topPad.state.isBeingMoved)
    ) {
      if (this._leftBasePad.state.isBeingMoved) {
        this._rightBasePad.stopMovingFreely();
        this._topPad.stopMovingFreely();
      }
      let rightX = right.x;
      if (separation < lay.basePadMinSeparation) {
        rightX += lay.basePadMinSeparation - separation;
      }
      this._rightBasePad.transform.updateTranslation(rightX, left.y);
      const height = top.y - left.y;
      let topY = top.y;
      if (height < lay.basePadMinSeparation) {
        topY += lay.basePadMinSeparation - height;
      }
      this._topPad.transform.updateTranslation(top.x, topY);
    }

    // If right pad is moving, adjust top and left accordingly
    if (this._rightBasePad.state.isBeingMoved
      || (this._rightBasePad.state.isMovingFreely
        && !this._leftBasePad.state.isBeingMoved
        && !this._topPad.state.isBeingMoved)
    ) {
      if (this._rightBasePad.state.isBeingMoved) {
        this._leftBasePad.stopMovingFreely();
        this._topPad.stopMovingFreely();
      }
      let leftX = left.x;
      if (separation < lay.basePadMinSeparation) {
        leftX -= lay.basePadMinSeparation - separation;
      }
      this._leftBasePad.transform.updateTranslation(leftX, right.y);
      const height = top.y - right.y;
      let topY = top.y;
      if (height < lay.basePadMinSeparation) {
        topY += lay.basePadMinSeparation - height;
      }
      this._topPad.transform.updateTranslation(top.x, topY);
    }

    // If top pad is moving, adjust left and right accordingly
    if (this._topPad.state.isBeingMoved
      || (this._topPad.state.isMovingFreely
        && !this._leftBasePad.state.isBeingMoved
        && !this._rightBasePad.state.isBeingMoved)
    ) {
      if (this._topPad.state.isBeingMoved) {
        this._rightBasePad.stopMovingFreely();
        this._leftBasePad.stopMovingFreely();
      }
      const height = top.y - left.y;
      let baseY = left.y;
      if (height < lay.basePadMinSeparation) {
        baseY -= lay.basePadMinSeparation - height;
      }
      this._leftBasePad.transform.updateTranslation(left.x, baseY);
      this._rightBasePad.transform.updateTranslation(right.x, baseY);
    }

    // New triangle points
    const points = [
      left,
      right,
      p,
    ];

    // Calculate and store the current base, height and area
    this.base = round((right.x - left.x) / lay.grid.spacing, 1);
    this.height = round((p.y - left.y) / lay.grid.spacing, 1);
    this.area = round(this.height * this.base * 0.5, 1);

    // Update the area, base and height labels
    this._label.drawingObject.change(
      `Area = ${round(this.area, 1).toString()} squares`,
      this._label.lastDrawTransform.m(),
    );
    this._tri.drawingObject.change(points);
    this._base.setEndPoints(
      new Point(left.x, lay.baseY),
      new Point(right.x, lay.baseY),
    );
    if (this._base.label != null) {
      this._base.label.setText(this.base.toString());
    }
    this._height.setEndPoints(
      new Point(lay.heightX, right.y),
      new Point(lay.heightX, p.y),
    );
    if (this._height.label != null) {
      this._height.label.setText(this.height.toString());
    }

    this.diagram.animateNextFrame();
  }

  addGrid() {
    const lay = this.layout.same.grid;
    const grid = this.diagram.shapes.grid(
      new Rect(
        -lay.length / 2, -lay.height / 2,
        lay.length, lay.height,
      ),
      lay.spacing, lay.spacing, 2, this.layout.colors.grid,
      new Transform().translate(lay.position),
    );
    this.add('grid', grid);
  }

  moveTopPad() {
    const p = this._topPad.getPosition();
    const length = this.layout.same.grid.length / 2;
    let newX = rand(0, length);
    if (p.x > 0) {
      newX *= -1;
    }
    const scenario = { position: new Point(newX, p.y) };
    this.moveToScenario(this._topPad, scenario, null);
    this.diagram.animateNextFrame();
  }

  addAreaLabel() {
    const { points } = this.layout.same;
    const area = (points[1].x - points[0].x) * (points[2].y - points[0].y)
                 * 0.5 / this.layout.same.grid.spacing / this.layout.same.grid.spacing;
    const label = this.diagram.shapes.htmlText(
      `Area = ${round(area, 1).toString()} squares`,
      'id_lessons__area_label_triangle_same_area',
      'lesson__area_intro__area_label',
      this.layout.same.label.position,
      'middle', 'center',
    );
    this.add('label', label);
  }

  addBaseHeight() {
    const lay = this.layout.same;
    const addSide = (p1, p2, name, label = '') => {
      const line = this.diagram.objects.line({
        p1,
        p2,
        width: lay.width / 2,
        color: this.layout.colors.lineLabel,
      });
      line.addLabel(label, lay.lineLabelOffset, 'right', 'bottom', 'horizontal');
      line.addArrow1(lay.width * 2, lay.width * 2);
      line.addArrow2(lay.width * 2, lay.width * 2);
      this.add(name, line);
      return line;
    };
    addSide(lay.points[0], lay.points[1], 'base', '');
    addSide(lay.points[1], new Point(lay.points[1].x, lay.points[2].y), 'height', '');
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addTopPad();
    this.addRightBasePad();
    this.addLeftBasePad();
    this.addGrid();
    this.addLines();
    this.addBaseHeight();
    this.addAreaLabel();
    this.updateTriangle();
    this.updateLimits();
    this.setPosition(this.layout.samePosition);
    this.hasTouchableElements = true;
  }
}
