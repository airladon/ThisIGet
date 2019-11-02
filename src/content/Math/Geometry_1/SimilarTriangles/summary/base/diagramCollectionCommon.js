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

  sideCounter: number;
  sasCounter: number;
  aaCounter: number;
  ssaCounter: number;
  angleCounter: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this.sideCounter = 0;
    this.sasCounter = 0;
    this.aaCounter = 0;
    this.ssaCounter = 0;
    this.angleCounter = 0;
  }

  pulseAllAngles() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    tri1._angle0._label.pulseScaleNow(1, 2);
    tri1._angle1._label.pulseScaleNow(1, 2);
    tri1._angle2._label.pulseScaleNow(1, 2);
    tri2._angle0._label.pulseScaleNow(1, 2);
    tri2._angle1._label.pulseScaleNow(1, 2);
    tri2._angle2._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseAllSides() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    tri1._side01._label.pulseScaleNow(1, 2);
    tri1._side12._label.pulseScaleNow(1, 2);
    tri1._side20._label.pulseScaleNow(1, 2);
    tri2._side01._label.pulseScaleNow(1, 2);
    tri2._side12._label.pulseScaleNow(1, 2);
    tri2._side20._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    const small = [tri1._angle0, tri1._angle1, tri1._angle2];
    const large = [tri2._angle0, tri2._angle1, tri2._angle2];
    const index = this.angleCounter;
    this.angleCounter = (this.angleCounter + 1) % 3;
    small[index].pulseScaleNow(1, 1.5);
    large[index].pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseTriRSide() {
    const tri1 = this._tri1;
    const tri2 = this._tri2;
    const side1 = [tri1._side01, tri1._side12, tri1._side20];
    const side2 = [tri2._side01, tri2._side12, tri2._side20];
    const index = this.sideCounter;
    this.sideCounter = (this.sideCounter + 1) % 3;
    side1[index]._label.pulseScaleNow(1, 2);
    side2[index]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  toggleSas(pulse = true) {
    const t1 = this._tri1;
    const t2 = this._tri2;
    const combos = [
      [t1._angle1, t2._angle1, t1._side01, t1._side12, t2._side01, t2._side12],
      [t1._angle2, t2._angle2, t1._side12, t1._side20, t2._side12, t2._side20],
      [t1._angle0, t2._angle0, t1._side20, t1._side01, t2._side20, t2._side01],
    ];
    const index = this.sasCounter;
    this.sasCounter = (this.sasCounter + 1) % 3;
    t1.hideAll();
    t2.hideAll();
    t1._line.show();
    t2._line.show();
    combos[index].forEach((element) => {
      element.showAll();
      if (pulse) {
        element._label.pulseScaleNow(1, 2);
      }
    });
    this.diagram.animateNextFrame();
  }

  toggleSsa(pulse = true) {
    const t1 = this._tri1;
    const t2 = this._tri2;
    const combos = [
      [t1._angle2, t2._angle2, t1._side01, t1._side12, t2._side01, t2._side12],
      [t1._angle1, t2._angle1, t1._side01, t1._side20, t2._side01, t2._side20],
      [t1._angle1, t2._angle1, t1._side12, t1._side20, t2._side12, t2._side20],
    ];
    this.ssaCounter = (this.ssaCounter + 1) % 3;
    const index = this.ssaCounter;
    t1.hideAll();
    t2.hideAll();
    t1._line.show();
    t2._line.show();
    combos[index].forEach((element) => {
      element.showAll();
      if (pulse) {
        element._label.pulseScaleNow(1, 2);
      }
    });
    this.diagram.animateNextFrame();
  }

  pulseOpposite() {
    const t1 = this._tri1;
    const t2 = this._tri2;
    const combos = [
      [t1._side01, t2._side01],
      [t1._side20, t2._side20],
      [t1._side20, t2._side20],
    ];
    combos[this.ssaCounter][0]._label.pulseScaleNow(1, 2);
    combos[this.ssaCounter][1]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseAdjacent() {
    const t1 = this._tri1;
    const t2 = this._tri2;
    const combos = [
      // [t1._side01, t2._side01],
      [t1._side12, t2._side12],
      [t1._side01, t2._side01],
      // [t1._side20, t2._side20],
      // [t1._side20, t2._side20],
      [t1._side12, t2._side12],
    ];
    combos[this.ssaCounter][0]._label.pulseScaleNow(1, 2);
    combos[this.ssaCounter][1]._label.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  toggleAa(pulse = true) {
    const t1 = this._tri1;
    const t2 = this._tri2;
    const combos = [
      [t1._angle1, t2._angle1, t1._angle2, t2._angle2],
      [t1._angle2, t2._angle2, t1._angle0, t2._angle0],
      [t1._angle0, t2._angle0, t1._angle1, t2._angle1],
    ];
    const index = this.aaCounter;
    this.aaCounter = (this.aaCounter + 1) % 3;
    t1.hideAll();
    t2.hideAll();
    t1._line.show();
    t2._line.show();
    combos[index].forEach((element) => {
      element.showAll();
      if (pulse) {
        element._label.pulseScaleNow(1, 2);
      }
    });
    this.diagram.animateNextFrame();
  }
}
