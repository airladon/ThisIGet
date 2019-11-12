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
  Line,
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
    const height = rand(1.2, 1.6);
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
    const scale = randElement([-1, 1]) * rand(1, 1);
    const position = -0.4;
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
    this.hideAll();
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
    const angle0 = round(parseFloat(pgram._angle0.getAngle()) * 180 / Math.PI, 0);
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

  updateDiagonalsAndMarks() {
    const pgram = this._pgram;
    const { points } = pgram;
    const line02 = new Line(points[0], points[2]);
    const line31 = new Line(points[3], points[1]);
    this._d02.setEndPoints(points[0], points[2]);
    this._d31.setEndPoints(line31.p1, line31.p2);
    this._l02_1.setPosition(line02.pointAtPercent(0.4));
    this._l02_2.setPosition(line02.pointAtPercent(0.6));
    this._l02_1.setRotation(line02.angle());
    this._l02_2.setRotation(line02.angle());
    this._l31_1.setPosition(line31.pointAtPercent(0.4));
    this._l31_2.setPosition(line31.pointAtPercent(0.6));
    this._l31_1.setRotation(line31.angle());
    this._l31_2.setRotation(line31.angle());

    this._p01.setPosition(pgram._side01.line.midPoint());
    this._p01.setRotation(pgram._side01.line.angle());
    this._p12.setRotation(pgram._side12.line.angle());
    this._p12.setPosition(pgram._side12.line.midPoint());
    this._p23.setPosition(pgram._side23.line.midPoint());
    this._p23.setRotation(pgram._side23.line.angle() + Math.PI);
    this._p30.setPosition(pgram._side30.line.midPoint());
    this._p30.setRotation(pgram._side30.line.angle() + Math.PI);
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const pgram = this._pgram;
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
    this.updateDiagonalsAndMarks();

    let answer = 0;
    // // eslint-disable-next-line max-len
    const scenarios: Array<[boolean, string, Array<string>, string, string, Array<[string, number]>]> = [
      [
        true, 'AAA_SS', ['0', '1', '2', '01', '12'], '23',
        'Quadrangles with equal opposite angles are parallelograms',
        [['0', -3], ['2', 3]],
      ],
      [
        true, 'AAA_SS', ['0', '1', '2', '01', '12'], '23',
        'Quadrangles with equal opposite angles are parallelograms',
        [['1', -3], ['3', 3]],
      ],
      [
        true, 'SSSS_A', ['01', '12', '23', '30', '0'], '1',
        'Quadrangles with equal opposite sides are parallelograms',
        [['01', -0.1], ['23', 0.1]],
      ],
      [
        true, 'SSSS_AA', ['01', '12', '23', '30', '0', '3'], '1',
        'Quadrangles with equal opposite sides are parallelograms',
        [['01', -0.1], ['23', 0.1]],
      ],
      [
        true, 'AAAA_SS', ['0', '1', '2', '3', '01', '12'], '23',
        'Quadrangles with equal opposite angles are parallelograms',
        [['0', -3], ['2', 3]],
      ],
      [
        false, 'A_SS', ['0', '01', '12'], '23',
        'Not enough information to determine if a parallelogram',
        [['0', -3], ['2', 3]],
      ],
      [
        false, 'AA_SS', ['0', '2', '01', '12'], '23',
        'Not enough information to determine if a parallelogram',
        [['0', -3], ['2', 3]],
      ],
      [
        false, 'SSS_A', ['01', '12', '23', '0'], '2',
        'Not enough information to determine if a parallelogram',
        [['0', -3], ['2', 3]],
      ],
      [
        true, 'PPPP_SS', ['p01', 'p12', 'p23', 'p30', '01', '12'], '23',
        'Quadrangles with parallel opposite sides are parallelograms',
        [],
      ],
      [
        false, 'PP_SS', ['p01', 'p23', '01', '12'], '23',
        'It is not clear that both pairs of opposite sides are parallel',
        [],
      ],
      [
        true, 'PPPP_A', ['p01', 'p12', 'p23', 'p30', '1'], '3',
        'Quadrangles with parallel opposite sides are parallelograms',
        [],
      ],
      [
        true, 'PPPP_A', ['p01', 'p12', 'p23', 'p30', '0'], '3',
        'Quadrangles with parallel opposite sides are parallelograms',
        [],
      ],
      [
        true, 'DD_A', ['d02', 'd31', 'l02_1', 'l02_2', 'l31_1', 'l31_2', '1'], '3',
        'Quadrangles with diagonals that intersect at their midpoints are parallelograms',
        [],
      ],
      [
        true, 'DD_AA', ['d02', 'd31', 'l02_1', 'l02_2', 'l31_1', 'l31_2', '1', '2'], '3',
        'Quadrangles with diagonals that intersect at their midpoints are parallelograms',
        [],
      ],
      [
        false, 'D_AA', ['d02', 'd31', 'l31_1', 'l31_2', '1', '2'], '3',
        'It is not clear if one diagonal intersects at its midpoint',
        [],
      ],
      [
        true, 'DD_SS', ['d02', 'd31', 'l02_1', 'l02_2', 'l31_1', 'l31_2', '01', '12'], '23',
        'Quadrangles with diagonals that intersect at their midpoints are parallelograms',
        [],
      ],
      [
        true, 'DD_SS', ['d02', 'd31', 'l02_1', 'l02_2', 'l31_1', 'l31_2', '01', '12'], '23',
        'Quadrangles with diagonals that intersect at their midpoints are parallelograms',
        [],
      ],
      [
        false, 'DD_SS', ['d02', 'd31', 'l02_1', 'l02_2', '01', '12'], '23',
        'It is not clear if one diagonal intersects at its midpoint',
        [],
      ],
    ];
    const scenario = randElement(scenarios);
    const [possible, name, pgramShow, unknown, defaultHint, trick] = scenario;
    let hint = defaultHint;
    if (!possible) {
      answer = 3;
    }

    this.hint = 'custom';
    const willTrick = rand(0, 0.2);
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
        } else if (prop.length === 2) {
          const side = shape[`_side${prop}`];
          side.showAll();
        }
        if (prop.length >= 3) {
          this[`_${prop}`].showAll();
        }
      });
    };

    this._pgram.hideAll();
    this._pgram._line.show();
    // this._d02.showAll();
    // this._d31.showAll();
    // this._l02_1.showAll();
    // this._l02_2.showAll();
    // this._l31_1.showAll();
    // this._l31_2.showAll();
    // this._p01.showAll();
    // this._p12.showAll();
    // this._p23.showAll();
    // this._p30.showAll();
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
