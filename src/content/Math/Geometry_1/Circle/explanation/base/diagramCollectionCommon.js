// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;

export default class CommonCollectionObjects extends CommonDiagramCollection {
  objectIndex: number;
  _activator: DiagramElementPrimitive;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Collection').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addObjectsElements);
    this.hasTouchableElements = true;
    this.objectIndex = 0;
    this._activator.onClick = this.objectToCircle.bind(this);
    // this._activator.onClick = () => {
    //   this.objectToCircle();
    //   console.log('activated');
    // }
    // console.log('asdf')
    this._activator.makeTouchable();
  }

  objectToCircle() {
    const objects = ['Moon', 'Wheel', 'Ball', 'Ring'];
    const start = ['moreLeft', 'left', 'center', 'right'];
    const circle = this.elements[`circle${objects[this.objectIndex]}`];
    circle.stop(true, false);
    circle.setScenario(start[this.objectIndex]);
    circle.animations.new()
      .dissolveIn(0.2)
      .scenario({ target: 'moreRight', duration: 3 })
      .start();
    this.objectIndex = (this.objectIndex + 1) % 4;
    this.diagram.animateNextFrame();
  }
}
