// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import type { TypeScenario } from '../../../../LessonsCommon/DiagramCollection';
import { makeAngle, showAngles } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, Point, DiagramElementPrimative, DiagramElementCollection,
  DiagramObjectLine, EquationLegacy,
} = Fig;
const { rand } = Fig.tools.math;

type TypeAdjacentAngle = 'adjacent' | 'supplementary' | 'complementary' | 'explementary';
type TypeEquationForm = 'add' | 'a' | 'b';

export default class AdjacentCollection extends CommonDiagramCollection {
  _lines: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _angleA: TypeAngle;
    _angleB: TypeAngle;
    _angleC: TypeAngle;
  } & DiagramElementCollection;

  _eqn: {
    _a: {
      onClick: (?string) => void;
    } & DiagramElementPrimative;
    _b: {
      onClick: (?string) => void;
    } & DiagramElementPrimative;
    _c: {
      onClick: (?string) => void;
    } & DiagramElementPrimative;
  } & DiagramElementCollection;

  eqn: EquationLegacy;
  angleType: TypeAdjacentAngle;

  makeAdjacentLine(index: number, color: Array<number>) {
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'start',
      length: this.layout.line.length,
      width: this.layout.line.width,
      color,
    });
    line.setMovable();
    line.move.type = 'rotation';
    if (index > 1) {
      line.setTransformCallback = this.updateAngles.bind(this);
    }
    return line;
  }

  makeEqn(
    vAlign: string = 'baseline',
    hAlign: string = 'left',
    fixTo: string | Point = 'equals',
    scale: number = 1,
  ) {
    const eqn = this.diagram.equation.makeEqn();
    eqn.createElements(
      {
        a: 'a',
        b: 'b',
        c: 'c',
        equals: ' = ',
        minus: ' \u2212 ',
        plus: ' + ',
        _180: '180º',
        _90: '90º',
        _360: '360º',
        pi: 'π',
        _2: '2',
        v: this.diagram.equation.vinculum(this.layout.colors.diagram.text.base),
      },
      this.layout.colors.diagram.text.base,
    );

    eqn.formAlignment.hAlign = hAlign;
    eqn.formAlignment.vAlign = vAlign;
    eqn.formAlignment.scale = scale;
    if (fixTo instanceof Point) {
      eqn.formAlignment.fixTo = fixTo;
    } else {
      eqn.formAlignment.fixTo = eqn.collection[`_${fixTo}`];
    }

    eqn.addForm('a', ['a']);
    eqn.addForm('b', ['b']);
    eqn.addForm('c', ['c']);
    eqn.addForm('adj_add', ['a', 'plus', 'b', 'equals', 'c']);
    eqn.addForm('adj_a', ['a', 'equals', 'c', 'minus', 'b']);
    eqn.addForm('adj_b', ['b', 'equals', 'c', 'minus', 'a']);
    eqn.addForm('sup_a', ['a', 'equals', '_180', 'minus', 'b'], 'deg');
    eqn.addForm('sup_a', ['a', 'equals', 'pi', 'minus', 'b'], 'rad');
    eqn.addForm('sup_b', ['b', 'equals', '_180', 'minus', 'a'], 'deg');
    eqn.addForm('sup_b', ['b', 'equals', 'pi', 'minus', 'a'], 'rad');
    eqn.addForm('sup_add', ['a', 'plus', 'b', 'equals', '_180'], 'deg');
    eqn.addForm('sup_add', ['a', 'plus', 'b', 'equals', 'pi'], 'rad');

    eqn.addForm('com_a', ['a', 'equals', '_90', 'minus', 'b'], 'deg');
    eqn.addForm('com_a', ['a', 'equals', eqn.frac('pi', '_2', 'v'), 'minus', 'b'], 'rad');
    eqn.addForm('com_b', ['b', 'equals', '_90', 'minus', 'a'], 'deg');
    eqn.addForm('com_b', ['b', 'equals', eqn.frac('pi', '_2', 'v'), 'minus', 'a'], 'rad');
    eqn.addForm('com_add', ['a', 'plus', 'b', 'equals', '_90'], 'deg');
    eqn.addForm('com_add', ['a', 'plus', 'b', 'equals', eqn.frac('pi', '_2', 'v')], 'rad');

    eqn.addForm('exp_a', ['a', 'equals', '_360', 'minus', 'b'], 'deg');
    eqn.addForm('exp_a', ['a', 'equals', '_2', 'pi', 'minus', 'b'], 'rad');
    eqn.addForm('exp_b', ['b', 'equals', '_360', 'minus', 'a'], 'deg');
    eqn.addForm('exp_b', ['b', 'equals', '_2', 'pi', 'minus', 'a'], 'rad');
    eqn.addForm('exp_add', ['a', 'plus', 'b', 'equals', '_360'], 'deg');
    eqn.addForm('exp_add', ['a', 'plus', 'b', 'equals', '_2', 'pi'], 'rad');
    return eqn;
  }

  makeAdjacentAngle(
    radius: number,
    width: number,
    sides: number,
    color: Array<number>,
  ) {
    const angle = makeAngle(this.diagram, radius, width, sides, color);
    const eqn = this.makeEqn('middle', 'center', new Point(0, 0), 0.7);
    angle.addLabel(eqn, this.layout.angle.labelRadiusOffset + radius);
    angle.label.autoHideMag = 0.2;
    return angle;
  }

  makeLines() {
    const lines = this.diagram.shapes.collection(new Transform('lines').rotate(0).translate(0, 0));
    lines.setPosition(this.layout.lines.position);
    let { angle } = this.layout;
    // console.log("1 - ****************************")
    lines.add('angleA', this.makeAdjacentAngle(angle.radius, angle.width, angle.sides, this.layout.colors.angleA));
    // console.log("2 - ****************************")
    lines.add('angleB', this.makeAdjacentAngle(angle.radius, angle.width, angle.sides, this.layout.colors.angleB));
    lines.add('line2', this.makeAdjacentLine(2, this.layout.colors.line));

    angle = this.layout.largerAngle;
    // console.log("3 - ****************************")
    lines.add('angleC', this.makeAdjacentAngle(angle.radius, angle.width, angle.sides, this.layout.colors.angleC));
    lines.add('line1', this.makeAdjacentLine(1, this.layout.colors.line));
    lines._line1.move.element = lines;
    lines.add('line3', this.makeAdjacentLine(3, this.layout.colors.line));
    lines.setTransformCallback = this.updateAngles.bind(this);
    lines._angleA.showForm('a');
    lines._angleB.showForm('b');
    lines._angleC.showForm('c');
    lines.hasTouchableElements = true;
    return lines;
  }

  makeMainEqn() {
    const eqn = this.makeEqn('baseline', 'left', 'equals', this.layout.equationScale);
    eqn.setPosition(this.layout.equationPosition);
    eqn.setElem('a', this.colors.angleA, true, 'up', 0.85);
    eqn.setElem('b', this.colors.angleB, true, 'up', 1.05);
    eqn.setElem('c', this.colors.angleC, true, 'up', 1.05);
    eqn.setElem('pi', null, true, 'down', 1.2);
    eqn.setElem('v', null, true, 'down', 1.2);
    eqn.setElem('_2', null, true, 'down', 1.2);
    eqn.setElem('_90', null, true, 'down', 1);
    eqn.setElem('_180', null, true, 'down', 1);
    eqn.setElem('_360', null, true, 'down', 1);
    eqn.showEqn = (angleType: TypeAdjacentAngle, eqnForm: TypeEquationForm) => {
      eqn.showForm(`${angleType.slice(0, 2)}_${eqnForm}`);
    };

    const onclickEqn = (form: TypeEquationForm = 'add') => {
      eqn.goToForm(`${this.angleType.slice(0, 3)}_${form}`, 1.5);
      if (form === 'a') {
        this._lines._angleA.pulseScaleNow(1, 1.5);
        this._lines._angleB.showForm('b');
        this._lines._angleA.showForm(`${this.angleType.slice(0, 3)}_${form}`);
      }
      if (form === 'b') {
        this._lines._angleB.pulseScaleNow(1, 1.5);
        this._lines._angleA.showForm('a');
        this._lines._angleB.showForm(`${this.angleType.slice(0, 3)}_${form}`);
      }
      if (form === 'add') {
        this._lines._angleC.pulseScaleNow(1, 1.3);
        this._lines._angleA.showForm('a');
        this._lines._angleB.showForm('b');
        this._lines._angleC.showForm('c');
      }
      this.updateAngles();
      this.diagram.animateNextFrame();
    };

    eqn.collection._a.onClick = onclickEqn.bind(this, 'a');
    eqn.collection._b.onClick = onclickEqn.bind(this, 'b');
    eqn.collection._c.onClick = onclickEqn.bind(this, 'add');
    eqn.collection._pi.onClick = onclickEqn.bind(this, 'add');
    eqn.collection.__90.onClick = onclickEqn.bind(this, 'add');
    eqn.collection.__180.onClick = onclickEqn.bind(this, 'add');
    eqn.collection.__360.onClick = onclickEqn.bind(this, 'add');
    eqn.collection.__2.onClick = onclickEqn.bind(this, 'add');
    eqn.collection._v.onClick = onclickEqn.bind(this, 'add');
    return eqn;
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('adjacent angles collection').scale(1, 1).rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('lines', this.makeLines());
    // console.log("4 - ****************************")
    this.eqn = this.makeMainEqn();

    this.add('eqn', this.eqn.collection);
    this.hasTouchableElements = true;
    // console.log('add', this._eqn.lastDrawTransform._dup());
  }

  updateAngles() {
    let r1 = this._lines.transform.r();
    let r2 = this._lines._line2.transform.r();
    let r3 = this._lines._line3.transform.r();
    if (r2 != null && r3 != null && r1 != null) {
      if (r3 > Math.PI * 2) {
        r3 = Math.PI * 2;
      }
      if (r2 > r3) {
        r2 = r3;
      }
      if (r2 < 0) {
        r2 = 0;
      }
      if (r3 < 0) {
        r3 = 0;
      }
      if (r1 > Math.PI * 2) {
        r1 -= Math.PI * 2;
      }
      if (r1 < 0) {
        r1 += Math.PI * 2;
      }
      this._lines.transform.updateRotation(r1);
      this._lines._line2.transform.updateRotation(r2);
      this._lines._line3.transform.updateRotation(r3);
      this._lines._angleA.updateAngle(0, r2, r1);
      this._lines._angleB.updateAngle(r2, r3 - r2, r1);
      this._lines._angleC.updateAngle(0, r3, r1);
    }
  }

  showAngles(
    angles: Array<[TypeAngle, string, Array<number>]
            | [TypeAngle, string, Array<number>, boolean]>,
    showOnly: boolean = true,
  ) {
    const allAngles = [this._lines._angleA, this._lines._angleB, this._lines._angleC];
    showAngles(allAngles, angles, showOnly);
    this.updateAngles();
    this.diagram.animateNextFrame();
  }

  setUnits(units: 'deg' | 'rad') {
    this.eqn.setUnits(units);
    if (this._lines._angleA.label) {
      this._lines._angleA.label.eqn.setUnits(units);
    }
    if (this._lines._angleB.label) {
      this._lines._angleB.label.eqn.setUnits(units);
    }
  }

  goToRandomAngle(r3: number) {
    // const r1 = rand(0, Math.PI * 2);
    const r2 = rand(Math.PI / 6, r3 * 0.7);
    this.futurePositions = [];
    // this.addFuturePosition(this._lines, { rotation: r1 });
    this.addFuturePosition(this._lines._line2, { rotation: r2 });
    this.addFuturePosition(this._lines._line3, { rotation: r3 });
    this.moveToFuturePositions(1, null, 2);
    this.diagram.animateNextFrame();
  }

  goToRandomAdjacentAngle() {
    this.goToRandomAngle(rand(Math.PI / 3, 5 * Math.PI / 3));
  }

  goToRandomSupplementaryAngle() {
    this.goToRandomAngle(Math.PI);
  }

  goToRandomComplementaryAngle() {
    this.goToRandomAngle(Math.PI / 2);
  }

  goToRandomExplementaryAngle() {
    this.goToRandomAngle(Math.PI * 2 * 0.999);
  }

  pulseAngleC() {
    this._lines._angleC.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  adjacentNextEquationform() {
    if (this.eqn.currentForm) {
      if (this.eqn.currentForm === 'adj_a') {
        this._eqn._b.onClick();
      } else if (this.eqn.currentForm === 'adj_b') {
        this._eqn._c.onClick();
      } else if (this.eqn.currentForm === 'adj_add') {
        this._eqn._a.onClick();
      }
    }
  }

  calculateFuturePositions(scenario: TypeScenario = 'adjacent') {
    this.futurePositions = [];
    this.addFuturePosition(this._lines, this.layout.lines);
    this.addFuturePosition(this._lines._line3, scenario);
    this.addFuturePosition(this._lines._line2, scenario);
    this.addFuturePosition(this._lines._line1, scenario);
  }
}
