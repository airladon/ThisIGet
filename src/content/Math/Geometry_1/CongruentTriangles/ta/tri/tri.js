// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import diagramLayout from './layout';

const {
  DiagramElementPrimative,
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
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _side01: {
      _label: DiagramElementPrimative;
    } & DiagramObjectLine;
    _side12: {
      _label: DiagramElementPrimative;
    } & DiagramObjectLine;
    _side20: {
      _label: DiagramElementPrimative;
    } & DiagramObjectLine;
    _angle0: { _label: DiagramElementPrimative } & DiagramObjectAngle;
    _angle1: { _label: DiagramElementPrimative } & DiagramObjectAngle;
    _angle2: { _label: DiagramElementPrimative } & DiagramObjectAngle;
  } & DiagramObjectPolyLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._tri._pad0.makeTouchable();
  }
}
