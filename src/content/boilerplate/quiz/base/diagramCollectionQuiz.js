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
} = Fig;

const {
  // removeRandElement,
  // randElement,
  // round,
  // rand,
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
    this.diagram.addElements(this.layout.addElementsQuiz, this);
    this.hasTouchableElements = true;
  }


  setupNewProblem() {
    this.transitionToNewProblem({ target: 'next', duration: 1 });
    this._question.drawingObject.setText('');
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this._question.drawingObject.setText(`Enter the unknown ${'something'}:`);
    // this.answer = ;
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
