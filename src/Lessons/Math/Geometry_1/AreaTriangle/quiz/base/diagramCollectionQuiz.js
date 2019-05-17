// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../../explanation/base/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimative,
  Point,
} = Fig;

const {
//   removeRandElement,
  round,
  rand,
  range,
} = Fig.tools.math;

const { getPoint } = Fig.tools.g2;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
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
    this.addQuestion();
    // this.addInput('input', '?', 3, 0);
    // this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }

  // tryAgain() {
  //   super.tryAgain();
  // }

  addToAnswers(answers: Array<Array<number>>, answer: Array<number>) {
    if (Array.isArray(this.answers)) {
      for (let i = 0; i < answers.length; i += 1) {
        const existing = answers[i];
        if (answer[0] === existing[0]) {
          if (answer[1] === existing[1]) {
            return;
          }
        }
      }
      answers.push(answer);
    }
  }

  getAnswers() {
    const { bounds, gridSpacing, minSeparation } = this.layout;
    const maxBase = bounds.width / gridSpacing;
    const maxHeight = bounds.height / gridSpacing;
    const minBase = minSeparation / gridSpacing;
    const minHeight = minSeparation / gridSpacing;
    const maxArea = maxBase * maxHeight * 0.5;
    const minArea = minBase * minHeight * 0.5;
    const answers = [];
    let area = 0;
    const potentialHeights = round(range(minHeight, maxHeight, 0.1), 8);
    while (answers.length === 0) {
      area = round(rand(minArea, maxArea), 0);
      // eslint-disable-next-line no-loop-func
      potentialHeights.forEach((h: number) => {
        const base: number = round(area / h * 2, 1);
        if (round(base * h / 2, 8) === area && base > minBase) {
          if (h <= maxHeight && base <= maxBase) {
            this.addToAnswers(answers, [base, h]);
          }
        }
      });
    }
    return { area, answers };
  }

  goToTriangle(baseInUnits: number, heightInUnits: number) {
    const { gridSpacing } = this.layout;
    const base = baseInUnits * gridSpacing;
    const height = heightInUnits * gridSpacing;

    const left = new Point(-base / 2, -height / 2);
    const right = new Point(base / 2, -height / 2);
    const top = new Point(0, height / 2);

    this._main._implications._pad0.scenarios.quiz = { position: left };
    this._main._implications._pad2.scenarios.quiz = { position: right };
    this._main._implications._pad1.scenarios.quiz = { position: top };
    this._main._implications.animations.cancelAll();
    this._main._implications.animations.new()
      .scenarios({ target: 'quiz', duration: 1 })
      .start();
  }

  setupNewProblem() {
    // const element = document.getElementById('id__lessons__area_quiz1');
    const { area, answers } = this.getAnswers();
    this.answer = area;
    this.answers = answers;

    this._question.drawingObject.setText(`Create a triangle with an area of ${area} squares.`);

    this.goToTriangle(5, 5);

    const pad0 = this._main._implications._pad0;
    const pad1 = this._main._implications._pad1;
    const pad2 = this._main._implications._pad2;
    if (pad0.getPosition().isNotEqualTo(getPoint(pad0.scenarios.quiz.position))
      || pad1.getPosition().isNotEqualTo(getPoint(pad1.scenarios.quiz.position))
      || pad2.getPosition().isNotEqualTo(getPoint(pad2.scenarios.quiz.position))
    ) {
      this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    }
    this.diagram.animateNextFrame();
  }

  // afterTransitionToNewProblem() {
  //   super.afterTransitionToNewProblem();
  // }

  showAnswer() {
    super.showAnswer();
    const answerToShow = this.answers[this.answerIndex];
    const [base, height] = answerToShow;
    this.goToTriangle(base, height);
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._check.hide();
    const base = parseFloat(this._main._implications._base.label.getText());
    const height = parseFloat(this._main._implications._height.label.getText());
    const potentialAnswer = [base, height];
    let result = 'incorrect';
    this.answers.forEach((answer) => {
      if (answer[0] === potentialAnswer[0]
          && answer[1] === potentialAnswer[1]
      ) {
        result = 'correct';
      }
    });
    return result;
  }
}
