// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimative,
  Point,
} = Fig;

const {
  getPoint,
} = Fig.tools.g2;

const {
//   removeRandElement,
  round,
  rand,
  range,
} = Fig.tools.math;

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
    // this.addInput('input', '?', 3, 0);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
    this._left.makeTouchable();
    this._left.setTransformCallback = this.updateRectangle.bind(this);
    this._right.setTransformCallback = this.updateRectangle.bind(this);
    this._top.setTransformCallback = this.updateRectangle.bind(this);
    this._bottom.setTransformCallback = this.updateRectangle.bind(this);
    this.updateRectangle();
    // this._bottomLeft.setTransformCallback = this.updatePad.bind(this);
  }

  updateRectangle() {
    const limits = this.layout.bounds;
    const { minSide } = this.layout;
    const w = this.layout.width / 2;

    const left = this._left.getPosition().x;
    const right = this._right.getPosition().x;
    const top = this._top.getPosition().y;
    const bottom = this._bottom.getPosition().y;

    this._bottom.transform.updateTranslation(left - w, bottom);
    this._left.transform.updateTranslation(left, bottom);
    this._right.transform.updateTranslation(right, bottom);
    this._top.transform.updateTranslation(left, top);

    this._bottom.setLength(right - left + w * 2);
    this._top.setLength(right - left + w);
    this._left.setLength(top - bottom + w);
    this._right.setLength(top - bottom + w);

    this._bottom.move.minTransform.updateTranslation(left, limits.bottom);
    this._bottom.move.maxTransform.updateTranslation(left, top - minSide);
    this._top.move.minTransform.updateTranslation(left, bottom + minSide);
    this._top.move.maxTransform.updateTranslation(left, limits.top);

    this._left.move.minTransform.updateTranslation(limits.left, bottom);
    this._left.move.maxTransform.updateTranslation(right - minSide, bottom);
    this._right.move.minTransform.updateTranslation(left + minSide, bottom);
    this._right.move.maxTransform.updateTranslation(limits.right, bottom);

    this._bottom.label.setText(`${round((right - left) * 5, 1).toString()}`);
    this._right.label.setText(`${round((top - bottom) * 5, 1).toString()}`);
    this._bottom.updateLabel();
    this._right.updateLabel();

    this._bottom.interactiveLocation = new Point((right - left + w * 2) / 2, 0);
    this._top.interactiveLocation = new Point((right - left + w) / 2, 0);
    this._left.interactiveLocation = new Point((top - bottom + w) / 2, 0);
    this._right.interactiveLocation = new Point((top - bottom + w) / 2, 0);
  }

  goToRectangle(widthInUnits: number, heightInUnits: number) {
    const width = widthInUnits * this.layout.minSide;
    const height = heightInUnits * this.layout.minSide;
    const yCenter = this.layout.bounds.height / 2
                    + this.layout.bounds.bottom;
    const xCenter = this.layout.bounds.width / 2
                    + this.layout.bounds.left;
    this._left.scenarios.quiz = { position: [-width / 2 + xCenter, yCenter] };
    this._right.scenarios.quiz = { position: [width / 2 + xCenter, yCenter] };
    this._top.scenarios.quiz = { position: [xCenter, height / 2 + yCenter] };
    this._bottom.scenarios.quiz = { position: [xCenter, -height / 2 + yCenter] };
    this.animations.cancelAll();
    this.animations.new()
      .scenarios({ target: 'quiz', duration: 1 })
      .start();
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

  getPossibleAnswers(area: number) {
    const lay = this.layout;
    const maxX = (lay.bounds.width - lay.minSide * 0) * 5;
    const maxY = (lay.bounds.height - lay.minSide * 0) * 5;
    const answers = [];
    const potentialAnswers = round(range(1, 10, 0.1), 8);
    potentialAnswers.forEach((a: number) => {
      const factor: number = round(area / a, 1);
      if (round(factor * a, 8) === area && factor > 1) {
        if (a <= maxX && factor <= maxY) {
          this.addToAnswers(answers, [a, factor]);
        }
        if (a <= maxY && factor <= maxX) {
          this.addToAnswers(answers, [factor, a]);
        }
      }
    });
    return answers;
  }

  setupNewProblem() {
    this._left.setColor(this.layout.colors.sides);
    this._right.setColor(this.layout.colors.sides);
    this._top.setColor(this.layout.colors.sides);
    this._bottom.setColor(this.layout.colors.sides);
    const element = document.getElementById('id__lessons__area_quiz1');
    const lay = this.layout;
    const maxX = lay.bounds.width / lay.minSide - 2;
    const maxY = lay.bounds.height / lay.minSide - 2;
    const maxArea = maxX * maxY;
    const minArea = lay.minSide * 3 * lay.minSide * 3;
    let answers = [];
    let area = 0;
    while (answers.length === 0) {
      area = round(rand(minArea, maxArea), 0);
      answers = this.getPossibleAnswers(area);
    }

    this.answer = area;
    this.answers = answers;

    if (element) {
      element.innerHTML = area.toString();
    }

    this._question.drawingObject.setText(`Create a rectangle or square that has an area of ${area} squares.`);

    const left = this._left;
    const right = this._right;
    const top = this._top;
    const bottom = this._bottom;
    if (left.getPosition().isNotEqualTo(getPoint(left.scenarios.newProblem.position))
      || top.getPosition().isNotEqualTo(getPoint(top.scenarios.newProblem.position))
      || right.getPosition().isNotEqualTo(getPoint(right.scenarios.newProblem.position))
      || bottom.getPosition().isNotEqualTo(getPoint(bottom.scenarios.newProblem.position))
    ) {
      this.transitionToNewProblem({ target: 'newProblem', duration: 2 });
    }
  }

  afterTransitionToNewProblem() {
    this._left.setMovable(true);
    this._right.setMovable(true);
    this._top.setMovable(true);
    this._bottom.setMovable(true);
    super.afterTransitionToNewProblem();
  }

  showAnswer() {
    super.showAnswer();
    const answerToShow = this.answers[this.answerIndex];
    const [width, height] = answerToShow;
    this.goToRectangle(width, height);
    this._left.setMovable(false);
    this._right.setMovable(false);
    this._top.setMovable(false);
    this._bottom.setMovable(false);
    this._left.setColor(this.layout.colors.sidesDisabled);
    this._right.setColor(this.layout.colors.sidesDisabled);
    this._top.setColor(this.layout.colors.sidesDisabled);
    this._bottom.setColor(this.layout.colors.sidesDisabled);
    this.diagram.animateNextFrame();
    this.diagram.lesson.enableInteractiveItems();
  }

  findAnswer() {
    // this._check.hide();
    const width = parseFloat(this._bottom.label.getText());
    const height = parseFloat(this._right.label.getText());
    const potentialAnswer = [width, height];
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
