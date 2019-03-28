// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative } = Fig;

const { round } = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  futurePositions: Object;
  radius: number;
  answer: number;

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
    this.diagram.addElements(this, this.layout.addElements);
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    this.radius = this._circle._line1.currentLength;
    if (this._circle._angle.isShown) {
      this._circle._angle.setAngle({ angle: r });
    }
    if (this._circle._arc.isShown) {
      this._circle._arc.setAngle({ angle: r });
      this._circle._arc.label.setText(`${round(this.radius * r, 2).toFixed(2)}`);
    }
    this._circle._line1.updateLabel();
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }


  newProblem() {
    super.newProblem();
    // this.calculateFuturePositions();
    // this.moveToFuturePositions(1, this.updateAngles.bind(this));
    // this._input.enable();
    // this._input.setValue('');
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
