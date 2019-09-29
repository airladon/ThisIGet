// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform, DiagramElementPrimitive } = Fig;
const { removeRandElement, rand } = Fig.tools.math;
export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

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
    // this.add('input', this.makeEntryBox('a1', '?', 3));
    // this._input.setPosition(this.layout.input);
    this.diagram.addElements(this, this.layout.addQuizElements);
    this.hasTouchableElements = true;
    this._circle1.onClick = this.selectAnswer.bind(this, 1);
    this._circle2.onClick = this.selectAnswer.bind(this, 2);
    this._circle3.onClick = this.selectAnswer.bind(this, 3);
    this._circle4.onClick = this.selectAnswer.bind(this, 4);
    this._circle1.makeTouchable();
    this._circle2.makeTouchable();
    this._circle3.makeTouchable();
    this._circle4.makeTouchable();
  }

  selectAnswer(answer: number) {
    this.selectedAnswer = answer;
    this.checkAnswer();
  }

  // tryAgain() {
  //   super.tryAgain();
  //   // this._input.enable();
  //   // this._input.setValue('');
  // }


  newProblem() {
    super.newProblem();
    const possibleCircles = [1, 2, 3, 4];
    const possibleProperties = ['diameter', 'radius', 'center', 'circumference'];
    for (let i = 0; i < 4; i += 1) {
      const circle = removeRandElement(possibleCircles);
      const property = removeRandElement(possibleProperties);
      const element = this[`_circle${circle}`];
      element.hideAll();
      element._fill.show();
      const p = element[`_${property}`];
      p.showAll();
      p.setRotation(rand(Math.PI * 2));
      if (i === 0) {
        this.answer = circle;
        this._answer.drawingObject.setText(property);
      }
      const scale = rand(0.6, 1.1);
      element.setScale(scale);
    }
    this.diagram.animateNextFrame();
    this.selectedAnswer = 0;
  }

  showAnswer() {
    super.showAnswer();
    for (let i = 1; i < 5; i += 1) {
      if (this.answer !== i) {
        const element = this[`_circle${i}`];
        element._cover.show();
      }
    }
    // this._input.setValue(this.answer);
    // this._input.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    // this._input.disable();
    // if (this._input.getValue() === this.answer.toString()) {
    //   return 'correct';
    // }
    if (this.answer === this.selectedAnswer) {
      return 'correct';
    }
    return 'incorrect';
  }
}
