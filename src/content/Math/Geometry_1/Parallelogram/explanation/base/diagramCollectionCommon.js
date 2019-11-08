// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import { TypeLabelledAngle, TypeLabelledLine } from 'figureone';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  toggleIndex: number;
  _pgram: {
    _a1: TypeLabelledAngle;
    _a2: TypeLabelledAngle;
    _b1: TypeLabelledAngle;
    _b2: TypeLabelledAngle;
    _c1: TypeLabelledAngle;
    _c2: TypeLabelledAngle;
    _d1: TypeLabelledAngle;
    _d2: TypeLabelledAngle;
    _labelA1: TypeLabelledLine;
    _labelA2: TypeLabelledLine;
    _labelB1: TypeLabelledLine;
    _labelB2: TypeLabelledLine;
    _pMarkLeft: DiagramElementPrimitive;
    _pMarkTop: DiagramElementPrimitive;
    _pMarkRight: DiagramElementPrimitive;
    _pMarkBottom: DiagramElementPrimitive;
    _lMarkUp1: DiagramElementPrimitive;
    _lMarkUp2: DiagramElementPrimitive;
    _lMark21: DiagramElementPrimitive;
    _lMark22: DiagramElementPrimitive;
    _diag1: TypeLabelledLine;
    _diag2: TypeLabelledLine;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this.toggleIndex = 0;
  }

  toggleInteriorAngles(done: ?() => void = null) {
    const a1 = this._pgram._a1;
    const a2 = this._pgram._a2;
    const b1 = this._pgram._b1;
    const b2 = this._pgram._b2;
    const anglePairs = [
      [a1, b1],
      [b1, a2],
      [a2, b2],
      [b2, a1],
    ];
    const pair = anglePairs[this.toggleIndex];
    this._pgram.pulse([pair[0], pair[1]], done);
    this.toggleIndex = (this.toggleIndex + 1) % 4;
    this.diagram.animateNextFrame();
  }

  toggleOppositeAngles(done: ?() => void = null) {
    const a1 = this._pgram._a1;
    const a2 = this._pgram._a2;
    const b1 = this._pgram._b1;
    const b2 = this._pgram._b2;
    const anglePairs = [
      [a1, a2],
      [b1, b2],
    ];
    const pair = anglePairs[this.toggleIndex];
    this._pgram.pulse([pair[0], pair[1]], done);
    this.toggleIndex = (this.toggleIndex + 1) % 2;
    this.diagram.animateNextFrame();
  }

  dissolveOutAngleLabels(done: ?() => void = null) {
    const pgram = this._pgram;
    pgram.stop();
    // pgram._a1.setOpacity(1);
    pgram._a1.showAll();
    // pgram._a2.setOpacity(1);
    pgram._a2.showAll();
    // pgram._b1.setOpacity(1);
    pgram._b1.showAll();
    // pgram._b2.setOpacity(1);
    pgram._b2.showAll();
    pgram.animations.new()
      .inParallel([
        pgram._a1._label.anim.dissolveOut(1),
        pgram._a2._label.anim.dissolveOut(1),
        pgram._b1._label.anim.dissolveOut(1),
        pgram._b2._label.anim.dissolveOut(1),
      ])
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  toggleSas(done: ?() => void = null) {
    const pgram = this._pgram;
    const combos = [
      [pgram._c1, pgram._b1, pgram._diag1],
      [pgram._c2, pgram._b2, pgram._diag1],
    ];
    pgram.highlight(['c1', 'c2', 'b1', 'b2', 'diag1']);
    pgram.pulse(combos[this.toggleIndex], done);
    this.toggleIndex = (this.toggleIndex + 1) % 2;
    this.diagram.animateNextFrame();
  }

  toggleEqualSides(done: ?() => void = null) {
    const pgram = this._pgram;
    const sides = [
      ['labelA1', 'labelA2'],
      ['labelB1', 'labelB2'],
    ];
    pgram.pulse(sides[this.toggleIndex], done);
    this.toggleIndex = (this.toggleIndex + 1) % 2;
    this.diagram.animateNextFrame();
  }
}
