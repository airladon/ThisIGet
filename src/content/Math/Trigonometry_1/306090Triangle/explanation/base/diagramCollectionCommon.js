// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _equil: {
    _Aon2Left: { _label: Equation } & DiagramObjectLine;
    _Aon2: { _label: Equation } & DiagramObjectLine;
    _H: DiagramObjectLine;
    _r32: { _label: Equation } & DiagramObjectLine;
    _A: DiagramObjectLine;
    _ALeft: DiagramObjectLine;
    _ABottom: DiagramObjectLine;
    _a30: DiagramObjectAngle;
    _a30Left: DiagramObjectAngle;
    _a60: DiagramObjectAngle;
    _a60Left: DiagramObjectAngle;
    _a90: DiagramObjectAngle;
    _a90Left: DiagramObjectAngle;
    _equil: DiagramObjectPolyLine;
    _split: DiagramObjectLine;
    _tri: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _eqn: Equation;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    // this.hasTouchableElements = true;
    this._equil.setTransformCallback = this.updateEquilRotation.bind(this);
  }

  updateEquilRotation() {
    const r = this._equil.getRotation();
    this._equil.exec(['updateLabel', r], ['a30', 'a60', 'A', 'H', 'Aon2', 'r32', 'r3', 'ARight', '2A', '1Right', 'r31', '2']);
    this.diagram.animateNextFrame();
  }

  setTriEqnForms(form: string) {
    if (this._equil._Aon2.isShown) {
      this._equil._Aon2._label.showForm(form);
    }
    if (this._equil._Aon2Left.isShown) {
      this._equil._Aon2Left._label.showForm(form);
    }
    if (this._equil._A.isShown) {
      this._equil._A._label.showForm(form);
    }
    // this._equil._r3._label.showForm(form);
    if (this._equil._r32.isShown) {
      this._equil._r32._label.showForm(form);
    }
  }

  goToTriEqnForms(form: string, done: ?() => void = null) {
    let allDoneCount = 0;
    const allDone = () => {
      allDoneCount += 1;
      if (allDoneCount === 3 && done != null) {
        done();
      }
    };
    this._equil._A._label.goToForm({
      name: form, duration: 1, animate: 'move', callback: allDone,
    });
    this._equil._Aon2._label.goToForm({
      name: form, duration: 1, animate: 'move', callback: allDone,
    });
    // });
    this._equil._r32._label.goToForm({
      name: form, duration: 1, animate: 'move', callback: allDone,
    });
  }
}
