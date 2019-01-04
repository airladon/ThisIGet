// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import makeTriangle from '../../../../LessonsCommon/tools/triangle';
import type {
  TypeTriangle, TypeTriangleAngle, TypeTriangleLabel,
} from '../../../../LessonsCommon/tools/triangle';
// import { makeLine } from '../../../../LessonsCommon/tools/line';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, Point, DiagramElementCollection, DiagramElementPrimative,
  DiagramObjectLine, Line,
} = Fig;
const { polarToRect } = Fig.tools.g2;
type TypeCorner = {
  _angle: TypeAngle;
  _line: DiagramElementPrimative;
  _side1: DiagramObjectLine;
  _side2: DiagramObjectLine;
} & DiagramElementCollection;

export default class AAACollection extends CommonDiagramCollection {
  _corner1: TypeCorner;
  _corner2: TypeCorner;
  _corner3: TypeCorner;
  _tri: TypeTriangle & TypeTriangleAngle & TypeTriangleLabel;

  makeTri() {
    const triangle = makeTriangle(
      this.diagram,
      new Point(-1, -1),
      new Point(1, -1),
      new Point(0, 1),
      this.layout.corner.sideWidth,
      this.layout.colors.line,
    );
    const lColor = this.layout.colors.diagram.disabled;
    triangle.addSideLabel(2, 3, lColor, 'A', 0.05, 'outside', '', 'horizontal');
    triangle.addSideLabel(3, 1, lColor, 'B', 0.05, 'outside', '', 'horizontal');
    triangle.addSideLabel(1, 2, lColor, 'C', 0.05, 'outside', '', 'horizontal');
    triangle._dimension12.showRealLength = true;
    triangle._dimension31.showRealLength = true;
    triangle._dimension23.showRealLength = true;
    return triangle;
  }

  makeCorner() {
    const corner = this.diagram.shapes.collection(new Transform('Corner')
      .scale(1, 1)
      .rotate(0)
      .translate(0, 0));
    const line = this.diagram.shapes.polyLineLegacy(
      this.layout.corner.points, false,
      this.layout.corner.width, this.layout.colors.line,
      'onSharpAnglesOnly',
    );
    const angle = makeAngle(
      this.diagram, this.layout.corner.angleRadius,
      this.layout.corner.angleWidth, this.layout.triangle.angle.sides,
      this.layout.colors.angleA,
    );
    const touchPoint = this.diagram.shapes.polygon({
      fill: true,
      sides: 10,
      radius: 0.4,
      color: [0, 0, 0, 0],
      transform: new Transform().translate(0, 0),
    });
    touchPoint.move.element = corner;
    touchPoint.move.canBeMovedAfterLoosingTouch = true;
    corner.hasTouchableElements = true;
    angle.updateAngle(0, Math.PI / 2);
    angle.setPosition(this.layout.corner.points[1]);
    angle.showRealAngle = true;
    angle.addLabel('', this.layout.corner.angleLabelRadius);
    angle.autoRightAngle = true;
    corner.add('touchPoint', touchPoint);
    corner.add('angle', angle);
    corner.add('line', line);
    return corner;
  }

  recalculateTriangle(index: number) {
    const indeces = [1, 2, 3];
    const opp = indeces.filter(i => i !== index);
    const c = [this._corner1, this._corner2, this._corner3];
    const l = this.layout.corner.AAA;
    const layout = [l.c1, l.c2, l.c3];
    let t1 = c[0].transform.t();
    let t2 = c[1].transform.t();
    let t3 = c[2].transform.t();
    const r1 = c[0].transform.r();
    const r2 = c[1].transform.r();
    const r3 = c[2].transform.r();
    if (t1 != null && t2 != null && t3 != null
      && r1 != null && r2 != null && r3 != null) {
      const t = [t1, t2, t3];
      const r = [r1, r2, r3];
      const oppLine = new Line(t[opp[0] - 1], t[opp[1] - 1]);
      const side1 = new Line(t[index - 1], 1, r[index - 1]);
      const intersect1 = side1.intersectsWith(oppLine).intersect;
      c[index % 3].transform.updateTranslation(intersect1);

      const side2 = new Line(t[index - 1], 1, r[index - 1] + layout[index - 1].angle);
      const intersect2 = side2.intersectsWith(oppLine).intersect;
      c[(index + 1) % 3].transform.updateTranslation(intersect2);
    }
    t1 = c[0].transform.t();
    t2 = c[1].transform.t();
    t3 = c[2].transform.t();
    if (t1 != null && t2 != null && t3 != null) {
      this._tri.updatePoints(t1, t2, t3);
    }
  }

  updateCornerAngle(corner: TypeCorner, newAngle: number) {
    const newPoint = polarToRect(this.layout.corner.length, newAngle);
    corner._line.drawingObject.change([
      ...this.layout.corner.points.slice(0, 2),
      newPoint,
    ]);
    const rotation = corner.transform.r();
    if (rotation != null) {
      corner._angle.updateAngle(0, newAngle, rotation);
    }
  }

  setCornerScenarios(scenarioName: string) {
    const points = [];
    [this._corner1, this._corner2, this._corner3].forEach((c, index) => {
      const { angle, scenario, limitLine } = this.layout.corner[scenarioName][`c${index + 1}`];
      this.setScenario(c, scenario);
      this.updateCornerAngle(c, angle);
      points.push(scenario.position);
      // eslint-disable-next-line no-param-reassign
      c.move.limitLine = limitLine;
    });
    // $FlowFixMe
    this._tri.updatePoints(...points);
  }

  changeTriangleSize(callback: Function) {
    const p1 = this._corner1.transform.t();
    let callbackToUse = null;
    if (typeof callback === 'function') {
      callbackToUse = callback;
    }
    if (p1 != null) {
      const layout = this.layout.corner.AAA.c1.limitLine;
      const limitLineCenterX = (layout.p2.x - layout.p1.x) / 2 + layout.p1.x;
      let targetP1 = layout.p2.x;
      if (p1.x > limitLineCenterX) {
        targetP1 = layout.p1.x;
      }
      this._corner1.animateTranslationTo(new Point(targetP1, layout.p1.y), 1.5, callbackToUse);
    }
    this.diagram.animateNextFrame();
  }

  calcAAAFuturePositions() {
    const layout = this.layout.corner.AAA;
    this.futurePositions = [
      { element: this._corner1, scenario: layout.c1.scenario },
      { element: this._corner2, scenario: layout.c2.scenario },
      { element: this._corner3, scenario: layout.c3.scenario },
    ];
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('corner1', this.makeCorner());
    this.add('corner2', this.makeCorner());
    this.add('corner3', this.makeCorner());
    this.add('tri', this.makeTri());
    this.hasTouchableElements = true;
  }
}
