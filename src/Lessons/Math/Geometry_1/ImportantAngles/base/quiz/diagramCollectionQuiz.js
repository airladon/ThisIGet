// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, DiagramElementPrimative } = Fig;

const { rand, randElement } = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
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
    this.addCheck();
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

  goToAngle(
    start: number, angle: number, direction: number, whenFinished: () => void,
  ) {
    this._main._fig.stop(true, false);
    this._main._fig._line1.stop(true, false);
    // const r = this._main._fig._line1.getRotation('0to360');
    this._main._fig.animations.new()
      .rotation({ target: start, duration: 1, direction })
      .whenFinished(whenFinished)
      .start();
    this._main._fig._line1.animations.new()
      .rotation({ target: angle, duration: 1, direction: 2 })
      .start();

    this.diagram.animateNextFrame();
  }

  setupNewProblem() {
    this._main._fig.stop(true, false);
    this._main._fig._line1.stop(true, false);
    this._main._fig._acute.hide();
    this._main._fig._obtuse.hide();
    this._main._fig._reflex.hide();

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

    const angle = rand(0.2, Math.PI * 1.8);
    const start = rand(0, Math.PI * 1.9);
    const direction = randElement([1, 2, 0, -1]);
    this.showCheck();
    this.goToAngle(start, angle, direction, () => {
      this._question.drawingObject.setText(`Adjust the blue line to create ${this.answer} angle.`);
      this.diagram.animateNextFrame();
    });
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    if (this.answer === 'acute') {
      this._main._fig._acute.show();
      this._main.goToAcute();
    } else if (this.answer === 'right') {
      this._main.goToRight();
    } else if (this.answer === 'obtuse') {
      this._main._fig._obtuse.show();
      this._main.goToObtuse();
    } else if (this.answer === 'straight') {
      this._main.goToStraight();
    } else if (this.answer === 'reflex') {
      this._main._fig._reflex.show();
      this._main.goToReflex();
    } else if (this.answer === 'full') {
      this._main.goToFull();
    }
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const r = this._main._fig._line1.getRotation('0to360');
    const possibilities = {
      acute: [0, Math.PI / 2],
      obtuse: [Math.PI / 2, Math.PI],
      full: [Math.PI * 2 - 0.03, Math.PI * 2 + 0.03],
      straight: [Math.PI - 0.03, Math.PI + 0.03],
      reflex: [Math.PI, Math.PI * 2],
      right: [Math.PI / 2 - 0.04, Math.PI / 2 + 0.04],
    };

    const answerRange = possibilities[this.answer];

    if (r >= answerRange[0] && r <= answerRange[1]) {
      return 'correct';
    }
    return 'incorrect';
  }
}
