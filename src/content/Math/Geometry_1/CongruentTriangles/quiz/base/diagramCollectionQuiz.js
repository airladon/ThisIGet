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
  Point,
} = Fig;

const {
  removeRandElement,
  // round,
  rand,
  randElements,
  randElement,
} = Fig.tools.math;

export default class QuizCollection extends CommonQuizMixin(CommonDiagramCollection) {
  diagram: CommonTopicDiagram;
  _messages: {
    _touching: DiagramElementPrimitive;
    _rotation: DiagramElementPrimitive;
  } & TypeMessages;

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
        checkDimensions: {
          answer: 'Incorrect',
          details: 'Make sure to check the dimensions are the same',
        },
        notSelected: {
          answer: 'Incorrect',
          details: 'Make sure to select "Yes" or "No" above the "Check" button',
        },
        ssa: {
          answer: 'Incorrect',
          details: 'Side-Side-Angle does not guarantee congruence if the angle\'s opposite side is longer than the adjacent side.',
        },
        aaa: {
          answer: 'Incorrect',
          details: 'Angle-Angle-Angle does not guarantee congruence as triangles with the same angles can be different sizes.',
        },
        // sas: {
        //   answer: 'Incorrect',
        //   details: 'This is a Side-Angle-Side configuration, which does guarantee congruency.',
        // },
        // aas: {
        //   answer: 'Incorrect',
        //   details: 'This is a Angle-Angle-Side configuration which does guarantee congruency.',
        // },
        // asa: {
        //   answer: 'Incorrect',
        //   details: 'This is a Angle-Side-Angle configuration which does guarantee congruency.',
        // },
        // sss: {
        //   answer: 'Incorrect',
        //   details: 'This is a Side-Side-Side configuration which does guarantee congruency.',
        // },
      },
      transform,
    );
    this.addCheck();
    // this.addInput('input', '?', 3, 0);
    this.addMultipleChoice('congruent_tri_1', ['Yes', 'No']);
    // this.add('main', new CommonCollection(diagram, this.layout));
    this.diagram.addElements(this.layout.addElementsQuiz, this);
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  randomTriangle(
    maxQuadrantBounds: Point = new Point(0.9, 0.9),
    minQuadrantBounds: Point = new Point(0.4, 0.4),
  ): Array<Point> {
    const possibleQuads = [0, 1, 2, 3];
    const quadrants = randElements(3, possibleQuads);

    const points = [];
    quadrants.forEach((q) => {
      let x = rand(minQuadrantBounds.x, maxQuadrantBounds.x);
      let y = rand(minQuadrantBounds.y, maxQuadrantBounds.y);
      if (q === 1 || q === 2) {
        x *= -1;
      }
      if (q === 2 || q === 3) {
        y *= -1;
      }
      points.push(new Point(x, y));
    });
    return points;
  }

  calcRandomTriangles() {
    const points = this.randomTriangle();
    const rotation1 = rand(0, Math.PI * 2);
    const rotation2 = rand(0, Math.PI * 2);
    const position1 = new Point(-1.2, -0.3);
    const position2 = new Point(1.2, -0.3);
    const scale1 = randElement([-1, 1]);
    const scale2 = randElement([-1, 1]);
    const transform1 = new Transform().scale(scale1, 1)
      .rotate(rotation1).translate(position1);
    const transform2 = new Transform().scale(scale2, 1)
      .rotate(rotation2).translate(position2);
    const points1 = points.map(p => p.transformBy(transform1.m()));
    const points2 = points.map(p => p.transformBy(transform2.m()));
    this._tri1._pad0.scenarios.quiz = { position: points1[0] };
    this._tri1._pad1.scenarios.quiz = { position: points1[1] };
    this._tri1._pad2.scenarios.quiz = { position: points1[2] };
    this._tri2._pad0.scenarios.quiz = { position: points2[0] };
    this._tri2._pad1.scenarios.quiz = { position: points2[1] };
    this._tri2._pad2.scenarios.quiz = { position: points2[2] };
    const trick = rand(0, 1);
    if (trick < 0.3) {
      this._tri2._pad0.scenarios.quiz = { position: points2[0].add(0.05, 0) };
      this.hint = 'checkDimensions';
    } else {
      this.hint = 'incorrect';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getKnownPropertiesType(
    propertyPossibilities: Array<Array<string>>,
    knownProperties: Array<string>,
  ) {
    let answer = false;
    propertyPossibilities.forEach((possibility) => {
      let same = true;
      for (let i = 0; i < possibility.length; i += 1) {
        if (possibility[i] !== knownProperties[i]) {
          same = false;
        }
      }
      if (same) {
        answer = true;
      }
    });
    return answer;
  }

  getPropertiesType(knownProperties: Array<string>) {
    const AAA = [
      ['0', '1', '2'],
    ];
    const SSA = [
      ['0', '01', '12'],
      ['0', '12', '20'],
      ['1', '12', '20'],
      ['01', '1', '20'],
      ['01', '2', '20'],
      ['01', '12', '2'],
    ];
    const SSS = [
      ['01', '12', '20'],
    ];
    const SAA = [
      ['01', '1', '2'],
      ['0', '01', '2'],
      ['0', '12', '2'],
      ['0', '1', '12'],
      ['0', '1', '20'],
      ['0', '2', '20'],
    ];
    const ASA = [
      ['0', '01', '1'],
      ['1', '12', '2'],
      ['0', '2', '20'],
    ];
    const SAS = [
      ['01', '1', '12'],
      ['12', '2', '20'],
      ['0', '01', '20'],
    ];
    if (this.getKnownPropertiesType(AAA, knownProperties)) {
      return 'AAA';
    }
    if (this.getKnownPropertiesType(SSS, knownProperties)) {
      return 'SSS';
    }
    if (this.getKnownPropertiesType(SSA, knownProperties)) {
      return 'SSA';
    }
    if (this.getKnownPropertiesType(SAA, knownProperties)) {
      return 'SAA';
    }
    if (this.getKnownPropertiesType(ASA, knownProperties)) {
      return 'ASA';
    }
    if (this.getKnownPropertiesType(SAS, knownProperties)) {
      return 'SAS';
    }
    return 'unknown';
  }

  // eslint-disable-next-line class-methods-use-this
  getUnknownAngles(knownProperties: Array<string>) {
    const possibleAngles = ['0', '1', '2'];
    const unknownAngles = [];
    possibleAngles.forEach((angle) => {
      if (knownProperties.indexOf(angle) === -1) {
        unknownAngles.push(angle);
      }
    });
    return unknownAngles;
  }

  // eslint-disable-next-line class-methods-use-this
  getKnownAngles(knownProperties: Array<string>): Array<string> {
    return knownProperties.filter(p => p.length === 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getKnownSides(knownProperties: Array<string>): Array<string> {
    return knownProperties.filter(p => p.length === 2);
  }

  // eslint-disable-next-line class-methods-use-this
  getUnknownSides(knownProperties: Array<string>) {
    const possibleSides = ['01', '12', '20'];
    const unknownASides = [];
    possibleSides.forEach((side) => {
      if (knownProperties.indexOf(side) === -1) {
        unknownASides.push(side);
      }
    });
    return unknownASides;
  }

  showAnglesAndSides() {
    if (this._tri1._angle0.angle > Math.PI) {
      this._tri1.reverse = !this._tri1.reverse;
      this._tri1.updatePoints(this._tri1.points);
    }
    if (this._tri2._angle0.angle > Math.PI) {
      this._tri2.reverse = !this._tri2.reverse;
      this._tri2.updatePoints(this._tri2.points);
    }
    this._tri1.hideAll();
    this._tri1._line.show();
    this._tri1._pad0.show();
    this._tri1._pad1.show();
    this._tri1._pad2.show();
    this._tri2.hideAll();
    this._tri2._line.show();
    this._tri2._pad0.show();
    this._tri2._pad1.show();
    this._tri2._pad2.show();
    const possible = ['angle', 'angle', 'angle', 'side', 'side', 'side'];
    const propertiesToShow = randElements(3, possible);
    const possibleAngles = ['0', '1', '2'];
    const possibleSides = ['01', '12', '20'];
    const order = ['0', '01', '1', '12', '2', '20'];
    const knownProperties = [];
    // this.hint = 'incorrect';
    let answer = 'possible';
    propertiesToShow.forEach((p) => {
      let elementId;
      if (p === 'angle') {
        const angleId = removeRandElement(possibleAngles);
        elementId = `_angle${angleId}`;
        knownProperties.push(angleId);
      } else {
        const sideId = removeRandElement(possibleSides);
        elementId = `_side${sideId}`;
        knownProperties.push(sideId);
      }
      const element1 = this._tri1[elementId];
      const element2 = this._tri2[elementId];
      element1.showAll();
      element2.showAll();
    });
    const sortedKnownProperties = knownProperties
      .sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const propertiesType = this.getPropertiesType(sortedKnownProperties);
    if (propertiesType === 'AAA') {
      answer = 'not possible';
      this.hint = 'aaa';
    }
    if (propertiesType === 'SSA') {
      let angleIndex = sortedKnownProperties.filter(p => p.length === 1)[0];
      angleIndex = parseInt(angleIndex, 10);
      let oppositeSide = '';
      let adjacentSide = '';
      sortedKnownProperties.forEach((p) => {
        if (p.length === 2) {
          if (p.includes(angleIndex.toString())) {
            adjacentSide = p;
          } else {
            oppositeSide = p;
          }
        }
      });
      if (oppositeSide && adjacentSide) {
        const lengthOpp = this._tri1[`_side${oppositeSide}`].length;
        const lengthAdj = this._tri1[`_side${adjacentSide}`].length;
        if (lengthAdj > lengthOpp) {
          answer = 'not possible';
          this.hint = 'ssa';
        }
      }
    }

    if (this.hint === 'checkDimensions') {
      answer = 'not possible';
    }
    this.answer = answer;
    this._check.show();
    this._choice.show();
    this.diagram.animateNextFrame();
  }

  // tryAgain() {
  //   super.tryAgain();
  // }


  setupNewProblem() {
    this.calcRandomTriangles();
    this._tri1.hideAll();
    this._tri1.show();
    this._tri1._line.show();
    this._tri1._pad0.show();
    this._tri1._pad1.show();
    this._tri1._pad2.show();
    this._tri2.hideAll();
    this._tri2.show();
    this._tri2._line.show();
    this._tri2._pad0.show();
    this._tri2._pad1.show();
    this._tri2._pad2.show();
    this.transitionToNewProblem({ target: 'quiz', duration: 1 });
  }

  afterTransitionToNewProblem() {
    super.afterTransitionToNewProblem();
    this.showAnglesAndSides();
  }

  showAnswer() {
    super.showAnswer();
    if (this.answer === 'possible') {
      this.selectMultipleChoice('congruent_tri_1', 0);
    } else {
      this.selectMultipleChoice('congruent_tri_1', 1);
    }
    // this._answerBox.disable();
    this.diagram.animateNextFrame();
  }

  findAnswer() {
    const selection = this.getMultipleChoiceSelection('congruent_tri_1');
    if (selection === -1) {
      return 'notSelected';
    }
    if ((selection === 0 && this.answer === 'possible')
      || (selection === 1 && this.answer === 'not possible')) {
      return 'correct';
    }
    return this.hint;
    // return 'incorrect';
  }
}
