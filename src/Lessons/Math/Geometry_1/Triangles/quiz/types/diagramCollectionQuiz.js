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
  // Line,
} = Fig;

const { removeRandElement, round, rand } = Fig.tools.math;

// const { minAngleDiff } = Fig.tools.g2;

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
      if (this.triangle._angle0.label == null) {
        return;
      }

      //Maybe make all these actual angles again
      // $FlowFixMe
      let angle0 = parseInt(this.triangle._angle0.label.getText(), 10);
      // $FlowFixMe
      let angle1 = parseInt(this.triangle._angle1.label.getText(), 10);
      // $FlowFixMe
      let angle2 = parseInt(this.triangle._angle2.label.getText(), 10);
      // $FlowFixMe
      const side01 = parseFloat(this.triangle._side01.label.getText());
      // $FlowFixMe
      const side12 = parseFloat(this.triangle._side12.label.getText());
      // $FlowFixMe
      const side20 = parseFloat(this.triangle._side20.label.getText());
      
      // if (angle0 > 180 || angle1 > 180 || angle2 > 180)
      console.log('before', angle0, angle1, angle2, this.triangle._angle0.getAngle('deg'), this.triangle._angle1.getAngle('deg'), this.triangle._angle2.getAngle('deg'))
      if (angle0 > 90 && angle1 > 90 && angle2 > 90) {
        this.triangle.reverse = !this.triangle.reverse;
        this.triangle.updatePoints(this.triangle.points, false);
        // $FlowFixMe
        angle0 = parseInt(this.triangle._angle0.label.getText(), 10);
        // $FlowFixMe
        angle1 = parseInt(this.triangle._angle1.label.getText(), 10);
        // $FlowFixMe
        angle2 = parseInt(this.triangle._angle2.label.getText(), 10);
      } else {
        if (angle0 > 180) {
          angle0 = 360 - angle0;
        }
        if (angle1 > 180) {
          angle1 = 360 - angle1;
        }
        if (angle2 > 180) {
          angle2 = 360 - angle2;
        }
      }
      // console.log('after', angle0, angle1, angle2)
      if (
        angle0 > 160 || angle1 > 160 || angle2 > 160
        || angle0 < 15 || angle1 < 15 || angle2 < 15
        || side01 < 0.6 || side12 < 0.6 || side20 < 0.6
      ) {
        this.triangle.hideAngles();
      } else {
        this.triangle.showAngles();
      }

      // Make angles consistent with 180º
      if (this.triangle._angle0.isShown) {
        const tot = round(angle0, 0) + round(angle1, 0) + round(angle2, 0);
        const diff = 180 - tot;
        // If the angles are > 180, then find the closet angle
        // to rounding up and round it up
        // If the angles are < 180 then find the closes angle
        // to round down and round it down
        const options = [angle0, angle1, angle2];
        const remainders = options.map(a => a - Math.floor(a));
        const angles = [this.triangle._angle0, this.triangle._angle1, this.triangle._angle2];

        let indexToChange = -1;
        let newValue = 0;
        if (diff > 0) {
          indexToChange = remainders.reduce(
            (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
            0,
          );
          newValue = Math.ceil(this.triangle[`_angle${indexToChange}`].getAngle('deg'));
        } else if (diff < 0) {
          indexToChange = remainders.reduce(
            (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
            1,
          );
          newValue = Math.floor(this.triangle[`_angle${indexToChange}`].getAngle('deg'));
        }
        [0, 1, 2].forEach((index) => {
          if (index !== indexToChange) {
            if (angles[index].label != null) {
              angles[index].label.showRealAngle = true;
            }
          } else if (angles[index].label != null) {
            angles[index].label.showRealAngle = false;
            angles[index].label.setText(`${newValue}º`);
          }
        });

        // Make sides consistent with equilateral or isosceles
        const a0 = angle0;
        const a1 = angle1;
        const a2 = angle2;
        const s01 = side01;
        const s12 = side12;
        const s20 = side20;
        if (a0 === 60 && a1 === 60 && a2 === 60) {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side12.setLabel(`${s01.toFixed(2)}`);
          this.triangle._side20.setLabel(`${s01.toFixed(2)}`);
        } else if (a0 === a1) {
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side20.setLabel(`${s12.toFixed(2)}`);
          if (s01 === s12) {
            if (side01 - Math.floor(side01) > 0.5) {
              this.triangle._side01.setLabel(`${(s12 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side01.setLabel(`${(s12 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side01.setLabelToRealLength();
          }
        } else if (a0 === a2) {
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side01.setLabel(`${s12.toFixed(2)}`);
          if (s20 === s12) {
            if (side20 - Math.floor(side20) > 0.5) {
              this.triangle._side20.setLabel(`${(s12 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side20.setLabel(`${(s12 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side20.setLabelToRealLength();
          }
        } else if (a1 === a2) {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side20.setLabel(`${s01.toFixed(2)}`);
          if (s12 === s01) {
            if (side12 - Math.floor(side12) > 0.5) {
              this.triangle._side12.setLabel(`${(s01 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side12.setLabel(`${(s01 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side12.setLabelToRealLength();
          }
        } else {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side20.setLabelToRealLength();
        }
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

    this._question.drawingObject.setText(`Drag the corners to create a ${this.answer} triangle :`);

    this.updatePoints();
    this.diagram.animateNextFrame();
  }

  showAnswer() {
    super.showAnswer();
    this.goToType(this.answer, 1);
    this.diagram.animateNextFrame();
  }

  classify() {
    const angle0 = parseInt(this.triangle._angle0.label.getText(), 10);
    const angle1 = parseInt(this.triangle._angle1.label.getText(), 10);
    const angle2 = parseInt(this.triangle._angle2.label.getText(), 10);
    const side01 = this.triangle._side01.label.getText();
    const side12 = this.triangle._side12.label.getText();
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

    this.triangle.stop(true, 'noComplete');
    this.triangle.animations.new()
      .scenarios({ target: 'next', duration })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }
}
