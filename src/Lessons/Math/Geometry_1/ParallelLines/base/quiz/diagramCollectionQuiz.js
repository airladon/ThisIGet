// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';
import {
  randomizeParallelLine, makeAnglesClose, checkValuesForParallel, checkElementsForParallel,
} from '../common/tools';

const { Transform, DiagramElementPrimative } = Fig;

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
      {
        rotation: {
          answer: 'Almost!',
          details: 'Hint: Rotation is slightly off. Bringing lines closer together makes it easier to compare rotation.',
        },
        touching: {
          answer: 'Not Quite',
          details: 'Hint: Parallel lines cannot touch.',
        },
      },
      transform,
    );
    // this.add('input', this.makeEntryBox('a1', '?', 3));
    // this._input.setPosition(this.layout.input);
    this.add('main', new CommonCollection(diagram, this.layout));
    this._main._line1.setTransformCallback = (t: Transform) => {
      this._main._line1.updateMoveTransform(t);
      this._main.normalizeAngle(this._main._line1);
    };
    this._main._line2.setTransformCallback = (t: Transform) => {
      this._main._line2.updateMoveTransform(t);
      this._main.normalizeAngle(this._main._line1);
    };
    this._main._line1.hasTouchableElements = false;
    this._main._line1.isTouchable = false;
    this._main._line1.setColor(this.layout.colors.notParallel);
    this.hasTouchableElements = true;
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }

  setupNextProblem() {
    const line1 = this._main._line1;
    const line2 = this._main._line2;
    const bounds = this.layout.addElements[0].options.move.translationBounds;
    const { length } = this.layout;
    const lay = { bounds, length };
    line1.scenarios.quiz = randomizeParallelLine(lay);
    line2.scenarios.quiz = randomizeParallelLine(lay);
  }

  beforeTransitionToNewProblem() {
    this.hasTouchableElements = false;
  }

  newProblemReady() {
    this.hasTouchableElements = true;
    this._check.show();
  }

  newProblem() {
    super.newProblem();
    this.setupNextProblem();
    this.beforeTransitionToNewProblem();
    this.animations.new()
      .scenarios({ target: 'quiz', duration: 1 })
      .whenFinished(this.newProblemReady.bind(this))
      .start();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    this._main._line1.stop(true, 'noComplete');
    this._main._line2.stop(true, 'noComplete');
    makeAnglesClose(this._main._line1, this._main._line2);

    const r1 = this._main._line1.getRotation();
    // const r2 = this._main._line2.getRotation();
    const t1 = this._main._line1.getPosition();
    const t2 = this._main._line2.getPosition();

    const dist = this.layout.width * 1.1;
    const rot = Math.PI / 200;
    if (!checkValuesForParallel(r1, t1, r1, t2, dist, rot)) {
      const magX = Math.abs(0.4 * Math.cos(r1 + Math.PI / 2));
      const magY = Math.abs(0.4 * Math.sin(r1 + Math.PI / 2));
      t2.x = t2.x < 0 ? t2.x + magX : t2.x - magX;
      t2.y = t2.y < 0 ? t2.y + magY : t2.y - magY;
    }

    this._main._line2.scenarios.quiz = { position: t2, rotation: r1 };
    this._main._line2.animations.new()
      .scenario({ target: 'quiz', duration: 0.5 })
      .start();

    this.diagram.animateNextFrame();
  }

  pulseLine2() {
    this._main._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  isParallel(distanceMultiplier: number = 1.1, rotationThreshold: number = Math.PI / 200) {
    return checkElementsForParallel(
      this._main._line1, this._main._line2, false,
      this.layout.width * distanceMultiplier, rotationThreshold,
    );
  }

  findAnswer() {
    if (this.isParallel()) {
      return 'correct';
    }

    const isTouching = !this.isParallel(1.1, Math.PI * 2);
    if (isTouching) {
      return 'touching';
    }

    const isCloseRotation = this.isParallel(1.1, Math.PI / 20);
    if (isCloseRotation) {
      return 'rotation';
    }

    return 'incorrect';
  }
}
