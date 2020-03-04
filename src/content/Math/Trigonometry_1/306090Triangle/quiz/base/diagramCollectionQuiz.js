// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
// import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  Transform,
  // DiagramElementPrimitive,
  // DiagramObjectPolyLine,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  // EquationLabel,
  Point,
  // Line,
} = Fig;

const {
  removeRandElement,
  randElement,
  // randElements,
  round,
  rand,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  scalingFactor: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(
      diagram,
      layout,
      'q1',
      {
        notSelected: {
          answer: 'Incorrect',
          details: 'Make sure to select an answer above the "Check" button',
        },
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.addMultipleChoice('tri', ['-', '-', '-', 'No']);
    this.diagram.addElements(this.layout.addElementsQuiz, this);
    this.hasTouchableElements = true;
    this.scalingFactor = 1;
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
  ): Array<Point> {
    const side = rand(1, 1.5);
    const sideRoot3 = side * Math.sqrt(3);

    const p1 = new Point(-sideRoot3 / 2, -side / 3);
    const p2 = new Point(sideRoot3 / 2, 2 * side / 3);
    const p3 = new Point(sideRoot3 / 2, -side / 3);

    return [p1, p2, p3];
  }

  calcRandomTri() {
    const pointsTri = this.randomTriangle();
    const rotation = rand(0, Math.PI * 2);
    const scale = randElement([-1, 1]);
    const position = -0.3;
    const transform = new Transform().scale(scale, 1).rotate(rotation).translate(0, position);

    const points = pointsTri.map(p => p.transformBy(transform.m()));
    this._tri._pad0.scenarios.quiz = { position: points[0] };
    this._tri._pad1.scenarios.quiz = { position: points[1] };
    this._tri._pad2.scenarios.quiz = { position: points[2] };
  }

  setupNewProblem() {
    this.fillSelection([['-', false], ['-', false], ['-', false]]);
    this._choice.hide();
    this.calcRandomTri();
    this._tri.hideAll();
    this._tri.show();
    this._tri._line.show();
    this._tri._pad0.show();
    this._tri._pad1.show();
    this._tri._pad2.show();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    // this._question.drawingObject.setText('');
  }

  setLabels() {
    const tri = this._tri;
    const side12 = round(rand(1, 100), 1);
    const side01 = side12 * 2;
    const side20 = round(side12 * Math.sqrt(3), 1);
    tri._side12.setLabel(`${side12}`);
    tri._side01.setLabel(`${side01}`);
    tri._side20.setLabel(`${side20}`);
    tri._angle2.setLabel('');
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  // eslint-disable-next-line class-methods-use-this
  fillSelection(options: Array<[string, boolean]>) {
    const numOptions = options.length;
    let answer;
    for (let i = 0; i < numOptions; i += 1) {
      const choiceIndex = i;
      const choiceElement = document.getElementById(
        `id_approach__quiz_multiple_choice_box_answer__tri_${choiceIndex}`,
      );
      if (choiceElement != null) {
        const option = removeRandElement(options);
        if (option[1]) {
          answer = choiceIndex;
        }
        // eslint-disable-next-line prefer-destructuring
        choiceElement.innerHTML = option[0];
      }
    }
    return answer;
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const tri = this._tri;
    tri.makeValidTriangle();
    this.setLabels();
    tri.exec('showAll', ['line', 'angle0', 'angle1', 'angle2']);
    tri._angle2.setLabel('');

    // eslint-disable-next-line max-len
    const scenarios: Array<[Array<string>, string]> = [
      [['01'], '20'],
      [['01'], '12'],
      [['12'], '01'],
      [['12'], '20'],
      [['20'], '01'],
      [['20'], '12'],
      [['01', '20'], '12'],
      [['12', '20'], '01'],
      [['12', '01'], '20'],
    ];
    const scenario = randElement(scenarios);
    const precision = 1;
    const side1 = parseFloat(tri._side12.getLabel());
    const side2 = parseFloat(tri._side01.getLabel());
    const sideR3 = parseFloat(tri._side20.getLabel());
    let incorrectAnswers = [];
    let correctAnswer = 0;
    // eslint-disable-next-line no-unused-vars
    const answers = (value, index) => {
      const calcs = [
        round(value / 2, precision),
        round(value * 2, precision),
        round(value / Math.sqrt(3), precision),
        round(value * Math.sqrt(3), precision),
        round(value / Math.sqrt(3) * 2, precision),
        round(value / 2 * Math.sqrt(3), precision),
        round(value / 3, precision),
        round(value / Math.sqrt(2), precision),
        round(value * Math.sqrt(2), precision),
      ];
      return [
        calcs[index],
        [...calcs.slice(0, index), ...calcs.slice(index + 1)],
      ];
    };
    const [knownSides, unknownSide] = scenario;
    let incorrect;
    if (unknownSide === '12') {
      tri._side12.showAll();
      tri._side12.setLabel('?');
      if (knownSides.indexOf('01') > -1) {
        tri._side01.showAll();
        [correctAnswer, incorrect] = answers(side2, 0);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
      if (knownSides.indexOf('20') > -1) {
        tri._side20.showAll();
        [correctAnswer, incorrect] = answers(sideR3, 2);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
    }
    if (unknownSide === '01') {
      tri._side01.showAll();
      tri._side01.setLabel('?');
      if (knownSides.indexOf('12') > -1) {
        tri._side12.showAll();
        [correctAnswer, incorrect] = answers(side1, 1);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
      if (knownSides.indexOf('20') > -1) {
        tri._side20.showAll();
        [correctAnswer, incorrect] = answers(sideR3, 4);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
    }
    if (unknownSide === '20') {
      tri._side20.showAll();
      tri._side20.setLabel('?');
      if (knownSides.indexOf('12') > -1) {
        tri._side12.showAll();
        [correctAnswer, incorrect] = answers(side1, 3);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
      if (knownSides.indexOf('01') > -1) {
        tri._side01.showAll();
        [correctAnswer, incorrect] = answers(side2, 5);
        incorrectAnswers = [...incorrectAnswers, ...incorrect];
      }
    }

    const choiceAnswers = [];
    choiceAnswers.push([`${correctAnswer}`, true]);

    const chosenIncorrectAnswers = [];
    chosenIncorrectAnswers.push(removeRandElement(incorrectAnswers));
    while (choiceAnswers.length < 4 && incorrectAnswers.length > 0) {
      const incorrectAnswer = removeRandElement(incorrectAnswers);
      if (chosenIncorrectAnswers.indexOf(incorrectAnswer) === -1) {
        chosenIncorrectAnswers.push(incorrectAnswer);
        choiceAnswers.push([`${incorrectAnswer}`, false]);
      }
    }

    this.answer = this.fillSelection(choiceAnswers);
    this._choice.show();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    this.selectMultipleChoice('tri', this.answer);
    // this.selectMultipleChoice('pgram', this.answer);
    // if (this.answer === 0) {
    //   this.selectMultipleChoice('similar_tri_1', 0);
    // } else {
    //   this.selectMultipleChoice('similar_tri_1', 1);
    // }
    // this._answerBox.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('tri');
    if (selection === -1) {
      return 'notSelected';
    }
    if (selection === this.answer) {
      return 'correct';
    }

    return 'incorrect';
  }
}
