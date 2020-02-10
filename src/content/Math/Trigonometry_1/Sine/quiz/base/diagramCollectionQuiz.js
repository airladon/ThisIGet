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

  // setLabels() {
  //   const tri = this._tri;
  //   const angle0 = tri._angle0.getLabel();
  //   const angle1 = tri._angle1.getLabel();
  //   const sine0 = round(Math.sin(angle0 * Math.PI / 180), 4);
  //   const sine1 = round(Math.sin(angle1 * Math.PI / 180), 4);

  //   const side01 = round(rand(1, 100), 1);
  //   // const side12 = round(rand(1, 100), 1);
  //   // const side01 = round(rand(1, 100), 1);
  //   tri._side01.setLabel(`${side01}`);
  //   tri._side01.setLabel(`${side01}`);
  //   tri._side01.setLabel(`${side01}`);

  //   // const side12 = round(rand(1, 100), 1);
  //   // const side01 = side12 * 2;
  //   // const side20 = round(side12 * Math.sqrt(3), 1);
  //   // tri._side12.setLabel(`${side12}`);
  //   // tri._side01.setLabel(`${side01}`);
  //   // tri._side20.setLabel(`${side20}`);
  //   // tri._angle2.setLabel('');
  // }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  // eslint-disable-next-line class-methods-use-this
  // fillSelection(correct: ?(number | string), incorrect: Array<number | string>, precision: number = 1) {
  //   const possibleAnswers = [];
  //   if (correct != null) {
  //     possibleAnswers.push([correct, true]);
  //   }
  //   const numIncorrect = Math.min(4, incorrect.length + possibleAnswers.length) - possibleAnswers.length;
  //   for (let i = 0; i < numIncorrect; i += 1) {
  //     possibleAnswers.push([removeRandElement(incorrect), false]);
  //   }
  //   console.log(possibleAnswers)
  //   let trueAnswer;
  //   const totalAnswers = possibleAnswers.length;
  //   for (let i = 0; i < totalAnswers; i += 1) {
  //     const choiceIndex = 4 - 1 - i;
  //     const choiceElement = document.getElementById(
  //       `id_approach__quiz_multiple_choice_box_answer__tri_${choiceIndex}`,
  //     );
  //     if (choiceElement != null) {
  //       if (choiceElement.parentElement != null && choiceElement.parentElement.parentElement != null) {
  //         choiceElement.parentElement.parentElement.classList.remove('invisible');
  //       }
  //       // choiceElement.classList.remove('invisible');
  //       const answer = removeRandElement(possibleAnswers);
  //       if (answer[1]) {
  //         trueAnswer = choiceIndex;
  //       }
  //       // eslint-disable-next-line prefer-destructuring
  //       if (typeof answer[0] === 'number') {
  //         choiceElement.innerHTML = `${round(answer[0], precision)}`;
  //       } else {
  //         choiceElement.innerHTML = answer[0];
  //       }
  //     }
  //   }
  //   for (let i = totalAnswers; i < 4; i += 1) {
  //     const index = 4 - 1 - i;
  //     const answerElement = document.getElementById(
  //       `id_approach__quiz_multiple_choice_box_answer__tri_${index}`,
  //     );
  //     if (answerElement != null
  //       && answerElement.parentElement != null
  //       && answerElement.parentElement.parentElement != null
  //     ) {
  //         answerElement.parentElement.parentElement.classList.add('invisible');
  //     }
  //   }
  //   return trueAnswer;
  // }

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
    
    // const angle0 = tri._angle0.getLabel();
    // const angle1 = tri._angle1.getLabel();
    // const sine0 = round(Math.sin(angle0 * Math.PI / 180), 4);
    // const sine1 = round(Math.sin(angle1 * Math.PI / 180), 4);

    // const len = round(rand(1, 100), 1);
    // const scenarios1 = [
    //   // unknown side 01 (hypotenuse), known angle and opposite
    //   () => {
    //     tri._angle0.showAll();
    //     tri._side01.setLabel('?');
    //     tri._side12.setLabel(len.toFixed(2));
    //   },
    // ];
    // // eslint-disable-next-line max-len
    // const scenarios: Array<[Array<string>, string]> = [
    //   [['01'], '20'],
    //   [['01'], '12'],
    //   [['12'], '01'],
    //   [['12'], '20'],
    //   [['20'], '01'],
    //   [['20'], '12'],
    //   [['01', '20'], '12'],
    //   [['12', '20'], '01'],
    //   [['12', '01'], '20'],
    // ];
    // const scenario = randElement(scenarios);
    // const precision = 1;
    // const side1 = parseFloat(tri._side12.getLabel());
    // const side2 = parseFloat(tri._side01.getLabel());
    // const sideR3 = parseFloat(tri._side20.getLabel());
    // let incorrectAnswers = [];
    // let correctAnswer = 0;
    // // eslint-disable-next-line no-unused-vars
    // const answers = (value, index) => {
    //   const calcs = [
    //     round(value / 2, precision),
    //     round(value * 2, precision),
    //     round(value / Math.sqrt(3), precision),
    //     round(value * Math.sqrt(3), precision),
    //     round(value / Math.sqrt(3) * 2, precision),
    //     round(value / 2 * Math.sqrt(3), precision),
    //     round(value / 3, precision),
    //     round(value / Math.sqrt(2), precision),
    //     round(value * Math.sqrt(2), precision),
    //   ];
    //   return [
    //     calcs[index],
    //     [...calcs.slice(0, index), ...calcs.slice(index + 1)],
    //   ];
    // };
    // const [knownSides, unknownSide] = scenario;
    // let incorrect;
    // if (unknownSide === '12') {
    //   tri._side12.showAll();
    //   tri._side12.setLabel('?');
    //   if (knownSides.indexOf('01') > -1) {
    //     tri._side01.showAll();
    //     [correctAnswer, incorrect] = answers(side2, 0);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    //   if (knownSides.indexOf('20') > -1) {
    //     tri._side20.showAll();
    //     [correctAnswer, incorrect] = answers(sideR3, 2);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    // }
    // if (unknownSide === '01') {
    //   tri._side01.showAll();
    //   tri._side01.setLabel('?');
    //   if (knownSides.indexOf('12') > -1) {
    //     tri._side12.showAll();
    //     [correctAnswer, incorrect] = answers(side1, 1);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    //   if (knownSides.indexOf('20') > -1) {
    //     tri._side20.showAll();
    //     [correctAnswer, incorrect] = answers(sideR3, 4);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    // }
    // if (unknownSide === '20') {
    //   tri._side20.showAll();
    //   tri._side20.setLabel('?');
    //   if (knownSides.indexOf('12') > -1) {
    //     tri._side12.showAll();
    //     [correctAnswer, incorrect] = answers(side1, 3);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    //   if (knownSides.indexOf('01') > -1) {
    //     tri._side01.showAll();
    //     [correctAnswer, incorrect] = answers(side2, 5);
    //     incorrectAnswers = [...incorrectAnswers, ...incorrect];
    //   }
    // }

    // const choiceAnswers = [];
    // choiceAnswers.push([`${correctAnswer}`, true]);

    // const chosenIncorrectAnswers = [];
    // chosenIncorrectAnswers.push(removeRandElement(incorrectAnswers));
    // while (choiceAnswers.length < 4 && incorrectAnswers.length > 0) {
    //   const incorrectAnswer = removeRandElement(incorrectAnswers);
    //   if (chosenIncorrectAnswers.indexOf(incorrectAnswer) === -1) {
    //     chosenIncorrectAnswers.push(incorrectAnswer);
    //     choiceAnswers.push([`${incorrectAnswer}`, false]);
    //   }
    // }

    // this.answer = this.fillSelection(choiceAnswers);
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
