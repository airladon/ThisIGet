// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  Transform,
  DiagramElementPrimative,
  DiagramObjectPolyLine,
} = Fig;

const {
  removeRandElement,
  randElement,
  round,
  rand,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  triangle: {
    _line: DiagramElementPrimative;
  } & DiagramObjectPolyLine;

  constructor(
    diagram: CommonLessonDiagram,
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
    // this.addQuestion();
    this.addCheck();
    this.addInput('input', '?', 3, 0);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
    this.triangle = this._fig._tri;
    this.externalAngle = this._fig._externalAngle;
  }

  randomTriangle() {
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.5, 1);
      let y = rand(0.5, 1);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this._fig._tri[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  setupNewProblem() {
    this.randomTriangle();
    this.triangle.hideAngles();
    this.externalAngle.hide();
    this.transitionToNewProblem({ target: 'next', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    const totalAngle = this.triangle._angle0.angle
                       + this.triangle._angle1.angle
                       + this.triangle._angle2.angle;

    if (totalAngle > Math.PI * 2.01) {
      this.triangle.reversePoints();
    }

    this.externalAngle.showAll();
    this.externalAngle.setPosition(this.triangle.p1);
    this.externalAngle.setRotation(this.triangle._side01.angle);
    this.externalAngle.setAngle({
      position: this.triangle._pad0.getPosition(),
      rotation: this.triangle._side01.line.angle(),
      angle: this.triangle._angle1.angle + this.triangle._angle2.angle,
    });

    const possibilities = [
      {
        known: [this.triangle._angle1, this.triangle._angle2],
        unknown: this.externalAngle,
        sum: [this.triangle._angle1, this.triangle._angle2],
        subtract: [],
      },
      {
        known: [this.externalAngle, this.triangle._angle2],
        unknown: this.triangle._angle1,
        sum: [this.externalAngle],
        subtract: [this.triangle._angle2],
      },
      {
        known: [this.externalAngle, this.triangle._angle1],
        unknown: this.triangle._angle2,
        sum: [this.externalAngle],
        subtract: [this.triangle._angle1],
      },
      {
        known: [this.externalAngle],
        unknown: this.triangle._angle0,
        sum: [180],
        subtract: [this.externalAngle],
      },
      {
        known: [this.triangle._angle0],
        unknown: this.externalAngle,
        sum: [180],
        subtract: [this.triangle._angle0],
      },
      {
        known: [this.externalAngle, this.triangle._angle1],
        unknown: this.triangle._angle0,
        sum: [180],
        subtract: [this.externalAngle],
      },
    ];

    const scenario = randElement(possibilities);
    scenario.known.forEach((a) => {
      a.showAll();
      a.label.setText(`${round(a.angle * 180 / Math.PI, 0)}º`);
    });
    scenario.unknown.showAll();
    scenario.unknown.label.setText('?');

    let sum = 0;
    scenario.sum.forEach((a) => {
      if (typeof a === 'number') {
        sum += a;
      } else {
        sum += round(a.angle * 180 / Math.PI, 0);
      }
    });
    scenario.subtract.forEach((a) => {
      if (typeof a === 'number') {
        sum -= a;
      } else {
        sum -= round(a.angle * 180 / Math.PI, 0);
      }
    });
    this.answer = sum;
  }

  findAnswer() {
    if (this._input.getValue() === this.answer.toString()) {
      return 'correct';
    }
    return 'incorrect';
  }
}
