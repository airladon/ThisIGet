// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommon';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  EquationLabel,
  Transform,
} = Fig;

const {
//   removeRandElement,
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

  _circumference: {
    _label: DiagramElementPrimative;
    _arrow: DiagramElementPrimative;
    _line: DiagramElementPrimative;
  } & DiagramElementCollection;

  _area: {
    _label: DiagramElementPrimative;
    _fill: DiagramElementPrimative;
  } & DiagramElementCollection;

  _radius: { label: EquationLabel } & DiagramObjectLine;
  _diameter: { label: EquationLabel } & DiagramObjectLine;
  _circle: DiagramElementPrimative;

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
    this.addInput('input', '?', 5, 2);
    this.diagram.addElements(this, this.layout.addElementsQuiz);
    // this.setPosition([0, -0.2]);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }

  // tryAgain() {
  //   super.tryAgain();
  // }


  setupNewProblem() {
    // this._question.drawingObject.setText(`Question here ${1}:`);
    // this.transitionToNewProblem({ target: 'quiz', duration: 1 });
    this.generateQuestion();
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
    const answer = parseFloat(this._input.getValue());
    if (this.answer === answer) {
      return 'correct';
    }
    return 'incorrect';
  }

  generateQuestion() {
    const area = round(rand(3, 350), 1);
    const radius = round(rand(1, 10), 1);
    const circumference = round(radius * 2 * Math.PI, 1);
    const diameter = round(radius * 2, 1);

    const findRadius = () => {
      const question = `What is the radius of a circle with area ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI), 2);
      this._radius.showAll();
      this._radius.label.setText('radius = ?');
      this._circumference.hideAll();
      this._area._label.drawingObject.setText(`area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findCircumference = () => {
      const question = `What is the circumference of a circle with area ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI), 2);
      this._circumference.showAll();
      this._circumference._label.drawingObject.setText('circumference = ?');
      this._area._label.drawingObject.setText(`area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.middle);
      return question;
    };

    const findDiameter = () => {
      const question = `What is the diameter of a circle with area ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI) * 2, 2);
      this._diameter.showAll();
      this._diameter.label.setText('diameter = ?');
      this._area._label.drawingObject.setText(`area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromRadius = () => {
      const question = `What is the area of a circle with radius ${radius}?`;
      this.answer = round(radius ** 2 * Math.PI, 2);
      this._radius.showAll();
      this._radius.label.setText(`radius = ${radius}`);
      this._area._label.drawingObject.setText('area = ?');
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromDiameter = () => {
      const question = `What is the area of a circle with diameter ${diameter}?`;
      this.answer = round((diameter / 2) ** 2 * Math.PI, 2);
      this._diameter.showAll();
      this._diameter.label.setText(`diameter = ${diameter}`);
      this._area._label.drawingObject.setText('area = ?');
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromCircumference = () => {
      const question = `What is the area of a circle with circumference ${circumference}?`;
      this.answer = round((circumference / 2 / Math.PI) ** 2 * Math.PI, 2);
      this._circumference.showAll();
      this._circumference._label.drawingObject.setText(`circumference = ${circumference}`);
      this._area._label.drawingObject.setText('area = ?');
      this._area._label.setPosition(this.layout.area.positions.middle);
      return question;
    };

    this._circumference.hideAll();
    this._radius.hideAll();
    this._diameter.hideAll();

    const possibleQuestions = [
      findRadius,
      findCircumference,
      findDiameter,
      findAreaFromRadius,
      findAreaFromDiameter,
      findAreaFromCircumference,
    ];

    const chosenQuestion = randElement(possibleQuestions);
    this._question.drawingObject.setText(chosenQuestion());
  }
}
