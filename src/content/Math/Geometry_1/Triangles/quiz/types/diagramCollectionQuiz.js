// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonQuizMixin from '../../../../../common/DiagramCollectionQuiz';
import type { TypeMessages } from '../../../../../common/DiagramCollectionQuiz';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import CommonCollection from '../../explanation/base/diagramCollectionCommon';

const {
  Transform, DiagramElementPrimitive, DiagramObjectPolyLine,
  DiagramObjectAngle, DiagramObjectLine,
  // Line,
} = Fig;

const { removeRandElement, rand } = Fig.tools.math;

// const { minAngleDiff } = Fig.tools.g2;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonTopicDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

  triangle: {
    _line: DiagramElementPrimitive;
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
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
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(
      diagram,
      layout,
      'q1',
      {
        equilateral: {
          answer: 'Almost!',
          details: 'You made an equilateral triangle - which is a special case of an isosceles triangle. For this exercise, make a triangle with just two sides the same length.',
        },
      },
      transform,
    );
    this.addQuestion();
    this.addCheck();
    this.diagram.addElements(this.layout.addElements, this);
    this.hasTouchableElements = true;
    this.triangle = this._triangle;
    this.lastAnswer = '';
    this.transitioning = false;
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

  setupNewProblem() {
    this.randomTriangle();
    this.triangle.hideAll();
    this.triangle._line.show();
    this.transitioning = true;
    this.transitionToNewProblem({ target: 'next', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.transitioning = false;
    this.triangle.showAll();
    this.triangle._pad0.setMovable();

    const options = ['acute', 'right', 'obtuse', 'equilateral', 'isosceles', 'scalene'];
    this.answer = removeRandElement(options);
    if (this.answer === this.lastAnswer) {
      this.answer = removeRandElement(options);
    }
    this.lastAnswer = this.answer;

    let phrase = `an ${this.answer}`;
    if (this.answer === 'right' || this.answer === 'scalene') {
      phrase = `a ${this.answer}`;
    }
    this._question.drawingObject.setText(`Drag the corners to create ${phrase} triangle :`);

    // this.updatePoints();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    this.goToType(this.answer, 1);
    this.diagram.animateNextFrame();
  }

  classify() {
    // $FlowFixMe
    const angle0 = parseInt(this.triangle._angle0.label.getText(), 10);
    // $FlowFixMe
    const angle1 = parseInt(this.triangle._angle1.label.getText(), 10);
    // $FlowFixMe
    const angle2 = parseInt(this.triangle._angle2.label.getText(), 10);
    // $FlowFixMe
    const side01 = this.triangle._side01.label.getText(); // $FlowFixMe
    const side12 = this.triangle._side12.label.getText(); // $FlowFixMe
    const side20 = this.triangle._side20.label.getText();

    const classification = [];
    if (side01 === side12 && side01 === side20 && side12 === side20) {
      classification.push('equilateral');
    }

    if (side01 === side12 || side01 === side20 || side12 === side20) {
      classification.push('isosceles');
    }

    if (angle0 === 90 || angle1 === 90 || angle2 === 90) {
      classification.push('right');
    }

    if (angle0 > 90 || angle1 > 90 || angle2 > 90) {
      classification.push('obtuse');
    }

    if (angle0 < 90 && angle1 < 90 && angle2 < 90) {
      classification.push('acute');
    }

    if (side01 !== side12 && side01 !== side20 && side12 !== side20) {
      classification.push('scalene');
    }
    return classification;
    // if (angle1 === angle2 || angle1 == angle3 || angle2 === angle3)
  }

  findAnswer() {
    const tri = this.classify();
    // console.log(tri, this.answer, tri.indexOf(this.answer) > -1)
    if (this.answer === 'equilateral') {
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    if (this.answer === 'isosceles') {
      if (tri.indexOf('equilateral') > -1) {
        return 'equilateral';
      }
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    if (this.answer === 'right') {
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    if (this.answer === 'acute') {
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    if (this.answer === 'obtuse') {
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    if (this.answer === 'scalene') {
      if (tri.indexOf(this.answer) > -1) {
        return 'correct';
      }
      return 'incorrect';
    }

    return 'incorrect';
  }

  goToType(
    type: 'acute' | 'right' | 'obtuse' | 'equilateral' | 'isosceles' | 'scalene',
    duration: number = 1,
    callback: ?() => void = null,
  ) {
    let points = [];
    if (type === 'acute') {
      points = [
        [-1, -1],
        [0.5, 1],
        [1.5, -1],
      ];
      this.triangle.hideSides();
      this.triangle.showAngles();
    } else if (type === 'right') {
      points = [
        [-1, -1],
        [1.3, 0.8],
        [1.3, -1],
      ];
      this.triangle.hideSides();
      this.triangle.showAngles();
    } else if (type === 'obtuse') {
      points = [
        [-1.5, -1],
        [0.5, 0.4],
        [2, -1],
      ];
      this.triangle.hideSides();
      this.triangle.showAngles();
    } else if (type === 'equilateral') {
      points = [
        [-1, -1],
        [0, 0.73],
        [1, -1],
      ];
      this.triangle.showSides();
      this.triangle.hideAngles();
    } else if (type === 'isosceles') {
      points = [
        [-0.7, -1],
        [0, 1.1],
        [0.7, -1],
      ];
      this.triangle.showSides();
      this.triangle.hideAngles();
    } else if (type === 'scalene') {
      points = [
        [-1.5, -1],
        [1, 0.7],
        [2, -1],
      ];
      this.triangle.showSides();
      this.triangle.hideAngles();
    }

    this.triangle._pad0.scenarios.next = { position: points[0] };
    this.triangle._pad1.scenarios.next = { position: points[1] };
    this.triangle._pad2.scenarios.next = { position: points[2] };

    this.triangle.stop('freeze');
    this.triangle.animations.new()
      .scenarios({ target: 'next', duration })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }
}
