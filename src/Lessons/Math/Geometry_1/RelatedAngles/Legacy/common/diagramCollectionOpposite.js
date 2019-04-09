// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import { makeLabeledAngle, makeSupplementaryAngle } from './tools';
import type { TypeLabeledAngle, TypeSupplementaryAngle } from './tools';
import type { TypeAngle } from '../../../../../LessonsCommon/tools/angle';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import { showAngles } from '../../../../../LessonsCommon/tools/angle';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, DiagramElementCollection, DiagramObjectLine,
  EquationLegacy,
} = Fig;
const { minAngleDiff } = Fig.tools.g2;

export default class OppositeCollection extends CommonDiagramCollection {
  layout: Object;
  colors: Object;
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _angleA: TypeLabeledAngle;
  _angleB: TypeLabeledAngle;
  _angleC: TypeLabeledAngle;
  _angleD: TypeLabeledAngle;
  _supplementary: TypeSupplementaryAngle;
  varState: {
    supplementary: number;
  };

  _equation1: {
    eqn: EquationLegacy;
  } & DiagramElementCollection;

  _equation2: {
    eqn: EquationLegacy;
  } & DiagramElementCollection;

  _equation3: {
    eqn: EquationLegacy;
  } & DiagramElementCollection;

  makeLine() {
    const lay = this.layout.parallelLine;
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: lay.length.full,
      width: lay.width,
      color: this.layout.colors.line,
    });
    line.setMovable(true, 'rotation');
    line.setTransformCallback = (t: Transform) => {
      line.updateMoveTransform(t);
      this.updateOppositeAngles();
    };
    line.interactiveLocation = lay.interactive;
    return line;
  }

  makeSuppAngle() {
    const angle = makeSupplementaryAngle(this.diagram, this.layout);
    angle.setPosition(this.layout.line1.opposite.position);
    return angle;
  }

  addEquation(name: string) {
    const eqn = this.diagram.equation.makeEqn();
    eqn.createElements(
      {
        a: 'a',
        a1: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        equals: ' = ',
        minus: ' \u2212 ',
        minus1: ' \u2212 ',
        _180: '180º',
        _1801: '180º',
        pi: 'π',
        pi1: 'π',
        plus: ' + ',
        lb: '(',
        rb: ')',
      },
      this.layout.colors.diagram.text.base,
    );

    eqn.formAlignment.fixTo = eqn.collection._equals;
    eqn.formAlignment.hAlign = 'center';
    eqn.formAlignment.vAlign = 'middle';
    eqn.formAlignment.scale = 1.0;

    eqn.setElem('a', this.layout.colors.angleA);
    eqn.setElem('a1', this.layout.colors.angleA);
    eqn.setElem('b', this.layout.colors.angleB);
    eqn.setElem('c', this.layout.colors.angleC);
    eqn.setElem('d', this.layout.colors.angleD);

    const deg = { formType: 'deg' };
    const rad = { formType: 'rad' };
    eqn.addForm('a_plus_b', ['a', 'plus', 'b', 'equals', '_180'], deg);
    eqn.addForm('a_plus_b', ['a', 'plus', 'b', 'equals', 'pi'], rad);

    eqn.addForm('b', ['b', 'equals', '_180', 'minus', 'a1'], deg);
    eqn.addForm('b', ['b', 'equals', 'pi', 'minus', 'a1'], rad);

    eqn.addForm('c', ['c', 'equals', '_180', 'minus', 'b'], deg);
    eqn.addForm('c', ['c', 'equals', 'pi', 'minus', 'b'], rad);
    eqn.addForm('c_equals_a_full', ['c', 'equals', '_180', 'minus', 'lb', '_1801', 'minus1', 'a', 'rb'], deg);
    eqn.addForm('c_equals_a_full', ['c', 'equals', 'pi', 'minus', 'lb', 'pi1', 'minus1', 'a', 'rb'], rad);
    eqn.addForm('c_equals_a', ['c', 'equals', 'a']);

    eqn.addForm('d', ['d', 'equals', '_180', 'minus', 'a'], deg);
    eqn.addForm('d', ['d', 'equals', 'pi', 'minus', 'a'], rad);

    eqn.addForm('d_equals_b', ['d', 'equals', 'b']);

    eqn.showForm('deg_a_plus_b');
    this.add(name, eqn.collection);
    this.elements[name].eqn = eqn;

    return eqn;
  }

  setUnits(units: 'deg' | 'rad') {
    this._equation1.eqn.setUnits(units);
    this._equation2.eqn.setUnits(units);
    this._equation3.eqn.setUnits(units);
    // console.log(this._equation1.eqn)
    if (this._angleA.label) {
      this._angleA.label.eqn.setUnits(units);
      this._angleA.updateLabel();
    }
    if (this._angleB.label) {
      this._angleB.label.eqn.setUnits(units);
      this._angleB.updateLabel();
    }
    if (this._angleC.label) {
      this._angleC.label.eqn.setUnits(units);
      this._angleC.updateLabel();
    }
    if (this._angleD.label) {
      this._angleD.label.eqn.setUnits(units);
      this._angleD.updateLabel();
    }
  }

  makeAngle(name: 'a' | 'b' | 'c' | 'd') {
    const color = this.layout.colors[`angle${name.toUpperCase()}`];
    const arcLayout = this.layout.angle.arc;
    const radius = name === 'a' || name === 'c'
      ? arcLayout.radius : arcLayout.radius * 1.0;
    const angle = makeLabeledAngle(this.diagram, this.layout, radius, color);

    const deg = { formType: 'deg' };
    const rad = { formType: 'rad' };
    angle.label.eqn.addForm('b_equals', ['b', 'equals', '_180', 'minus', 'a'], deg);
    angle.label.eqn.addForm('b_equals', ['b', 'equals', 'pi', 'minus', 'a'], rad);
    angle.label.eqn.addForm('b_silent', ['_180', 'minus', 'a'], deg);
    angle.label.eqn.addForm('b_silent', ['pi', 'minus', 'a'], rad);
    angle.label.eqn.addForm('d_silent', ['_180', 'minus', 'a'], deg);
    angle.label.eqn.addForm('d_silent', ['pi', 'minus', 'a'], rad);
    angle.label.eqn.addForm('d_equals', ['d', 'equals', '_180', 'minus', 'a'], deg);
    angle.label.eqn.addForm('d_equals', ['d', 'equals', 'pi', 'minus', 'a'], rad);
    angle.label.eqn.addForm('c_equals', ['c', 'equals', 'a']);
    angle.label.eqn.showForm(name);
    angle.setPosition(this.layout.line1.opposite.position);
    return angle;
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    // this.diagram = diagram;
    // this.layout = layout;
    this.setPosition(this.layout.position);
    this.add('line1', this.makeLine());
    this._line1.setPosition(this.layout.line1.opposite.position.x, 0);
    this.add('line2', this.makeLine());
    this._line2.setPosition(this.layout.line2.opposite.position.x, 0);
    this.add('angleA', this.makeAngle('a'));
    this.add('angleB', this.makeAngle('b'));
    this.add('angleC', this.makeAngle('c'));
    this.add('angleD', this.makeAngle('d'));
    this.addEquation('equation1');
    this.addEquation('equation2');
    this.addEquation('equation3');

    this.add('supplementary', this.makeSuppAngle());

    this.varState = {
      supplementary: 3,
    };
    this.hasTouchableElements = true;
  }

  updateOppositeAngles() {
    if (this._line1 && this._line2 && this._angleA) {
      const r1 = this._line1.transform.r();
      const r2 = this._line2.transform.r();
      if (r1 != null && r2 != null) {
        if (this._angleA.isShown
          || this._angleB.isShown
          || this._angleC.isShown
          || this._angleD.isShown) {
          const minAngle = minAngleDiff(r2, r1);
          if (minAngle > 0) {
            this._angleA.updateAngle(r1, minAngle);
            this._angleB.updateAngle(r1 + Math.PI - (Math.PI - minAngle), Math.PI - minAngle);
            this._angleC.updateAngle(r1 + Math.PI, minAngle);
            this._angleD.updateAngle(r1 + 2 * Math.PI - (Math.PI - minAngle), Math.PI - minAngle);
          } else {
            this._angleA.updateAngle(r1, Math.PI - Math.abs(minAngle));
            this._angleB.updateAngle(r1 + Math.PI - Math.abs(minAngle), Math.abs(minAngle));
            this._angleC.updateAngle(r1 + Math.PI, Math.PI - Math.abs(minAngle));
            this._angleD.updateAngle(r1 + 2 * Math.PI - Math.abs(minAngle), Math.abs(minAngle));
          }
        }
        this._line1.updateLabel(r1);
        this._line2.updateLabel(r2);
      }
    }
  }

  pulseLine(index: number = 1) {
    this.elements[`line${index}`].pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseSupplementaryAngle(index: number | null = null) {
    if (index != null) {
      this.varState.supplementary = index;
    } else if (this.varState.supplementary === 3) {
      this.varState.supplementary = 0;
    } else {
      this.varState.supplementary += 1;
    }

    const r1 = this._line1.transform.r();
    const r2 = this._line2.transform.r();
    if (r1 != null && r2 != null) {
      if (this.varState.supplementary === 0) {
        this._supplementary.transform.updateRotation(r1);
      }
      if (this.varState.supplementary === 1) {
        this._supplementary.transform.updateRotation(r2);
      }
      if (this.varState.supplementary === 2) {
        this._supplementary.transform.updateRotation(r1 + Math.PI);
      }
      if (this.varState.supplementary === 3) {
        this._supplementary.transform.updateRotation(r2 + Math.PI);
      }
    }
    this._supplementary.scaleAndDisolve();
    this.diagram.animateNextFrame();
  }

  nextEquation2Form() {
    this._equation2.eqn.nextForm();
    this.diagram.animateNextFrame();
  }

  showAngles(
    angles: Array<[TypeAngle, string, Array<number>]
          | [TypeAngle, string, Array<number>, boolean]>,
    showOnly: boolean = true,
  ) {
    const allAngles = [this._angleA, this._angleB, this._angleC, this._angleD];
    showAngles(allAngles, angles, showOnly);
    this.updateOppositeAngles();
    this.diagram.animateNextFrame();
  }

  toggleOppositeAngles() {
    if (this._angleA.isShown) {
      this.showAngles([[this._angleB, 'b', this.layout.colors.angleA], [this._angleD, 'b', this.layout.colors.angleA]]);
    } else {
      this.showAngles([[this._angleA, 'a', this.layout.colors.angleA], [this._angleC, 'a', this.layout.colors.angleA]]);
    }
    this.diagram.animateNextFrame();
  }

  toggleAngles() {
    if (this._angleA.isShown) {
      this.showAngles([[this._angleB, 'b', this.layout.colors.angleA]]);
    } else if (this._angleB.isShown) {
      this.showAngles([[this._angleC, 'c', this.layout.colors.angleA]]);
    } else if (this._angleC.isShown) {
      this.showAngles([[this._angleD, 'd', this.layout.colors.angleA]]);
    } else {
      this.showAngles([[this._angleA, 'a', this.layout.colors.angleA]]);
    }
    this.diagram.animateNextFrame();
  }

  calculateFuturePositions() {
    const futurePosition = (element, scenario) => ({ element, scenario });
    const r1 = this._line1.transform.r();
    const r2 = this._line2.transform.r();
    if (r1 != null && r2 != null) {
      this.futurePositions = [
        futurePosition(this._line1, this.layout.line1.opposite),
        futurePosition(this._line2, this.layout.line2.opposite),
      ];
    }
  }
}
