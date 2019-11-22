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
  // Equation,
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
    this._equil.setTransformCallback = this.updateEquilRotation.bind(this);
  }

  updateEquilRotation() {
    const r = this._equil.getRotation();
    this._equil.exec(['updateLabel', r], ['a30', 'a60', 'A', 'H', 'Aon2', 'r32', 'r3', 'ARight', '2A', '1Right', 'r31', '2']);
    this.diagram.animateNextFrame();
  }
}
