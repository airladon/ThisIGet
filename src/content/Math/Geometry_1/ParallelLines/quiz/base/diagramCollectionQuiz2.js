// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

import {
  randomizeParallelLine, checkValuesForParallel, checkElementsForParallel,
} from '../../explanation/base/tools';

const {
  Transform, DiagramElementPrimative, DiagramObjectLine,
  Point,
} = Fig;
const { removeRandElement } = Fig.tools.math;

type TypeSelectableLine = {
  selected: boolean;
} & DiagramObjectLine;


export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  _line1: TypeSelectableLine;
  _line2: TypeSelectableLine;
  _line3: TypeSelectableLine;
  _line4: TypeSelectableLine;
  _line5: TypeSelectableLine;
  _line6: TypeSelectableLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(
      diagram,
      layout,
      'q2',
      {
        selectTwoLines: {
          answer: 'Wrong number of lines selected.',
          details: 'Must select two and only two lines.',
        },
      },
      transform,
    );
    this.addCheck();
    this.diagram.addElements(this, this.layout.addElements);

    const setupLines = (lineNumber: number) => {
      const line = this[`_line${lineNumber}`];
      line.setTransformCallback = (t: Transform) => {
        line.updateMoveTransform(t);
        this.normalizeAngle(line);
      };
      line.selected = false;
      const onClick = () => {
        line.selected = !line.selected;
        if (line.selected) {
          line.setColor(this.layout.colors.selected);
        } else {
          line.setColor(this.layout.colors.lines);
        }
      };
      line._line.onClick = onClick;
      line._midLine.onClick = onClick;
      if (line._midLine) {
        line._midLine.move.type = 'translation';
      }
      if (line._line) {
        line._line.move.type = 'translation';
      }
    };
    [1, 2, 3, 4, 5, 6].forEach((lineNumber) => { setupLines(lineNumber); });
    this.hasTouchableElements = true;
  }

  resetLines() {
    this._line1.setColor(this.layout.colors.lines);
    this._line1.selected = false;
    this._line2.setColor(this.layout.colors.lines);
    this._line2.selected = false;
    this._line3.setColor(this.layout.colors.lines);
    this._line3.selected = false;
    this._line4.setColor(this.layout.colors.lines);
    this._line4.selected = false;
    this._line5.setColor(this.layout.colors.lines);
    this._line5.selected = false;
    this._line6.setColor(this.layout.colors.lines);
    this._line6.selected = false;
  }

  enableTouchLines(isEnabled: boolean = true) {
    this._line1.hasTouchableElements = isEnabled;
    this._line2.hasTouchableElements = isEnabled;
    this._line3.hasTouchableElements = isEnabled;
    this._line4.hasTouchableElements = isEnabled;
    this._line5.hasTouchableElements = isEnabled;
    this._line6.hasTouchableElements = isEnabled;
    this._line1.isTouchable = isEnabled;
    this._line2.isTouchable = isEnabled;
    this._line3.isTouchable = isEnabled;
    this._line4.isTouchable = isEnabled;
    this._line5.isTouchable = isEnabled;
    this._line6.isTouchable = isEnabled;
  }

  tryAgain() {
    super.tryAgain();
    this.resetLines();
  }

  // eslint-disable-next-line class-methods-use-this
  normalizeAngle(element: DiagramObjectLine) {
    const angle = element.getRotation('0to360');
    element.transform.updateRotation(angle);
  }

  setupNewProblem() {
    const line1 = this._line1;
    const line2 = this._line2;
    const line3 = this._line3;
    const line4 = this._line4;
    const line5 = this._line5;
    const line6 = this._line6;
    const bounds = this.layout.addElements[0].options.move.translationBounds;
    const { length } = this.layout;
    const lay = { bounds, length };
    line1.scenarios.quiz = randomizeParallelLine(lay);
    line2.scenarios.quiz = randomizeParallelLine(lay);
    line3.scenarios.quiz = randomizeParallelLine(lay);
    line4.scenarios.quiz = randomizeParallelLine(lay);
    line5.scenarios.quiz = randomizeParallelLine(lay);
    line6.scenarios.quiz = randomizeParallelLine(lay);

    const lines = [1, 2, 3, 4, 5, 6];
    const p1 = removeRandElement(lines);
    const p2 = removeRandElement(lines);

    const parallelLine1 = this[`_line${p1}`].scenarios.quiz;
    const parallelLine2 = this[`_line${p2}`].scenarios.quiz;
    const { rotation } = parallelLine2;
    parallelLine1.rotation = rotation;
    const isParallel = checkValuesForParallel(
      parallelLine1.rotation,
      parallelLine1.position,
      parallelLine2.rotation,
      parallelLine2.position,
      this.layout.line.width * 1.1,
      Math.PI / 200,
    );

    if (!isParallel) {
      const xMag = 0.5 * Math.cos(rotation + Math.PI / 2);
      const yMag = 0.5 * Math.sin(rotation + Math.PI / 2);
      const oldX = parallelLine1.position.x;
      const newX = oldX < 0 ? oldX + xMag : oldX - xMag;
      const oldY = parallelLine1.position.y;
      const newY = oldY < 0 ? oldY + yMag : oldY - yMag;
      parallelLine1.position = new Point(newX, newY);
    }

    this.parallelLines = [this[`_line${p1}`], this[`_line${p2}`]];

    this.resetLines();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  showAnswer() {
    super.showAnswer();
    this.resetLines();
    this.parallelLines[0]._line.onClick();
    this.parallelLines[1]._line.onClick();
    this.parallelLines[0].pulseWidth();
    this.parallelLines[1].pulseWidth();
    this.diagram.animateNextFrame();
  }


  isParallel(
    line1: TypeSelectableLine,
    line2: TypeSelectableLine,
    distanceMultiplier: number = 1.1,
    rotationThreshold: number = Math.PI / 200,
  ) {
    return checkElementsForParallel(
      line1, line2, false,
      this.layout.line.width * distanceMultiplier, rotationThreshold,
    );
  }

  findAnswer() {
    const lines = [this._line1, this._line2, this._line3, this._line4, this._line5, this._line6];
    const selected = lines.filter(line => line.selected);
    if (selected.length !== 2) {
      return 'selectTwoLines';
    }
    if (this.isParallel(selected[0], selected[1])) {
      return 'correct';
    }
    if (this.parallelLines.indexOf(selected[0]) > -1
      && this.parallelLines.indexOf(selected[1]) > -1) {
      return 'correct';
    }
    return 'incorrect';
  }
}
