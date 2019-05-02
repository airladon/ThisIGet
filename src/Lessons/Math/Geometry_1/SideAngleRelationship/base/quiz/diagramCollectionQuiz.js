// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimative,
  DiagramObjectPolyLine,
  DiagramObjectAngle,
  DiagramObjectLine,
  EquationLabel,
} = Fig;

const {
  removeRandElement,
//   round,
  rand
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
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
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
    // this.addQuestion();
    this.addCheck();
    this.addInput('input', '?', 3, 0);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.triangle = this._fig._tri;
    this.hasTouchableElements = true;
  }

  randomTriangle() {
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.5, 1);
      let y = rand(0.5, 1);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this._fig._tri[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  setupNewProblem() {
    this.randomTriangle();
    this.triangle.hideAngles();
    this.transitionToNewProblem({ target: 'next', duration: 1 });
  }

  // afterTransitionToNewProblem() {
  //   super.afterTransitionToNewProblem();
  // }

  // showAnswer() {
  //   super.showAnswer();
  //   this.diagram.animateNextFrame();
  // }

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
