// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimative,
} = Fig;

// const {
//   removeRandElement,
//   round,
//   rand
// } = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  futurePositions: Object;

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
    // this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }

  // tryAgain() {
  //   super.tryAgain();
  // }


  setupNewProblem() {
    // this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  // afterTransitionToNewProblem() {
  //   super.afterTransitionToNewProblem();
  // }

  // showAnswer() {
  //   super.showAnswer();
  //   this.diagram.animateNextFrame();
  // }

  findAnswer() {
    // this._input.disable();
    // if (this._input.getValue() === this.answer.toString()) {
    //   return 'correct';
    // }
    if (this.answer === true) {
      return 'correct';
    }
    return 'incorrect';
  }
}
