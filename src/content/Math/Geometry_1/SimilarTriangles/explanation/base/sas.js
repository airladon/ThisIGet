// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './sasLayout';

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

export default class CommonCollectionSAS extends CommonDiagramCollection {
//   _tri1: {
//     _pad0: DiagramElementPrimitive;
//     _pad1: DiagramElementPrimitive;
//     _pad2: DiagramElementPrimitive;
//     _side01: {
//       _label: DiagramElementPrimitive;
//     } & DiagramObjectLine;
//     _side12: {
//       _label: DiagramElementPrimitive;
//     } & DiagramObjectLine;
//     _side20: {
//       _label: DiagramElementPrimitive;
//     } & DiagramObjectLine;
//     _angle0: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle1: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle2: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//   } & DiagramObjectPolyLine;

//   lastAuto: 'sideside' | 'angleangle' | 'adjacentAngleSide' | 'oppositeAngleSide' | 'side' | 'angle';
//   lastValue: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._tri1._angle0.hide();
    this._tri1._angle1.hide();
    this._tri2._angle0.hide();
    this._tri2._angle1.hide();
  }
}
