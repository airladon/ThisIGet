// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import CommonQuizMixin from '../../../../LessonsCommon/DiagramCollectionQuiz';
import SameAreaCollection from '../common/diagramCollectionSameArea';

const { Transform, Point } = Fig;
const { rand, round, range } = Fig.tools.math;

export default class QuizParallel1Collection extends CommonQuizMixin(SameAreaCollection) {
// export default class QuizParallel1Collection extends CommonQuizDiagramCollection {
  diagram: LessonDiagram;

  answers: Array<Array<number>>;
  answer: number;

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
  //     height / 2 - minSeparation,
  //   );
  //   this._rightBasePad.move.minTransform.updateTranslation(
  //     -length / 2 + minSeparation,
  //     -height / 2,
  //   );
  //   this._rightBasePad.move.maxTransform.updateTranslation(
  //     length / 2,
  //     height / 2 - minSeparation,
  //   );
  //   this._topPad.move.minTransform.updateTranslation(
  //     -length / 2,
  //     -height / 2 + minSeparation,
  //   );
  //   this._topPad.move.maxTransform.updateTranslation(
  //     length / 2,
  //     height / 2,
  //   );
  // }

  constructor(
    diagram: LessonDiagram,
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
    this.setPosition(this.layout.samePosition);
    this.hasTouchableElements = true;
  }

  tryAgain() {
    super.tryAgain();
  }

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
    const lay = this.layout.same;
    const maxBase = lay.grid.length / lay.grid.spacing;
    const maxHeight = lay.grid.height / lay.grid.spacing;
    const minBase = lay.basePadMinSeparation;
    const minHeight = lay.basePadMinSeparation;
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
    const lay = this.layout.same;
    const base = baseInUnits * lay.grid.spacing;
    const height = heightInUnits * lay.grid.spacing;

    const left = new Point(-base / 2, -height / 2);
    const right = new Point(base / 2, -height / 2);
    const top = new Point(0, height / 2);

    const futurePos = (element, x, y) => ({
      element,
      scenario: {
        position: new Point(x, y),
      },
    });

    this.futurePositions = [];
    this.futurePositions.push(futurePos(
      this._leftBasePad, left.x, left.y,
    ));
    this.futurePositions.push(futurePos(
      this._rightBasePad, right.x, right.y,
    ));
    this.futurePositions.push(futurePos(
      this._topPad, top.x, top.y,
    ));
    this.moveToFuturePositions(1, this.updateTriangle.bind(this));
  }

  newProblem() {
    super.newProblem();
    const element = document.getElementById('id__lessons__area_quiz1');
    const { area, answers } = this.getAnswers();
    this.answer = area;
    this.answers = answers;

    if (element) {
      element.innerHTML = area.toString();
    }
    this._check.show();
    this.goToTriangle(5, 5);
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    const answerToShow = this.answers[this.answerIndex];
    const [base, height] = answerToShow;
    this.goToTriangle(base, height);
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._check.hide();
    const base = parseFloat(this._base.label.getText());
    const height = parseFloat(this._height.label.getText());
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
