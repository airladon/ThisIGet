// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { clipAngle } = Fig.tools.g2;

export default class CommonCollection extends CommonDiagramCollection {
  _angle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _fill: DiagramElementPrimative
  } & DiagramElementCollection;

  _shapes: {
    _shape1: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      // _moreSharpCorners: DiagramElementCollection;
      _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
    _shape2: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      _moreSharpCorners: DiagramElementCollection;
      // _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
    _shape3: {
      _line: DiagramElementPrimative;
      _corners: DiagramElementPrimative;
      _moreSharpCorners: DiagramElementCollection;
      _lessSharpCorners: DiagramElementCollection;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Angles').scale(1, 1).rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;

    this._angle._line1.makeTouchable();
    this._angle._line1.setTransformCallback = this.updateAngle.bind(this);
  }

  updateAngle() {
    const r = this._angle._line1.getRotation();
    this._angle._fill.setAngleToDraw(clipAngle(r + 0.05, '0to360'));
  }

  pulseShapeElement(what: 'lines' | 'corners' | 'moreSharp' | 'lessSharp') {
    const shapes = this._shapes;
    shapes.hideAll();
    shapes._shape1._line.show();
    shapes._shape2._line.show();
    shapes._shape3._line.show();
    if (what === 'lines') {
      shapes._shape1._line.pulseThickNow(1, 1.05, 5);
      shapes._shape2._line.pulseThickNow(1, 1.05, 5);
      shapes._shape3._line.pulseThickNow(1, 1.05, 5);
    } else if (what === 'corners') {
      shapes._shape1._corners.show();
      shapes._shape2._corners.show();
      shapes._shape3._corners.show();
      shapes._shape1._corners.pulseScaleNow(1, 1.1);
      shapes._shape2._corners.pulseScaleNow(1, 1.1);
      shapes._shape3._corners.pulseScaleNow(1, 1.1);
    } else if (what === 'moreSharp') {
      shapes._shape2._moreSharpCorners.showAll();
      shapes._shape3._moreSharpCorners.showAll();
      shapes._shape2._moreSharpCorners.pulseScaleNow(1, 1.1);
      shapes._shape3._moreSharpCorners.pulseScaleNow(1, 1.1);
    } else if (what === 'lessSharp') {
      shapes._shape1._lessSharpCorners.showAll();
      shapes._shape3._lessSharpCorners.showAll();
      shapes._shape1._lessSharpCorners.pulseScaleNow(1, 1.1);
      shapes._shape3._lessSharpCorners.pulseScaleNow(1, 1.1);
    }

    this.diagram.animateNextFrame();
  }
}
