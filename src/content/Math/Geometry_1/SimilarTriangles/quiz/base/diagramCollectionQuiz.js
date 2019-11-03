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
  // round,
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
      {},
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
    const trick = rand(0, 1);
    if (trick < 0.3) {
      this._tri2._pad0.scenarios.quiz = { position: points2[0].add(0.1, 0) };
      this.hint = 'checkDimensions';
    } else {
      this.hint = 'incorrect';
    }
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
    if (this._tri1._angle0.angle > Math.PI) {
      this._tri1.reverse = !this._tri1.reverse;
      this._tri1.updatePoints(this._tri1.points);
    }
    if (this._tri2._angle0.angle > Math.PI) {
      this._tri2.reverse = !this._tri2.reverse;
      this._tri2.updatePoints(this._tri2.points);
    }

    const scenarios = [
      //
      [true, 'AAA', ['0', '1', '2'], ['0', '1', '2']],
      //
      [true, 'AA', ['0', '1'], ['0', '1']],    // same
      [true, 'AA', ['0', '2'], ['0', '1']],    // different
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
          tri[`_side${prop}`].showAll();
        }
      });
    };

    this._tri1.hideAll();
    this._tri1._line.show();
    // this._tri1._pad0.show();
    // this._tri1._pad1.show();
    // this._tri1._pad2.show();
    this._tri2.hideAll();
    this._tri2._line.show();
    // this._tri2._pad0.show();
    // this._tri2._pad1.show();
    // this._tri2._pad2.show();
    console.log(name)
    showProperties(this._tri1, tri1Show);
    showProperties(this._tri2, tri2Show);
  }


  findAnswer() {
    // if (parseFloat(this._input.getValue()) === this.answer) {
    //   return 'correct';
    // }
    // if (this._input.getValue() === this.answer.toString()) {
    //   return 'correct';
    // }
    return 'incorrect';
  }
}
