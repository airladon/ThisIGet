// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

// import { makeLine } from '../../../../LessonsCommon/tools/line';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, DiagramElementCollection, DiagramObjectLine,
} = Fig;

export default class SquareCollection extends CommonDiagramCollection {
  _square: {
    _rightAngle1: TypeAngle;
    _rightAngle2: TypeAngle;
    _rightAngle3: TypeAngle;
    _rightAngle4: TypeAngle;
    _lineA: DiagramObjectLine;
    _lineB: DiagramObjectLine;
    _lineC: DiagramObjectLine;
    _lineD: DiagramObjectLine;
  } & DiagramElementCollection;

  addSquare() {
    const square = this.diagram.shapes.collection(new Transform('square')
      .scale(1, 1)
      .translate(this.layout.square.scenarios.start.position));
    this.add('square', square);
  }

  addSquareLines() {
    const makeL = (p1, p2, labelText) => {
      const line = this.diagram.objects.line({
        p1,
        p2,
        width: this.layout.lineWidth,
        color: this.layout.colors.lines,
        label: {
          text: 'A',
          offset: 0.05,
          location: 'inside',
          subLocation: 'top',
          orientation: 'horizontal',
        },
      });
      //   p1, p2, this.layout.lineWidth, this.layout.colors.lines,
      //   'A', 0.05, 'inside', 'top', 'horizontal',
      // );
      const name = Array.isArray(labelText) ? labelText[0] : labelText;
      this._square.add(`line${name}`, line);
    };
    const { points } = this.layout.square;
    const halfLine = this.layout.lineWidth / 2;
    makeL(points[2].sub(0, halfLine), points[3].add(0, halfLine), 'C');
    makeL(points[3].add(halfLine, 0), points[0].sub(halfLine, 0), 'D');
    makeL(points[0].add(0, halfLine), points[1].sub(0, halfLine), 'A');
    makeL(points[1].sub(halfLine, 0), points[2].add(halfLine, 0), 'B');
  }

  addRightAngles() {
    const makeA = () => {
      const angle = makeAngle(
        this.diagram, this.layout.angleRadius,
        this.layout.lineWidth, this.layout.angleSides, this.layout.colors.angles,
      );
      angle.addLabel('', this.layout.angleLabelRadius);
      angle.autoRightAngle = true;
      return angle;
    };
    const rightAngle1 = makeA();
    rightAngle1.setPosition(this.layout.square.points[0]);
    rightAngle1.updateAngle(Math.PI / 2 * 3, Math.PI / 2);

    const rightAngle2 = makeA();
    rightAngle2.setPosition(this.layout.square.points[1]);
    rightAngle2.updateAngle(0, Math.PI / 2);

    const rightAngle3 = makeA();
    rightAngle3.setPosition(this.layout.square.points[2]);
    rightAngle3.updateAngle(Math.PI / 2 * 1, Math.PI / 2);

    const rightAngle4 = makeA();
    rightAngle4.setPosition(this.layout.square.points[3]);
    rightAngle4.updateAngle(Math.PI / 2 * 2, Math.PI / 2);

    this._square.add('rightAngle1', rightAngle1);
    this._square.add('rightAngle2', rightAngle2);
    this._square.add('rightAngle3', rightAngle3);
    this._square.add('rightAngle4', rightAngle4);
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addSquare();
    this.addRightAngles();
    this.addSquareLines();
    this.hasTouchableElements = true;
  }

  resetColors() {
    this._square._lineA.setColor(this.layout.colors.lines);
    this._square._lineB.setColor(this.layout.colors.lines);
    this._square._lineC.setColor(this.layout.colors.lines);
    this._square._lineD.setColor(this.layout.colors.lines);
    this._square._rightAngle1.setColor(this.layout.colors.angles);
    this._square._rightAngle2.setColor(this.layout.colors.angles);
    this._square._rightAngle3.setColor(this.layout.colors.angles);
    this._square._rightAngle4.setColor(this.layout.colors.angles);
  }
}
