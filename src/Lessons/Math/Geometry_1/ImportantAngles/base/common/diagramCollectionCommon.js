// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _angleText: {
      _label: DiagramElementPrimative;
      _value: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);

    this._fig._line1.setTransformCallback = this.updateAngle.bind(this);
    this._fig._line1.makeTouchable();
    this.updateAngle();
  }

  updateAngle() {
    const r = this._fig._line1.getRotation('0to360');
    if (this._fig._angle.isShown) {
      this._fig._angle.setAngle({ angle: r });
    }
    if (this._fig._angleText.isShown) {
      const text = `${round(r * 180 / Math.PI, 0)}º`;
      this._fig._angleText._value.drawingObject.setText(text);
    }
  }
}
