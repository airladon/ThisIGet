// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import type { TypeEquationLabel } from '../../../../LessonsCommon/tools/equationLabel';

const {
  Transform, Point, DiagramElementCollection, DiagramElementPrimative,
  DiagramObjectLine,
} = Fig;
const {
  rand, range, round,
} = Fig.tools.math;
export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _grid: DiagramElementPrimative;
  _rect: {
    _bottom: {
      label: TypeEquationLabel;
    } & DiagramObjectLine;
    _left: DiagramObjectLine;
    _right: {
      label: TypeEquationLabel;
    } & DiagramObjectLine;
    _top: DiagramObjectLine;
  } & DiagramElementCollection;

  answers: Array<Array<number>>;
  answer: number;

  // futurePositions: Object;

  addRectangle() {
    const lay = this.layout.adjustableRect;

    const addSide = (p1, p2, name, label = '') => {
      const line = this.diagram.objects.line({
        vertexSpaceStart: 'start',
        p1,
        p2,
        width: lay.width,
        color: this.layout.colors.line,
      });
      // line.setEndPoints(p1, p2);
      line.addLabel(label, lay.labelOffset, 'outside', 'top', 'horizontal');
      line.setMovable(true);
      line.setTransformCallback = this.updateRectangle.bind(this);
      // this.add(`side${name}`, line);
      return line;
    };
    const w = lay.width / 2;
    const bottom = addSide(lay.points[0].add(0, w), lay.points[3].add(0, w));
    const left = addSide(lay.points[0].add(w, 0), lay.points[1].add(w, 0));
    const right = addSide(lay.points[3].sub(w, 0), lay.points[2].sub(w, 0));
    const top = addSide(lay.points[1].sub(0, w), lay.points[2].sub(0, w));

    bottom.addLabel('', lay.labelOffset, 'bottom', 'bottom', 'horizontal');
    // bottom.showRealLength = true;

    right.addLabel('', lay.labelOffset, 'right', 'right', 'horizontal');
    // right.showRealLength = true;

    const rect = this.diagram.shapes.collection();
    rect.hasTouchableElements = true;
    rect.add('bottom', bottom);
    rect.add('left', left);
    rect.add('right', right);
    rect.add('top', top);
    this.add('rect', rect);
    this.updateRectangle();
  }

  updateRectangle() {
    const { limits } = this.layout.adjustableRect;
    const { minSide } = this.layout.adjustableRect;
    const w = this.layout.adjustableRect.width / 2;

    const left = this._rect._left.getPosition().x;
    const right = this._rect._right.getPosition().x;
    const top = this._rect._top.getPosition().y;
    const bottom = this._rect._bottom.getPosition().y;

    this._rect._bottom.transform.updateTranslation(left - w, bottom);
    this._rect._left.transform.updateTranslation(left, bottom);
    this._rect._right.transform.updateTranslation(right, bottom);
    this._rect._top.transform.updateTranslation(left, top);

    this._rect._bottom.setLength(right - left + w * 2);
    this._rect._top.setLength(right - left + w);
    this._rect._left.setLength(top - bottom + w);
    this._rect._right.setLength(top - bottom + w);

    this._rect._bottom.move.minTransform.updateTranslation(left, limits.bottom);
    this._rect._bottom.move.maxTransform.updateTranslation(left, top - minSide);

    this._rect._top.move.minTransform.updateTranslation(left, bottom + minSide);
    this._rect._top.move.maxTransform.updateTranslation(left, limits.top);

    this._rect._left.move.minTransform.updateTranslation(limits.left, bottom);
    this._rect._left.move.maxTransform.updateTranslation(right - minSide, bottom);
    this._rect._right.move.minTransform.updateTranslation(left + minSide, bottom);
    this._rect._right.move.maxTransform.updateTranslation(limits.right, bottom);

    this._rect._bottom.label.setText(`${round((right - left) * 5, 1).toString()}`);
    this._rect._right.label.setText(`${round((top - bottom) * 5, 1).toString()}`);
    this._rect._bottom.updateLabel();
    this._rect._right.updateLabel();
  }

  addGrid() {
    const lay = this.layout.adjustableRect;
    const grid = this.diagram.shapes.grid(
      lay.limits,
      lay.minSide, lay.minSide, 2, this.layout.colors.grid,
      new Transform().translate(lay.position),
    );
    this.add('grid', grid);
  }

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
    this.addGrid();
    this.addRectangle();
    this.hasTouchableElements = true;
    this.answers = [];
    this.answer = 0;
  }

  tryAgain() {
    super.tryAgain();
    this._check.show();
  }

  addToAnswers(answers: Array<Array<number>>, answer: Array<number>) {
    if (Array.isArray(this.answers)) {
      for (let i = 0; i < answers.length; i += 1) {
        const existing = answers[i];
        if (answer[0] === existing[0]) {
          if (answer[1] === existing[1]) {
            return;
          }
        }
      }
      answers.push(answer);
    }
  }

  getPossibleAnswers(area: number) {
    const lay = this.layout.adjustableRect;
    const maxX = (lay.limits.width - lay.minSide * 0) * 5;
    const maxY = (lay.limits.height - lay.minSide * 0) * 5;
    const answers = [];
    const potentialAnswers = round(range(1, 10, 0.1), 8);
    potentialAnswers.forEach((a: number) => {
      const factor: number = round(area / a, 1);
      if (round(factor * a, 8) === area && factor > 1) {
        if (a <= maxX && factor <= maxY) {
          this.addToAnswers(answers, [a, factor]);
        }
        if (a <= maxY && factor <= maxX) {
          this.addToAnswers(answers, [factor, a]);
        }
      }
    });
    return answers;
  }

  newProblem() {
    super.newProblem();
    const element = document.getElementById('id__lessons__area_quiz1');
    const lay = this.layout.adjustableRect;
    const maxX = lay.limits.width / lay.minSide - 2;
    const maxY = lay.limits.height / lay.minSide - 2;
    const maxArea = maxX * maxY;
    const minArea = lay.minSide * 3 * lay.minSide * 3;
    let answers = [];
    let area = 0;
    while (answers.length === 0) {
      area = round(rand(minArea, maxArea), 0);
      answers = this.getPossibleAnswers(area);
    }

    this.answer = area;
    this.answers = answers;

    if (element) {
      element.innerHTML = area.toString();
    }
    this._check.show();
    this.goToRectangle(10, 5);
    this.diagram.animateNextFrame();
  }

  goToRectangle(widthInUnits: number, heightInUnits: number) {
    const width = widthInUnits * this.layout.adjustableRect.minSide;
    const height = heightInUnits * this.layout.adjustableRect.minSide;
    const yCenter = this.layout.adjustableRect.limits.height / 2
                    + this.layout.adjustableRect.limits.bottom;
    const xCenter = this.layout.adjustableRect.limits.width / 2
                    + this.layout.adjustableRect.limits.left;
    const futurePos = (element, x, y) => ({
      element,
      scenario: {
        position: new Point(x, y),
      },
    });

    this.futurePositions = [];
    this.futurePositions.push(futurePos(
      this._rect._left, -width / 2 + xCenter, yCenter,
    ));
    this.futurePositions.push(futurePos(
      this._rect._right, width / 2 + xCenter, yCenter,
    ));
    this.futurePositions.push(futurePos(
      this._rect._bottom, xCenter, -height / 2 + yCenter,
    ));
    this.futurePositions.push(futurePos(
      this._rect._top, xCenter, height / 2 + yCenter,
    ));
    this.moveToFuturePositions(1, this.updateRectangle.bind(this));
  }

  showAnswer() {
    super.showAnswer();
    const answerToShow = this.answers[this.answerIndex];
    const [width, height] = answerToShow;
    this.goToRectangle(width, height);
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._check.hide();
    const width = parseFloat(this._rect._bottom.label.getText());
    const height = parseFloat(this._rect._right.label.getText());
    const potentialAnswer = [width, height];
    let result = 'incorrect';
    this.answers.forEach((answer) => {
      if (answer[0] === potentialAnswer[0]
          && answer[1] === potentialAnswer[1]
      ) {
        result = 'correct';
      }
    });
    return result;
  }
}
