// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  Transform,
  DiagramElementPrimitive,
} = Fig;

const { randomPoint } = Fig.tools.g2;
const {
  removeRandElement,
  round,
//   rand
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(
      diagram,
      layout,
      'q1',
      {},
      transform,
    );
    this.addCheck();
    this.addInput('input', '?', 3, 0);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
  }

  randomQuadPoints() {
    const points = [
      randomPoint(this.layout.quadrants.quad1),
      randomPoint(this.layout.quadrants.quad2),
      randomPoint(this.layout.quadrants.quad3),
      randomPoint(this.layout.quadrants.quad4),
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

  setupNewProblem() {
    const newPoints = this.randomQuadPoints();
    this._quad._pad0.scenarios.quiz = { position: newPoints.p1 };
    this._quad._pad1.scenarios.quiz = { position: newPoints.p2 };
    this._quad._pad2.scenarios.quiz = { position: newPoints.p3 };
    this._quad._pad3.scenarios.quiz = { position: newPoints.p4 };
    this._quad.hideAngles();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    const totalAngle = this._quad._angle0.angle + this._quad._angle1.angle
                       + this._quad._angle2.angle + this._quad._angle3.angle;

    if (totalAngle > Math.PI * 2.01) {
      this._quad.reversePoints();
    }
    this._quad.showAngles();
    const a0 = round(this._quad._angle0.angle * 180 / Math.PI, 0);
    const a1 = round(this._quad._angle1.angle * 180 / Math.PI, 0);
    const a2 = round(this._quad._angle2.angle * 180 / Math.PI, 0);
    this.answer = 360 - a0 - a1 - a2;
    this._quad._angle0.label.setText(`${a0}º`);
    this._quad._angle1.label.setText(`${a1}º`);
    this._quad._angle2.label.setText(`${a2}º`);
    this._quad._angle3.label.setText('?');
  }

  findAnswer() {
    this._input.disable();
    if (this._input.getValue() === this.answer.toString()) {
      return 'correct';
    }
    return 'incorrect';
  }
}
