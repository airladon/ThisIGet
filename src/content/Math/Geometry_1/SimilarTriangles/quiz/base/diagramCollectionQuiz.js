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
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.addMultipleChoice('similar_tri_1', ['Yes', 'No']);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
    maxQuadrantBounds: Point = new Point(0.9, 0.9),
    minQuadrantBounds: Point = new Point(0.4, 0.4),
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
    const rotation1 = rand(0, Math.PI * 2);
    const rotation2 = rand(0, Math.PI * 2);
    const position1 = new Point(-1.2, -0.3);
    const position2 = new Point(1.2, -0.3);
    const scale1 = randElement([-1, 1]);
    const scale2 = rand(0.3, 0.8);
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
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    // this._question.drawingObject.setText('');
  }

  afterTransitionToNewProblem() {
    // super.afterTransitionToNewProblem();
    // this._question.drawingObject.setText(`Enter the unknown ${'something'}:`);
    // this.answer = ;
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    let tri1Angles = [tri1._angle0, tri1._angle1, tri1._angle2];
    let tri2Angles = [tri2._angle0, tri2._angle1, tri2._angle2];
    let tri1Sides = [tri1._side01, tri1._side12, tri1._side20];
    let tri2Sides = [tri2._side01, tri2._side12, tri2._side20];
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
    const scenarios = [
      //
      // [true, 'AAA', ['0', '1', '2'], ['0', '1', '2']],
      // //
      // [true, 'AA', ['0', '1'], ['0', '1']],    // same
      // [true, 'AA', ['0', '2'], ['0', '1']],    // different
      //
      [false, 'SS', ['01', '12'], ['01', '12']], // same
      [false, 'SS', ['01', '12'], ['01', '20']], // different
      //
      [true, 'SAS', ['01', '1', '12'], ['01', '1', '12']],
    ];
    const scenario = randElement(scenarios);
    const [possible, name, tri1Show, tri2Show] = scenario;
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
    if (possible === false) {
      answer = 'not possible';
    }
    this._tri1.hideAll();
    this._tri1._line.show();
    this._tri2.hideAll();
    this._tri2._line.show();
    showProperties(this._tri1, tri1Show);
    showProperties(this._tri2, tri2Show);

    // Normalize the dimensions of the triangld
    if (possible === true && answer === 'possible') {
      // Copy all the angles over
      tri1Angles.forEach((tri1Angle, index) => {
        tri2Angles[index].label.setText(tri1Angle.label.getText());
      });

      const scalingFactor = randElement([10, 100]);
      const proportion = randInt(1, 10);

      tri2Sides.forEach((tri2Side, index) => {
        let side = parseFloat(tri2Side.label.getText());
        console.log(side)
        side *= scalingFactor;
        side = round(side, 0);
        const side1 = side * proportion;
        console.log(side, side1)
        tri1Sides[index].label.setText(`${side1.toFixed(0)}`);
        tri2Side.label.setText(`${side.toFixed(0)}`);
        console.log(tri2Side.label.getText())
      });
      // Copy all the sides over
      // for (let sideIndex = 0; sideIndex < 3; sideIndex += 1)
    }


    if (this.hint === 'checkDimensions') {
      answer = 'not possible';
    }
    this.answer = answer;
    // this._check.show();
    // this._choice.show();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    if (this.answer === 'possible') {
      this.selectMultipleChoice('congruent_tri_1', 0);
    } else {
      this.selectMultipleChoice('congruent_tri_1', 1);
    }
    // this._answerBox.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('similar_tri_1');
    if (selection === -1) {
      return 'notSelected';
    }
    if ((selection === 0 && this.answer === 'possible')
      || (selection === 1 && this.answer === 'not possible')) {
      return 'correct';
    }
    return this.hint;
  }
}
