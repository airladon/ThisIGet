// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimitive, Point, Line,
} = Fig;

const {
  // removeRandElement,
  randElement,
  round,
  rand,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonTopicDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

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
    this.addCheck();
    this.addInput('input', '?', 3, 0);
    this.diagram.addElements(this.layout.addElementsQuiz, this);
    this.hasTouchableElements = true;
  }

  // tryAgain() {
  //   super.tryAgain();
  // }


  setupNewProblem() {
    const baseLength = rand(1, 3);
    const height = rand(1, 3);
    const rotation = rand(0, Math.PI / 2);
    const scale = rand(5, 100);
    this.side = new Line(
      new Point(-baseLength / 2, -height / 2),
      new Point(0, height / 2),
    ).distance;
    this.angle = round(Math.atan(height / baseLength * 2) * 180 / Math.PI, 0);
    this.topAngle = `${round(180 - 2 * this.angle, 0)}`;
    this.angle = `${round(this.angle, 0)}`;

    this.side = `${round(this.side * scale, 0)}`;
    const points = [
      new Point(-baseLength / 2, -height / 2),
      new Point(0, height / 2),
      new Point(baseLength / 2, -height / 2),
    ].map(p => p.transformBy(new Transform().rotate(rotation).matrix()));
    const tri = this._triangle;
    tri._pad0.scenarios.quiz = { position: points[0] };
    tri._pad1.scenarios.quiz = { position: points[1] };
    tri._pad2.scenarios.quiz = { position: points[2] };
    tri.hideAll();
    tri._pad0.show();
    tri._pad1.show();
    tri._pad2.show();
    tri._line.show();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    const elementMap = {
      angle: {
        top: this._triangle._angle1,
        left: this._triangle._angle0,
        right: this._triangle._angle2,
      },
      side: {
        left: this._triangle._side01,
        right: this._triangle._side12,
        base: this._triangle._side20,
      },
    };
    const propertyMap = {
      angle: {
        top: this.topAngle,
        left: this.angle,
        right: this.angle,
      },
      side: {
        left: this.side,
        right: this.side,
        base: '',
      },
    };
    const scenarios = [
      {
        angle: { top: 'blank', left: 'show', right: 'unknown' },
        side: { left: 'show', right: 'show', base: 'blank' },
      },
      {
        angle: { top: 'blank', left: 'unknown', right: 'show' },
        side: { left: 'show', right: 'show', base: 'blank' },
      },
      {
        angle: { top: 'unknown', left: 'show', right: 'blank' },
        side: { left: 'show', right: 'show', base: 'blank' },
      },
      {
        angle: { top: 'unknown', left: 'blank', right: 'show' },
        side: { left: 'show', right: 'show', base: 'blank' },
      },
      {
        angle: { top: 'blank', left: 'show', right: 'show' },
        side: { left: 'show', right: 'unknown', base: 'blank' },
      },
      {
        angle: { top: 'blank', left: 'show', right: 'show' },
        side: { left: 'unknown', right: 'show', base: 'blank' },
      },
    ];
    const scenario = randElement(scenarios);
    Object.keys(scenario.angle).forEach((position) => {
      const value = scenario.angle[position];
      const angle = elementMap.angle[position];
      const property = propertyMap.angle[position];
      if (value === 'show') {
        angle.label.setText(`${property}º`);
        angle.showAll();
      } else if (value === 'unknown') {
        angle.label.setText('?');
        angle.showAll();
        this.answer = property;
      }
    });
    Object.keys(scenario.side).forEach((position) => {
      const value = scenario.side[position];
      const side = elementMap.side[position];
      const property = propertyMap.side[position];
      if (value === 'show') {
        side.label.setText(property);
        side.showAll();
      } else if (value === 'unknown') {
        side.label.setText('?');
        side.showAll();
        this.answer = property;
      }
    });
  }

  showAnswer() {
    super.showAnswer();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._input.disable();
    if (this._input.getValue().toString() === this.answer) {
      return 'correct';
    }
    return 'incorrect';
  }
}
