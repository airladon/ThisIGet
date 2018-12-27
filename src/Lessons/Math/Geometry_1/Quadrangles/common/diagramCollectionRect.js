// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';
import {
  makeABEquation, makeADEquation, makeBCEquation,
} from './equationAngles';
import type {
  TypeABEquationCollection, TypeABEquation,
  TypeADEquationCollection, TypeADEquation,
  TypeBCEquationCollection, TypeBCEquation,
} from './equationAngles';

const {
  Transform, Point, DiagramElementCollection, DiagramObjectLine,
} = Fig;

export default class RectCollection extends CommonDiagramCollection {
  abEqn: TypeABEquation;
  adEqn: TypeADEquation;
  bcEqn: TypeBCEquation;
  _abEqn: TypeABEquationCollection;
  // _abEqnDescription: DiagramElementPrimative;
  _adEqn: TypeADEquationCollection;
  // _adEqnDescription: DiagramElementPrimative;
  _bcEqn: TypeBCEquationCollection;
  // _bcEqnDescription: DiagramElementPrimative;
  _rect: {
    _rightAngle1: TypeAngle;
    _rightAngle2: TypeAngle;
    _rightAngle3: TypeAngle;
    _rightAngle4: TypeAngle;
    _lineA: DiagramObjectLine;
    _lineB: DiagramObjectLine;
    _lineC: DiagramObjectLine;
    _lineD: DiagramObjectLine;
    _lineE: DiagramObjectLine;
    _angleA: TypeAngle;
    _angleB: TypeAngle;
    _angleC: TypeAngle;
    _angleD: TypeAngle;
  } & DiagramElementCollection;

  oppositeSidesFlag: boolean;

  addRectangle() {
    const rect = this.diagram.shapes.collection(new Transform('rectangle').scale(1, 1).translate(this.layout.rect.scenarios.start.position));
    this.add('rect', rect);
  }

  addRect() {
    const makeL = (p1, p2, labelText) => {
      const line = this.diagram.objects.line({
        p1,
        p2,
        width: this.layout.lineWidth,
        color: this.layout.colors.lines,
        label: {
          text: labelText,
          offset: 0.05,
          location: 'inside',
          subLocation: 'top',
          orientation: 'horizontal',
        },
      });
      const name = Array.isArray(labelText) ? labelText[0] : labelText;
      this._rect.add(`line${name}`, line);
    };
    const { points } = this.layout.rect;
    const halfLine = this.layout.lineWidth / 2;
    makeL(points[2].sub(0, halfLine), points[3].add(0, halfLine), ['C', 'A']);
    makeL(points[3].add(halfLine, 0), points[0].sub(halfLine, 0), ['D', 'B']);
    makeL(points[0].add(0, halfLine), points[1].sub(0, halfLine), 'A');
    makeL(points[1].sub(halfLine, 0), points[2].add(halfLine, 0), 'B');
    makeL(points[0], points[2], 'E');
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
    rightAngle1.setPosition(this.layout.rect.points[0]);
    rightAngle1.updateAngle(Math.PI / 2 * 3, Math.PI / 2);

    const rightAngle2 = makeA();
    rightAngle2.setPosition(this.layout.rect.points[1]);
    rightAngle2.updateAngle(0, Math.PI / 2);

    const rightAngle3 = makeA();
    rightAngle3.setPosition(this.layout.rect.points[2]);
    rightAngle3.updateAngle(Math.PI / 2 * 1, Math.PI / 2);

    const rightAngle4 = makeA();
    rightAngle4.setPosition(this.layout.rect.points[3]);
    rightAngle4.updateAngle(Math.PI / 2 * 2, Math.PI / 2);

    this._rect.add('rightAngle1', rightAngle1);
    this._rect.add('rightAngle2', rightAngle2);
    this._rect.add('rightAngle3', rightAngle3);
    this._rect.add('rightAngle4', rightAngle4);
  }

  addAngles() {
    // eslint-disable-next-line max-len
    const makeA = (position: Point, start: number, size: number, label: string | Array<string>, radius: number) => {
      const angle = makeAngle(
        this.diagram, radius,
        this.layout.lineWidth, this.layout.angleSides, this.layout.colors.angles,
      );
      angle.addLabel(label, this.layout.angleLabelRadiusOffset + radius);
      angle.setPosition(position);
      angle.updateAngle(start, size);
      return angle;
    };
    const { points } = this.layout.rect;
    const width = points[2].x - points[0].x;
    const height = points[0].y - points[1].y;
    const angleA = makeA(
      points[0], Math.PI / 2 * 3,
      Math.atan(width / height),
      'a', this.layout.angleRadius,
    );
    const angleB = makeA(
      points[2], Math.PI - Math.atan(height / width),
      Math.atan(height / width),
      ['b', '90º - a'], this.layout.angleRadius * 1.1,
    );
    const angleD = makeA(
      points[0], Math.PI * 2 - Math.atan(height / width),
      Math.atan(height / width),
      ['d', '90º - a'], this.layout.angleRadius * 1.1,
    );
    const angleC = makeA(
      points[2], Math.PI / 2,
      Math.atan(width / height),
      ['c', 'a'], this.layout.angleRadius,
    );
    this._rect.add('angleA', angleA);
    this._rect.add('angleB', angleB);
    this._rect.add('angleC', angleC);
    this._rect.add('angleD', angleD);
  }

  pulseSideLabels() {
    const scale = 1.8;
    if (this._rect._lineA._label) {
      this._rect._lineA._label.pulseScaleNow(1, scale);
    }
    if (this._rect._lineB._label) {
      this._rect._lineB._label.pulseScaleNow(1, scale);
    }
    if (this._rect._lineC._label) {
      this._rect._lineC._label.pulseScaleNow(1, scale);
    }
    if (this._rect._lineD._label) {
      this._rect._lineD._label.pulseScaleNow(1, scale);
    }
    this.diagram.animateNextFrame();
  }

  pulseRightAngles() {
    const scale = 1.5;
    this._rect._rightAngle1.pulseScaleNow(1, scale);
    this._rect._rightAngle2.pulseScaleNow(1, scale);
    this._rect._rightAngle3.pulseScaleNow(1, scale);
    this._rect._rightAngle4.pulseScaleNow(1, scale);
    this.diagram.animateNextFrame();
  }

  pulseAngleB() {
    this._rect._angleB.pulseScaleNow(1, 1.5);
  }

  pulseAngleD() {
    this._rect._angleD.pulseScaleNow(1, 1.5);
  }

  pulseAngleC() {
    this._rect._angleC.pulseScaleNow(1, 1.5);
  }

  pulseAngleA() {
    this._rect._angleA.pulseScaleNow(1, 1.5);
  }

  pulseDiagonalLine() {
    this._rect._lineE.pulseWidth();
  }

  pulseLine(names: Array<string> | string) {
    if (Array.isArray(names)) {
      names.forEach((name) => {
        const line = this._rect[`_line${name}`];
        line.pulseWidth();
      });
    } else {
      const line = this._rect[`_line${names}`];
      line.pulseWidth();
    }
  }

  showASA1Colors() {
    const disabled = this.layout.colors.diagram.disabledDark;
    const line = this.layout.colors.lines;
    const angle = this.layout.colors.angles;
    this._rect._rightAngle2.setColor(disabled);
    this._rect._rightAngle4.setColor(disabled);
    this._rect._lineA.setColor(disabled);
    this._rect._lineB.setColor(disabled);
    this._rect._lineC.setColor(disabled);
    this._rect._lineD.setColor(disabled);
    this._rect._lineE.setColor(line);
    this._rect._angleA.setColor(angle);
    this._rect._angleB.setColor(angle);
    this._rect._angleC.setColor(disabled);
    this._rect._angleD.setColor(disabled);
    this.pulseAngleA();
    this.pulseAngleB();
    this.diagram.animateNextFrame();
  }

  showASA2Colors() {
    const disabled = this.layout.colors.diagram.disabledDark;
    const line = this.layout.colors.lines;
    const angle = this.layout.colors.angles;
    this._rect._rightAngle2.setColor(disabled);
    this._rect._rightAngle4.setColor(disabled);
    this._rect._lineA.setColor(disabled);
    this._rect._lineB.setColor(disabled);
    this._rect._lineC.setColor(disabled);
    this._rect._lineD.setColor(disabled);
    this._rect._lineE.setColor(line);
    this._rect._angleA.setColor(disabled);
    this._rect._angleB.setColor(disabled);
    this._rect._angleC.setColor(angle);
    this._rect._angleD.setColor(angle);
    this.pulseAngleC();
    this.pulseAngleD();
    this.diagram.animateNextFrame();
  }

  toggleASAColors() {
    const disabled = this.layout.colors.diagram.disabledDark;
    if (this._rect._angleA._arc.color[0] === disabled[0]
      && this._rect._angleA._arc.color[1] === disabled[1]
      && this._rect._angleA._arc.color[2] === disabled[2]
      && this._rect._angleA._arc.color[3] === disabled[3]
    ) {
      this.showASA1Colors();
    } else {
      this.showASA2Colors();
    }
  }

  toggleOppositeSides() {
    if (this.oppositeSidesFlag) {
      if (this._rect._lineA._label) {
        this._rect._lineA._label.pulseScaleNow(1, 2);
      }
      if (this._rect._lineC._label) {
        this._rect._lineC._label.pulseScaleNow(1, 2);
      }
      this._rect._lineA.pulseWidth();
      this._rect._lineC.pulseWidth();
      this.oppositeSidesFlag = false;
    } else {
      if (this._rect._lineB._label) {
        this._rect._lineB._label.pulseScaleNow(1, 2);
      }
      if (this._rect._lineD._label) {
        this._rect._lineD._label.pulseScaleNow(1, 2);
      }
      this._rect._lineB.pulseWidth();
      this._rect._lineD.pulseWidth();
      this.oppositeSidesFlag = true;
    }
    this.diagram.animateNextFrame();
  }

  addEqn() {
    this.abEqn = makeABEquation(this.diagram, this.layout);
    this.adEqn = makeADEquation(this.diagram, this.layout);
    this.bcEqn = makeBCEquation(this.diagram, this.layout);
    const makeNav = eqn => this.diagram.objects.equationNavigator(
      eqn, new Point(0, -0.4), 'twoLine',
      'arrows', 'center',
    );
    const navAB = makeNav(this.abEqn);
    const navAD = makeNav(this.adEqn);
    const navBC = makeNav(this.bcEqn);
    navAB.setPosition(this.layout.rectEqnPosition);
    navAD.setPosition(this.layout.adEqnPosition);
    navBC.setPosition(this.layout.bcEqnPosition);
    this.add('navAB', navAB);
    this.add('navAD', navAD);
    this.add('navBC', navBC);
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addRectangle();
    this.addRightAngles();
    this.addAngles();
    this.addRect();
    this.addEqn();
    this.hasTouchableElements = true;
    this.oppositeSidesFlag = false;
  }

  resetColors() {
    this._rect._lineA.setColor(this.layout.colors.lines);
    this._rect._lineB.setColor(this.layout.colors.lines);
    this._rect._lineC.setColor(this.layout.colors.lines);
    this._rect._lineD.setColor(this.layout.colors.lines);
    this._rect._angleA.setColor(this.layout.colors.angles);
    this._rect._angleB.setColor(this.layout.colors.angles);
    this._rect._angleC.setColor(this.layout.colors.angles);
    this._rect._angleD.setColor(this.layout.colors.angles);
    this._rect._rightAngle1.setColor(this.layout.colors.angles);
    this._rect._rightAngle2.setColor(this.layout.colors.angles);
    this._rect._rightAngle3.setColor(this.layout.colors.angles);
    this._rect._rightAngle4.setColor(this.layout.colors.angles);
  }
}
