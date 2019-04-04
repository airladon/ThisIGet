// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _angleA: DiagramObjectAngle;
    _angleB: DiagramObjectAngle;
    _angleC: DiagramObjectAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);

    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line3.makeTouchable();
    this._fig.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line2.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line3.setTransformCallback = this.updateAngles.bind(this);
    this._fig._line1.move.element = this._fig;
  }

  updateAngles() {
    let r1 = this._fig.getRotation();
    let r2 = this._fig._line2.getRotation();
    let r3 = this._fig._line3.getRotation();
    if (r3 > Math.PI * 2) {
      r3 = Math.PI * 2;
    }
    if (r2 > r3) {
      r2 = r3;
    }
    if (r2 < 0) {
      r2 = 0;
    }
    if (r3 < 0) {
      r3 = 0;
    }
    if (r1 > Math.PI * 2) {
      r1 -= Math.PI * 2;
    }
    if (r1 < 0) {
      r1 += Math.PI * 2;
    }
    this._fig.transform.updateRotation(r1);
    this._fig._line2.transform.updateRotation(r2);
    this._fig._line3.transform.updateRotation(r3);
    this._fig._angleA.setAngle({ angle: r2, rotationOffset: r1 });
    this._fig._angleB.setAngle({ rotation: r2, angle: r3 - r2, rotationOffset: r1 });
    this._fig._angleC.setAngle({ angle: r3, rotationOffset: r1 });
    // this._fig._angleA.updateAngle(0, r2, r1);
    // this._fig._angleB.updateAngle(r2, r3 - r2, r1);
    // this._fig._angleC.updateAngle(0, r3, r1);
  }
}
