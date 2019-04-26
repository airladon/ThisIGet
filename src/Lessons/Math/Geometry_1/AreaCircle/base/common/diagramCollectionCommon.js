// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // DiagramEquation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri: {
      _height: DiagramObjectLine;
      _base: DiagramObjectLine;
      _fill: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }

  toggleTri(targetIn: ?number = null) {
    let target = targetIn;
    if (target == null) {
      let r = this._fig._tri.getRotation();
      r += Math.PI * 2 / this.layout.polygonSides[0];
      target = r;
    }
    this._fig._tri.setRotation(target);
    this._fig._tri._height.updateLabel(target);
    this._fig._tri._base.updateLabel(target);
    this.diagram.animateNextFrame();
  }
}
