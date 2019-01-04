// @flow
import Fig from 'figureone';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import { makeAngle } from '../../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../../LessonsCommon/tools/angle';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, polarToRect, normAngle, Point, minAngleDiff,
} = Fig.tools.g2;
const { DiagramElementPrimative, DiagramObjectLine } = Fig;
const { rand } = Fig.tools.math;

// type TypeCorner = {
//   _angle: TypeAngle;
//   _line: DiagramElementPrimative;
//   side1: number;
//   side2: number;
// } & DiagramElementCollection;

export default class SSACollection extends CommonDiagramCollection {
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _line3: DiagramObjectLine;
  _line3Temp: DiagramObjectLine;
  _lineCorner: DiagramObjectLine;
  _circ: DiagramElementPrimative;
  _angle: TypeAngle;
  _angle3: TypeAngle;
  long2Flag: boolean;

  addLines() {
    const ssa = this.layout.SSAInitial;
    const make = (length, width) => this.diagram.objects.line({
      vertexSpaceStart: 'start',
      length,
      width,
      color: this.layout.colors.line,
    });
    // const make1 = (length, width) => makeLine(
    //   this.diagram,
    //   'end',
    //   length, width,
    //   this.layout.colors.line, true,
    // );

    const line1 = make(1, this.layout.corner.width);
    const line2 = make(1, this.layout.corner.width);
    const line3 = make(1, this.layout.corner.width * 0.5);
    const line3Temp = make(1, this.layout.corner.width);
    const lineCorner = make(1, this.layout.corner.width);
    line1.move.type = 'scaleX';
    line3.move.type = 'rotation';
    line2.move.type = 'rotation';
    line2.move.canBeMovedAfterLoosingTouch = true;
    line3.move.canBeMovedAfterLoosingTouch = true;
    line1.setLength(ssa.line1.length);
    line2.setLength(ssa.line2.length);
    line3.setLength(ssa.line3.length);
    lineCorner.setLength(ssa.cornerLength);
    line3.setColor(this.colors.construction);
    line1.setTransformCallback = this.update.bind(this);
    line2.setTransformCallback = this.update.bind(this);
    line3.setTransformCallback = this.update.bind(this);
    line1.move.maxTransform.updateScale(ssa.line1.maxScale, 1);
    line1.move.minTransform.updateScale(ssa.line1.minScale, 1);
    line3.move.minTransform.updateRotation(Math.PI / 9);
    line3.move.maxTransform.updateRotation(Math.PI / 9 * 8);
    this.add('line3', line3);
    this.add('line1', line1);
    this.add('line2', line2);
    this.add('lineCorner', lineCorner);
    this.add('line3Temp', line3Temp);
  }

  addAngle() {
    const angle = makeAngle(
      this.diagram,
      this.layout.SSAInitial.angleRadius,
      this.layout.corner.width,
      this.layout.SSAInitial.angleSides,
      this.layout.colors.angleA,
    );
    angle.addLabel('a', this.layout.SSAInitial.labelRadius);
    angle.showRealAngle = true;
    angle.autoRightAngle = true;
    angle.realAngleDecimals = 0;
    this.add('angle', angle);

    const angle3 = makeAngle(
      this.diagram,
      this.layout.SSAInitial.angleRadius,
      this.layout.corner.width,
      this.layout.SSAInitial.angleSides,
      this.layout.colors.angleA,
    );
    angle3.addLabel('', this.layout.SSAInitial.labelRadius);
    // angle3.showRealAngle = true;
    angle3.autoRightAngle = true;
    angle3.realAngleDecimals = 0;
    this.add('angle3', angle3);
  }

  growLine3(callback: ?(?mixed) => void = null) {
    this._line3.setLength(0.1);
    this._line3.animateLengthTo(this.getTargetLine3Length(), 1, true, callback);
    this.diagram.animateNextFrame();
  }

  getTargetLine3Length() {
    const r3 = this._line3.transform.r();
    if (r3 != null) {
      return 1.7 / Math.sin(r3);
    }
    return 0;
  }

  update() {
    this._angle3._arc.hide();
    const p1 = this._line1.transform.t();
    // const l1 = this._line1.currentLength;
    const s1 = this._line1.transform.s();
    const r3 = this._line3.transform.r();
    const r2 = this._line2.transform.r();
    if (p1 != null && r3 != null && s1 != null && r2 != null) {
      const p3 = p1.add(new Point(-this.layout.SSAInitial.line1.length * s1.x, 0));
      this._line2.transform.updateTranslation(p1);
      this._line3.transform.updateTranslation(p3);
      this._line3.setLength(this.getTargetLine3Length());
      this._lineCorner.transform.updateTranslation(p3);
      this._lineCorner.transform.updateRotation(r3);
      this._circ.setPosition(p1);
      const circRadius = this.layout.SSAInitial.line2.length;
      this._circ.transform.updateScale(circRadius, circRadius); // as circle radius is 1
      this._angle.setPosition(p3);
      this._angle.updateAngle(0, r3);

      const interceptAngles = this.calculateInterseptAngles();
      let showLine3Temp = false;
      if (interceptAngles.length > 0) {
        interceptAngles.forEach((angle) => {
          if (Math.abs(minAngleDiff(angle, r2)) < 0.01) {
            showLine3Temp = true;
          }
        });
        const l2 = this.layout.SSAInitial.line2.length;
        this._angle3.setPosition(polarToRect(l2, interceptAngles[0]).add(p1));
        this._angle3.updateAngle(r3 + Math.PI, Math.PI - r3 - (Math.PI - r2));
      }
      if (showLine3Temp) {
        const l2 = this.layout.SSAInitial.line2.length;
        this._line3Temp.transform.updateRotation(r3);
        this._line3Temp.transform.updateTranslation(p3);
        const l3 = (polarToRect(l2, r2).add(p1).sub(p3)).distance();
        this._line3Temp.setLength(l3);

        this._line3Temp.showAll();
        this._lineCorner.hide();
      } else {
        this._line3Temp.hide();
        this._lineCorner.showAll();
      }
    }
  }

  calcNewScenario(scenario: 'short' | 'long0' | 'long2' | 'long1') {
    let s1 = rand(this.layout.SSAInitial.line1.minScale, 0.6);
    let r3 = rand(Math.PI / 4, 3 * Math.PI / 4);
    const l2 = this.layout.SSAInitial.line2.length;
    if (scenario === 'short') {
      const interceptAngles = this.calculateInterseptAngles(s1, r3);
      this._line2.animateRotationTo(interceptAngles[0], 0, 0.8);
      this.long2Flag = true;
    } else if (scenario === 'long0') {
      s1 = rand(0.75, this.layout.SSAInitial.line1.maxScale);
      const l1 = s1 * this.layout.SSAInitial.line1.length;
      const tangentAngle = Math.asin(l2 / l1);
      r3 = rand(tangentAngle, 3 * Math.PI / 4);
      this.long2Flag = true;
    } else if (scenario === 'long2') {
      if (this.long2Flag) {
        s1 = rand(0.75, this.layout.SSAInitial.line1.maxScale);
        const l1 = s1 * this.layout.SSAInitial.line1.length;
        const tangentAngle = Math.asin(l2 / l1);
        r3 = rand(Math.PI / 10, tangentAngle * 0.9);
        const interceptAngles = this.calculateInterseptAngles(s1, r3);
        this._line2.animateRotationTo(interceptAngles[0], 0, 0.8);
        this.long2Flag = false;
      } else {
        const interceptAngles = this.calculateInterseptAngles();
        this._line2.animateRotationTo(interceptAngles[1], 0, 0.8);
        this.long2Flag = true;
        this.diagram.animateNextFrame();
        return;
      }
    } else if (scenario === 'long1') {
      s1 = rand(0.75, this.layout.SSAInitial.line1.maxScale);
      const l1 = s1 * this.layout.SSAInitial.line1.length;
      const tangentAngle = Math.asin(l2 / l1);
      r3 = tangentAngle;
      const done = (result) => {
        if (result) {
          this._angle3._arc.show();
          this.diagram.animateNextFrame();
        }
      };
      this._line2.animateRotationTo(
        Math.PI - (Math.PI - Math.PI / 2 - tangentAngle),
        0, 0.8, done,
      );
      this.long2Flag = true;
    }
    this._line1.animateScaleTo(new Point(s1, 1), 0.8);
    this._line3.animateRotationTo(r3, 0, 0.8);
    this.diagram.animateNextFrame();
  }

  calculateInterseptAngles(
    scale1: null | number = null,
    rot3: null | number = null,
  ) {
    const s1 = scale1 === null ? this._line1.transform.s() : new Point(scale1, 1);
    const l2 = this.layout.SSAInitial.line2.length;
    const r3 = rot3 === null ? this._line3.transform.r() : rot3;
    const interceptAngles = [];
    if (s1 != null && r3 != null) {
      const l1 = this.layout.SSAInitial.line1.length * s1.x;
      const angleThreshold = Math.asin(l2 / l1);
      const b = Math.asin(l1 * Math.sin(r3) / l2);
      const c = r3 + b;
      if (l1 <= l2) {
        // one root
        interceptAngles.push(c);
      } else if (r3 < angleThreshold) {
        // two roots
        interceptAngles.push(c);
        interceptAngles.push(r3 + (Math.PI - b));
      } else if (r3 === angleThreshold) {
        // one root
        interceptAngles.push(c);
      }
    }
    return interceptAngles;
  }

  toggleInterceptAngles() {
    const interceptAngles = this.calculateInterseptAngles();
    let r2 = this._line2.transform.r();
    let targetAngle: null | number = null;
    if (r2 != null) {
      r2 = normAngle(r2);
      this._line2.transform.updateRotation(r2);
      if (interceptAngles.length === 2) {
        const min = Math.min(...interceptAngles);
        const max = Math.max(...interceptAngles);
        const midAngle = (max - min) / 2 + min;
        if (r2 > midAngle) {
          targetAngle = min;
        } else {
          targetAngle = max;
        }
      } else if (interceptAngles.length === 1) {
        if (r2 !== interceptAngles[0]) {
          [targetAngle] = interceptAngles;
        }
      }
      if (targetAngle != null) {
        this._line2.animateRotationTo(
          targetAngle, 0,
          new Transform().scale(5, 5).rotate(1).translate(5, 5),
        );
        this.diagram.animateNextFrame();
      }
    }
  }


  addCircle() {
    const circle = this.diagram.shapes.polygonLine(
      this.layout.SSAInitial.circleSides, 1, 0, 1, this.layout.SSAInitial.circleSides,
      2, this.layout.colors.construction,
      new Transform().scale(0.5, 0.5).rotate(0).translate(0, 0),
    );
    this.add('circ', circle);
  }

  drawCircle() {
    // $FlowFixMe
    const line = this._line2;
    // $FlowFixMe
    const circ = this._circ;
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
    const complete = () => {
      line.setTransformCallback = originalCallback;
      circ.angleToDraw = -1;
      circ.transform.updateRotation(0);
      line.setMovable(true);
      this.diagram.animateNextFrame();
    };
    let targetRotation = startR - 0.0001;
    if (targetRotation < 0) {
      targetRotation += Math.PI * 2;
    }
    line.animateRotationTo(targetRotation, 1, 1.5, complete);
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._angle.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  calcFuturePositions(scenarioName: string) {
    const fp = (element, scenario) => {
      if (scenario) {
        if (scenario.scenario) {
          this.futurePositions.push({ element, scenario: scenario.scenario });
        }
      }
    };
    this.futurePositions = [];
    const cornerScenario = this.layout[scenarioName];
    fp(this._line1, cornerScenario.line1);
    fp(this._line2, cornerScenario.line2);
    fp(this._line3, cornerScenario.line3);
    fp(this._circ, cornerScenario.circ);
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addCircle();
    this.addAngle();
    this.addLines();
    this.hasTouchableElements = true;
    this.long2Flag = true;
  }
}
