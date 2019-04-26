// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative } = Fig;
const {
  round, rand, randElement,
} = Fig.tools.math;
const {
  setHTML, highlight,
} = Fig.tools.html;
// What is the radius of a circle with area...
// What is the circumference of a circle with area...
// What is the diameter of a circle with area...
// What is the area of a circle with radius...
// What is the area of a circle with circumference...
// What is the area of a circle with diameter...
// How many circles of radius 1 are needed to have a total area of 6π.
// What is the area of a band with inner radius... and outer radius...

export default class QuizParallel1Collection extends CommonQuizMixin(CommonDiagramCollection) {
// export default class QuizParallel1Collection extends CommonQuizDiagramCollection {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

  futurePositions: Object;

  addCircle() {
    const circle = this.diagram.shapes.polygon(this.layout.circle);
    this.add('circle', circle);
  }

  addRadius() {
    const radius = this.diagram.objects.line(this.layout.radius);
    this.add('radius', radius);
  }

  addDiameter() {
    const diameter = this.diagram.objects.line(this.layout.diameter);
    this.add('diameter', diameter);
  }

  addArea() {
    const area = this.diagram.shapes.collection(new Transform().translate(0, 0));
    const fill = this.diagram.shapes.polygon(this.layout.area.fill);
    const label = this.diagram.objects.label(this.layout.area.label);
    area.add('fill', fill);
    area.add('label', label.eqn.collection);
    area.label = label;
    this.add('area', area);
  }

  addCircumference() {
    const lay = this.layout.circumference;
    const circumference = this.diagram.shapes.collection(new Transform()
      .translate(0, 0));
    const line = this.diagram.shapes.polygon(lay.line);
    const arrow = this.diagram.shapes.arrowLegacy(
      lay.arrow.width,
      0,
      lay.arrow.height,
      0,
      lay.arrow.color,
      lay.arrow.position,
      lay.arrow.tip,
      lay.arrow.rotation,
    );
    const label = this.diagram.objects.label(lay.label);
    circumference.add('line', line);
    circumference.add('arrow', arrow);
    circumference.add('label', label.eqn.collection);
    circumference.label = label;
    this.add('circumference', circumference);
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
    this.addArea();
    this.addCircle();
    this.addRadius();
    this.addDiameter();
    this.addCircumference();
    this.addInput('input', '?', 8, 2);
    this.hasTouchableElements = true;

    this._input.interactiveLocation = this.layout.quiz.inputInteractiveLocation;
    this._check.interactiveLocation = this.layout.quiz.checkInteractiveLocation;
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }


  newProblem() {
    super.newProblem();
    this.generateQuestion();
    // this.calculateFuturePositions();
    // this.moveToFuturePositions(1, this.updateAngles.bind(this));
    // this._input.enable();
    // this._input.setValue('');
    this._check.show();
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
      const question = `What is the |radius| of a circle with |area| ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI), 2);
      this._radius.showAll();
      this._radius.label.setText('radius = ?');
      this._circumference.hideAll();
      this._area.label.setText(`Area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findCircumference = () => {
      const question = `What is the |circumference| of a circle with |area| ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI), 2);
      this._circumference.showAll();
      this._circumference.label.setText('circumference = ?');
      this._area.label.setText(`area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.middle);
      return question;
    };

    const findDiameter = () => {
      const question = `What is the |diameter| of a circle with |area| ${area}?`;
      this.answer = round(Math.sqrt(area / Math.PI) * 2, 2);
      this._diameter.showAll();
      this._diameter.label.setText('diameter = ?');
      this._area.label.setText(`area = ${area}`);
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromRadius = () => {
      const question = `What is the |area| of a circle with |radius| ${radius}?`;
      this.answer = round(radius ** 2 * Math.PI, 2);
      this._radius.showAll();
      this._radius.label.setText(`radius = ${radius}`);
      this._area.label.setText('Area = ?');
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromDiameter = () => {
      const question = `What is the |area| of a circle with |diameter| ${diameter}?`;
      this.answer = round((diameter / 2) ** 2 * Math.PI, 2);
      this._diameter.showAll();
      this._diameter.label.setText(`diameter = ${diameter}`);
      this._area.label.setText('Area = ?');
      this._area._label.setPosition(this.layout.area.positions.low);
      return question;
    };

    const findAreaFromCircumference = () => {
      const question = `What is the |area| of a circle with |circumference ${circumference}|?`;
      this.answer = round((circumference / 2 / Math.PI) ** 2 * Math.PI, 2);
      this._circumference.showAll();
      this._circumference.label.setText(`circumference = ${circumference}`);
      this._area.label.setText('Area = ?');
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

    const modifiers = {
      diamter: highlight(this.layout.colors.radius),
      radius: highlight(this.layout.colors.radius),
      circumference: highlight(this.layout.colors.radius),
    };

    const chosenQuestion = randElement(possibleQuestions);
    const question = document.getElementById('id_lesson__quiz_question');
    if (question != null) {
      setHTML(question, chosenQuestion(), modifiers);
      // question.innerHTML = applyModifiers(chosenQuestion(), modifiers);
      // console.log(applyModifiers(chosenQuestion(), modifiers));
    }
  }
}
