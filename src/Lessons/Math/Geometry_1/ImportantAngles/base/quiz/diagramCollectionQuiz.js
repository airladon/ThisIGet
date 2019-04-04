// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, DiagramElementPrimative } = Fig;

const { round, rand, randElement } = Fig.tools.math;

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
    // this.add('input', this.makeEntryBox('a1', '?', 3));
    // this._input.setPosition(this.layout.input);
    this.add('main', new CommonCollection(diagram, this.layout));
    this.diagram.addElements(this, this.layout.addQuestion);
    this.hasTouchableElements = true;
    this._main._fig._line1.setTransformCallback = this.updateAngle.bind(this);
    this._main._fig._angle.autoRightAngle = false;
  }

  updateAngle() {
    const r = this._main._fig._line1.getRotation('0to360');
    if (this._main._fig._angle.isShown) {
      this._main._fig._angle.setAngle({ angle: r });
    }
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }


  newProblem() {
    super.newProblem();

    const possibilities = {
      acute: 'an acute',
      obtuse: 'an obtuse',
      full: 'a full',
      straight: 'a straight',
      reflex: 'a reflex',
      right: 'a right',
    };
    this.answer = randElement(Object.keys(possibilities));
    this._question.drawingObject.setText('');

    const newRandomAngle = rand(0.2, Math.PI * 1.8);
    this._main.goToAngle(newRandomAngle, () => {
      this._question.drawingObject.setText(`Adjust the blue line to create ${this.answer} angle.`);
      this._check.showAll();
      this.diagram.animateNextFrame();
    });
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    // this._input.setValue(this.answer);
    // this._input.disable();
    this.diagram.animateNextFrame();
  }

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
