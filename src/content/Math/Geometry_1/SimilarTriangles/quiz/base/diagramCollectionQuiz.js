// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
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
        ssa: {
          answer: 'Incorrect',
          details: 'Side-Side-Angle does not guarantee congruence if the angle\'s opposite side is longer than the adjacent side.',
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
    this.addMultipleChoice('similar_tri_1', ['Yes', 'No', 'Maybe']);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    console.log(this)
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
    maxQuadrantBounds: Point = new Point(1, 1),
    minQuadrantBounds: Point = new Point(0.5, 0.5),
  ): Array<Point> {
    const possibleQuads = [0, 1, 2, 3];
    const quadrants = randElements(3, possibleQuads);

    const points = [];
    quadrants.forEach((q) => {
      let x = rand(minQuadrantBounds.x, maxQuadrantBounds.x);
      let y = rand(minQuadrantBounds.y, maxQuadrantBounds.y);
      if (q === 1 || q === 2) {
        x *= -1;
      }
      if (q === 2 || q === 3) {
        y *= -1;
      }
      points.push(new Point(x, y));
    });
    return points;
  }

  calcRandomTriangles() {
    const points = this.randomTriangle();
    const rotation1 = 0; //rand(0, Math.PI * 2);
    const rotation2 = rand(0, Math.PI * 2);
    const position1 = new Point(-1.2, -0.3);
    const position2 = new Point(1.2, -0.3);
    const scale1 = randElement([-1, 1]);
    const scale2 = 0.8;
    const transform1 = new Transform().scale(scale1, 1)
      .rotate(rotation1).translate(position1);
    const transform2 = new Transform().scale(scale2, scale2)
      .rotate(rotation2).translate(position2);
    const points1 = points.map(p => p.transformBy(transform1.m()));
    const points2 = points.map(p => p.transformBy(transform2.m()));
    this._tri1._pad0.scenarios.quiz = { position: points1[0] };
    this._tri1._pad1.scenarios.quiz = { position: points1[1] };
    this._tri1._pad2.scenarios.quiz = { position: points1[2] };
    this._tri2._pad0.scenarios.quiz = { position: points2[0] };
    this._tri2._pad1.scenarios.quiz = { position: points2[1] };
    this._tri2._pad2.scenarios.quiz = { position: points2[2] };
    // const trick = rand(0, 1);
    // if (trick < 0.3) {
    //   this._tri2._pad0.scenarios.quiz = { position: points2[0].add(0.1, 0) };
    //   this.hint = 'checkDimensions';
    // } else {
    //   this.hint = 'incorrect';
    // }
  }

  setupNewProblem() {
    this.calcRandomTriangles();
    this._tri1.hideAll();
    this._tri1.show();
    this._tri1._line.show();
    this._tri1._pad0.show();
    this._tri1._pad1.show();
    this._tri1._pad2.show();
    this._tri2.hideAll();
    this._tri2.show();
    this._tri2._line.show();
    this._tri2._pad0.show();
    this._tri2._pad1.show();
    this._tri2._pad2.show();
    this._tri1.makeValid.shape = '';
    this._tri2.makeValid.shape = '';
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    // this._question.drawingObject.setText('');
  }

  afterTransitionToNewProblem() {
    // super.afterTransitionToNewProblem();
    // this._question.drawingObject.setText(`Enter the unknown ${'something'}:`);
    // this.answer = ;
    super.afterTransitionToNewProblem();
    this._tri1.makeValid.shape = 'triangle';
    this._tri2.makeValid.shape = 'triangle';
    this._tri1.updatePoints(this._tri1.points);
    this._tri2.updatePoints(this._tri2.points);
    this.showAnglesAndSides();
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    const tri1Angles = [tri1._angle0, tri1._angle1, tri1._angle2];
    const tri2Angles = [tri2._angle0, tri2._angle1, tri2._angle2];
    const tri1Sides = [tri1._side01, tri1._side12, tri1._side20];
    const tri2Sides = [tri2._side01, tri2._side12, tri2._side20];
    if (this._tri1._angle0.angle > Math.PI) {
      this._tri1.reverse = !this._tri1.reverse;
      this._tri1.updatePoints(this._tri1.points);
      // tri1Angles = [tri1._angle0, tri1._angle2, tri1._angle1];
      // tri1Sides = [tri1._side20, tri1._side12, tri1._side01];
    }
    if (this._tri2._angle0.angle > Math.PI) {
      this._tri2.reverse = !this._tri2.reverse;
      this._tri2.updatePoints(this._tri2.points);
      // tri2Angles = [tri2._angle0, tri2._angle2, tri2._angle1];
      // tri2Sides = [tri2._side20, tri2._side12, tri2._side01];
    }
    let answer = 'possible';
    const scenarios: Array<[string, string, Array<string>, Array<string>, string, Array<[string, number]>]> = [
      // [
      //   'yes', 'AAA', ['0', '1', '2'], ['0', '1', '2'],
      //   'Triangles with the same corresponding angles are similar',
      //   [['0', -5], ['1', 5]],
      // ],
      [
        'yes', 'SSS', ['01', '12', '20'], ['01', '12', '20'],
        'Triangles with  corresponding sides in proportion are similar',
        [['max', rand(0.1, 0.5)]],
      ],
      // //
      // [
      //   'yes', 'AA', ['0', '1'], ['0', '1'],
      //   'Triangles with two equal angles are similar',
      //   [['0', randInt(1, 8)]],
      // ],    // same
      // [
      //   'yes', 'AA', ['0', '2'], ['0', '1'],
      //   'You should calculate all three angles',
      //   [['1', randInt(1, 8)]],
      // ],    // different
      
      // ['maybe', 'SS', ['01', '12'], ['01', '12'], 'Two sides is not enough information to determine similarity', []], // same
      // ['maybe', 'SA', ['0', '12'], ['0', '12'], 'A single side and angle is not enough information to determine similarity', []], // different
      // //
      // [
      //   'yes', 'SAS', ['01', '1', '12'], ['01', '1', '12'],
      //   'SAS is sufficient to determine similarity.',
      //   [['01', rand(0.1, 0.5)]],
      // ],
      // [
      //   'yes', 'SAA', ['01', '1', '2'], ['01', '1', '2'],
      //   'Triangles with two equal angles are similar', [],
      // ],
      // ['yes', 'SAA', ['01', '1', '2'], ['01', '1', '0'], 'You should calculate all three angles', []],
      // ['yes', 'SSA', ['01', '12', '2'], ['01', '12', '2'], 'This is a case of SSA where the opposite side is greater than or equal to the adjacent side', []],
    ];
    const scenario = randElement(scenarios);
    const [possible, name, tri1Show, tri2Show, defaultHint, trick] = scenario;
    let hint = defaultHint;

    this.hint = 'custom';
    const showProperties = (tri, props) => {
      props.forEach((prop) => {
        if (prop.length === 1) {
          tri[`_angle${prop}`].showAll();
        } else {
          const side = tri[`_side${prop}`];
          side.showAll();
        }
      });
    };
    answer = possible;
    this._tri1.hideAll();
    this._tri1._line.show();
    this._tri2.hideAll();
    this._tri2._line.show();
    showProperties(this._tri1, tri1Show);
    showProperties(this._tri2, tri2Show);

    // Normalize the dimensions of the triangld
    // Copy all angles from one triangle to next
    tri1Angles.forEach((tri1Angle, index) => {
      tri2Angles[index].label.setText(tri1Angle.label.getText());
    });

    // Copy and scale side lengths of small triangle to large
    const scalingFactor = randElement([10, 100]);
    const proportion = randInt(2, 10);
    tri2Sides.forEach((tri2Side, index) => {
      let side = parseFloat(tri2Side.label.getText());
      side *= scalingFactor;
      side = round(side, 0);
      const side1 = side * proportion;
      tri1Sides[index].label.setText(`${side1.toFixed(0)}`);
      tri2Side.label.setText(`${side.toFixed(0)}`);
    });

    // Deal with the SSA case
    if (name === 'SSA') {
      const opposite = parseFloat(tri1Sides[0].label.getText());
      const adjacent = parseFloat(tri1Sides[1].label.getText());
      if (adjacent > opposite) {
        hint = 'This is a case of SSA when the adjacent side is longer than the opposite side';
        answer = 'maybe';
      }
    }

    const willTrick = rand(0, 0.3);
    if (willTrick < 0.3 && trick != null) {
      trick.forEach((prop: [string, number]) => {
        let element;
        let delta = prop[1];
        if (prop[0].length === 1) {
          element = this._tri2[`_angle${prop[0]}`];
          const value = parseFloat(element.label.getText());
          element.label.setText(`${(value + delta).toFixed(0)}º`);
        } else if (prop[0] === 'max') {
          const len01 = parseFloat(this._tri2._side01.label.getText());
          const len12 = parseFloat(this._tri2._side12.label.getText());
          const len20 = parseFloat(this._tri2._side20.label.getText());
          delta *= scalingFactor;
          if (len12 > len01 && len12 > len20) {
            this._tri2._side12.label.setText((len12 + delta).toFixed(0));
          } else if (len20 > len12 && len20 > len01) {
            this._tri2._side20.label.setText((len20 + delta).toFixed(0));
          } else {
            this._tri2._side01.label.setText((len01 + delta).toFixed(0));
          }
        } else {
          element = this._tri2[`_side${prop[0]}`];
          delta *= scalingFactor;
          const value = parseFloat(element.label.getText());
          element.label.setText((value + delta).toFixed(0));
        }
      });
      hint = null;
      this.hint = 'checkDimensions';
      answer = 'no';
    }


    if (hint != null) {
      const hintElement = document.querySelector('#id__quiz_answer_box__custom_q1 .approach__quiz__answer_details_text');
      if (hintElement != null) {
        hintElement.innerHTML = hint;
      }
    }

    this.answer = answer;
    // this._check.show();
    // this._choice.show();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    if (this.answer === 'yes') {
      this.selectMultipleChoice('similar_tri_1', 0);
    } else if (this.answer === 'no') {
      this.selectMultipleChoice('similar_tri_1', 1);
    } else {
      this.selectMultipleChoice('similar_tri_1', 2);
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
      || (selection === 1 && this.answer === 'no'
      || (selection === 2 && this.answer === 'maybe'))) {
      return 'correct';
    }

    return this.hint;
  }
}
