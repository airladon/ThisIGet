// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import diagramLayout from './ssaLayout';

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

export default class CommonCollectionSSA extends CommonDiagramCollection {
//   _tri1: {
//     _side01: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _side12: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _side20: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _angle0: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle1: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle2: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//   } & DiagramObjectPolyLine;

//   _tri2: {
//     _side01: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _side12: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _side20: { _label: DiagramElementPrimitive; } & DiagramObjectLine;
//     _angle0: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle1: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//     _angle2: { _label: DiagramElementPrimitive } & DiagramObjectAngle;
//   } & DiagramObjectPolyLine;

//   _arrow1: CommonDiagramCollection;
//   _arrow2: CommonDiagramCollection;
//   sideCounter: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    // this.sideCounter = 0;
  }

//   pulseAngles(done: ?() => void = null) {
//     this._tri1._angle1.pulseScaleNow(1, 1.5, 0, done);
//     this._tri2._angle1.pulseScaleNow(1, 1.5);
//     this.diagram.animateNextFrame();
//   }

//   pulseSides() {
//     const tri1 = this._tri1;
//     const tri2 = this._tri2;
//     const side1 = [tri1._side01, tri1._side12];
//     const side2 = [tri2._side01, tri2._side12];
//     const index = this.sideCounter;
//     this.sideCounter = (this.sideCounter + 1) % 2;
//     side1[index]._label.pulseScaleNow(1, 2);
//     side2[index]._label.pulseScaleNow(1, 2);
//     this.diagram.animateNextFrame();
//   }

//   pulseParallel(done: ?() => void = null) {
//     this._arrow1.pulseScaleNow(1, 2.5, 0, done);
//     this._arrow2.pulseScaleNow(1, 2.5);
//     this.diagram.animateNextFrame();
//   }

//   pulseSimilar(done: ?() => void = null) {
//     const tri1 = this._tri1;
//     const tri2 = this._tri2;
//     const side1 = [tri1._side01, tri1._side12, tri1._side20];
//     const side2 = [tri2._side01, tri2._side12, tri2._side20];
//     const index = this.sideCounter;
//     this.sideCounter = (this.sideCounter + 1) % 3;
//     side1[index]._label.pulseScaleNow(1, 2);
//     side2[index]._label.pulseScaleNow(1, 2, 0, done);
//     this.diagram.animateNextFrame();
//   }
}
