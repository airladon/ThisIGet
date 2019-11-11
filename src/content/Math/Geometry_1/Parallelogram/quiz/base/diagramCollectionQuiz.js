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
  // removeRandElement,
  randElement,
  randElements,
  round,
  randInt,
  rand,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
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
        notSelected: {
          answer: 'Incorrect',
          details: 'Make sure to select "Yes" or "No" above the "Check" button',
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
    this.addMultipleChoice('similar_tri_1', ['Yes', 'No']);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    console.log(this)
  }

  // eslint-disable-next-line class-methods-use-this
  randomParallelogram(
  ): Array<Point> {

    const length = rand(1, 3);
    const height = rand(0.8, 1.5);
    const offset = rand(0, 1);

    const p1 = new Point(-length / 2 - offset / 2, -height / 2);
    const p2 = new Point(-length / 2 + offset / 2, height / 2);
    const p3 = new Point(+length / 2 + offset / 2, height / 2);
    const p4 = new Point(+length / 2 - offset / 2, -height / 2);

    return [p1, p2, p3, p4];
    // const rotation = rand(0, Math.PI * 1.999);
    // return points.map(p => p.rotateBy(rotation));
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
    // super.afterTransitionToNewProblem();
    // this._question.drawingObject.setText(`Enter the unknown ${'something'}:`);
    // this.answer = ;
    super.afterTransitionToNewProblem();
    // this._tri1.makeValid.shape = 'triangle';
    // this._tri2.makeValid.shape = 'triangle';
    // this._pgram.updatePoints(this._tri1.points);
    // this._tri2.updatePoints(this._tri2.points);
    this.showAnglesAndSides();
  }

  makeConsistent() {
    const pgram = this._pgram;
    const angle0 = parseFloat(pgram._angle0.getLabel());
    const angle1 = (360 - angle0 * 2) / 2;
    pgram._angle1.setLabel(`${angle1}º`);
    pgram._angle3.setLabel(`${angle1}º`);
    pgram._angle2.setLabel(`${angle0}º`);

    const side01 = parseFloat(pgram._side01.getLabel());
    pgram._side23.setLabel(`${side01}`);

    const side12 = parseFloat(pgram._side12.getLabel());
    pgram._side30.setLabel(`${side12}`);
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const pgram = this._pgram;
    const angles = [pgram._angle0, pgram._angle1, pgram._angle2, pgram._angle3];
    const sides = [pgram._side01, pgram._side12, pgram._side23, pgram._side30];
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

    let answer = 'possible';
    // // eslint-disable-next-line max-len
    const scenarios: Array<[string, string, Array<string>, string, Array<[string, number]>]> = [
      [
        'yes', 'angles', ['0', '1', '2', '3'],
        'Quadrangles with equal opposite angles are parallelograms',
        [['0', -3], ['2', 3]],
      ],
      [
        'yes', 'sides', ['01', '12', '23', '30'],
        'Quadrangles with equal opposite sides are parallelograms',
        [['01', -2], ['23', 2]],
      ],
      // [
      //   'yes', 'AAS', ['01', '12', '23', '30'],
      //   'Quadrangles with equal opposite sides are parallelograms',
      //   [],
      // ],
      // Doubled for proability of seeing it
      // [
      //   'yes', 'diagonals', ['01', '12', '20'], ['01', '12', '20'],
      //   'Triangles with  corresponding sides in proportion are similar',
      //   [['max', rand(0.1, 0.5)]],
      // ],
      // [
      //   'yes', 'SSS', ['01', '12', '20'], ['01', '12', '20'],
      //   'Triangles with  corresponding sides in proportion are similar',
      //   [['max', rand(0.1, 0.5)]],
      // ],
      // //
      // [
      //   'yes', 'AA', ['0', '1'], ['0', '1'],
      //   'Triangles with two equal angles are similar',
      //   [],
      // ],    // same
      // [
      //   'yes', 'AA', ['0', '2'], ['0', '1'],
      //   'You should calculate all three angles',
      //   [],
      // ],    // different

      // ['no', 'SS', ['01', '12'], ['01', '12'], 'Two sides is not enough information to determine similarity', []], // same
      // ['no', 'SA', ['0', '12'], ['0', '12'], 'A single side and angle is not enough information to determine similarity', []], // different
      // ['no', 'SA', ['0', '01'], ['0', '01'], 'A single side and angle is not enough information to determine similarity', []], // different
      // //
      // [
      //   'yes', 'SAS', ['01', '1', '12'], ['01', '1', '12'],
      //   'SAS is sufficient to determine similarity.',
      //   [['max', rand(0.1, 0.5)]],
      // ],
      // [
      //   'yes', 'SAS', ['01', '1', '12'], ['01', '1', '12'],
      //   'SAS is sufficient to determine similarity.',
      //   [['max', rand(0.1, 0.5)]],
      // ],
      // //
      // [
      //   'yes', 'SAA', ['01', '1', '2'], ['01', '1', '2'],
      //   'Triangles with two equal angles are similar', [],
      // ],
      // ['yes', 'SAA', ['01', '1', '2'], ['01', '1', '0'], 'You should calculate all three angles', []],
      // //
      // ['yes', 'SSA', ['01', '12', '2'], ['01', '12', '2'], 'This is a case of SSA where the opposite side is greater than or equal to the adjacent side', []],
      // ['yes', 'SSA', ['01', '12', '2'], ['01', '12', '2'], 'This is a case of SSA where the opposite side is greater than or equal to the adjacent side', []],
    ];
    const scenario = randElement(scenarios);
    const [possible, name, pgramShow, defaultHint, trick] = scenario;
    let hint = defaultHint;

    this.hint = 'custom';
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
    answer = possible;
    this._pgram.hideAll();
    this._pgram._line.show();
    showProperties(pgram, pgramShow);

    // Normalize the dimensions of the triangld
    // Copy all angles from one triangle to next
    // tri1Angles.forEach((tri1Angle, index) => {
    //   tri2Angles[index].label.setText(tri1Angle.label.getText());
    // });

    // Copy and scale side lengths of small triangle to large
    const scalingFactor = randElement([10, 100]);
    const proportion = randInt(2, 10);
    sides.forEach((pgramSide, index) => {
      let side = parseFloat(pgramSide.getLabel());
      side *= scalingFactor;
      side = round(side, 0);
      const side1 = side * proportion;
      sides[index].label.setText(`${side1.toFixed(0)}`);
      // pgramSide.label.setText(`${side.toFixed(0)}`);
    });

    // // Deal with the SSA case
    // if (name === 'SSA') {
    //   const opposite = parseFloat(tri1Sides[0].label.getText());
    //   const adjacent = parseFloat(tri1Sides[1].label.getText());
    //   if (adjacent > opposite) {
    //     hint = 'This is a case of SSA when the adjacent side is longer than the opposite side';
    //     answer = 'no';
    //   }
    // }

    // const willTrick = rand(0, 1);
    // if (willTrick < 0.3 && trick.length > 0) {
    //   trick.forEach((prop: [string, number]) => {
    //     let element;
    //     let delta = prop[1];
    //     if (prop[0].length === 1) {
    //       element = this._tri2[`_angle${prop[0]}`];
    //       const value = parseFloat(element.label.getText());
    //       element.label.setText(`${(value + delta).toFixed(0)}º`);
    //     } else if (prop[0] === 'max') {
    //       const len01 = parseFloat(this._tri2._side01.label.getText());
    //       const len12 = parseFloat(this._tri2._side12.label.getText());
    //       const len20 = parseFloat(this._tri2._side20.label.getText());
    //       let sides = [
    //         [len01, this._tri2._side01],
    //         [len12, this._tri2._side12],
    //         [len20, this._tri2._side20],
    //       ];
    //       sides = sides.filter(s => s[1].isShown);
    //       const maxIndex = sides.reduce((acc, value, index) => {
    //         if (sides[index][0] > sides[acc][0]) {
    //           return index;
    //         }
    //         return acc;
    //       }, 0);

    //       delta *= scalingFactor;
    //       const [maxLen, maxSide] = sides[maxIndex];
    //       maxSide.label.setText((maxLen + delta).toFixed(0));
    //     } else {
    //       element = this._tri2[`_side${prop[0]}`];
    //       delta *= scalingFactor;
    //       const value = parseFloat(element.label.getText());
    //       element.label.setText((value + delta).toFixed(0));
    //     }
    //   });
    //   hint = null;
    //   this.hint = 'checkDimensions';
    //   answer = 'no';
    // }


    // if (hint != null) {
    //   const hintElement = document.querySelector('#id__quiz_answer_box__custom_q1 .approach__quiz__answer_details_text');
    //   if (hintElement != null) {
    //     hintElement.innerHTML = hint;
    //   }
    // }

    // this.answer = answer;
    // this._check.show();
    // this._choice.show();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    if (this.answer === 'yes') {
      this.selectMultipleChoice('similar_tri_1', 0);
    } else {
      this.selectMultipleChoice('similar_tri_1', 1);
    }
    // this._answerBox.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('similar_tri_1');
    if (selection === -1) {
      return 'notSelected';
    }
    if ((selection === 0 && this.answer === 'yes')
      || (selection === 1 && this.answer === 'no')) {
      return 'correct';
    }

    return this.hint;
  }
}
