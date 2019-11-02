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

type TypeTri = {
  _ss: {
    _side01: { _label: DiagramElementPrimitive } & DiagramObjectLine;
    _side12: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  } & DiagramObjectPolyLine;
  _b: DiagramObjectAngle;
  _C: DiagramObjectLine;
} & DiagramObjectPolyLine;


export default class CommonCollectionSSA extends CommonDiagramCollection {
  _tri1: TypeTri;
  _tri2: TypeTri;
  _b: DiagramObjectAngle;
  _rALine: DiagramObjectLine;
  _rBLine: DiagramObjectLine;
  _rCLine: DiagramObjectLine;
  _rADim: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  _rBDim: { _label: DiagramElementPrimitive } & DiagramObjectLine;
  _arrow1: CommonDiagramCollection;
  _arrow2: CommonDiagramCollection;
  _cLabel: DiagramElementPrimitive;
  _rcLabel: DiagramElementPrimitive;

  sideCounter: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = diagramLayout(),
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this.sideCounter = 0;
  }

  pulseAngle() {
    this._tri1._b.pulseScaleNow(1, 1.5);
    this._tri2._b.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseSides() {
    const tri1 = this._tri1._ss;
    const tri2 = this._tri2._ss;
    const side1 = [tri1._side01, tri1._side12];
    const side2 = [tri2._side01, tri2._side12];
    const index = this.sideCounter;
    this.sideCounter = (this.sideCounter + 1) % 2;
    side1[index]._label.pulseScaleNow(1, 2);
    side2[index]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  growRA(done: ?() => void = null) {
    const showDimension = () => {
      this._rADim.showAll();
      this._rADim._label.pulseScaleNow(1, 2, 0, done);
    }
    this._rALine.grow(0, 0.8, true, showDimension);
    this.diagram.animateNextFrame();
  }

  pulseAngleB(done: ?() => void = null) {
    this._b.pulseScaleNow(1, 1.4, 0, done);
    this.diagram.animateNextFrame();
  }

  growLargeTriangle(done: ?() => void = null) {
    this._rCLine.grow(0.05, 1.5, true, done);
    this._rBLine.grow(0.05, 1.5, true, done);
    this.diagram.animateNextFrame();
  }

  pulseParallel(done: ?() => void = null) {
    this._arrow1.pulseScaleNow(1, 2.5, 0, done);
    this._arrow2.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseBAngles() {
    this._tri1._b.pulseScaleNow(1, 1.4);
    this._b.pulseScaleNow(1, 1.4);
    this.diagram.animateNextFrame();
  }

  pulseProportional(done: ?() => void = null) {
    this._cLabel.pulseScaleNow(1, 2, 0, done);
    this._rcLabel.pulseScaleNow(1, 2, 0, done);
    this._rBDim._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

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
