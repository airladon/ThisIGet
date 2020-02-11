// @flow
/* eslint-disable */
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
  randInt,
  randSign,
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
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    this.scalingFactor = 1;
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
  ): Array<Point> {
    const side1 = rand(0.9, 1.8);
    const side2 = rand(0.6, 1.2);
    // const sideRoot3 = side * Math.sqrt(3);

    const p1 = new Point(-side1 / 2, -side2 / 2);
    const p2 = new Point(side1 / 2, side2 / 2);
    const p3 = new Point(side1 / 2, -side2 / 2);

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
    this.fillSelection(null, ['-', '-', '-', '-']);
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

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  addIfDifferent(
    correct: number,
    testIncorrect: number,
    incorrectArray: Array<number | string>,
    precision: number = 1,
  ) {
    const roundedIncorrect = round(testIncorrect, precision);
    if (
      round(correct, precision) !== roundedIncorrect
      &&
      incorrectArray.indexOf(roundedIncorrect) === -1
    ) {
      incorrectArray.push(round(testIncorrect, precision));
    }
  }

  scenarioUnknownSine0() {
    const tri = this._tri;
    const angle0 = parseFloat(tri._angle0.getLabel());
    const sine0 = round(Math.sin(angle0 * Math.PI / 180), 4);
    const hypotenuse = randInt(1, 100);
    tri._side01.showAll();
    tri._side01.setLabel(`${hypotenuse}`);
    tri._side12.showAll();
    tri._side12.setLabel('?');
    tri._angle0.showAll();
    tri._angle1.hide();
    const right = round(sine0 * hypotenuse, 1);
    const wrong = [];
    this.addIfDifferent(right, sine0 * hypotenuse / 2, wrong);
    // this.addIfDifferent(right, sine0 * hypotenuse + randSign() * rand(0.1, 0.5), wrong);
    this.addIfDifferent(right, angle0 * Math.PI / 180 * hypotenuse, wrong);
    this.addIfDifferent(right, angle0 * hypotenuse, wrong);
    this.addIfDifferent(right, (1 - sine0) * hypotenuse, wrong);
    this.answer = this.fillSelection(right, wrong);
  }

  scenarioUnknownCosine() {
    const tri = this._tri;
    const angle1 = 90 - parseFloat(tri._angle0.getLabel());
    const sine1 = round(Math.sin(angle1 * Math.PI / 180), 4);
    const sine0 = round(Math.sin((90 - angle1) * Math.PI / 180), 4);
    const hypotenuse = randInt(1, 100);
    tri._side01.showAll();
    tri._side01.setLabel(`${hypotenuse}`);
    tri._side20.showAll();
    tri._side20.setLabel('?');
    tri._angle0.showAll();
    tri._angle1.hide();
    const right = round(sine1 * hypotenuse, 1);
    const wrong = [];
    this.addIfDifferent(right, sine1 * hypotenuse / 2, wrong);
    // this.addIfDifferent(right, sine1 * hypotenuse + randSign() * rand(0.1, 0.5), wrong);
    this.addIfDifferent(right, angle1 * Math.PI / 180 * hypotenuse, wrong);
    this.addIfDifferent(right, angle1 * hypotenuse, wrong);
    this.addIfDifferent(right, (1 - sine1) * hypotenuse, wrong);
    this.addIfDifferent(right, sine0 * hypotenuse / 2, wrong);
    // this.addIfDifferent(right, sine0 * hypotenuse + randSign() * rand(0.1, 0.5), wrong);
    this.answer = this.fillSelection(right, wrong);
  }

  scenarioUnknownHypotenuse() {
    const tri = this._tri;
    const angle0 = parseFloat(tri._angle0.getLabel());
    const sine0 = round(Math.sin(angle0 * Math.PI / 180), 4);
    const opposite = randInt(1, 100);
    const hypotenuse = round(opposite / sine0, 1);
    tri._side01.showAll();
    tri._side01.setLabel('?');
    tri._side12.showAll();
    tri._side12.setLabel(`${opposite}`);
    tri._angle0.showAll();
    tri._angle1.hide();
    const right = round(opposite / sine0, 1);
    const wrong = [];
    this.addIfDifferent(right, sine0 * opposite, wrong);
    // this.addIfDifferent(right, opposite / sine0 + randSign() * rand(0.1, 0.5), wrong);
    this.addIfDifferent(right, opposite / (1 - sine0), wrong);
    this.addIfDifferent(right, opposite / (angle0 * Math.PI / 180), wrong);
    this.addIfDifferent(right, opposite / (1 / angle0), wrong);
    this.answer = this.fillSelection(right, wrong);
  }

  scenarioUnknownAngle() {
    const tri = this._tri;
    const angle0 = parseFloat(tri._angle0.getLabel());
    const sine0 = round(Math.sin(angle0 * Math.PI / 180), 4);
    const hypotenuse = randElement([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 20, 30, 40, 50, 60, 70, 80,90,
      100, 200, 300, 400, 500, 600, 700, 800, 900,
      1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
    ]);
    const opposite = round(sine0 * hypotenuse, 4);
    
    tri._side01.showAll();
    tri._side01.setLabel(`${hypotenuse}`);
    tri._side12.showAll();
    tri._side12.setLabel(`${opposite}`);
    tri._angle0.showAll();
    tri._angle0.setLabel('?');
    tri._angle1.hide();
    const right = angle0;
    const wrong = [];
    this.addIfDifferent(right, Math.min(angle0 + randInt(1, 2), 90), wrong, 0);
    this.addIfDifferent(right, Math.min(angle0 + randInt(3, 5), 90), wrong, 0);
    this.addIfDifferent(right, Math.min(angle0 + randInt(6, 9), 90), wrong, 0);
    this.addIfDifferent(right, Math.min(angle0 + randInt(10, 20), 90), wrong, 0);
    this.addIfDifferent(right, Math.max(angle0 - randInt(1, 2), 0), wrong, 0);
    this.addIfDifferent(right, Math.max(angle0 - randInt(3, 5), 0), wrong, 0);
    this.addIfDifferent(right, Math.max(angle0 - randInt(6, 9), 0), wrong, 0);
    this.addIfDifferent(right, Math.max(angle0 - randInt(10, 20), 0), wrong, 0);
    this.answer = this.fillSelection(right, wrong);
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const tri = this._tri;
    tri.makeValidTriangle();
    // this.setLabels();
    tri.exec('showAll', ['line', 'angle2']);
    tri._angle2.setLabel('');
    // this.scenarioUnknownSine0();
    // this.scenarioUnknownCosine();
    this.scenarioUnknownHypotenuse();
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
