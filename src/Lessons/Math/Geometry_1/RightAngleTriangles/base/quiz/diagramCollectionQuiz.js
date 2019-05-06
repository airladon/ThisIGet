// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimative,
  DiagramObjectPolyLine,
  DiagramObjectAngle,
  DiagramObjectLine,
  EquationLabel,
  Line,
  Point,
} = Fig;

const {
  removeRandElement,
  randElement,
  round,
  rand,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  triangle: {
    _line: DiagramElementPrimative;
    _angle0: { label: EquationLabel } & DiagramObjectAngle;
    _angle1: { label: EquationLabel } & DiagramObjectAngle;
    _angle2: { label: EquationLabel } & DiagramObjectAngle;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _side01: { label: EquationLabel } & DiagramObjectLine;
    _side12: { label: EquationLabel } & DiagramObjectLine;
    _side20: { label: EquationLabel } & DiagramObjectLine;
  } & DiagramObjectPolyLine;

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
    this.addInput('input', '?', 5, 1);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    this.hasTouchableElements = true;
    this.triangle = this._fig._tri;
  }

  randomTriangle() {
    const sideA = rand(0.8, 1.5);
    const sideB = rand(1, 2.8);
    this._fig._tri._pad0.scenarios.next = { position: [sideB, 0] };
    this._fig._tri._pad1.scenarios.next = { position: [0, 0] };
    this._fig._tri._pad2.scenarios.next = { position: [0, sideA] };

    const rotation = this._fig._tri.getRotation()
      + randElement([-1, 1]) * rand(Math.PI, Math.PI * 2);
    const points = [
      new Point(sideB, 0),
      new Point(0, 0),
      new Point(0, sideA),
    ].map(p => p.transformBy(new Transform().rotate(rotation).m()));
    const yMax = points.reduce((max, p) => (p.y > max ? p.y : max), points[0].y);
    const yMin = points.reduce((min, p) => (p.y < min ? p.y : min), points[0].y);
    const xMax = points.reduce((max, p) => (p.x > max ? p.x : max), points[0].x);
    const xMin = points.reduce((min, p) => (p.x < min ? p.x : min), points[0].x);
    const height = yMax - yMin;
    const width = xMax - xMin;
    const midPoint = new Point(xMin + width / 2, yMin + height / 2);

    this._fig._tri.scenarios.next = {
      position: [-midPoint.x, -midPoint.y],
      rotation,
    };
  }


  setupNewProblem() {
    this.randomTriangle();
    this.triangle.hideAngles();
    this.triangle.hideSides();
    this.transitionToNewProblem({ target: 'next', duration: 1 });
    this._question.drawingObject.setText('');
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    const problemType = randElement(['side', 'angle', 'area']);
    // const problemType = 'side'
    this.triangle.updateLabels();
    this._question.drawingObject.setText(`Enter the unknown ${problemType}:`);
    this._fig._tri._angle1.showAll();
    if (problemType === 'angle') {
      this._fig._tri._angle0.showAll();
      this._fig._tri._angle2.showAll();
      const possibleAngles = [this._fig._tri._angle0, this._fig._tri._angle2];
      const knownAngle = removeRandElement(possibleAngles);
      const unknownAngle = possibleAngles[0];
      const knownAngleValue = round(knownAngle.getAngle('deg'), 0);
      knownAngle.label.setText(`${knownAngleValue}º`);
      unknownAngle.label.setText('?');
      this.answer = 90 - knownAngleValue;
    } else {
      this._fig._tri._side01.showAll();
      this._fig._tri._side12.showAll();
      this._fig._tri._side20.showAll();
      const possibleSides = [
        this._fig._tri._side01,
        this._fig._tri._side12,
        this._fig._tri._side20,
      ];
      const unknownSide = removeRandElement(possibleSides);
      let scale = rand(1, 100);
      if (problemType === 'area') {
        scale = rand(1, 10);
      }
      const knownSideValues = possibleSides.map(s => round(s.getLength() * scale, 0));
      if (unknownSide === this._fig._tri._side20) {
        if (problemType === 'side') {
          const square = knownSideValues[0] ** 2 + knownSideValues[1] ** 2;
          this.answer = round(Math.sqrt(square), 1);
          unknownSide.label.setText('?');
        } else {
          this.answer = round(knownSideValues[0] * knownSideValues[1] * 0.5, 1);
          unknownSide.label.setText('');
        }
      } else {
        const square = knownSideValues[1] ** 2 - knownSideValues[0] ** 2;
        const s = Math.sqrt(square);
        if (problemType === 'side') {
          this.answer = round(s, 1);
          unknownSide.label.setText('?');
        } else {
          this.answer = round(s * knownSideValues[0] * 0.5, 1);
          unknownSide.label.setText('');
        }
      }
      possibleSides[0].label.setText(knownSideValues[0].toString());
      possibleSides[1].label.setText(knownSideValues[1].toString());
    }
    this.triangle._angle1.label.setText('');
  }

  // showAnswer() {
  //   super.showAnswer();
  //   this.diagram.animateNextFrame();
  // }

  findAnswer() {
    // this._input.disable();
    if (parseFloat(this._input.getValue()) === this.answer) {
      return 'correct';
    }
    // if (this.answer === true) {
    //   return 'correct';
    // }
    return 'incorrect';
  }
}
