// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import CommonQuizMixin from '../../../../LessonsCommon/DiagramCollectionQuiz';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const { Transform, Point, randomPoint } = Fig.tools.g2;
const { DiagramElementPrimative, DiagramElementCollection } = Fig;
const { removeRandElement, roundNum } = Fig.tools.math;

export default class DiagramCollection extends CommonQuizMixin(CommonDiagramCollection) {
  _quad: {
    _angle1: TypeAngle;
    _angle2: TypeAngle;
    _angle3: TypeAngle;
    _angle4: TypeAngle;
    _line: DiagramElementPrimative;
    _p1: DiagramElementPrimative;
    _p2: DiagramElementPrimative;
    _p3: DiagramElementPrimative;
    _p4: DiagramElementPrimative;
  } & DiagramElementCollection;

  answer: number;
  hint: 'checkDimensions' | 'incorrect';
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;

  randomQuadPoints() {
    const points = [
      randomPoint(this.layout.pointRects.quad1),
      randomPoint(this.layout.pointRects.quad2),
      randomPoint(this.layout.pointRects.quad3),
      randomPoint(this.layout.pointRects.quad4),
    ];
    const index = removeRandElement([0, 1, 2, 3]);
    const newPoints = [];
    for (let i = 0; i < 4; i += 1) {
      newPoints.push(points[(i + index) % 4]);
    }
    return {
      p1: newPoints[0],
      p2: newPoints[1],
      p3: newPoints[2],
      p4: newPoints[3],
    };
  }

  updateQuad() {
    this._quad._line.drawingObject.change([this.p1, this.p2, this.p3, this.p4]);
  }

  updatePoints() {
    const p1 = this._quad._p1.transform.t();
    const p2 = this._quad._p2.transform.t();
    const p3 = this._quad._p3.transform.t();
    const p4 = this._quad._p4.transform.t();
    if (p1 != null && p2 != null && p3 != null && p4 != null) {
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.p4 = p4;
    }
  }

  makeQuad() {
    const quad = this.diagram.shapes.collection(new Transform('quad')
      .rotate(0).translate(0, 0));
    const line = this.diagram.shapes.polyLineLegacy(
      [new Point(-1, -1), new Point(1, -1), new Point(1, 1), new Point(-1, 1)],
      true, this.layout.lineWidth,
      this.layout.colors.lines, 'onSharpAnglesOnly',
    );

    const makeA = () => {
      const angle = makeAngle(
        this.diagram, this.layout.angleRadius,
        this.layout.lineWidth, this.layout.angleSides,
        this.layout.colors.angles,
      );
      angle.addLabel('', this.layout.angleRadius + this.layout.angleLabelOffset);
      return angle;
    };

    const makeP = () => {
      const point = this.diagram.shapes.polygon({
        sides: 4,
        radius: 0.1,
        width: 0.01,
        color: [0, 0, 0, 0.01],
        transform: new Transform().translate(0, 0),
      });
      return point;
    };
    quad.add('p1', makeP());
    quad.add('p2', makeP());
    quad.add('p3', makeP());
    quad.add('p4', makeP());
    quad._p4.setTransformCallback = () => {
      this.updatePoints();
      this.updateQuad();
      // this.updateAngles();
    };
    quad.add('angle1', makeA());
    quad.add('angle2', makeA());
    quad.add('angle3', makeA());
    quad.add('angle4', makeA());
    quad.add('line', line);
    quad.setPosition(this.layout.quadPosition);
    return quad;
  }

  updateAngles() {
    this.showAngles(true);
    const {
      p1, p2, p3, p4,
    } = this;
    let answer = 360;
    const quadRot = this._quad.transform.r();
    if (quadRot != null) {
      this._quad._angle1.updateAngleFromPoints(p2, p1, p4, true, quadRot);
      this._quad._angle2.updateAngleFromPoints(p3, p2, p1, true, quadRot);
      this._quad._angle3.updateAngleFromPoints(p4, p3, p2, true, quadRot);
      this._quad._angle4.updateAngleFromPoints(p1, p4, p3, true, quadRot);
    }
    const knownAngles = [
      this._quad._angle1, this._quad._angle2,
      this._quad._angle3, this._quad._angle4,
    ];
    const unknownAngle = removeRandElement(knownAngles);
    // this.answer = roundNum(unknownAngle.currentAngle * 180 / Math.PI, 0);
    knownAngles.forEach((angle) => {
      const angleValue = roundNum(angle.currentAngle * 180 / Math.PI, 0);
      answer -= angleValue;
      angle.setLabel(`${angleValue}º`);
      angle.updateLabel();
    });
    this.answer = answer;
    unknownAngle.setLabel('?');
    unknownAngle.updateLabel();
    unknownAngle.setColor(this.layout.colors.diagram.passive);
    this.showCheck();
  }

  resetColors() {
    this._quad._angle1.setColor(this.layout.colors.angles);
    this._quad._angle2.setColor(this.layout.colors.angles);
    this._quad._angle3.setColor(this.layout.colors.angles);
    this._quad._angle4.setColor(this.layout.colors.angles);
  }

  showAngles(show: boolean = true) {
    if (show === true) {
      this._quad._angle1.show();
      this._quad._angle2.show();
      this._quad._angle3.show();
      this._quad._angle4.show();
    } else {
      this._quad._angle1.hide();
      this._quad._angle2.hide();
      this._quad._angle3.hide();
      this._quad._angle4.hide();
    }
  }

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform('1 DiagramCollection'),
  ) {
    const layout = lessonLayout();
    super(
      diagram, layout, 'q1', {}, transform,
    );
    this.add('quad', this.makeQuad());
    // this.add('input', this.makeEntryBox('a1', '?', 3));
    this.addInput('a1', '?', 3);
    this._input.setPosition(this.layout.input);
  }

  calculateFuturePositions() {
    this.futurePositions = [];
    const futurePos = (element, position) => ({
      element,
      scenario: {
        position,
      },
    });
    const {
      p1, p2,
      p3, p4,
    } = this.randomQuadPoints();
    this.futurePositions.push(futurePos(this._quad._p1, p1));
    this.futurePositions.push(futurePos(this._quad._p2, p2));
    this.futurePositions.push(futurePos(this._quad._p3, p3));
    this.futurePositions.push(futurePos(this._quad._p4, p4));
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }


  newProblem() {
    super.newProblem();
    this.resetColors();
    this.calculateFuturePositions();
    this.showAngles(false);
    this.moveToFuturePositions(1, this.updateAngles.bind(this));
    // this._input.enable();
    // this._input.setValue('');
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    // this._input.setValue(this.answer);
    // this._input.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._input.disable();
    if (this._input.getValue() === this.answer.toString()) {
      return 'correct';
    }
    return 'incorrect';
  }
}
