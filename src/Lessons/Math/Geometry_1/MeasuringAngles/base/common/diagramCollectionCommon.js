// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimative;
    _marks12: DiagramElementPrimative;
    _marks20: DiagramElementPrimative;
    _marks50: DiagramElementPrimative;
    _marks100: DiagramElementPrimative;
    _radians: DiagramElementPrimative;
    _degrees: {
      _marks36: DiagramElementPrimative;
      _marks360: DiagramElementPrimative;
    } & DiagramElementCollection;
    _bendLine: {
      _line: DiagramObjectLine;
      _arc: DiagramElementPrimative;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimative;
      _value: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  marks: number;
  decimals: number;
  units: string;

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
    this.decimals = 1;
    this.marks = 12;
    this._circle._angleText._label.onClick = this.pulseAngle.bind(this);
    this._circle._angleText._label.makeTouchable();
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    this._circle._angle.setAngle({ angle: r });
    this._circle._arc.setAngleToDraw(r + 0.01);
    if (this._circle._angleText.isShown) {
      const text = `${round(r * this.marks / Math.PI / 2, this.decimals).toFixed(this.decimals)} ${this.units}`;
      this._circle._angleText._value.drawingObject.setText(text);
    }
  }

  setAngleTextProperties(marks: number, decimals: number, units: string) {
    this.marks = marks;
    this.decimals = decimals;
    this.units = units;
  }

  setAngleMarks(
    marks: 12 | 20 | 50 | 100 | 'degrees' | 'radians' = 'degrees',
  ) {
    this._circle._marks12.hide();
    this._circle._marks20.hide();
    this._circle._marks50.hide();
    this._circle._marks100.hide();
    this._circle._degrees.hide();
    this._circle._radians.hide();
    if (marks === 'degrees') {
      this.setAngleTextProperties(360, 0, 'º');
      this._circle._degrees.showAll();
    } else if (marks === 'radians') {
      this.setAngleTextProperties(Math.PI * 2, 1, 'radians');
      this._circle._radians.showAll();
    } else {
      this.setAngleTextProperties(marks, 1, 'portions');
      this._circle[`_marks${marks}`].showAll();
    }
    this.updateAngle();
    this.diagram.animateNextFrame();
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

  pushLine(
    toAngle: ?number = null,
    direction: number = 0,
    duration: number = 2,
  ) {
    let r = toAngle;
    if (toAngle == null) {
      r = rand(Math.PI / 2) + Math.PI / 2 + this._circle._line1.getRotation('0to360');
    }
    this._circle._line1.stop(true, false);
    this._circle._line1.animations.new()
      .rotation({ target: r, duration, direction })
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._circle._angle.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseMarks(id: number) {
    const element = this._circle[`_marks${id}`];
    element.pulseScaleNow(1, 1.1);
    this.diagram.animateNextFrame();
  }

  setLineRotation(r: ?number = null, animate: boolean = true) {
    let target = r;
    let direction = 0;
    if (target == null) {
      const currentRotation = this._circle._line1.getRotation('0to360');
      if (currentRotation < 0.5) {
        target = 1;
        direction = 1;
      } else if (currentRotation > Math.PI * 1.75) {
        target = Math.PI * 2 - 1;
        direction = -1;
      } else {
        return;
      }
    }
    if (animate) {
      this.pushLine(target, direction);
    } else {
      this._circle._line1.setRotation(target);
    }
  }
}
