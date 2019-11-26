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
          details: 'Make sure to enter an answer above the "Check" button',
        },
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    this.addInput('input', '?', 5, 1);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    this.scalingFactor = 1;
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
  ): Array<Point> {
    const side = rand(1.2, 2);

    const p1 = new Point(-side / 3 * 2, -side / 3);
    const p2 = new Point(side / 3, 2 * side / 3);
    const p3 = new Point(side / 3, -side / 3);

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
    this.calcRandomTri();
    this._tri.hideAll();
    this._tri.show();
    this._tri._line.show();
    this._tri._pad0.show();
    this._tri._pad1.show();
    this._tri._pad2.show();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  setLabels() {
    const tri = this._tri;
    const side12 = round(rand(1, 100), 1);
    const side01 = round(side12 * Math.sqrt(2), 1);
    const side20 = side12;
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
      [['01', '20'], '12'],
      [['12', '20'], '01'],
    ];
    const scenario = randElement(scenarios);
    const prec = 1;
    const sqrt2Low = 1.4;
    const sqrt2High = Math.sqrt(2);
    const side12 = parseFloat(tri._side12.getLabel());
    const side01 = parseFloat(tri._side01.getLabel());
    const side20 = parseFloat(tri._side20.getLabel());
    let correctAnswer = 0;
    const correctAnswers = [];
    let answerToShow;
    // eslint-disable-next-line no-unused-vars
    const answers = (value, index) => {
      const calcs = [
        [round(value / sqrt2High, prec), round(value / sqrt2Low, prec), 0],
        [round(value * sqrt2Low, prec), round(value * sqrt2High, prec), 1],
        [value, value, 0],
      ];
      return calcs[index];
    };
    const [knownSides, unknownSide] = scenario;
    if (unknownSide === '12') {
      tri._side12.showAll();
      tri._side12.setLabel('?');
      if (knownSides.indexOf('01') > -1) {
        tri._side01.showAll();
        correctAnswer = answers(side01, 0);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
      if (knownSides.indexOf('20') > -1) {
        tri._side20.showAll();
        correctAnswer = answers(side20, 2);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
    }
    if (unknownSide === '01') {
      tri._side01.showAll();
      tri._side01.setLabel('?');
      if (knownSides.indexOf('12') > -1) {
        tri._side12.showAll();
        correctAnswer = answers(side12, 1);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
      if (knownSides.indexOf('20') > -1) {
        tri._side20.showAll();
        correctAnswer = answers(side20, 1);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
    }
    if (unknownSide === '20') {
      tri._side20.showAll();
      tri._side20.setLabel('?');
      if (knownSides.indexOf('12') > -1) {
        tri._side12.showAll();
        correctAnswer = answers(side12, 2);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
      if (knownSides.indexOf('01') > -1) {
        tri._side01.showAll();
        correctAnswer = answers(side01, 0);
        const [min, max, trueAnswer] = correctAnswer;
        correctAnswers.push(min);
        correctAnswers.push(max);
        answerToShow = correctAnswers[trueAnswer];
      }
    }

    if (correctAnswers.length > 0) {
      this.answer = [Math.min(...correctAnswers), Math.max(...correctAnswers), answerToShow];
    }

    this.answer = correctAnswer;
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    // eslint-disable-next-line prefer-destructuring
    this.answer = this.answer[2];
    super.showAnswer();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._input.disable();
    const value = this._input.getValue();
    if (value.length === 0) {
      return 'notSelected';
    }
    if (value >= this.answer[0] && value <= this.answer[1]) {
      return 'correct';
    }
    return 'incorrect';
  }
}
