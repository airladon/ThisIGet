// @flow
import Fig from 'figureone';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import type { TypeScenario } from '../../../../../LessonsCommon/DiagramCollection';
import makeTriangle from '../../../../../LessonsCommon/tools/triangle';
import type {
  TypeTriangle, TypeTriangleAngle, TypeTriangleLabel,
} from '../../../../../LessonsCommon/tools/triangle';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, Point, normAngle,
} = Fig.tools.g2;
const { removeRandElement, rand } = Fig.tools.math;
const { DiagramObjectLine } = Fig;
// import { makeLine } from '../../../../../LessonsCommon/tools/line';
// import { makeAngle } from '../../../../../LessonsCommon/tools/angle';
// import type { TypeAngle } from '../../../../../LessonsCommon/tools/angle';


export default class TriangleCollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _tri1: TypeTriangleAngle & TypeTriangle & TypeTriangleLabel;
  _tri2: TypeTriangleAngle & TypeTriangle & TypeTriangleLabel;
  last: string;

  makeTri() {
    const layout = this.layout.triangle;
    const triangle = makeTriangle(
      this.diagram,
      new Point(-1, -1),
      new Point(1, -1),
      new Point(0, 1),
      layout.lineWidth,
      this.layout.colors.line,
    );
    const a = layout.angle;
    const aColor = this.layout.colors.angleLabels;
    const lColor = this.layout.colors.lineLabels;
    triangle.addAngle(1, a.radius, a.lineWidth, a.sides, aColor, 'a');
    triangle.addAngle(2, a.radius, a.lineWidth, a.sides, aColor, 'b');
    triangle.addAngle(3, a.radius, a.lineWidth, a.sides, aColor, 'c');
    // const lColor = [0, 1, 0, 1]
    triangle.addSideLabel(2, 3, lColor, 'A', 0.05, 'outside', '', 'horizontal');
    triangle.addSideLabel(3, 1, lColor, 'B', 0.05, 'outside', '', 'horizontal');
    triangle.addSideLabel(1, 2, lColor, 'C', 0.05, 'outside', '', 'horizontal');
    return triangle;
  }

  updateTriangle(
    element: TypeTriangleAngle & TypeTriangle,
    points: Array<Point>,
    scenario: TypeScenario,
  ) {
    // console.log(element, points, scenario)
    element.updatePoints(...points);
    this.setScenario(element, scenario);
    this.diagram.animateNextFrame();
  }

  showLineLabels(show: boolean | null = true) {
    let toShow = true;
    if (show === null || typeof show !== 'boolean') {
      if (this._tri1._dimension12.isShown) {
        toShow = false;
      }
    }
    if (toShow) {
      this._tri1.showDimensions(true);
      this._tri2.showDimensions(true);
    } else {
      this._tri1.hideDimensions();
      this._tri2.hideDimensions();
    }
    this.diagram.animateNextFrame();
  }

  showAngleLabels(show: boolean = true) {
    let toShow = true;
    if (show === null || typeof show !== 'boolean') {
      if (this._tri1._angle1.isShown) {
        toShow = false;
      }
    }
    if (toShow) {
      this._tri1.showAngles(true);
      this._tri2.showAngles(true);
    } else {
      this._tri1.hideAngles();
      this._tri2.hideAngles();
    }
    this.diagram.animateNextFrame();
  }

  calcTriFuturePositions(
    scenario1: TypeScenario, scenario2: TypeScenario,
  ) {
    this.futurePositions = [
      { element: this._tri1, scenario: scenario1 },
      { element: this._tri2, scenario: scenario2 },
    ];
  }

  setTriangleScenarios(
    points1: Array<Point>, points2: Array<Point>,
    scenario1: TypeScenario, scenario2: TypeScenario,
  ) {
    this.updateTriangle(this._tri1, points1, scenario1);
    this.updateTriangle(this._tri2, points2, scenario2);
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('tri1', this.makeTri());
    this.add('tri2', this.makeTri());
    this.hasTouchableElements = true;
    this.last = 'flip';
  }

  toggleCongruentRotate() {
    const lay = this.layout.triangles;
    const tri1 = Object.assign({}, lay.congruent.tri1.scenario);
    const tri2 = Object.assign({}, lay.congruent.tri2.scenario);
    const r = this._tri2.transform.r();
    if (r != null) {
      tri2.rotation = r + normAngle(rand(Math.PI));
    }
    this.calcTriFuturePositions(tri1, tri2);
    this.moveToFuturePositions(1);
    this.diagram.animateNextFrame();
  }

  toggleCongruentFlip() {
    const lay = this.layout.triangles;
    const tri1 = lay.congruent.tri1.scenario;
    const tri2 = Object.assign({}, lay.congruent.tri2.scenario);
    let s = this._tri2.transform.s();
    const r = this._tri2.transform.r();
    if (s != null && r != null) {
      s = s.x / Math.abs(s.x) * -1;
      tri2.scale = new Point(s, 1);
      tri2.rotation = r;
      this.calcTriFuturePositions(tri1, tri2);
      const properties = [
        this._tri2._angle1, this._tri2._angle2, this._tri2._angle3,
        this._tri2._dimension12, this._tri2._dimension23,
        this._tri2._dimension31,
      ];
      const shown = properties.filter(e => e.isShown);
      const done = () => {
        const currentS = this._tri2.transform.s();
        if (currentS != null) {
          this._tri2.transform.updateScale(
            currentS.x / Math.abs(currentS.x),
            currentS.y / Math.abs(currentS.y),
          );
        }
        this._tri2.setTriangleCollectionScaleTo(new Point(1, 1));
        shown.forEach((e) => { e.showAll(); });
      };
      shown.forEach((e) => { e.hide(); });
      this.moveToFuturePositions(1, done);
    }
    this.diagram.animateNextFrame();
  }

  toggleCongruent() {
    const chooseFrom = ['flip', 'rotate'];
    if (this.last === 'flip') {
      chooseFrom.push('rotate');
      chooseFrom.push('rotate');
    } else {
      chooseFrom.push('flip');
      chooseFrom.push('flip');
    }
    const next = removeRandElement(chooseFrom);
    this.last = next;

    if (next === 'flip') {
      this.toggleCongruentFlip();
    } else {
      this.toggleCongruentRotate();
    }
  }
}
