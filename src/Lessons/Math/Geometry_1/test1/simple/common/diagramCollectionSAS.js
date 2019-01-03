// @flow
import Fig from 'figureone';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import { makeAngle } from '../../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../../LessonsCommon/tools/angle';

const {
  Transform, DiagramElementPrimative, DiagramElementCollection,
} = Fig;
const {
  polarToRect, getDeltaAngle,
} = Fig.tools.g2;
const { rand } = Fig.tools.math;

type TypeCorner = {
  _angle: TypeAngle;
  _line: DiagramElementPrimative;
  side1: number;
  side2: number;
  // points: Array<Point>;
} & DiagramElementCollection;

export default class SASCollection extends CommonDiagramCollection {
  _corner1: TypeCorner;
  _corner2: TypeCorner;
  _corner3: TypeCorner;

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
    corner.side1 = 1;
    corner.side2 = 1;
    // corner.points = this.layout.corner.points.slice();
    corner.hasTouchableElements = true;

    angle.updateAngle(0, Math.PI / 2);
    angle.setPosition(this.layout.corner.points[1]);
    angle.showRealAngle = true;
    angle.addLabel('', this.layout.corner.angleLabelRadius);
    angle.autoRightAngle = true;
    corner.add('angle', angle);
    corner.add('line', line);
    return corner;
  }

  // eslint-disable-next-line class-methods-use-this
  updateCornerTextForRotation(corner: TypeCorner) {
    const rotation = corner.transform.r();
    if (rotation != null) {
      corner._angle.updateAngle(0, corner._angle.currentAngle, rotation);
    }
  }

  updateCorner(corner: TypeCorner, angle: number, side1: number, side2: number) {
    const newP1 = polarToRect(side1, 0);
    const newP3 = polarToRect(side2, angle);
    const p2 = this.layout.corner.points[1];
    // eslint-disable-next-line no-param-reassign
    corner.side1 = newP1.sub(p2).distance();
    // eslint-disable-next-line no-param-reassign
    corner.side2 = newP3.sub(p2).distance();
    corner._line.drawingObject.change([newP1, p2, newP3]);
    // corner.points = [newP1, p2, newP3];
    const rotation = corner.transform.r();
    if (rotation != null) {
      corner._angle.updateAngle(0, angle, rotation);
    }
  }

  setCornerScenarios(scenarioName: string) {
    const points = [];
    [this._corner1, this._corner2, this._corner3].forEach((c, index) => {
      if (this.layout.corner[scenarioName][`c${index + 1}`]) {
        const {
          angle, scenario, side1, side2,
        } = this.layout.corner[scenarioName][`c${index + 1}`];
        this.setScenario(c, scenario);
        this.updateCorner(c, angle, side1, side2);
        points.push(scenario.position);
      }
    });
  }

  growBothCorners(
    corner1From: number | null,
    corner1Side2: number | null,
    corner2From: number | null,
    corner2Side1: number | null,
  ) {
    this.growCorner(1, corner1From, corner1Side2, 0.5, false, null, 2, 2.598);
    this.growCorner(2, corner2From, corner2Side1, 0.5, false, null, 2, 1.5);
  }

  growCorner(
    index: number,
    fromLength: number | null,
    toLength: number | null,
    time: number = 1.5,
    finishOnCancel: boolean = true,
    callback: ?() => void = null,
    otherSideLength: number = this.layout.corner.SAS.c2.side2,
    randThreshold: number = 1.5,
  ) {
    // $FlowFixMe
    const corner = this[`_corner${index}`];
    const side = index === 1 ? 'side2' : 'side1';
    let fromLengthToUse;
    if (fromLength != null) {
      fromLengthToUse = fromLength;
    } else {
      fromLengthToUse = corner[side];
    }
    let toLengthToUse;
    if (toLength == null) {
      if (corner[side] < randThreshold) {
        toLengthToUse = rand(randThreshold * 1.1, randThreshold * 1.4);
      } else {
        toLengthToUse = rand(randThreshold * 0.6, randThreshold * 0.9);
      }
    } else {
      toLengthToUse = toLength;
    }
    const { currentAngle } = corner._angle;
    const func = (percent) => {
      const sideLength = percent * (toLengthToUse - fromLengthToUse) + fromLengthToUse;
      let side1 = sideLength;
      let side2 = otherSideLength;
      if (index === 1) {
        side2 = side1;
        side1 = otherSideLength;
      }
      this.updateCorner(
        corner, currentAngle,
        side1,
        side2,
      );
      corner[side] = sideLength;
      if (sideLength < this.layout.corner.angleRadius) {
        corner._angle.hideAll();
      } else {
        corner._angle.showAll();
      }
    };
    const done = () => {
      if (finishOnCancel) {
        func(1);
      }
      if (typeof callback === 'function' && callback) {
        callback();
      }
    };
    corner.animateCustomTo(func, time, 0, done);
    this.diagram.animateNextFrame();
  }

  // calcC1S2ToIntersectWithC2S1() {
  //   const p2 = this._corner2.transform.t();
  //   const p1 = this._corner1.transform.t();
  //   const r2 = this._corner2.transform.r();
  //   const a1 = this._corner1._angle.currentAngle;
  //   if (p2 != null && p1 != null && r2 != null) {
  //     const lineC1S2 = new Line(p1, 1, a1);
  //     const lineC2S1 = new Line(p2, 1, r2);
  //     const { intersect } = lineC1S2.intersectsWith(lineC2S1);
  //     return intersect.sub(p1).distance();
  //   }
  //   return 0;
  // }

  // growC1S2ToC2S1() {
  //   this.growCorner(1, 0.5, this.calcC1S2ToIntersectWithC2S1(), 1, false, null, 0.5);
  // }

  // updateC1SideLength() {
  //   this.updateCorner(
  //     this._corner1, this.layout.corner.AAS.c1.angle,
  //     this.layout.corner.AAS.c1.side1, this.calcC1S2ToIntersectWithC2S1(),
  //   );
  //   this.diagram.animateNextFrame();
  // }

  // moveC1ToAASPosition(callback: () => void = () => {}) {
  //   this.futurePositions = [{
  //     element: this._corner1,
  //     scenario: this.layout.corner.AAS.c1.scenario,
  //   }];
  //   this._corner1.setTransformCallback = this.updateC1SideLength.bind(this);
  //   const p2 = this._corner1.transform.t();
  //   if (p2 != null) {
  //     if (p2.sub(this.layout.corner.AAS.c1.scenario.position).distance() > 0.1) {
  //       this.moveToFuturePositions(1, callback);
  //     } else {
  //       callback();
  //     }
  //   }
  //   this.diagram.animateNextFrame();
  // }

  rotateCorner2(
    toAngle: number | null,
    time: number,
    finishOnCancel: boolean = true,
    callback: ?() => void = null,
  ) {
    const { currentAngle } = this._corner2._angle;
    let currentR = this._corner2.transform.r();
    if (currentR == null) {
      currentR = 0;
    }
    let toAngleToUse;
    if (toAngle == null) {
      if (currentAngle < Math.PI / 3) {
        toAngleToUse = rand(Math.PI / 3 * 1.2, Math.PI / 3 * 2.2);
      } else {
        toAngleToUse = rand(Math.PI / 3 * 0.4, Math.PI / 3 * 0.8);
      }
    } else {
      toAngleToUse = toAngle;
    }
    const delta = getDeltaAngle(toAngleToUse, currentAngle, 0);
    const func = (percent) => {
      const angle = percent * delta;

      this.updateCorner(
        this._corner2, currentAngle - angle,
        this._corner2.side1,
        this._corner2.side2,
      );
      this._corner2.transform.updateRotation(currentR + angle);
    };
    const done = () => {
      if (finishOnCancel) {
        func(1);
      }
      if (typeof callback === 'function' && callback) {
        callback();
      }
      this.diagram.animateNextFrame();
    };
    this._corner2._angle.showAll();
    this._corner2._angle.animateCustomTo(func, time, 0, done);
    this.diagram.animateNextFrame();
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('corner3', this.makeCorner());
    this.add('corner2', this.makeCorner());
    this.add('corner1', this.makeCorner());
    this.hasTouchableElements = true;
  }
}
