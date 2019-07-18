// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import CommonCollection from '../../explanation/base/diagramCollectionCommon';

const {
  Transform, DiagramElementPrimative, DiagramObjectPolyLine,
  DiagramObjectAngle, DiagramObjectLine,
  Line,
} = Fig;

const { removeRandElement, round, rand } = Fig.tools.math;

const { minAngleDiff } = Fig.tools.g2;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  triangle: {
    _line: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  lastAnswer: string;
  transitioning: boolean;

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
    this.addQuestion();
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this.triangle = this._triangle;
    this.triangle.updatePointsCallback = this.updatePoints.bind(this);
    this.lastAnswer = '';
    this.transitioning = false;
    // this.fixedTriangle = this._main._totalAngle._fixedTriangle;
  }

  updatePoints() {
    // First put angles inside triangle if outside
    if (!this.transitioning) {
      const angle0 = this.triangle._angle0.getAngle('deg');
      const angle1 = this.triangle._angle1.getAngle('deg');
      const angle2 = this.triangle._angle2.getAngle('deg');
      const side01 = this.triangle._side01.getLength();
      const side12 = this.triangle._side12.getLength();
      const side20 = this.triangle._side20.getLength();

      if (angle0 > 90 && angle1 > 90 && angle2 > 90) {
        this.triangle.reverse = !this.triangle.reverse;
      }
      if (
        angle0 > 160 || angle1 > 160 || angle2 > 160
        || angle0 < 10 || angle1 < 10 || angle2 < 10
        || side01 < 0.6 || side12 < 0.6 || side20 < 0.6
      ) {
        this.triangle.hideAngles();
      } else {
        this.triangle.showAngles();
      }
    }
  }

  randomTriangle() {
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.8, 2);
      let y = rand(0.8, 1.3);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this.triangle[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  // updateAngles() {
  //   const triangle = this._main._totalAngle._fixedTriangle;
  //   const [p1, p2, p3] = triangle.points;
  //   const side12 = new Line(p1, p2);
  //   const side23 = new Line(p2, p3);
  //   const diff = minAngleDiff(side12.angle(), side23.angle());
  //   let direction = 0;
  //   if (diff < 0) {
  //     direction = 1;
  //   }
  //   const angleA = this._main._totalAngle._angleA;
  //   const angleB = this._main._totalAngle._angleB;
  //   const angleC = this._main._totalAngle._angleC;
  //   if (direction === 0) {
  //     angleA.setAngle({ p1: p3, p2: p1, p3: p2 });
  //     angleB.setAngle({ p1, p2, p3 });
  //     angleC.setAngle({ p1: p2, p2: p3, p3: p1 });
  //   } else {
  //     angleA.setAngle({ p1: p2, p2: p1, p3 });
  //     angleB.setAngle({ p1: p3, p2, p3: p1 });
  //     angleC.setAngle({ p1, p2: p3, p3: p2 });
  //   }
  // }

  // tryAgain() {
  //   super.tryAgain();
  //   this._input.enable();
  //   this._input.setValue('');
  // }

  setupNewProblem() {
    this.randomTriangle();
    // this.triangle.updatePoints(this.fixedTriangle.points.map(p => p._dup()));
    this.triangle.hideAll();
    this.triangle._line.show();
    // this.fixedTriangle.hide();
    // this._main._totalAngle._angleA.hide();
    // this._main._totalAngle._angleB.hide();
    // this._main._totalAngle._angleC.hide();
    this.transitioning = true;
    this.transitionToNewProblem({ target: 'next', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.transitioning = false;
    this.triangle.showAll();
    this.updatePoints();
    this.triangle._pad0.setMovable();

    const options = ['acute', 'right angle', 'obtuse', 'equilateral', 'isosceles', 'scalene'];
    this.answer = removeRandElement(options);
    if (this.answer === this.lastAnswer) {
      this.answer = removeRandElement(options);
    }
    this.lastAnswer = this.answer;

    this._question.drawingObject.setText(`Drag the corners to create a ${this.answer} triangle :`);


    // this.triangle.hide();
    // this.fixedTriangle.updatePoints(this.triangle.points.map(p => p._dup()));
    // this.updateAngles();
    // this.fixedTriangle.show();
    // this.fixedTriangle._line.show();
    // const angles = ['A', 'B', 'C'];
    // const unknown = removeRandElement(angles);
    // let sumAngles = 0;
    // angles.forEach((angle) => {
    //   const element = this._main._totalAngle[`_angle${angle}`];
    //   const roundedAngle = round(element.angle * 180 / Math.PI, 0);
    //   sumAngles += roundedAngle;
    //   element.label.setText(`${roundedAngle}º`);
    //   element.setColor(this.layout.colors.angle1);
    // });
    // this._main._totalAngle[`_angle${unknown}`].label.setText('?');
    // this._main._totalAngle[`_angle${unknown}`].setColor(this.layout.colors.angle2);
    // this.answer = 180 - sumAngles;
    // this._main._totalAngle._angleA.showAll();
    // this._main._totalAngle._angleB.showAll();
    // this._main._totalAngle._angleC.showAll();
  }

  // showAnswer() {
  //   super.showAnswer();
  //   this.diagram.animateNextFrame();
  // }

  // findAnswer() {
  //   this._input.disable();
  //   if (this._input.getValue() === this.answer.toString()) {
  //     return 'correct';
  //   }
  //   return 'incorrect';
  // }
}
