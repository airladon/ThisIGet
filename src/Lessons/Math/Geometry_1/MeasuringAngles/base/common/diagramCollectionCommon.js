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
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimative;
    _bendLine: {
      _line: DiagramObjectLine;
      _arc: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);
    this._equation._arc.onClick = () => {
      this._equation.goToForm('arc', 2);
      this.diagram.animateNextFrame();
    };
    this._equation._radius.onClick = () => {
      this._equation.goToForm('radius', 2);
      this.diagram.animateNextFrame();
    };
    this._equation._arc.makeTouchable();
    this._equation._radius.makeTouchable();
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    this._circle._angle.setAngle({ angle: r });
    this._circle._arc.setAngleToDraw(r + 0.01);
  }

  bend(percent: number) {
    const line = this._circle._bendLine._line;
    const arc = this._circle._bendLine._arc;
    const { radius } = this.layout;

    line.setLength((1 - percent) * radius);
    arc.transform.updateTranslation(
      (1 - percent) * radius,
      0,
    );
    arc.angleToDraw = (percent);
  }

  bendRadius() {
    const line1 = this._circle._line1;
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;

    bendLine.stop(true, false);
    this.bend(0);
    bendLine.setPosition(line1.getPosition());
    bendLine.setRotation(line1.getRotation(''));
    const target = bendLine.transform._dup();
    target.updateRotation(Math.PI / 2);
    target.updateTranslation(radius + width / 2, 0);
    bendLine.animations.new()
      .transform({ target, duration: 1 })
      .custom({ callback: this.bend.bind(this), duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }
}
