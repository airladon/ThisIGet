// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonQuizMixin from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../LessonsCommon/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonCollection from '../common/diagramCollectionCommonThreeLines';

const { Transform, DiagramElementPrimative } = Fig;
const { rand, removeRandElement, roundNum } = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonLessonDiagram;
  _messages: {
    _touching: DiagramElementPrimative;
    _rotation: DiagramElementPrimative;
  } & TypeMessages;

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
    this.add('input', this.makeEntryBox('a1', '?', 3));
    this._input.setPosition(this.layout.input);
    this.add('main', new CommonCollection(diagram, this.layout));
    this.hasTouchableElements = false;
  }

  randomizeLines() {
    const separation = rand(
      this.layout.minSeparation,
      this.layout.maxSeparation,
    );
    const intersectingLineRotation = rand(
      Math.PI / 4,
      Math.PI - Math.PI / 4,
    );
    const rotation = rand(2 * Math.PI);
    const fig = this._main._fig;
    fig._line1.scenarios.quiz = { position: [0, separation / 2], rotation: 0 };
    fig._line2.scenarios.quiz = {
      position: [0, -separation / 2],
      rotation: 0,
    };
    fig._line3.scenarios.quiz = {
      position: [0, 0], rotation: intersectingLineRotation,
    };
    fig.scenarios.quiz = { position: [0, 0], rotation };
  }

  hideAngles() {
    const fig = this._main._fig;
    fig._angleA1.hide();
    fig._angleA2.hide();
    fig._angleB1.hide();
    fig._angleB2.hide();
    fig._angleC1.hide();
    fig._angleC2.hide();
    fig._angleD1.hide();
    fig._angleD2.hide();
  }

  tryAgain() {
    super.tryAgain();
    this.diagram.animateNextFrame();
    this._input.enable();
  }


  setupNextProblem() {
    this.randomizeLines();
    this.hideAngles();
    const fig = this._main._fig;
    const r = fig._line3.transform.r();
    if (r == null) {
      return;
    }
    const angleAValue = roundNum(r * 180 / Math.PI, 0);
    const angleBValue = 180 - angleAValue;
    const angleValues = {
      A: angleAValue,
      B: angleBValue,
      C: angleAValue,
      D: angleBValue,
    };

    const angles = ['A1', 'B1', 'C1', 'D1', 'A2', 'B2', 'C2', 'D2'];
    const knownAngle = removeRandElement(angles);
    const unknownAngle = removeRandElement(angles);

    const knownAngleValue = angleValues[knownAngle.charAt(0)];
    const unknownAngleValue = angleValues[unknownAngle.charAt(0)];

    this.angleToFind = unknownAngleValue;

    // $FlowFixMe
    const knownAngleElement = fig[`_angle${knownAngle}`];
    // console.log(knownAngleElement)
    knownAngleElement.label.setText(`${knownAngleValue}º`);
    // knownAngleElement.label.eqn.showForm('a');
    // knownAngleElement._curve.show();
    knownAngleElement.showAll();
    knownAngleElement.setColor(this.layout.colors.angle2);
    // knownAngleElement.label.eqn.reArrangeCurrentForm();

    // $FlowFixMe
    const unknownAngleElement = fig[`_angle${unknownAngle}`];
    unknownAngleElement.label.setText('?º');
    // unknownAngleElement.label.eqn.showForm('a');
    // unknownAngleElement._arc.show();
    unknownAngleElement.showAll();
    unknownAngleElement.setColor(this.layout.colors.angle1);
    // unknownAngleElement.label.eqn.reArrangeCurrentForm();
    this._main.updateIntersectingLineAngle();
    this._input.show();
  }

  beforeTransitionToNewProblem() {
  }

  newProblemReady() {
    this._input.setValue('');
    this._input.enable();
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
    this._input.setValue(this.angleToFind);
    this._input.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    this._input.disable();
    if (this._input.getValue() === this.angleToFind.toString()) {
      return 'correct';
    }
    return 'incorrect';
  }
}
