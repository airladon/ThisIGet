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
} = Fig;

const {
  removeRandElement,
  randElement,
  randElements,
  round,
  randInt,
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
        checkDimensions: {
          answer: 'Incorrect',
          details: 'Make sure to check the dimensions are the same',
        },
        oppositeAngles: {
          answer: 'Incorrect',
          details: 'Opposite angles are not equal',
        },
        oppositeSides: {
          answer: 'Incorrect',
          details: 'Opposite sides are not equal',
        },
        diag: {
          answer: 'Incorrect',
          details: 'Both diagonals do not intersect at their midpoints',
        },
        notSelected: {
          answer: 'Incorrect',
          details: 'Make sure to select an answer above the "Check" button',
        },
        custom: {
          answer: 'Incorrect',
          details: 'Please try again',
        },
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.addMultipleChoice('pgram', ['-', '-', '-', 'No']);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    this.scalingFactor = 1;
  }

  // eslint-disable-next-line class-methods-use-this
  randomParallelogram(
  ): Array<Point> {

    const length = rand(1, 2.2);
    const height = rand(0.8, 1.5);
    const offset = rand(0, 1);

    const p1 = new Point(-length / 2 - offset / 2, -height / 2);
    const p2 = new Point(-length / 2 + offset / 2, height / 2);
    const p3 = new Point(+length / 2 + offset / 2, height / 2);
    const p4 = new Point(+length / 2 - offset / 2, -height / 2);

    return [p1, p2, p3, p4];
  }

  calcRandomPgram() {
    const pointsPgram = this.randomParallelogram();
    const rotation = rand(0, Math.PI * 2);
    const scale = randElement([-1, 1]) * rand(0.6, 1);
    const position = -0.5;
    const transform = new Transform().scale(scale, 1)
      .rotate(rotation).translate(0, position);

    const points = pointsPgram.map(p => p.transformBy(transform.m()));
    this._pgram._pad0.scenarios.quiz = { position: points[0] };
    this._pgram._pad1.scenarios.quiz = { position: points[1] };
    this._pgram._pad2.scenarios.quiz = { position: points[2] };
    this._pgram._pad3.scenarios.quiz = { position: points[3] };
  }

  setupNewProblem() {
    this.fillSelection([['-', false], ['-', false], ['-', false]]);
    this._choice.hide();
    this.calcRandomPgram();
    this._pgram.hideAll();
    this._pgram.show();
    this._pgram._line.show();
    this._pgram._pad0.show();
    this._pgram._pad1.show();
    this._pgram._pad2.show();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    // this._question.drawingObject.setText('');
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  makeConsistent() {
    const pgram = this._pgram;
    const angle0 = parseFloat(pgram._angle0.getLabel());
    const angle1 = (360 - angle0 * 2) / 2;
    pgram._angle0.setLabel(`${angle0}º`);
    pgram._angle1.setLabel(`${angle1}º`);
    pgram._angle3.setLabel(`${angle1}º`);
    pgram._angle2.setLabel(`${angle0}º`);

    this.scalingFactor = randInt(10, 100);

    const side01 = pgram._side01.getLength();
    pgram._side01.setLabel(`${round(side01 * this.scalingFactor, 0)}`);
    pgram._side23.setLabel(`${round(side01 * this.scalingFactor, 0)}`);

    const side12 = pgram._side12.getLength();
    pgram._side12.setLabel(`${round(side12 * this.scalingFactor, 0)}`);
    pgram._side30.setLabel(`${round(side12 * this.scalingFactor, 0)}`);
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const pgram = this._pgram;
    // const angles = [pgram._angle0, pgram._angle1, pgram._angle2, pgram._angle3];
    // const sides = [pgram._side01, pgram._side12, pgram._side23, pgram._side30];
    pgram.showAll();
    this.hint = 'checkDimensions';
    if (pgram._angle0.angle > Math.PI) {
      pgram.reverse = !pgram.reverse;
      pgram.updatePoints(pgram.points);
    }
    if (pgram._angle0.angle > Math.PI) {
      pgram.reverse = !pgram.reverse;
      pgram.updatePoints(pgram.points);
    }

    // make consistent
    this.makeConsistent();

    let answer = 0;
    // // eslint-disable-next-line max-len
    const scenarios: Array<[boolean, string, Array<string>, string, string, Array<[string, number]>]> = [
      // [
      //   true, 'AAA_SS', ['0', '1', '2', '01', '12'], '23',
      //   'Quadrangles with equal opposite angles are parallelograms',
      //   [['0', -3], ['2', 3]],
      // ],
      // [
      //   true, 'AAA_SS', ['0', '1', '2', '01', '12'], '23',
      //   'Quadrangles with equal opposite angles are parallelograms',
      //   [['1', -3], ['3', 3]],
      // ],
      // [
      //   true, 'SSSS_A', ['01', '12', '23', '30', '0'], '1',
      //   'Quadrangles with equal opposite sides are parallelograms',
      //   [['01', -0.1], ['23', 0.1]],
      // ],
      // [
      //   true, 'SSSS_AA', ['01', '12', '23', '30', '0', '3'], '1',
      //   'Quadrangles with equal opposite sides are parallelograms',
      //   [['01', -0.1], ['23', 0.1]],
      // ],
      [
        true, 'AAAA_SS', ['0', '1', '2', '3', '01', '12'], '23',
        'Quadrangles with equal opposite angles are parallelograms',
        [['0', -3], ['2', 3]],
      ],
      // [
      //   false, 'A_SS', ['0', '01', '12'], '23',
      //   'Not enough information to determine if a parallelogram',
      //   [['0', -3], ['2', 3]],
      // ],
      // [
      //   false, 'AA_SS', ['0', '2', '01', '12'], '23',
      //   'Not enough information to determine if a parallelogram',
      //   [['0', -3], ['2', 3]],
      // ],
      // [
      //   false, 'SSS_A', ['01', '12', '23', '0'], '2',
      //   'Not enough information to determine if a parallelogram',
      //   [['0', -3], ['2', 3]],
      // ],
    ];
    const scenario = randElement(scenarios);
    const [possible, name, pgramShow, unknown, defaultHint, trick] = scenario;
    let hint = defaultHint;
    if (!possible) {
      answer = 3;
    }

    this.hint = 'custom';
    const willTrick = rand(0.4, 1);
    if (answer !== 3 && willTrick < 0.3 && trick.length > 0) {
      trick.forEach((prop: [string, number]) => {
        let element;
        let delta = prop[1];
        if (prop[0].length === 1) {
          element = pgram[`_angle${prop[0]}`];
          const value = parseFloat(element.getLabel());
          element.setLabel(`${(value + delta).toFixed(0)}º`);
          this.hint = 'oppositeAngles';
        } else {
          element = pgram[`_side${prop[0]}`];
          delta *= this.scalingFactor;
          const value = parseFloat(element.getLabel());
          element.setLabel((round(value + delta, 0)).toFixed(0));
          this.hint = 'oppositeSides';
        }
      });
      hint = null;
      answer = 3;
    }

    // calculate the multiple choice answers
    let options = [];
    if (unknown.length === 2) {
      const side01 = pgram._side01.getLabel();
      const side12 = pgram._side12.getLabel();
      options = [
        [side01, true],
        [side12, false],
      ];
      if (parseFloat(side01) === parseFloat(side12)) {
        options[1][0] = `${side01 * 2}`;
      }
    }
    if (unknown.length === 1) {
      const angle0 = pgram._angle0.getLabel();
      const angle1 = pgram._angle1.getLabel();
      options = [
        [angle0, false],
        [angle1, true],
        [randElement([
          `${parseFloat(angle0) * 2}º`,
          `${parseFloat(angle1) * 2}º`,
        ]), false],
      ];
      if (parseFloat(angle0) === parseFloat(angle1)) {
        options[0][0] = '45º';
      }
    }

    const answerPosition = this.fillSelection(options);
    if (answer !== 3) {
      answer = answerPosition;
    }

    // Show elements
    const showProperties = (shape, props) => {
      props.forEach((prop) => {
        if (prop.length === 1) {
          shape[`_angle${prop}`].showAll();
        } else {
          const side = shape[`_side${prop}`];
          side.showAll();
        }
      });
    };

    this._pgram.hideAll();
    this._pgram._line.show();
    showProperties(pgram, pgramShow);

    // show unknown
    let unknownElement;
    if (unknown.length === 1) {
      unknownElement = pgram[`_angle${unknown}`];
    } else {
      unknownElement = pgram[`_side${unknown}`];
    }
    if (unknownElement != null) {
      unknownElement.showAll();
      unknownElement.setLabel('?');
    }
    if (hint != null) {
      const hintElement = document.querySelector('#id__quiz_answer_box__custom_q1 .approach__quiz__answer_details_text');
      if (hintElement != null) {
        hintElement.innerHTML = hint;
      }
    }

    this.answer = answer;
    // this._check.show();
    this._choice.show();
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  fillSelection(options) {
    const numOptions = options.length;
    let answer;
    for (let i = 0; i < numOptions; i += 1) {
      const choiceIndex = 2 - i;
      const choiceElement = document.getElementById(
        `id_approach__quiz_multiple_choice_box_answer__pgram_${choiceIndex}`,
      );
      if (choiceElement != null) {
        const option = removeRandElement(options);
        if (option[1]) {
          answer = choiceIndex;
        }
        choiceElement.innerHTML = option[0];
      }
    }

    const firstChoiceText = document.getElementById(
      'id_approach__quiz_multiple_choice_box_answer__pgram_0',
    );
    if (firstChoiceText != null
      && firstChoiceText.parentElement != null
      && firstChoiceText.parentElement.parentElement != null
    ) {
      if (numOptions === 2) {
        firstChoiceText.parentElement.parentElement.style.visibility = 'hidden';
      } else {
        firstChoiceText.parentElement.parentElement.style.visibility = 'visible';
      }
    }
    return answer;
  }

  showAnswer() {
    super.showAnswer();
    this.selectMultipleChoice('pgram', this.answer);
    // if (this.answer === 0) {
    //   this.selectMultipleChoice('similar_tri_1', 0);
    // } else {
    //   this.selectMultipleChoice('similar_tri_1', 1);
    // }
    // this._answerBox.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('pgram');
    if (selection === -1) {
      return 'notSelected';
    }
    if (selection === this.answer) {
      return 'correct';
    }

    return this.hint;
  }
}
