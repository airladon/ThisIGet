// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform, DiagramElementPrimitive } = Fig;

const { removeRandElement, round, rand } = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonTopicDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

  radius: number;
  angle: number;
  multiplier: number;
  unknown: 'arc' | 'radius' | 'angle';

  constructor(
    diagram: CommonTopicDiagram,
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
    this.addCheck();
    this.diagram.addElements(this, this.layout.addElements);
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);
    this._circle._line1.move.canBeMovedAfterLosingTouch = true;
    this.multiplier = 1;
    this.radius = 1;
    this.units = 'radians';
  }

  updateUnits(units: 'radians' | 'degrees') {
    if (units === 'radians') {
      this._circle._angle.label.units = 'radians';
      this._circle._angle.label.precision = 2;
    } else {
      this._circle._angle.label.units = 'degrees';
      this._circle._angle.label.precision = 0;
    }
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    if (this._circle._angle.isShown) {
      this._circle._angle.setAngle({ angle: r });
      let angleText = `${round(r, 2).toFixed(2)} rad`;
      if (this.units === 'degrees') {
        angleText = `${round(r / Math.PI * 180, 0)}º`;
      }
      this._circle._angle.label.setText(angleText);
      this._circle._angle.update(this._circle.getRotation());
    }
    if (this._circle._arc.isShown) {
      this._circle._arc.setAngle({ angle: r });
      this._circle._arc.label.setText(`${round(this.radius * r * this.multiplier, 2).toFixed(2)}`);
      this._circle._arc.update(this._circle.getRotation());
    }
    this._circle._line1.label.setText(round(this.radius * this.multiplier, 2).toFixed(2));
    this._circle._line1.updateLabel(this._circle.getRotation());
    if (this.unknown === 'radius') {
      this._circle._line1._label.hide();
    }
    if (this.unknown === 'angle') {
      this._circle._angle._label.hide();
    }
    if (this.unknown === 'arc') {
      this._circle._arc._label.hide();
    }
  }

  tryAgain() {
    super.tryAgain();
    // this._input.enable();
    // this._input.setValue('');
  }

  goToAngle(angle: number) {
    this._circle._line1.animations.new()
      .rotation({ target: angle, duration: 1, direction: 2 })
      .start();
    this.diagram.animateNextFrame();
  }

  setupNewProblem() {
    // super.newProblem();

    this.units = removeRandElement(['degrees', 'radians']);

    const radius = rand(1, 1);
    const angle = rand(0.5, 5);
    const multiplier = rand(0.1, 10);
    // const arc = radius * angle;

    this.multiplier = multiplier;
    this.radius = radius;
    this.angle = angle;
    const adjustableOptions = ['arc', 'angle'];
    // const properties = ['radius', 'arc', 'angle'];
    const unknown = removeRandElement(adjustableOptions);
    const adjustable = removeRandElement(adjustableOptions);
    this.unknown = unknown;

    // Setup circle
    const randAngle = rand(0.5, 5);
    this._circle.setScale(radius);
    this._circle._line1.setRotation(randAngle);
    this._circle.setRotation(rand(0, Math.PI * 1.5));
    this.updateAngle();

    this._circle._line1._label.showAll();
    this._circle._arc._label.showAll();
    this._circle._angle._label.showAll();
    if (unknown === 'radius') {
      this._circle._line._label.hide();
      this._question.drawingObject.setText(`Adjust the ${adjustable} to get a radius of ${round(this.radius * this.multiplier, 2).toFixed(2)}`);
    } else if (unknown === 'angle') {
      this._circle._angle._label.hide();
      let angleText = `${round(this.angle, 2).toFixed(2)} radians`;
      if (this.units === 'degrees') {
        angleText = `${round(this.angle * 180 / Math.PI, 0)}º`;
      }
      this._question.drawingObject.setText(`Adjust the ${adjustable} to get an angle of ${angleText}`);
    } else if (unknown === 'arc') {
      this._circle._arc._label.hide();
      this._question.drawingObject.setText(`Adjust the ${adjustable} to get an arc length of ${round(this.angle * this.radius * this.multiplier, 2).toFixed(2)}`);
    }
  }

  showAnswer() {
    super.showAnswer();
    this.goToAngle(this.angle);
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const angle = round(this._circle._line1.getRotation(), 2);
    if (angle > round(this.angle, 2) * 0.99 && angle < round(this.angle, 2) * 1.01
    ) {
      return 'correct';
    }
    return 'incorrect';
  }
}
