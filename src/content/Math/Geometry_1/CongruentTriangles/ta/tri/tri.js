// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import diagramLayout from './layout';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  // DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point,
  // Line,
  // parsePoint,
} = Fig;

// const { rand } = Fig.tools.math;

// const { getPoint } = Fig.tools.g2;

export default class CommonCollectionTri extends CommonDiagramCollection {
  _tri: {
    _pad0: DiagramElementPrimitive;
    _pad1: DiagramElementPrimitive;
    _pad2: DiagramElementPrimitive;
    _side01: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _side12: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _side20: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _angle0: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle1: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
    _angle2: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
  } & DiagramObjectPolyLine;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElements, this);
    this.hasTouchableElements = true;
    this._tri._pad0.makeTouchable();
  }
}
