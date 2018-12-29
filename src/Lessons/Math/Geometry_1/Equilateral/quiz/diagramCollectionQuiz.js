// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative, Point } = Fig;

export default class QuizParallel1Collection extends CommonQuizMixin(CommonDiagramCollection) {
// export default class QuizParallel1Collection extends CommonQuizDiagramCollection {
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
    this.add('poly', this.diagram.objects.polyLine({
      close: true,
      color: this.layout.colors.diagram.action,
      side: {
        color: [1, 0, 0, 1],
        offset: 0.25,
        showLine: true,
        arrows: true,
        width: 0.015,
        label: {
          text: null,
          location: 'outside',
          scale: 0.5,
          color: [0, 1, 0, 1],
        },
        mods: {
          isMovable: true,
          isTouchable: true,
        },
      },
      angle: {
        label: {
          text: null,
          radius: 0.25,
          textScale: 0.5,
          color: [1, 0, 1, 1],
        },
        curve: {
          radius: 0.3,
          sides: 50,
        },
        mods: {
          isMovable: true,
          isTouchable: true,
        },
      },
      pad: {
        color: [1, 0.5, 0.5, 1],
        radius: 0.2,
        isMovable: true,
        touchRadius: 0.4,
      },
    }));
    this._poly.hasTouchableElements = true;
    // this._poly._pad0.isTouchable = true;
    // this._poly._pad0.isMovable = true;
    // this._poly._pad0.move.limitToDiagram = true;
    // this._poly._pad0.setFirstTransform();
    this._poly.updatePoints([new Point(1, 0), new Point(-1, -1), new Point(0, 1)]);
    // this.add('input', this.makeEntryBox('a1', '?', 3));
    // this._input.setPosition(this.layout.input);
    this.hasTouchableElements = true;
    console.log(this)
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
