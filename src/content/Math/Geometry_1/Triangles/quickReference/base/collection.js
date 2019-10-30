// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;


export default class CommonCollection extends CommonDiagramCollection {
  _totalAngle: {
    _fixedTriangle: {
      _line: DiagramElementPrimitive;
    } & DiagramObjectPolyLine;
    _angleA: DiagramObjectAngle;
    _angleB: DiagramObjectAngle;
    _angleC: DiagramObjectAngle;
  } & DiagramElementCollection;

  _eqn: Equation;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
  }

  updateTotalAngles() {
    const { points } = this._totalAngle._fixedTriangle;
    const maxIndex = points.reduce((yMax, p, i, arr) => {
      if (p.y > arr[yMax].y) {
        return i;
      }
      if (p.y === arr[yMax].y) {
        if (p.x > arr[yMax].x) {
          return i;
        }
      }
      return yMax;
    }, 0);
    let remainingPoints = [0, 1, 2];
    const top = points[maxIndex];
    remainingPoints = remainingPoints.filter((val, i) => i !== maxIndex);
    let left = points[remainingPoints[0]];
    let right = points[remainingPoints[1]];
    if (left.x > right.x) {
      left = points[remainingPoints[1]];
      right = points[remainingPoints[0]];
    }

    const angleA = this._totalAngle._angleA;
    const angleB = this._totalAngle._angleB;
    const angleC = this._totalAngle._angleC;

    angleA.setAngle({ p1: right, p2: left, p3: top });
    angleB.setAngle({ p1: top, p2: right, p3: left });
    angleC.setAngle({ p1: left, p2: top, p3: right });
    angleA.hide();
    angleB.hide();
    angleC.hide();
  }
}
