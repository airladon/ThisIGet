// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import CommonCollection from '../common/diagramCollectionCommon';

const {
  Transform,
  DiagramElementPrimitive,
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
  diagram: CommonTopicDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

  triangle: {
    _line: DiagramElementPrimitive;
    _angle0: { label: EquationLabel } & DiagramObjectAngle;
    _angle1: { label: EquationLabel } & DiagramObjectAngle;
    _angle2: { label: EquationLabel } & DiagramObjectAngle;
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _side01: { label: EquationLabel } & DiagramObjectLine;
    _side12: { label: EquationLabel } & DiagramObjectLine;
    _side20: { label: EquationLabel } & DiagramObjectLine;
  } & DiagramObjectPolyLine;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(
      diagram,
      layout,
      'q1',
      {
        notSelected: {
          answer: 'Incorrect',
          details: 'Make sure to select "x", "y" or "z" above the "Check" button',
        },
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.addMultipleChoice('side_angle_relationship_choice', ['x', 'y', 'z']);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.triangle = this._fig._tri;
    this.hasTouchableElements = true;
    this.triState = {
      biggest: '',
      middle: '',
      smallest: '',
    };
  }

  randomTriangle() {
    let same = true;
    while (same === true) {
      const quadrants = [1, 2, 3, 4];
      const pads = [0, 1, 2];
      const points = [];
      pads.forEach((pad) => {
        const quadrant = removeRandElement(quadrants);
        let x = rand(0.7, 1.6);
        let y = rand(0.5, 1.1);
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
        points.push(new Point(x, y));
      });
      const line1 = round(new Line(points[0], points[1]).distance, 1);
      const line2 = round(new Line(points[1], points[2]).distance, 1);
      const line3 = round(new Line(points[2], points[0]).distance, 1);
      if (line1 === line2 || line1 === line3 || line2 === line3) {
        same = true;
      } else {
        same = false;
      }
    }
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
    const totalAngle = this.triangle._angle0.angle
                       + this.triangle._angle1.angle
                       + this.triangle._angle2.angle;

    if (totalAngle > Math.PI * 2.01) {
      this.triangle.reversePoints();
    }

    const line1 = this.triangle._side01;
    const line2 = this.triangle._side12;
    const line3 = this.triangle._side20;
    const lines = [
      [line1, 'x'],
      [line2, 'y'],
      [line3, 'z'],
    ];
    lines.sort((a, b) => a[0].length - b[0].length);
    this.triState = {
      biggest: lines[2][1],
      middle: lines[1][1],
      smallest: lines[0][1],
    };

    const knownPropertyPossibilities = ['angle', 'side'];
    const unknownSizePossibilities = ['biggest', 'smallest', 'middle'];

    const property = removeRandElement(knownPropertyPossibilities);
    const size = randElement(unknownSizePossibilities);

    let sizeText = size;
    if (size === 'middle') {
      sizeText = 'neither biggest or smallest';
    }
    this._question.drawingObject.setText(
      `Select the ${knownPropertyPossibilities[0]} that is ${sizeText}:`,
    );
    if (property === 'angle') {
      this.triangle._angle0.setLabelToRealAngle();
      this.triangle._angle1.setLabelToRealAngle();
      this.triangle._angle2.setLabelToRealAngle();
      this.triangle._side01.setLabel('x');
      this.triangle._side12.setLabel('y');
      this.triangle._side20.setLabel('z');
    } else {
      this.triangle._side01.setLabelToRealLength();
      this.triangle._side12.setLabelToRealLength();
      this.triangle._side20.setLabelToRealLength();
      this.triangle._angle0.setLabel('y');
      this.triangle._angle1.setLabel('z');
      this.triangle._angle2.setLabel('x');
    }

    this.answer = this.triState[size];
  }


  showAnswer() {
    super.showAnswer();
    if (this.answer === 'x') {
      this.selectMultipleChoice('side_angle_relationship_choice', 0);
    } else if (this.answer === 'y') {
      this.selectMultipleChoice('side_angle_relationship_choice', 1);
    } else {
      this.selectMultipleChoice('side_angle_relationship_choice', 2);
    }
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('side_angle_relationship_choice');
    if (selection === -1) {
      return 'notSelected';
    }
    if ((selection === 0 && this.answer === 'x')
      || (selection === 1 && this.answer === 'y')
      || (selection === 2 && this.answer === 'z')) {
      return 'correct';
    }
    return 'incorrect';
  }
}
