// @flow
import Fig from 'figureone';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import makeTriangle from '../../../../../LessonsCommon/tools/triangle';
import type { TypeTriangle } from '../../../../../LessonsCommon/tools/triangle';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
// type TypeCorner = {
//   _angle: TypeAngle;
//   _line: DiagramElementPrimative;
//   side1: number;
//   side2: number;
//   // points: Array<Point>;
// } & DiagramElementCollection;

const { Transform, normAngle } = Fig.tools.g2;
const { DiagramElementPrimative, DiagramObjectLine } = Fig;

export default class SSSCollection extends CommonDiagramCollection {
  // _corner1: TypeCorner;
  // _corner2: TypeCorner;
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _line3: DiagramObjectLine;
  _circ2: DiagramElementPrimative;
  _circ3: DiagramElementPrimative;
  _circ2Shaddow: DiagramElementPrimative;
  _circ3Shaddow: DiagramElementPrimative;
  _intersectUp: DiagramElementPrimative;
  _intersectDown: DiagramElementPrimative;
  _symmetry: DiagramObjectLine;
  _triangle: TypeTriangle;
  _triangleShaddow: TypeTriangle;

  addLines() {
    const make = length => this.diagram.objects.line({
      vertexSpaceStart: 'start',
      length,
      width: this.layout.corner.width,
      color: this.layout.colors.line,
    });
    const line1 = make(this.layout.corner.SSSProps.length1);
    const line2 = make(this.layout.corner.SSSProps.length2);
    const line3 = make(this.layout.corner.SSSProps.length3);
    line2.move.type = 'rotation';
    line3.move.type = 'rotation';
    // line2.setMovable();
    // line3.setMovable();
    line2.move.canBeMovedAfterLoosingTouch = true;
    line3.move.canBeMovedAfterLoosingTouch = true;

    this.add('line2', line2);
    this.add('line3', line3);
    this.add('line1', line1);
  }

  addTriangle() {
    const makeTri = () => makeTriangle(
      this.diagram,
      this.layout.corner.SSSConnectedNoRot.l2.position,
      this.layout.corner.SSSConnectedNoRot.l3.position,
      this.layout.corner.SSSConnectedNoRot.iUp.position,
      this.layout.corner.width,
      this.layout.colors.line,
    );
    const tri = makeTri();
    tri.setTriangleCollectionPositionTo(this.layout.corner.SSSConnectedNoRot.l3.position);

    const triShaddow = makeTri();
    this.add('triangle', tri);
    this.add('triangleShaddow', triShaddow);
  }

  addCircles() {
    const make = (radius, color) => this.diagram.shapes.polygon({
      sides: this.layout.corner.SSSProps.circleSides,
      radius,
      width: this.layout.corner.width / 2,
      color,
      transform: new Transform('circle').scale(1, 1).rotate(0).translate(0, 0),
    });
    const circ2 = make(this.layout.corner.SSSProps.length2, this.layout.colors.construction);
    const circ3 = make(this.layout.corner.SSSProps.length3, this.layout.colors.construction);
    const circ2Shaddow = make(this.layout.corner.SSSProps.length2, this.layout.colors.construction);
    const circ3Shaddow = make(this.layout.corner.SSSProps.length3, this.layout.colors.construction);
    circ2Shaddow.angleToDraw = Math.PI;
    circ3Shaddow.angleToDraw = Math.PI;
    this.add('circ2Shaddow', circ2Shaddow);
    this.add('circ3Shaddow', circ3Shaddow);
    this.add('circ2', circ2);
    this.add('circ3', circ3);
  }

  addIntersects() {
    const { SSSProps } = this.layout.corner;
    const makeIntersectPoint = () => this.diagram.shapes.polygon({
      fill: true,
      sides: SSSProps.intersectPointSides,
      radius: SSSProps.intersectPointRadius,
      color: this.layout.colors.intersect,
      transform: new Transform('intersect').translate(0, 0),
    });
    this.add('intersectUp', makeIntersectPoint());
    this.add('intersectDown', makeIntersectPoint());
  }

  moveLinesToIntersect(intersect: 'up' | 'down' | null) {
    let intersectPlan = intersect;
    if (intersectPlan === null) {
      const r = normAngle(this._line2.transform.r() || 0);
      if (r > 0 && r < Math.PI / 2) {
        intersectPlan = 'down';
      }
    }
    let a2 = this.layout.corner.SSSProps.angle2;
    let a3 = Math.PI - this.layout.corner.SSSProps.angle3;
    if (intersectPlan === 'down') {
      a2 = -a2;
      a3 = -a3;
    }
    this._line2.animateRotationTo(a2, 0, 1);
    this._line3.animateRotationTo(a3, 0, 1);
    this.diagram.animateNextFrame();
  }

  pulseSymmetry(callback: () => void | null) {
    this._circ2.transform.updateRotation(0);
    this._circ3.transform.updateRotation(0);
    this._circ2.angleToDraw = Math.PI;
    this._circ3.angleToDraw = Math.PI;
    const custom = (percent) => {
      const scale = percent * -2 + 1;
      this._circ2.transform.updateScale(1, scale);
      this._circ3.transform.updateScale(1, scale);
      this._triangle.transform.updateScale(1, scale);
    };
    const finish = () => {
      const yScale = this._circ2.transform.s() || 0;
      if (yScale === -1) {
        this._circ2.angleToDraw = -1;
        this._circ3.angleToDraw = -1;
        this._circ2.transform.updateScale(1, 1);
        this._circ3.transform.updateScale(1, 1);
        // this._triangle.transform.updateScale(1, 1);
      }
      if (callback != null && typeof callback === 'function') {
        callback();
      }
    };
    this.animateCustomToWithDelay(0, custom, 2, 0, finish, false);
    this.diagram.animateNextFrame();
  }

  resetDiagram() {
    this._circ2.angleToDraw = -1;
    this._circ3.angleToDraw = -1;
    this._circ2.transform.updateScale(1, 1);
    this._circ3.transform.updateScale(1, 1);
    this._triangle.transform.updateScale(1, -1);
    this.diagram.animateNextFrame();
  }

  drawCircle(index: number) {
    // $FlowFixMe
    const line = this[`_line${index}`];
    // $FlowFixMe
    const circ = this[`_circ${index}`];
    const startR = line.transform.r() || 0;
    circ.transform.updateRotation(startR);
    circ.angleToDraw = 0;
    circ.show();
    const originalCallback = line.setTransformCallback;
    line.setTransformCallback = (transform: Transform) => {
      const tr = transform.r() || 0;
      let angleToDraw = tr - startR;
      if (angleToDraw < 0) {
        angleToDraw += Math.PI * 2;
      }
      circ.angleToDraw = angleToDraw;
    };
    line.setMovable(false);
    const complete = (result: boolean) => {
      if (result) {
        line.setTransformCallback = originalCallback;
        circ.angleToDraw = -1;
        circ.transform.updateRotation(0);
        line.setMovable(true);
      }
      this.diagram.animateNextFrame();
    };
    let targetRotation = startR - 0.0001;
    if (targetRotation < 0) {
      targetRotation += Math.PI * 2;
    }
    line.animateRotationTo(targetRotation, 1, 1.5, complete);
    this.diagram.animateNextFrame();
  }

  addSymmetryLine() {
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: this.diagram.limits.width,
      width: this.layout.corner.width / 3,
      color: this.layout.colors.diagram.disabled,
    });
    this.add('symmetry', line);
  }

  calcFutureLinePositions(scenarioName: string) {
    this.futurePositions = [];
    const fp = (element, scenario) => {
      this.futurePositions.push({ element, scenario });
    };
    const cornerScenario = this.layout.corner[scenarioName];
    fp(this._line1, cornerScenario.l1);
    fp(this._line2, cornerScenario.l2);
    fp(this._line3, cornerScenario.l3);
    fp(this._circ2, { position: cornerScenario.l2.position });
    fp(this._circ3, { position: cornerScenario.l3.position });
    fp(this._circ2Shaddow, { position: cornerScenario.l2.position });
    fp(this._circ3Shaddow, { position: cornerScenario.l3.position });
    fp(this._symmetry, {
      position: cornerScenario.l1.position
        .add(this.layout.corner.SSSProps.length1 / 2, 0),
    });
    if (scenarioName === 'SSSConnectedNoRot') {
      fp(this._intersectUp, cornerScenario.iUp);
      fp(this._intersectDown, cornerScenario.iDown);
    }
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addSymmetryLine();
    this.addIntersects();
    this.addCircles();
    this.addLines();
    this.addTriangle();
    this.hasTouchableElements = true;
  }
}
