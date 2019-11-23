// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  // DiagramObjectAngle,
  // DiagramObjectLine,
  // DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    // this._equil.setTransformCallback = this.updateEquilRotation.bind(this);
  }

  // updateEquilRotation() {
  //   const r = this._equil.getRotation();
  //   this._equil.exec(['updateLabel', r], ['a30', 'a60', 'A', 'H', 'Aon2', 'r32', 'r3', 'ARight', '2A', '1Right', 'r31', '2']);
  //   this.diagram.animateNextFrame();
  // }

  setTriEqnForms(form: string) {
    // if (this._equil._Aon2.isShown) {
    //   this._equil._Aon2._label.showForm(form);
    // }
    // if (this._equil._Aon2Left.isShown) {
    //   this._equil._Aon2Left._label.showForm(form);
    // }
    // if (this._equil._A.isShown) {
    //   this._equil._A._label.showForm(form);
    // }
    // // this._equil._r3._label.showForm(form);
    // if (this._equil._r32.isShown) {
    //   this._equil._r32._label.showForm(form);
    // }
  }

  // goToTriEqnForms(form: string, done: ?() => void = null) {
  //   let allDoneCount = 0;
  //   const allDone = () => {
  //     allDoneCount += 1;
  //     if (allDoneCount === 3 && done != null) {
  //       done();
  //     }
  //   };
  //   this._equil._A._label.goToForm({
  //     name: form, duration: 1, animate: 'move', callback: allDone,
  //   });
  //   this._equil._Aon2._label.goToForm({
  //     name: form, duration: 1, animate: 'move', callback: allDone,
  //   });
  //   // });
  //   this._equil._r32._label.goToForm({
  //     name: form, duration: 1, animate: 'move', callback: allDone,
  //   });

  // }
}
