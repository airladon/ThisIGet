// @flow
import Fig from 'figureone';
// eslint-disable-next-line import/no-cycle
import { makeLabeledAngle } from './tools';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';
import type {
  TypeIndexAngle, TypeSupplementaryAngle,
} from './tools';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import { showAngles } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, Point, Diagram, DiagramObjectLine, EquationLegacy,
  DiagramElementCollection,
} = Fig;

export default class ThreeLinesCollection extends CommonDiagramCollection {
  layout: Object;
  colors: Object;
  diagram: Diagram;
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _line3: DiagramObjectLine;
  _angleA1: TypeIndexAngle;
  _angleB1: TypeIndexAngle;
  _angleC1: TypeIndexAngle;
  _angleD1: TypeIndexAngle;
  _angleA2: TypeIndexAngle;
  _angleB2: TypeIndexAngle;
  _angleC2: TypeIndexAngle;
  _angleD2: TypeIndexAngle;
  _supplementary: TypeSupplementaryAngle;

  _equation1: {
    eqn: EquationLegacy;
  } & DiagramElementCollection;

  _equation2: {
    eqn: EquationLegacy;
  } & DiagramElementCollection;

  makeParallelLine() {
    const lay = this.layout.parallelLine;
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: lay.length.full,
      width: lay.width,
      color: this.layout.colors.line,
    });
    line.interactiveLocation = lay.interactive;
    // const line = makeLabeledLine(
    //   this.diagram,
    //   this.layout.parallelLine,
    //   this.layout.colors.line,
    //   labelText,
    // );
    // line.isMovable = false;
    return line;
  }

  makeIntersectingLine() {
    const lay = this.layout.intersectingLine;
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: lay.length.full,
      width: lay.width,
      color: this.layout.colors.line,
    });
    line.interactiveLocation = lay.interactive;
    // const line = makeLabeledLine(
    //   this.diagram,
    //   this.layout.intersectingLine,
    //   this.layout.colors.line,
    //   labelText,
    // );
    return line;
  }

  makeAngle(
    name: 'a' | 'b' | 'c' | 'd',
    lineIndex: number,
    angleIndex: number,
  ) {
    const color = this.layout.colors[`angle${name.toUpperCase()}`];
    const arcLayout = this.layout.angle.arc;
    const radius = name === 'a' || name === 'c'
      ? arcLayout.radius : arcLayout.radius * 1.0;
    const angle = makeLabeledAngle(this.diagram, this.layout, radius, color);

    const deg = { formType: 'deg' };
    const rad = { formType: 'rad' };
    angle.label.eqn.addForm('b_equals', ['_180', 'minus', 'a'], deg);
    angle.label.eqn.addForm('b_equals', ['pi', 'minus', 'a'], rad);
    angle.label.eqn.addForm('a_equals', ['_180', 'minus', 'b'], deg);
    angle.label.eqn.addForm('a_equals', ['pi', 'minus', 'b'], rad);
    angle.label.eqn.addForm('c_equals', ['_180', 'minus', 'c'], deg);
    angle.label.eqn.addForm('c_equals', ['pi', 'minus', 'c'], rad);
    angle.label.eqn.addForm('d_equals', ['_180', 'minus', 'd'], deg);
    angle.label.eqn.addForm('d_equals', ['pi', 'minus', 'd'], rad);
    angle.label.eqn.showForm(name);

    angle.lineIndex = lineIndex;
    angle.angleIndex = angleIndex;
    return angle;
  }

  addThreeLines() {
    const line1 = this.makeParallelLine();
    const line2 = this.makeParallelLine();
    const line3 = this.makeIntersectingLine();
    this.add('line2', line2);
    this.add('line1', line1);
    this.add('line3', line3);
    line1.setPosition(this.layout.line3.corresponding.position);
    line2.setPosition(this.layout.line3.corresponding.position);

    line3.setMovable(true, 'rotation');
    line3.setPosition(this.layout.line3.corresponding.position);
    line3.transform.updateRotation(Math.PI / 2);
    line3.move.maxTransform.updateRotation(Math.PI - Math.PI / 3.7);
    line3.move.minTransform.updateRotation(Math.PI / 3.7);
    line3.setColor(this.layout.colors.intersectingLine);

    line1.setMovable(true, 'rotation');
    line1.move.element = this;
    line2.setMovable(true, 'rotation');
    line2.move.element = this;
  }

  constructor(
    diagram: Diagram,
    layout: Object,
    transform: Transform = new Transform().scale(1, 1).rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.addThreeLines();
    this.add('angleA2', this.makeAngle('a', 2, 0));
    this.add('angleB2', this.makeAngle('b', 2, 1));
    this.add('angleC2', this.makeAngle('c', 2, 2));
    this.add('angleD2', this.makeAngle('d', 2, 3));
    this.add('angleA1', this.makeAngle('a', 1, 0));
    this.add('angleB1', this.makeAngle('b', 1, 1));
    this.add('angleC1', this.makeAngle('c', 1, 2));
    this.add('angleD1', this.makeAngle('d', 1, 3));

    this._line3.setTransformCallback = (t: Transform) => {
      this._line3.updateMoveTransform(t);
      this.updateIntersectingLineAngle();
      this.updateParallelLineTranlsation();
    };
    this._line1.setTransformCallback = (t: Transform) => {
      this._line3.updateMoveTransform(t);
      this.updateParallelLineTranlsation();
      this.updateIntersectingLineAngle();
    };
    this.hasTouchableElements = true;
    this.setTransformCallback = this.updateIntersectingLineAngle.bind(this);
  }

  updateAngle(angle: TypeIndexAngle, intersect: Point, r: number) {
    const threeLinesRotation = this.transform.r();
    if (threeLinesRotation != null) {
      angle.setPosition(intersect);
      if (angle.angleIndex === 0) {
        angle.updateAngle(0, r, threeLinesRotation);
      } else if (angle.angleIndex === 1) {
        angle.updateAngle(r, Math.PI - r, threeLinesRotation);
      } else if (angle.angleIndex === 2) {
        angle.updateAngle(Math.PI, r, threeLinesRotation);
      } else if (angle.angleIndex === 3) {
        angle.updateAngle(r + Math.PI, Math.PI - r, threeLinesRotation);
      }
    }
    // console.log(angle, intersect, r)
  }

  xOfLine3AtY(y: number = 0) {
    const r = this._line3.transform.r();
    if (r != null) {
      return y / Math.tan(r);
    }
    return 0;
  }

  updateParallelLineTranlsation() {
    if (this._line1.move.type === 'translation') {
      const t1 = this._line1.transform.t();
      const t2 = this._line2.transform.t();
      const r = this._line3.transform.r();
      if (t1 != null && r != null && t2 != null) {
        this._line1.transform.updateTranslation(
          this.xOfLine3AtY(t1.y),
          t1.y,
        );
        this._line2.transform.updateTranslation(
          this.xOfLine3AtY(t2.y),
          t2.y,
        );
      }
      this.diagram.animateNextFrame();
    }
  }

  moveLine2ToLine1() {
    this._line2.setPositionToElement(this._line1);
    this._angleA2.setPositionToElement(this._angleA1);
    this._angleB2.setPositionToElement(this._angleB1);
    this._angleC2.setPositionToElement(this._angleC1);
    this._angleD2.setPositionToElement(this._angleD1);
    this.diagram.animateNextFrame();
  }

  moveLine1ToLine2() {
    this._line1.setPositionToElement(this._line2);
    this._angleA1.setPositionToElement(this._angleA2);
    this._angleB1.setPositionToElement(this._angleB2);
    this._angleC1.setPositionToElement(this._angleC2);
    this._angleD1.setPositionToElement(this._angleD2);
    this.diagram.animateNextFrame();
  }

  updateIntersectingLineAngle() {
    const r = this._line3.transform.r();
    const t1 = this._line1.transform.t();
    const t2 = this._line2.transform.t();
    const t3 = this._line3.transform.t();
    if (r != null && t1 != null && t2 != null && t3 != null) {
      const intersectT1 = new Point(
        (t1.y - t3.y) / Math.tan(r) + t3.x,
        (t1.y - t3.y),
      );
      const intersectT2 = new Point(
        (t2.y - t3.y) / Math.tan(r) + t3.x,
        (t2.y - t3.y),
      );
      this.updateAngle(this._angleA1, intersectT1, r);
      this.updateAngle(this._angleA2, intersectT2, r);
      this.updateAngle(this._angleB1, intersectT1, r);
      this.updateAngle(this._angleB2, intersectT2, r);
      this.updateAngle(this._angleC1, intersectT1, r);
      this.updateAngle(this._angleC2, intersectT2, r);
      this.updateAngle(this._angleD1, intersectT1, r);
      this.updateAngle(this._angleD2, intersectT2, r);
    }
  }

  pulseLine(index: number = 1) {
    this.elements[`line${index}`].pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseParallel() {
    this.pulseLine(1);
    this.pulseLine(2);
  }

  setUnits(units: 'deg' | 'rad') {
    if (this._angleA2.label) {
      this._angleA2.label.eqn.setUnits(units);
      this._angleA2.updateLabel();
    }
    if (this._angleB2.label) {
      this._angleB2.label.eqn.setUnits(units);
      this._angleB2.updateLabel();
    }
  }

  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  showAngles(
    angles: Array<[TypeAngle, string, Array<number>]
            | [TypeAngle, string, Array<number>, boolean]>,
    showOnly: boolean = true,
  ) {
    const allAngles = [
      this._angleA1, this._angleB1, this._angleC1, this._angleD1,
      this._angleA2, this._angleB2, this._angleC2, this._angleD2,
    ];
    showAngles(allAngles, angles, showOnly);
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleAngles(
    angleSets: Array<Array<string>>,
    labels: Array<Array<string>>,
    colors: Array<Array<Array<number>>>,
    pulseSets: Array<Array<boolean>> = [],
  ) {
    // $FlowFixMe
    const angles = angleSets.map(an => an.map(a => this[`_angle${a}`]));
    let pulses = pulseSets;
    if (pulseSets.length === 0) {
      pulses = angleSets.map(an => an.map(() => false));
    }
    const showIndex = (index: number) => {
      const showArray = [];
      for (let j = 0; j < angles.length; j += 1) {
        showArray.push([
          angles[j][index],
          labels[j][index],
          colors[j][index],
          pulses[j][index],
        ]);
      }
      this.showAngles(showArray);
    };
    for (let i = 0; i < angles[0].length; i += 1) {
      if (angles[0][i].isShown) {
        const nextI = (i + 1) % angles[0].length;
        showIndex(nextI);
        this.diagram.animateNextFrame();
        return;
      }
    }
    showIndex(0);
    this.diagram.animateNextFrame();
  }

  showAllAngles(singleLabels: boolean = false) {
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      this.showAngles([
        [this._angleA1, 'a', this.colors.angleA],
        [this._angleB1, 'b', this.colors.angleB],
        [this._angleC1, 'c', this.colors.angleC],
        [this._angleD1, 'd', this.colors.angleD],
        [this._angleA2, 'e', this.colors.angleA],
        [this._angleB2, 'f', this.colors.angleB],
        [this._angleC2, 'g', this.colors.angleC],
        [this._angleD2, 'h', this.colors.angleD],
      ]);
    } else {
      this.showAngles([
        [this._angleA1, 'a', this.colors.angleA],
        [this._angleB1, 'b', this.colors.angleB],
        [this._angleC1, 'c', this.colors.angleC],
        [this._angleD1, 'd', this.colors.angleD],
        [this._angleA2, 'a', this.colors.angleA],
        [this._angleB2, 'b', this.colors.angleB],
        [this._angleC2, 'c', this.colors.angleC],
        [this._angleD2, 'd', this.colors.angleD],
      ]);
    }
  }

  toggleAllAngles() {
    const angles = [
      this._angleA1, this._angleB1, this._angleC1, this._angleD1,
      this._angleA2, this._angleB2, this._angleC2, this._angleD2,
    ];
    const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (let i = 0; i < angles.length; i += 1) {
      if (angles[i].isShown) {
        const nextI = (i + 1) % angles.length;
        this.showAngles([[angles[nextI], labels[nextI], this.layout.colors.angleA]]);
        this.diagram.animateNextFrame();
        return;
      }
    }
  }

  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  correspondingToggleAngles(
    make2Disabled: boolean = false,
    singleLabels: boolean = false,
  ) {
    const color1 = this.layout.colors.angleA;
    let color2 = this.layout.colors.angleA;
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      color2 = this.layout.colors.angleB;
    }
    if (typeof make2Disabled === 'boolean' && make2Disabled === true) {
      color2 = this.layout.colors.disabled;
    }
    let labels = [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']];
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      labels = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']];
    }
    this.toggleAngles(
      [['A1', 'B1', 'C1', 'D1'], ['A2', 'B2', 'C2', 'D2']],
      labels,
      [[color1, color1, color1, color1], [color2, color2, color2, color2]],
    );
  }

  correspondingTranslateLine1Future(y: number = 0.5) {
    const position = new Point(
      this.xOfLine3AtY(y),
      y,
    );
    const futurePosition = (element, p, r) => ({
      element,
      scenario: {
        position: p,
        rotation: r,
      },
    });
    const t2 = this._line2.transform.t();
    let position2 = new Point(0, 0);
    if (t2 != null) {
      position2 = new Point(this.xOfLine3AtY(t2.y), t2.y);
    }
    this.futurePositions = [];
    const t3 = this._line3.transform.t();
    const r3 = this._line3.transform.r();
    if (t3 != null && r3 != null) {
      this.futurePositions = [
        futurePosition(this, this.layout.position, 0),
        futurePosition(this._line1, position, 0),
        futurePosition(this._line2, position2, 0),
        futurePosition(this._line3, t3, r3),
      ];
    }
  }

  correspondingTranslateLine1() {
    let y = Math.max(Math.random(), 0.5);
    let position = new Point(0, 0);
    const t1 = this._line1.transform.t();
    if (t1 != null) {
      if (t1.y >= 0) {
        y *= -1;
      }
      position = new Point(
        this.xOfLine3AtY(y + t1.y),
        y + t1.y,
      );
    }
    this.moveLine2ToLine1();
    this._line1.stop();
    this._line1.animateTranslationTo(position, 1);
    this.diagram.animateNextFrame();
  }

  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  alternateToggleAngles(singleLabels: boolean = false) {
    const color1 = this.layout.colors.angleA;
    let color2 = this.layout.colors.angleA;
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      color2 = this.layout.colors.angleB;
    }
    let labels = [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']];
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      labels = [['a', 'b', 'c', 'd'], ['g', 'h', 'e', 'f']];
    }
    this.toggleAngles(
      [['A1', 'B1', 'C1', 'D1'], ['C2', 'D2', 'A2', 'B2']],
      labels,
      [[color1, color1, color1, color1], [color2, color2, color2, color2]],
    );
  }

  alternateShowCorrespondingAngles() {
    const angles = [['A1'], ['A2']];
    const labels = [['a'], ['a']];
    const c = this.layout.colors.angleB;
    const colors = [[c], [c]];
    const pulses = [[true], [true]];
    this.toggleAngles(angles, labels, colors, pulses);
  }

  alternateShowOppositeAngles() {
    const angles = [['A1'], ['A2'], ['C2']];
    const labels = [['a'], ['a'], ['a']];
    const c = this.layout.colors.angleC;
    const cd = this.layout.colors.disabled;
    const colors = [[cd], [c], [c]];
    const pulses = [[false], [true], [true]];
    this.toggleAngles(angles, labels, colors, pulses);
    // this.diagram.animateNextFrame();
  }

  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  interiorToggleAngles(singleLabels: boolean = false) {
    const c1 = this.layout.colors.angleA;
    const c2 = this.layout.colors.angleB;
    let colors = [[c1, c1], [c1, c1]];
    let labels = [['d', 'c'], ['d_equals', 'c_equals']];
    if (typeof singleLabels === 'boolean' && singleLabels === true) {
      labels = [['d', 'c'], ['e', 'f']];
      colors = [[c1, c1], [c2, c2]];
    }

    this.toggleAngles(
      [['D1', 'C1'], ['A2', 'B2']],
      labels,
      colors,
    );
    this.diagram.animateNextFrame();
  }

  interiorShowCorresponding() {
    const angles = [['D1'], ['D2']];
    const labels = [['d'], ['d']];
    const c = this.layout.colors.angleB;
    const colors = [[c], [c]];
    const pulses = [[true], [true]];
    this.toggleAngles(angles, labels, colors, pulses);
    this.diagram.animateNextFrame();
  }

  interiorShowSupplementary() {
    const c = this.layout.colors.angleC;
    const cd = this.layout.colors.disabled;
    const angles = [['D1'], ['D2'], ['A2']];
    const labels = [['d'], ['d'], ['d_equals']];
    const colors = [[cd], [c], [c]];
    const pulses = [[false], [true], [true]];
    this.toggleAngles(angles, labels, colors, pulses);
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  interiorShowInterior() {
    const c = this.layout.colors.angleA;
    const cd = this.layout.colors.disabled;
    const angles = [['D1'], ['D2'], ['A2']];
    const labels = [['d'], ['d'], ['d_equals']];
    const colors = [[c], [cd], [c]];
    const pulses = [[true], [false], [true]];
    this.toggleAngles(angles, labels, colors, pulses);
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  // $FlowFixMe
  calculateFuturePositions(goToScenario: string) {
    const futurePosition = (element, scenario) => ({ element, scenario });
    this.futurePositions = [];
    if (goToScenario != null) {
      this.futurePositions = [
        futurePosition(this, { position: this.layout.position, rotation: 0 }),
        futurePosition(this._line1, this.layout.line1[goToScenario]),
        futurePosition(this._line2, this.layout.line2[goToScenario]),
        futurePosition(this._line3, this.layout.line3[goToScenario]),
      ];
    }
  }
}
