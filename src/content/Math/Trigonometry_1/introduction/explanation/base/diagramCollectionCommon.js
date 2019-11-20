// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import plane from './plane.svg';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _rotator: {
    _line: { _line: DiagramElementPrimitive } & DiagramObjectLine;
    _h: DiagramObjectLine;
    _v: DiagramObjectLine;
    _sine: DiagramObjectPolyLine
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this._rotator._line._line.setMovable(true);
    this._rotator._line.setTransformCallback = this.updateRotator.bind(this);
  }

  updateRotator() {
    // const p1 = this._rotator._line.p1._dup();
    // console.log(this._rotator._line.getRotation())
    const p = this._rotator._line.getP2();
    if (this._rotator._h.isShown) {
      this._rotator._h.setEndPoints([0, p.y], p);
    }
    if (this._rotator._v.isShown) {
      this._rotator._v.setEndPoints([p.x, 0], p);
    }
    // if (this._rotator._sine.isShown) {
    //   const x = 
    // }
    // this.diagram.animateNextFrame();
  }
}
